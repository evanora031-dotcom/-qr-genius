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
  // Submit through the native form API so the test exercises React's onSubmit
  // handler without depending on a mobile-style click target or overlay geometry.
  await page.locator('form').evaluate((form) => form.requestSubmit());
  const firstResponse = await firstResponsePromise;

  if (firstResponse.status() !== 502) {
    const body = await firstResponse.text();
    throw new Error(`Expected 502 from deliberately invalid Preview email provider after successful Turnstile, got ${firstResponse.status()}: ${body}`);
  }
  if (!submittedPayload?.turnstileToken) {
    throw new Error('The browser did not submit a Turnstile token.');
  }

  if (submittedPayload.turnstileToken !== 'XXXX.DUMMY.TOKEN.XXXX') {
    throw new Error('Expected Cloudflare official test token from the Preview test sitekey.');
  }

  /* Replay semantics are covered by Cloudflare Siteverify single-use guarantees;
     the official always-pass test secret is intentionally deterministic and does
     not model production token consumption. */


  console.log('PASS: browser rendered Cloudflare Turnstile and obtained the official dummy test token.');
  console.log('PASS: API accepted the test token through Siteverify and advanced to the deliberately invalid Preview email provider (502).');
  console.log('NOTE: this CI test uses Cloudflare test credentials; production token single-use behavior is guaranteed by Siteverify and is not simulated by the always-pass test secret.');
  console.log('PASS: no real email was sent.');
} finally {
  await browser.close();
}
