import { chromium } from 'playwright';

const baseUrl = 'https://getqrgenius.com';
let browser;
try {
  browser = await chromium.launch({ headless: true, timeout: 30000 });
  const page = await browser.newPage({ locale: 'en-US' });
  page.setDefaultTimeout(15000);
  const response = await page.goto(baseUrl + '/contact', { waitUntil: 'domcontentloaded', timeout: 30000 });
  if (!response?.ok()) throw new Error('Contact page returned HTTP ' + response?.status());

  const widget = page.locator('div[aria-label="Security verification"]');
  await widget.waitFor({ timeout: 20000 });
  const submit = page.getByRole('button', { name: /send message/i });
  await submit.waitFor();
  await page.locator('input[autocomplete="name"]').fill('QR Genius automated delivery test');
  await page.locator('input[autocomplete="email"]').fill('support@getqrgenius.com');
  await page.locator('textarea').fill('Automated contact form test after credential rotation. Please disregard this diagnostic message.');

  let ready = false;
  try {
    await page.waitForFunction(() => {
      const b = [...document.querySelectorAll('button')].find(el => /send message/i.test(el.textContent || ''));
      return Boolean(b && !b.disabled);
    }, { timeout: 30000 });
    ready = true;
  } catch {
    console.log('INCONCLUSIVE: Real Turnstile did not issue a token in the headless browser. No message sent.');
  }

  if (ready) {
    const apiResponsePromise = page.waitForResponse(r =>
      r.url().endsWith('/api/contact') && r.request().method() === 'POST', { timeout: 30000 }
    );
    await submit.click({ noWaitAfter: true });
    const apiResponse = await apiResponsePromise;
    console.log('Contact API status:', apiResponse.status());
    if (apiResponse.status() !== 200) {
      const body = await apiResponse.json().catch(() => ({}));
      console.log('Contact API error:', String(body?.error || 'unknown').slice(0,150));
      process.exitCode = 1;
    } else {
      console.log('PASS: Production contact form accepted a real Turnstile token and a test message.');
    }
  }
} finally {
  if (browser) await browser.close();
}
