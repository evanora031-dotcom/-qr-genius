import assert from "node:assert/strict";
import { test } from "node:test";
import { onRequestPost } from "../functions/api/contact";

const env = {
  RESEND_API_KEY: "test-key",
  RESEND_FROM_EMAIL: "test@mail.getqrgenius.com",
  TURNSTILE_SECRET_KEY: "test-secret",
  TURNSTILE_HOSTNAMES: "getqrgenius.com,www.getqrgenius.com,feat-contact-turnstile-produ.qr-genius-1on.pages.dev"
};

const validMessage = {
  name: "Test User",
  email: "test@example.com",
  topic: "Feedback / Suggestion",
  message: "This is a test message",
  turnstileToken: "test-token"
};

function makeRequest(
  body: string,
  headers: Record<string, string> = {},
  url = "https://getqrgenius.com/api/contact"
): Request {
  return new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: new URL(url).origin,
      ...headers
    },
    body
  });
}

async function submit(
  body: string,
  headers: Record<string, string> = {},
  config: typeof env = env,
  url?: string
) {
  return onRequestPost({ request: makeRequest(body, headers, url), env: config });
}

const verified = (hostname = "getqrgenius.com", action = "contact") =>
  new Response(JSON.stringify({ success: true, hostname, action }), { status: 200 });

test("rejects oversized bodies before verification", async () => {
  const response = await submit(JSON.stringify({ ...validMessage, message: "a".repeat(33000) }));
  assert.equal(response.status, 413);
});

test("rejects malformed JSON and non-object JSON", async () => {
  assert.equal((await submit("{")).status, 400);
  assert.equal((await submit("null")).status, 400);
  assert.equal((await submit("[]")).status, 400);
});

test("rejects incorrect content types and cross-origin requests", async () => {
  assert.equal((await submit("{}", { "Content-Type": "text/plain; application/json" })).status, 415);
  assert.equal((await submit("{}", { Origin: "https://attacker.example" })).status, 403);
});

test("fails closed when Turnstile secret or hostname allowlist is missing", async () => {
  const withoutSecret = { ...env, TURNSTILE_SECRET_KEY: "" };
  const withoutHosts = { ...env, TURNSTILE_HOSTNAMES: "" };
  assert.equal((await submit(JSON.stringify(validMessage), {}, withoutSecret)).status, 503);
  assert.equal((await submit(JSON.stringify(validMessage), {}, withoutHosts)).status, 503);
});

test("rejects missing tokens and unapproved request hostnames", async () => {
  assert.equal((await submit(JSON.stringify({ ...validMessage, turnstileToken: "" }))).status, 403);
  const wrongHost = "https://attacker.example/api/contact";
  assert.equal((await submit(JSON.stringify(validMessage), {}, env, wrongHost)).status, 403);
});

test("rejects unsuccessful Turnstile verification", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({ success: false }), { status: 200 });
  try {
    assert.equal((await submit(JSON.stringify(validMessage))).status, 403);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("rejects mismatched hostname, action, and preview test hostname on production", async () => {
  const originalFetch = globalThis.fetch;
  try {
    for (const response of [
      verified("attacker.example"),
      verified("getqrgenius.com", "login"),
      verified("example.com", "contact")
    ]) {
      globalThis.fetch = async () => response;
      assert.equal((await submit(JSON.stringify(validMessage))).status, 403);
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("returns service unavailable if Turnstile cannot be reached", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("", { status: 503 });
  try {
    assert.equal((await submit(JSON.stringify(validMessage))).status, 503);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("rejects unknown topics after verification", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => verified();
  try {
    assert.equal((await submit(JSON.stringify({ ...validMessage, topic: "Other topic" }))).status, 400);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("honeypot cannot bypass verification or send mail", async () => {
  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async (input) => {
    assert.equal(String(input), "https://challenges.cloudflare.com/turnstile/v0/siteverify");
    calls++;
    return verified();
  };
  try {
    assert.equal((await submit(JSON.stringify({ ...validMessage, company: "bot", turnstileToken: "" }))).status, 403);
    const response = await submit(JSON.stringify({ ...validMessage, company: "bot" }));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(calls, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("sends valid verified message with sanitized subject", async () => {
  const originalFetch = globalThis.fetch;
  let sent: Record<string, unknown> = {};
  let verificationCalls = 0;
  globalThis.fetch = async (input, init) => {
    if (String(input) === "https://challenges.cloudflare.com/turnstile/v0/siteverify") {
      verificationCalls++;
      assert.match(String(init?.body), /response=test-token/);
      return verified();
    }
    assert.equal(String(input), "https://api.resend.com/emails");
    sent = JSON.parse(String(init?.body)) as Record<string, unknown>;
    return new Response(JSON.stringify({ id: "test-email" }), { status: 200 });
  };
  try {
    const response = await submit(JSON.stringify({
      ...validMessage,
      topic: "Feedback / Suggestion\r\n"
    }));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(verificationCalls, 1);
    assert.equal(sent.subject, "QR Genius contact: Feedback / Suggestion");
    assert.deepEqual(sent.to, ["support@getqrgenius.com"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("permits official test token response only on Pages preview", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(
    JSON.stringify({ success: true, hostname: "example.com" }),
    { status: 200 }
  );
  try {
    const response = await submit(
      JSON.stringify({ ...validMessage, company: "bot" }),
      {},
      env,
      "https://feat-contact-turnstile-produ.qr-genius-1on.pages.dev/api/contact"
    );
    assert.equal(response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
