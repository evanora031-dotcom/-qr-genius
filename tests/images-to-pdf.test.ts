import test from 'node:test';
import assert from 'node:assert/strict';
import { fitImageToPage, validatePdfImages } from '../src/utils/imagesToPdf.ts';

test('portrait image fits within A4 margins and is centered', () => {
  const box = fitImageToPage(1000, 2000);
  assert.equal(box.height, 277);
  assert.equal(box.width, 138.5);
  assert.equal(box.y, 10);
  assert.equal(box.x, 35.75);
});

test('landscape image fits width and is vertically centered', () => {
  const box = fitImageToPage(2000, 1000);
  assert.equal(box.width, 190);
  assert.equal(box.height, 95);
  assert.equal(box.x, 10);
  assert.equal(box.y, 101);
});

test('rejects invalid image dimensions', () => {
  assert.throws(() => fitImageToPage(0, 100));
  assert.throws(() => fitImageToPage(100, Infinity));
});

test('accepts JPEG and PNG files within limits', () => {
  assert.doesNotThrow(() => validatePdfImages([{ type: 'image/png', size: 1024 }, { type: 'image/jpeg', size: 2048 }] as File[]));
});

test('rejects empty, unsupported, oversized and excessive selections', () => {
  assert.throws(() => validatePdfImages([]));
  assert.throws(() => validatePdfImages([{ type: 'image/webp', size: 1 }] as File[]));
  assert.throws(() => validatePdfImages([{ type: 'image/png', size: 21 * 1024 * 1024 }] as File[]));
  assert.throws(() => validatePdfImages(Array.from({ length: 11 }, () => ({ type: 'image/png', size: 1 })) as File[]));
  assert.throws(() => validatePdfImages(Array.from({ length: 4 }, () => ({ type: 'image/png', size: 19 * 1024 * 1024 })) as File[]));
});
