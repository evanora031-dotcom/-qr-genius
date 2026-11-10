import { chromium } from 'playwright';

const base = process.env.PREVIEW_URL || 'https://getqrgenius.com';
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, acceptDownloads: true });
  page.on('pageerror', error => console.error('PAGE ERROR:', error.message));
  const response = await page.goto(base + '/tools/image-compressor', { waitUntil: 'networkidle' });
  console.log('PAGE', response?.status(), page.url(), 'TITLE', await page.title());
  console.log('HEADINGS', await page.locator('h1').allTextContents());
  console.log('APP', (await page.locator('#root').innerText()).slice(0, 1000));
  await page.getByRole('heading', { name: 'Free Online Image Compressor' }).waitFor({ timeout: 15000 });
  const image = await page.evaluate(async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#3344aa';
    ctx.fillRect(0, 0, 500, 300);
    return [...new Uint8Array(await (await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))).arrayBuffer())];
  });
  await page.locator('#image-file').setInputFiles({ name: 'sample.png', mimeType: 'image/png', buffer: Buffer.from(image) });
  await page.getByRole('button', { name: 'Compress image' }).click();
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('link', { name: 'Download compressed image' }).click()
  ]);
  if (!download.suggestedFilename().endsWith('.webp')) throw new Error('Wrong download extension');
  const stream = await download.createReadStream();
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  const bytes = Buffer.concat(chunks);
  if (bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WEBP') throw new Error('Invalid WebP signature');
  console.log('PASS image compressor real WebP download', { bytes: bytes.length });
} finally {
  await browser.close();
}
