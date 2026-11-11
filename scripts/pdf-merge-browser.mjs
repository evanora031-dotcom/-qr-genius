import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';

const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ acceptDownloads: true });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const [path, heading] of [
    ['/tools/merge-pdf', 'Merge PDF Files Free'],
    ['/ar/tools/merge-pdf', 'دمج ملفات PDF مجاناً'],
    ['/fr/tools/merge-pdf', 'Fusionner des PDF gratuitement'],
    ['/es/tools/merge-pdf', 'Unir archivos PDF gratis']
  ]) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.getByRole('heading', { name: heading, exact: true }).first().waitFor();
  }
  const makeFile = async (name, widths) => {
    const doc = await PDFDocument.create();
    for (const width of widths) doc.addPage([width, 400]);
    return { name, mimeType: 'application/pdf', buffer: Buffer.from(await doc.save()) };
  };
  await page.goto(base + '/tools/merge-pdf', { waitUntil: 'networkidle' });
  await page.locator('#pdf-merge-files').setInputFiles([
    await makeFile('first.pdf', [210, 220]),
    await makeFile('second.pdf', [310])
  ]);
  await page.getByRole('button', { name: 'Merge PDFs' }).click();
  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 30000 }),
    page.getByRole('link', { name: 'Download merged PDF' }).click()
  ]);
  const chunks = [];
  for await (const chunk of await download.createReadStream()) chunks.push(chunk);
  const merged = await PDFDocument.load(Buffer.concat(chunks));
  const widths = merged.getPages().map(page => page.getWidth());
  if (JSON.stringify(widths) !== JSON.stringify([210, 220, 310])) {
    throw new Error('Incorrect merged PDF page order: ' + widths.join(','));
  }
  if (errors.length) throw new Error('Browser errors: ' + errors.join('; '));
  console.log('PASS PDF merge browser test: 3 pages, original order preserved');
} finally { await browser.close(); }
