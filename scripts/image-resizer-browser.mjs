import { chromium } from 'playwright';
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, acceptDownloads: true });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  for (const [path, title] of [
    ['/tools/image-resizer', 'Resize Images Online Free'],
    ['/ar/tools/image-resizer', 'تغيير حجم الصور مجاناً'],
    ['/fr/tools/image-resizer', 'Redimensionner une image gratuitement'],
    ['/es/tools/image-resizer', 'Cambiar el tamaño de imágenes gratis']
  ]) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.getByRole('heading', { name: title, exact: true }).first().waitFor();
  }
  await page.goto(base + '/tools/image-resizer', { waitUntil: 'networkidle' });
  const bytes = await page.evaluate(async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 400; canvas.height = 200;
    canvas.getContext('2d').fillRect(0, 0, 400, 200);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    return [...new Uint8Array(await blob.arrayBuffer())];
  });
  await page.locator('#resize-file').setInputFiles({ name: 'sample.png', mimeType: 'image/png', buffer: Buffer.from(bytes) });
  await page.getByLabel('Width (px)').fill('200');
  if (await page.getByLabel('Height (px)').inputValue() !== '100') throw new Error('Aspect ratio lock failed');
  await page.getByRole('button', { name: 'Resize image' }).click();
  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 30000 }),
    page.getByRole('link', { name: 'Download resized image' }).click()
  ]);
  if (!download.suggestedFilename().endsWith('-200x100.png')) throw new Error('Unexpected filename');
  const chunks = [];
  for await (const chunk of await download.createReadStream()) chunks.push(chunk);
  const result = Buffer.concat(chunks);
  if (result.toString('hex', 0, 8) !== '89504e470d0a1a0a') throw new Error('Invalid PNG download');
  if (errors.length) throw new Error(errors.join('; '));
  console.log('PASS image resizer mobile browser download', result.length);
} finally { await browser.close(); }
