import test from 'node:test';
import assert from 'node:assert/strict';
import { validateMergeFiles, validatePdfSignatures } from '../src/utils/pdfMergeValidation.ts';

const pdf = (name: string, size: number, type = 'application/pdf') => ({ name, size, type });

test('accepts two PDF files and optional blank MIME type', () => {
  assert.doesNotThrow(() => validateMergeFiles([pdf('a.pdf', 1024), pdf('B.PDF', 2048, '')]));
});
test('rejects invalid count, types, sizes and total', () => {
  assert.throws(() => validateMergeFiles([]));
  assert.throws(() => validateMergeFiles([pdf('one.pdf', 1)]));
  assert.throws(() => validateMergeFiles(Array.from({ length: 11 }, (_, i) => pdf(i + '.pdf', 1))));
  assert.throws(() => validateMergeFiles([pdf('a.png', 10), pdf('b.pdf', 10)]));
  assert.throws(() => validateMergeFiles([pdf('a.pdf', 10, 'image/png'), pdf('b.pdf', 10)]));
  assert.throws(() => validateMergeFiles([pdf('a.pdf', 0), pdf('b.pdf', 10)]));
  assert.throws(() => validateMergeFiles([pdf('a.pdf', NaN), pdf('b.pdf', 10)]));
  assert.throws(() => validateMergeFiles([pdf('a.pdf', 21 * 1024 * 1024), pdf('b.pdf', 10)]));
  assert.throws(() => validateMergeFiles(Array.from({ length: 4 }, (_, i) => pdf(i + '.pdf', 19 * 1024 * 1024))));
});
test('rejects files without a PDF header even if named .pdf', async () => {
  const make = (bytes: string) => ({ ...pdf('test.pdf', bytes.length), slice: () => ({ arrayBuffer: async () => new TextEncoder().encode(bytes.slice(0, 5)).buffer }) }) as unknown as File;
  await assert.doesNotReject(validatePdfSignatures([make('%PDF-1.7'), make('%PDF-1.4')]));
  await assert.rejects(validatePdfSignatures([make('%PDF-1.7'), make('hello world')]));
});
