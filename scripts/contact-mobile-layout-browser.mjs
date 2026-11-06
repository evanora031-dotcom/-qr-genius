import { chromium } from 'playwright';

const previewUrl = 'https://fix-mobile-contact-form-firs.qr-genius-1on.pages.dev/contact';
const browser = await chromium.launch({ headless: true });
try {
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  let loaded = false;
  for (let attempt = 0; attempt < 18; attempt++) {
    try {
      const response = await mobile.goto(previewUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await mobile.getByRole('heading', { name: 'Contact QR GENIUS' }).waitFor({ timeout: 7000 });
      if (response?.ok()) { loaded = true; break; }
    } catch {
      // Wait for Cloudflare preview to finish deploying the PR commit.
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
  if (!loaded) throw new Error('Cloudflare preview was not available for mobile verification');

  const mobileForm = await mobile.locator('form').boundingBox();
  const mobileSupport = await mobile.getByRole('heading', { name: 'We Love Hearing From You' }).boundingBox();
  if (!mobileForm || !mobileSupport || mobileForm.y >= mobileSupport.y) {
    throw new Error('Mobile contact form must appear above support information');
  }
  const scrollWidth = await mobile.evaluate(() => document.documentElement.scrollWidth);
  if (scrollWidth > 392) throw new Error(`Mobile horizontal overflow: ${scrollWidth}px`);
  const submit = await mobile.getByRole('button', { name: 'Send Message' }).boundingBox();
  if (!submit || submit.height < 44) throw new Error('Mobile submit button tap target is too small');
  console.log('PASS: Mobile form precedes support information, with no horizontal overflow and a 44px tap target.');

  const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await desktop.goto(previewUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await desktop.getByRole('heading', { name: 'Contact QR GENIUS' }).waitFor();
  const desktopForm = await desktop.locator('form').boundingBox();
  const desktopSupport = await desktop.getByRole('heading', { name: 'We Love Hearing From You' }).boundingBox();
  if (!desktopForm || !desktopSupport || desktopSupport.x >= desktopForm.x || Math.abs(desktopSupport.y - desktopForm.y) > 40) {
    throw new Error('Desktop must retain the support-left, form-right two-column layout');
  }
  console.log('PASS: Desktop retains its original side-by-side support and form layout.');
} finally {
  await browser.close();
}
