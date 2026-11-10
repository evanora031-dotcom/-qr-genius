import { chromium } from 'playwright';

const base = 'https://perf-lazy-load-qr-pages.qr-genius-1on.pages.dev';
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  for (const route of ['/', '/generator', '/tools/wifi', '/ar/tools/wifi']) {
    let ready = false;
    for (let attempt = 0; attempt < 24; attempt++) {
      try {
        const response = await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 15000 });
        if (response?.ok()) { ready = true; break; }
      } catch { /* Cloudflare preview may still be propagating */ }
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    if (!ready) throw new Error('Preview unavailable: ' + route);
    await page.locator('#root').waitFor();
    if (route === '/generator') {
      await page.locator('canvas').first().waitFor({ timeout: 15000 });
    } else if (route.includes('/tools/')) {
      await page.locator('h1').first().waitFor({ timeout: 15000 });
      await page.locator('button[title*="PDF"], button[title*="pdf"]').first().waitFor({ timeout: 15000 });
    }
    if (new URL(page.url()).pathname !== route) throw new Error('Route changed unexpectedly: ' + route + ' => ' + page.url());
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    if (width > 392) throw new Error('Mobile horizontal overflow on ' + route + ': ' + width);
    console.log('PASS: lazy route rendered: ' + route);
  }
} finally {
  await browser.close();
}
