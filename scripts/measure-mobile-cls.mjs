// Run after building a local preview or against a deployed URL:
// BASE_URL=https://getqrgenius.com node scripts/measure-mobile-cls.mjs
// Requires Playwright/Chromium in the test environment; this is a diagnostic, not Lighthouse.
import { chromium } from 'playwright';

const base = (process.env.BASE_URL || 'http://localhost:4173').replace(/\/$/, '');
const browser = await chromium.launch({ headless: true });
try {
  for (const route of ['/tools/wifi', '/tools/whatsapp']) {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    await page.addInitScript(() => {
      window.__layoutShifts = [];
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            window.__layoutShifts.push({
              value: entry.value,
              time: Math.round(entry.startTime),
              sources: (entry.sources || []).map((source) => ({
                node: source.node?.outerHTML?.slice(0, 180) || null,
                previousRect: source.previousRect,
                currentRect: source.currentRect,
              })),
            });
          }
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });
    try {
      const response = await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 30000 });
      if (!response?.ok()) throw new Error('HTTP status ' + response?.status());
      await page.locator('h1').first().waitFor({ timeout: 15000 });
      await page.waitForTimeout(5000);
      const result = await page.evaluate(() => {
        const shifts = window.__layoutShifts;
        let max = 0, session = 0, start = 0, last = 0;
        for (const shift of shifts) {
          if (!session || shift.time - last > 1000 || shift.time - start > 5000) {
            session = shift.value;
            start = shift.time;
          } else {
            session += shift.value;
          }
          last = shift.time;
          max = Math.max(max, session);
        }
        return { cls: Number(max.toFixed(4)), shifts };
      });
      console.log(JSON.stringify({ route, ...result }, null, 2));
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}
