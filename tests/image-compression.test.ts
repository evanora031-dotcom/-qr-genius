import assert from 'node:assert/strict';
import { test } from 'node:test';
import { scaledDimensions, validateCompressionOptions } from '../src/utils/imageCompression.ts';

test('scales landscape image within max dimension without stretching', () => {
  assert.deepEqual(scaledDimensions(4000, 2000, 1000), { width: 1000, height: 500 });
});
test('scales portrait image without upscaling', () => {
  assert.deepEqual(scaledDimensions(600, 1200, 2000), { width: 600, height: 1200 });
});
test('keeps smallest dimension at least one pixel', () => {
  assert.deepEqual(scaledDimensions(8000, 1, 100), { width: 100, height: 1 });
});
test('rejects invalid dimensions and oversized canvas', () => {
  assert.throws(() => scaledDimensions(0, 100, 100));
  assert.throws(() => scaledDimensions(100, 100, 10000));
});
test('accepts bounded JPEG and WebP quality', () => {
  assert.doesNotThrow(() => validateCompressionOptions({ format: 'image/jpeg', quality: 0.8, maxDimension: 1920 }));
  assert.doesNotThrow(() => validateCompressionOptions({ format: 'image/webp', quality: 0.1, maxDimension: 1024 }));
});
test('rejects unsupported format or quality', () => {
  assert.throws(() => validateCompressionOptions({ format: 'image/png' as 'image/jpeg', quality: 0.8, maxDimension: 1000 }));
  assert.throws(() => validateCompressionOptions({ format: 'image/jpeg', quality: 1.2, maxDimension: 1000 }));
});
