import { chromium } from 'playwright';

const base = 'https://perf-lazy-load-pdf-export.qr-genius-1on.pages.dev';
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ acceptDownloads: true });
  let ready = false;
  for (let attempt = 0; attempt < 24; attempt++) {
    try {
      const response = await page.goto(base + '/generator', { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.getByRole('button', { name: 'Print PDF' }).waitFor({ timeout: 8000 });
      if (response?.ok()) { ready = true; break; }
    } catch { /* Preview deployment can still be propagating */ }
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
  if (!ready) throw new Error('PDF preview generator unavailable');
  const pdfButton = page.getByRole('button', { name: 'Print PDF' });
  if (await pdfButton.isDisabled()) throw new Error('PDF export disabled on default generator');
  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 30000 }),
    pdfButton.click()
  ]);
  if (!download.suggestedFilename().endsWith('.pdf')) throw new Error('Wrong PDF filename: ' + download.suggestedFilename());
  const stream = await download.createReadStream();
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  const bytes = Buffer.concat(chunks);
  if (bytes.subarray(0, 5).toString() !== '%PDF-') throw new Error('Downloaded file lacks PDF signature');
  if (bytes.length < 2000) throw new Error('Downloaded PDF unexpectedly small: ' + bytes.length);
  console.log('PASS: real PDF download in Chromium (' + bytes.length + ' bytes)');
} finally {
  await browser.close();
}
