import { chromium } from 'playwright';

const base = 'https://improve-qr-color-contrast-wa.qr-genius-1on.pages.dev';
const browser = await chromium.launch({ headless: true });
try {
  for (const viewport of [{ width: 390, height: 844 }, { width: 1280, height: 900 }]) {
    const page = await browser.newPage({ viewport });
    let ready = false;
    for (let attempt = 0; attempt < 18; attempt++) {
      try {
        const response = await page.goto(base + '/generator', { waitUntil: 'domcontentloaded', timeout: 15000 });
        await page.locator('input[type="color"]').first().waitFor({ timeout: 8000 });
        if (response?.ok()) { ready = true; break; }
      } catch { /* preview deployment may still be propagating */ }
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    if (!ready) throw new Error('Preview generator unavailable');
    const foreground = page.locator('input[type="color"]').first();
    await foreground.fill('#eeeeee');
    await page.getByRole('status').filter({ hasText: 'Low contrast:' }).waitFor({ timeout: 8000 });
    await foreground.fill('#111111');
    await page.getByRole('status').filter({ hasText: 'Low contrast:' }).waitFor({ state: 'hidden', timeout: 8000 });
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    if (viewport.width === 390 && width > 392) throw new Error('Horizontal overflow on mobile: ' + width);
    console.log('PASS: contrast warning appears and clears at ' + viewport.width + 'px');
    await page.close();
  }
} finally {
  await browser.close();
}
