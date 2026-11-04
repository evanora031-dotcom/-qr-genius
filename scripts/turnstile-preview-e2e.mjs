import { chromium } from 'playwright';

const baseUrl = process.env.PREVIEW_URL || 'https://feature-site-redesign.qr-genius-1on.pages.dev';
const testSiteKey = '1x00000000000000000000AA';
const testToken = 'XXXX.DUMMY.TOKEN.XXXX';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
let submittedPayload;
let widgetConfig;

try {
  // Keep this browser test deterministic: exercise the app's Turnstile render
  // and callback wiring without depending on Cloudflare's bot-sensitive iframe.
  // The official Cloudflare test secret on Preview accepts this official test token.
  await page.addInitScript(({ siteKey, token }) => {
    window.turnstile = {
      render: (container, options) => {
        window.__turnstileTestConfig = { sitekey: options.sitekey, action: options.action };
        const marker = document.createElement('div');
        marker.id = 'turnstile-test-widget';
        marker.textContent = 'Turnstile test widget';
        container.appendChild(marker);
        queueMicrotask(() => options.callback(token));
        return 'turnstile-test-widget-id';
      },
      remove: () => {},
      reset: () => {}
    };
  }, { siteKey: testSiteKey, token: testToken });

  page.on('request', (request) => {
    if (request.url().endsWith('/api/contact') && request.method() === 'POST') {
      try { submittedPayload = request.postDataJSON(); } catch {}
    }
  });

  const response = await page.goto(`${baseUrl}/contact`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  if (!response?.ok()) throw new Error(`Contact page failed to load: HTTP ${response?.status()}`);

  await page.locator('input[autocomplete="name"]').fill('Turnstile E2E Test');
  await page.locator('input[autocomplete="email"]').fill('turnstile-e2e@example.com');
  await page.locator('textarea').fill('Automated verification test. No real email should be sent.');

  await page.locator('#turnstile-test-widget').waitFor({ state: 'attached', timeout: 15000 });
  await page.waitForFunction(() => {
    const button = [...document.querySelectorAll('button')].find((el) => /send message/i.test(el.textContent || ''));
    return Boolean(button && !button.disabled);
  }, { timeout: 15000 });

  widgetConfig = await page.evaluate(() => window.__turnstileTestConfig);
  if (widgetConfig?.sitekey !== testSiteKey || widgetConfig?.action !== 'contact') {
    throw new Error(`Unexpected Turnstile configuration: ${JSON.stringify(widgetConfig)}`);
  }

  const responsePromise = page.waitForResponse(
    (r) => r.url().endsWith('/api/contact') && r.request().method() === 'POST',
    { timeout: 30000 }
  );
  await page.locator('form').evaluate((form) => form.requestSubmit());
  const apiResponse = await responsePromise;

  if (submittedPayload?.turnstileToken !== testToken) {
    throw new Error('The browser did not submit the official Cloudflare test token.');
  }
  if (apiResponse.status() !== 502) {
    const body = await apiResponse.text();
    throw new Error(`Expected 502 from the deliberately invalid Preview email provider after Siteverify, got ${apiResponse.status()}: ${body}`);
  }

  console.log('PASS: Contact page rendered the Turnstile integration with action=contact.');
  console.log('PASS: Turnstile callback token was included in the browser form submission.');
  console.log('PASS: Preview API accepted the official Cloudflare test token and advanced to the deliberately invalid email provider (502).');
  console.log('NOTE: this deterministic test stubs the browser widget API and uses Cloudflare official test credentials; it does not validate the live production widget or token replay.');
  console.log('PASS: no real email was sent.');
} finally {
  await browser.close();
}
