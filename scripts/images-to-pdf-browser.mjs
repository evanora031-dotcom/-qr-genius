import { chromium } from 'playwright';

const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ acceptDownloads: true });
  page.on('pageerror', error => console.error('PAGE ERROR', error.message));
  for (const [path, heading] of [
    ['/tools/images-to-pdf', 'Convert Images to PDF Free'],
    ['/ar/tools/images-to-pdf', 'تحويل الصور إلى PDF مجاناً'],
    ['/fr/tools/images-to-pdf', 'Convertir des images en PDF gratuitement'],
    ['/es/tools/images-to-pdf', 'Convertir imágenes a PDF gratis']
  ]) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.getByRole('heading', { name: heading, exact: true }).first().waitFor();
  }
  await page.goto(base + '/tools/images-to-pdf', { waitUntil: 'networkidle' });
  const png = await page.evaluate(async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 300;
    canvas.getContext('2d').fillRect(0, 0, 200, 300);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    return Array.from(new Uint8Array(await blob.arrayBuffer()));
  });
  await page.locator('#pdf-images').setInputFiles({ name: 'sample.png', mimeType: 'image/png', buffer: Buffer.from(png) });
  await page.getByRole('button', { name: 'Create PDF' }).click();
  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 30000 }),
    page.getByRole('link', { name: 'Download PDF' }).click()
  ]);
  const chunks = [];
  for await (const chunk of await download.createReadStream()) chunks.push(chunk);
  const data = Buffer.concat(chunks);
  if (data.toString('ascii', 0, 5) !== '%PDF-') throw new Error('Downloaded file is not PDF');
  console.log('PASS images to PDF browser download', { bytes: data.length });
} finally { await browser.close(); }
