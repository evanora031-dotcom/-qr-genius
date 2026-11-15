import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fitImageDimensions, validateResizeOptions } from '../src/utils/imageResize.ts';

test('fits landscape and portrait images without stretching or upscaling', () => {
  assert.deepEqual(fitImageDimensions(4000, 2000, 1000, 1000), { width: 1000, height: 500 });
  assert.deepEqual(fitImageDimensions(2000, 4000, 1000, 1000), { width: 500, height: 1000 });
  assert.deepEqual(fitImageDimensions(200, 100, 1000, 1000), { width: 200, height: 100 });
});
test('rejects invalid input dimensions', () => {
  assert.throws(() => fitImageDimensions(0, 200, 100, 100));
  assert.throws(() => fitImageDimensions(100, 200, 9000, 100));
  assert.throws(() => fitImageDimensions(100.5, 200, 100, 100));
});
test('accepts bounded output settings', () => {
  assert.doesNotThrow(() => validateResizeOptions({ width: 1200, height: 800, format: 'image/png', quality: 0.8 }));
});
test('rejects oversized canvases, invalid quality and unsupported formats', () => {
  assert.throws(() => validateResizeOptions({ width: 8000, height: 8000, format: 'image/jpeg', quality: 0.8 }));
  assert.throws(() => validateResizeOptions({ width: 100, height: 100, format: 'image/webp', quality: 0 }));
  assert.throws(() => validateResizeOptions({ width: 100, height: 100, format: 'image/gif' as 'image/png', quality: 0.8 }));
});
