import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.goto('https://getqrgenius.com/generator', { waitUntil: 'domcontentloaded' });
  const result = await page.evaluate(async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 400;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas context unavailable');
    context.fillStyle = '#1d4ed8';
    context.fillRect(0, 0, 800, 400);
    const input = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    if (!input) throw new Error('Could not create test PNG');
    const bitmap = await createImageBitmap(input);
    try {
      const output = document.createElement('canvas');
      output.width = 400;
      output.height = 200;
      const outputContext = output.getContext('2d');
      if (!outputContext) throw new Error('Output canvas unavailable');
      outputContext.drawImage(bitmap, 0, 0, 400, 200);
      const compressed = await new Promise(resolve => output.toBlob(resolve, 'image/webp', 0.7));
      if (!compressed || compressed.type !== 'image/webp') throw new Error('WebP encoding unavailable');
      return { inputBytes: input.size, outputBytes: compressed.size, width: output.width, height: output.height };
    } finally {
      bitmap.close();
    }
  });
  if (result.width !== 400 || result.height !== 200 || result.outputBytes < 20) throw new Error('Unexpected compression output');
  console.log('PASS: Chromium can decode PNG, resize, and encode WebP', result);
} finally {
  await browser.close();
}
