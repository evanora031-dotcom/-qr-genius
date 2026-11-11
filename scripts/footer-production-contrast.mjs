import { chromium } from 'playwright';

const base = (process.env.BASE_URL || 'https://getqrgenius.com').replace(/\/$/, '');
const browser = await chromium.launch({ headless: true });
const luminance = (rgb) => {
  const channels = rgb.match(/[\d.]+/g)?.slice(0, 3).map((v) => {
    const c = Number(v) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  if (!channels || channels.length !== 3) throw new Error('Unexpected color: ' + rgb);
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
};
try {
  for (const route of ['/', '/ar/', '/fr/', '/es/']) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
    try {
      const response = await page.goto(base + route, { waitUntil: 'networkidle', timeout: 30000 });
      if (!response?.ok()) throw new Error(route + ': HTTP ' + response?.status());
      const colors = await page.locator('footer .pt-8').first().evaluate((element) => ({
        foreground: getComputedStyle(element).color,
        background: getComputedStyle(element.closest('footer')).backgroundColor,
      }));
      const a = luminance(colors.foreground), b = luminance(colors.background);
      const contrast = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      console.log(JSON.stringify({ route, ...colors, contrast: Number(contrast.toFixed(2)) }));
      if (contrast < 4.5) throw new Error(route + ': footer contrast below 4.5:1');
    } finally { await page.close(); }
  }
} finally { await browser.close(); }
