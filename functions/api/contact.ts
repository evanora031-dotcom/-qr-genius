interface ContactEnv {
  RESEND_API_KEY: string;
  RESEND_FROM_EMAIL: string;
  TURNSTILE_SECRET_KEY?: string;
  TURNSTILE_HOSTNAMES?: string;
}

const MAX_BODY_BYTES = 12 * 1024;
const ALLOWED_TOPICS = new Set([
  "Feedback / Suggestion",
  "Technical Support",
  "Enterprise Solution",
  "Sponsorship & Partnership"
]);

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff"
    }
  });

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char] || char);

async function readBoundedBody(request: Request): Promise<string> {
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > MAX_BODY_BYTES) {
    throw new Error("BODY_TOO_LARGE");
  }

  if (!request.body) return "";

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new Error("BODY_TOO_LARGE");
      }

      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder().decode(body);
}

export async function onRequestPost(context: {
  request: Request;
  env: ContactEnv;
}): Promise<Response> {
  const { request, env } = context;

  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const origin = request.headers.get("Origin");
  if (origin) {
    try {
      if (new URL(origin).origin !== new URL(request.url).origin) {
        return json({ error: "Forbidden" }, 403);
      }
    } catch {
      return json({ error: "Forbidden" }, 403);
    }
  }

  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get("content-type") || "")) {
    return json({ error: "Unsupported content type" }, 415);
  }

  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) {
    return json({ error: "Email service is not configured" }, 503);
  }

  let data: Record<string, unknown>;
  try {
    data = JSON.parse(await readBoundedBody(request)) as Record<string, unknown>;
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return json({ error: "Invalid request" }, 400);
    }
  } catch (error) {
    if (error instanceof Error && error.message === "BODY_TOO_LARGE") {
      return json({ error: "Request body is too large" }, 413);
    }
    return json({ error: "Invalid request" }, 400);
  }

  // Honeypot: silently accept automated submissions without sending email.
  if (typeof data.company === "string" && data.company.trim()) {
    return json({ ok: true });
  }


  // Enforce Turnstile whenever the server-side secret is configured.
  // Hostnames are environment-specific; never include local hosts in production.
  if (env.TURNSTILE_SECRET_KEY) {
    const turnstileToken = typeof data.turnstileToken === "string" ? data.turnstileToken : "";
    const expectedHostnames = new Set(
      (env.TURNSTILE_HOSTNAMES || "")
        .split(",")
        .map((hostname) => hostname.trim())
        .filter(Boolean)
    );
    if (
      !turnstileToken ||
      turnstileToken.length > 2048 ||
      expectedHostnames.size === 0 ||
      !expectedHostnames.has(new URL(request.url).hostname)
    ) {
      return json({ error: "Security verification failed" }, 403);
    }

    try {
      const verificationBody = new URLSearchParams();
      verificationBody.set("secret", env.TURNSTILE_SECRET_KEY);
      verificationBody.set("response", turnstileToken);
      const clientIp = request.headers.get("CF-Connecting-IP");
      if (clientIp) verificationBody.set("remoteip", clientIp);

      const verificationResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: verificationBody,
          signal: AbortSignal.timeout(10_000)
        }
      );
      if (!verificationResponse.ok) {
        return json({ error: "Security verification unavailable" }, 503);
      }

      const verificationResult = await verificationResponse.json() as {
        success?: boolean;
        hostname?: string;
        action?: string;
      };
      if (
        verificationResult.success !== true ||
        verificationResult.action !== "contact" ||
        !expectedHostnames.has(verificationResult.hostname || "")
      ) {
        return json({ error: "Security verification failed" }, 403);
      }
    } catch {
      return json({ error: "Security verification unavailable" }, 503);
    }
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  // Remove control characters so untrusted input cannot create multiline email subjects.
  const topic = typeof data.topic === "string"
    ? data.topic.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim()
    : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (
    !name || name.length > 100 ||
    !email || email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !topic || topic.length > 100 || !ALLOWED_TOPICS.has(topic) ||
    !message || message.length > 5000
  ) {
    return json({ error: "Please check the submitted fields" }, 400);
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeTopic = escapeHtml(topic);
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br>");

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_EMAIL,
        to: ["support@getqrgenius.com"],
        reply_to: email,
        subject: `QR Genius contact: ${topic}`,
        html: `<h2>New QR Genius contact message</h2><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Topic:</strong> ${safeTopic}</p><p><strong>Message:</strong><br>${safeMessage}</p>`,
        text: `New QR Genius contact message\nName: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`
      })
    });

    if (!resendResponse.ok) {
      return json({ error: "Email provider rejected the request" }, 502);
    }

    return json({ ok: true });
  } catch {
    return json({ error: "Email service unavailable" }, 502);
  }
}
