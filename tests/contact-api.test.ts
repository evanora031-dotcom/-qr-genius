import assert from "node:assert/strict";
import { test } from "node:test";
import { onRequestPost } from "../functions/api/contact";

const env = {
  RESEND_API_KEY: "test-key",
  RESEND_FROM_EMAIL: "test@mail.getqrgenius.com"
};

const validMessage = {
  name: "Test User",
  email: "test@example.com",
  topic: "Feedback / Suggestion",
  message: "This is a test message"
};

function makeRequest(body: string, headers: Record<string, string> = {}): Request {
  return new Request("https://getqrgenius.com/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://getqrgenius.com",
      ...headers
    },
    body
  });
}

async function submit(body: string, headers: Record<string, string> = {}) {
  return onRequestPost({ request: makeRequest(body, headers), env });
}

test("rejects oversized bodies without contacting email provider", async () => {
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

test("rejects unknown topics", async () => {
  assert.equal((await submit(JSON.stringify({ ...validMessage, topic: "Other topic" }))).status, 400);
});

test("silently accepts honeypot submissions without sending", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error("Must not send"); };
  try {
    const response = await submit(JSON.stringify({ ...validMessage, company: "bot" }));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("sends a valid message with a sanitized email subject", async () => {
  const originalFetch = globalThis.fetch;
  let sent: Record<string, unknown> = {};
  globalThis.fetch = async (input, init) => {
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
    assert.equal(sent?.subject, "QR Genius contact: Feedback / Suggestion");
    assert.deepEqual(sent?.to, ["support@getqrgenius.com"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
