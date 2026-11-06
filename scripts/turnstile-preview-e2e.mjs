import { chromium } from 'playwright';

const baseUrl = process.env.PREVIEW_URL || 'https://feature-site-redesign.qr-genius-1on.pages.dev';
const testSiteKey = '1x00000000000000000000AA';
const testToken = 'XXXX.DUMMY.TOKEN.XXXX';

// Fail with a useful diagnostic instead of letting the GitHub job consume its
// entire 15-minute allowance if Chromium or a remote request becomes stuck.
const watchdog = setTimeout(() => {
  console.error('FAIL: browser verification exceeded the 120-second overall limit.');
  process.exit(1);
}, 120_000);
watchdog.unref();

let browser;
try {
  console.log(`Starting Turnstile browser check against ${baseUrl}/contact`);
  browser = await chromium.launch({ headless: true, timeout: 20_000 });
  const page = await browser.newPage();
  page.setDefaultTimeout(10_000);
  page.setDefaultNavigationTimeout(45_000);

  let submittedPayload;
  page.on('pageerror', (error) => console.error(`Browser page error: ${error.message}`));
  page.on('requestfailed', (request) => {
    console.error(`Request failed: ${request.method()} ${request.url()} — ${request.failure()?.errorText || 'unknown'}`);
  });
  page.on('request', (request) => {
    if (request.url().endsWith('/api/contact') && request.method() === 'POST') {
      try { submittedPayload = request.postDataJSON(); } catch {}
    }
  });

  // Stub only the browser widget API. The real Preview API still verifies the
  // official Cloudflare test token with its configured test secret.
  await page.addInitScript(({ token }) => {
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
  }, { token: testToken });

  console.log('Loading contact page...');
  const pageResponse = await page.goto(`${baseUrl}/contact`, { waitUntil: 'domcontentloaded' });
  if (!pageResponse?.ok()) throw new Error(`Contact page failed to load: HTTP ${pageResponse?.status()}`);

  console.log('Filling contact form and waiting for Turnstile callback...');
  await page.locator('input[autocomplete="name"]').fill('Turnstile E2E Test');
  await page.locator('input[autocomplete="email"]').fill('turnstile-e2e@example.com');
  await page.locator('textarea').fill('Automated verification test. No real email should be sent.');
  await page.locator('#turnstile-test-widget').waitFor({ state: 'attached' });
  await page.waitForFunction(() => {
    const button = [...document.querySelectorAll('button')].find((el) => /send message/i.test(el.textContent || ''));
    return Boolean(button && !button.disabled);
  }, null, { timeout: 10_000 });

  const widgetConfig = await page.evaluate(() => window.__turnstileTestConfig);
  if (widgetConfig?.sitekey !== testSiteKey || widgetConfig?.action !== 'contact') {
    throw new Error(`Unexpected Turnstile configuration: ${JSON.stringify(widgetConfig)}`);
  }

  console.log('Submitting form and checking the Preview API response...');
  const responsePromise = page.waitForResponse(
    (response) => response.url().endsWith('/api/contact') && response.request().method() === 'POST',
    { timeout: 20_000 }
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

  console.log('PASS: Contact page rendered Turnstile with action=contact.');
  console.log('PASS: Turnstile callback token was included in the browser form submission.');
  console.log('PASS: Preview API accepted the official Cloudflare test token and advanced to the deliberately invalid email provider (502).');
  console.log('NOTE: this deterministic test stubs the browser widget API; it does not validate the live production widget or token replay.');
  console.log('PASS: no real email was sent.');
} finally {
  clearTimeout(watchdog);
  if (browser) await browser.close();
}
