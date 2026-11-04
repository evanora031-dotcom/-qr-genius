import { chromium } from 'playwright';

const baseUrl = process.env.PREVIEW_URL || 'https://feature-site-redesign.qr-genius-1on.pages.dev';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
let submittedPayload;

page.on('request', async (request) => {
  if (request.url().endsWith('/api/contact') && request.method() === 'POST') {
    try { submittedPayload = request.postDataJSON(); } catch {}
  }
});

try {
  const response = await page.goto(`${baseUrl}/contact`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  if (!response?.ok()) throw new Error(`Contact page failed to load: HTTP ${response?.status()}`);

  await page.locator('input[autocomplete="name"]').fill('Turnstile E2E Test');
  await page.locator('input[autocomplete="email"]').fill('turnstile-e2e@example.com');
  await page.locator('textarea').fill('Automated verification test. No real email should be sent.');

  const submit = page.getByRole('button', { name: /send message/i });
  await submit.waitFor({ state: 'visible' });
  await page.waitForFunction(() => {
    const button = [...document.querySelectorAll('button')].find((el) => /send message/i.test(el.textContent || ''));
    return Boolean(button && !button.disabled);
  }, { timeout: 90000 });

  const firstResponsePromise = page.waitForResponse(
    (r) => r.url().endsWith('/api/contact') && r.request().method() === 'POST',
    { timeout: 30000 }
  );
  await submit.click();
  const firstResponse = await firstResponsePromise;

  if (firstResponse.status() !== 502) {
    const body = await firstResponse.text();
    throw new Error(`Expected 502 from deliberately invalid Preview email provider after successful Turnstile, got ${firstResponse.status()}: ${body}`);
  }
  if (!submittedPayload?.turnstileToken) {
    throw new Error('The browser did not submit a Turnstile token.');
  }

  const replay = await page.evaluate(async (payload) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return { status: response.status, body: await response.text() };
  }, submittedPayload);

  if (replay.status !== 403 || !replay.body.includes('Security verification failed')) {
    throw new Error(`Expected replayed token to be rejected with 403, got ${replay.status}: ${replay.body}`);
  }

  console.log('PASS: real browser obtained a Turnstile token and API accepted it through Siteverify.');
  console.log('PASS: replaying the same token was rejected with 403.');
  console.log('PASS: preview email provider was reached only after successful verification; no real email was sent.');
} finally {
  await browser.close();
}
