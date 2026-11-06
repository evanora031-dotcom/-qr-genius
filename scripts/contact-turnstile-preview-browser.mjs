import { chromium } from 'playwright';

const baseUrl = process.env.PREVIEW_URL || 'https://feat-contact-turnstile-produ.qr-genius-1on.pages.dev';
const expectedSiteKey = '1x00000000000000000000AA';
const dummyToken = 'XXXX.DUMMY.TOKEN.XXXX';

let browser;
try {
  browser = await chromium.launch({ headless: true, timeout: 20000 });
  const page = await browser.newPage();
  page.setDefaultTimeout(15000);
  let submittedPayload;
  await page.addInitScript(({ token }) => {
    window.turnstile = {
      render: (container, options) => {
        window.__turnstileTestConfig = { sitekey: options.sitekey, action: options.action };
        const marker = document.createElement('div');
        marker.id = 'turnstile-test-widget';
        marker.textContent = 'Preview test widget';
        container.appendChild(marker);
        queueMicrotask(() => options.callback(token));
        return 'test-widget-id';
      },
      remove: () => {},
      reset: () => {}
    };
  }, { token: dummyToken });

  page.on('request', (request) => {
    if (request.url().endsWith('/api/contact') && request.method() === 'POST') {
      submittedPayload = request.postDataJSON();
    }
  });

  const response = await page.goto(`${baseUrl}/contact`, { waitUntil: 'domcontentloaded' });
  if (!response?.ok()) throw new Error(`Preview contact page HTTP ${response?.status()}`);

  await page.locator('#turnstile-test-widget').waitFor();
  const config = await page.evaluate(() => window.__turnstileTestConfig);
  if (config?.sitekey !== expectedSiteKey || config?.action !== 'contact') {
    throw new Error(`Incorrect Turnstile widget configuration: ${JSON.stringify(config)}`);
  }

  await page.locator('input[autocomplete="name"]').fill('Preview Smoke Test');
  await page.locator('input[autocomplete="email"]').fill('test@example.com');
  await page.locator('textarea').fill('Browser smoke test; no email should be sent.');

  // Honeypot prevents any email from being sent, even with a valid test token.
  await page.locator('input[name="company"]').evaluate((el) => { el.value = 'bot'; });
  const submit = page.getByRole('button', { name: /send message/i });
  await submit.waitFor();
  await page.waitForFunction(() => {
    const button = [...document.querySelectorAll('button')].find(el => /send message/i.test(el.textContent || ''));
    return Boolean(button && !button.disabled);
  });

  const apiResponsePromise = page.waitForResponse(r =>
    r.url().endsWith('/api/contact') && r.request().method() === 'POST'
  );
  await submit.click({ noWaitAfter: true });
  const apiResponse = await apiResponsePromise;
  if (submittedPayload?.turnstileToken !== dummyToken || submittedPayload?.company !== 'bot') {
    throw new Error('Missing Turnstile token or honeypot in submitted payload');
  }
  if (apiResponse.status() !== 200) {
    throw new Error(`Expected 200 for verified preview honeypot, got ${apiResponse.status()}`);
  }
  await page.getByText('Message Received!').waitFor();

  // The form must remain usable after a successful submission.
  await page.getByRole('button', { name: /send another message/i }).click();
  await page.locator('#turnstile-test-widget').waitFor();
  console.log('PASS: Turnstile widget configured, token submitted, no email sent, and form reinitialized.');
} finally {
  if (browser) await browser.close();
}
