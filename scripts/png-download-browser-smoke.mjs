// Run with: node scripts/png-download-browser-smoke.mjs
// Requires Playwright and an installed Chromium browser; does not modify production.
import { chromium } from 'playwright';

const base = process.env.QR_TEST_BASE_URL || 'https://getqrgenius.com';
const browser = await chromium.launch({ headless: true });
try {
  for (const viewport of [{ width: 1280, height: 800 }, { width: 390, height: 844 }]) {
    const context = await browser.newContext({ viewport, acceptDownloads: true });
    try {
      const page = await context.newPage();
      const response = await page.goto(new URL('/generator', base).href, { waitUntil: 'domcontentloaded' });
      if (!response?.ok()) throw new Error('Generator page did not load');
      const png = page.getByRole('button', { name: /download png|png/i }).first();
      await png.waitFor({ timeout: 20000 });
      await page.locator('canvas').first().waitFor({ timeout: 20000 });
      await png.waitFor({ state: 'visible' });
      await page.waitForFunction(() => {
        const buttons = [...document.querySelectorAll('button')];
        return buttons.some(b => /png/i.test(b.textContent || '') && !b.disabled);
      }, { timeout: 20000 });
      const [download] = await Promise.all([
        page.waitForEvent('download', { timeout: 30000 }),
        png.click()
      ]);
      if (!/\.png$/i.test(download.suggestedFilename())) throw new Error('Expected PNG filename');
      const stream = await download.createReadStream();
      const chunks = [];
      for await (const chunk of stream) chunks.push(chunk);
      const bytes = Buffer.concat(chunks);
      if (!bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
        throw new Error('Invalid PNG signature');
      }
      if (bytes.length < 100) throw new Error('Downloaded PNG is unexpectedly small');
      console.log('PASS: PNG downloaded (' + viewport.width + 'px viewport, ' + bytes.length + ' bytes)');
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}
