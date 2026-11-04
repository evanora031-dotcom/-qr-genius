interface ContactEnv {
  RESEND_API_KEY: string;
  RESEND_FROM_EMAIL: string;
}

const MAX_BODY_BYTES = 12 * 1024;

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
    !topic || topic.length > 100 ||
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
