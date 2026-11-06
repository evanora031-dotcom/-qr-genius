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

const json = (
  body: Record<string, unknown>,
  status = 200,
  extraHeaders: Record<string, string> = {}
) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders
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

  const requestHostname = new URL(request.url).hostname;
  const isPreviewHostname = requestHostname.endsWith(".pages.dev");
  const previewDiagnostic = (reason: string): Record<string, string> =>
    isPreviewHostname ? { "X-Preview-Diagnostic": reason } : {};

  const origin = request.headers.get("Origin");
  if (origin) {
    try {
      if (new URL(origin).origin !== new URL(request.url).origin) {
        return json({ error: "Forbidden" }, 403, previewDiagnostic("ORIGIN_MISMATCH"));
      }
    } catch {
      return json({ error: "Forbidden" }, 403, previewDiagnostic("ORIGIN_INVALID"));
    }
  }

  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get("content-type") || "")) {
    return json({ error: "Unsupported content type" }, 415);
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
      !expectedHostnames.has(requestHostname)
    ) {
      const reason = !turnstileToken
        ? "TURNSTILE_TOKEN_MISSING"
        : turnstileToken.length > 2048
          ? "TURNSTILE_TOKEN_TOO_LONG"
          : expectedHostnames.size === 0
            ? "TURNSTILE_HOST_ALLOWLIST_EMPTY"
            : "REQUEST_HOSTNAME_NOT_ALLOWED";
      return json(
        { error: "Security verification failed" },
        403,
        previewDiagnostic(reason)
      );
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
      // Cloudflare's official always-pass test secret may omit the action
      // field. Permit that omission only on Pages Preview; production still
      // requires the exact "contact" action.
      const validAction =
        verificationResult.action === "contact" ||
        (isPreviewHostname &&
          (verificationResult.action === "test" || !verificationResult.action));

      const returnedHostname = (verificationResult.hostname || "").toLowerCase();
      // Cloudflare's official test secret returns "example.com" regardless
      // of the Preview request hostname. Accept it only on Pages Preview.
      const hostnameAllowed =
        expectedHostnames.has(returnedHostname) ||
        (isPreviewHostname && returnedHostname === "example.com");
      if (
        verificationResult.success !== true ||
        !validAction ||
        !hostnameAllowed
      ) {
        // Expose non-sensitive diagnostics only on Pages Preview to identify
        // configuration mismatches without logging or returning tokens/secrets.
        if (isPreviewHostname) {
          const reason = verificationResult.success !== true
            ? "TURNSTILE_NOT_SUCCESS"
            : !validAction
              ? "TURNSTILE_ACTION_MISMATCH"
              : "TURNSTILE_HOSTNAME_MISMATCH";
          const safeHostname = (verificationResult.hostname || "")
            .toLowerCase()
            .replace(/[^a-z0-9.-]/g, "")
            .slice(0, 253);
          return json({
            error: "Security verification failed",
            diagnostic: {
              reason,
              returnedHostname: safeHostname || null,
              hostnameAllowed,
              returnedAction: verificationResult.action || null,
              actionAllowed: validAction,
              success: verificationResult.success === true
            }
          }, 403, previewDiagnostic(
            reason === "TURNSTILE_HOSTNAME_MISMATCH" && safeHostname
              ? `${reason}:${safeHostname}`
              : reason
          ));
        }
        return json({ error: "Security verification failed" }, 403);
      }
    } catch {
      return json({ error: "Security verification unavailable" }, 503);
    }
  }

  // Honeypot is evaluated only after Turnstile so it cannot bypass verification.
  if (typeof data.company === "string" && data.company.trim()) {
    return json({ ok: true });
  }

  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) {
    return json({ error: "Email service is not configured" }, 503);
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
