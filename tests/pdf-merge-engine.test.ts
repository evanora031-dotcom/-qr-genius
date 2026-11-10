import test from 'node:test';
import assert from 'node:assert/strict';
import { PDFDocument } from 'pdf-lib';
import { mergePdfFiles } from '../src/utils/mergePdfFiles.ts';

async function makePdf(pages: number, name: string): Promise<File> {
  const doc = await PDFDocument.create();
  for (let i = 0; i < pages; i++) doc.addPage([200, 300]);
  const bytes = await doc.save();
  const blob = new Blob([new Uint8Array(bytes)], { type: 'application/pdf' });
  return Object.assign(blob, { name, lastModified: Date.now() }) as File;
}

test('merges all pages from PDFs in selected order', async () => {
  const first = await makePdf(2, 'first.pdf');
  const second = await makePdf(3, 'second.pdf');
  const result = await mergePdfFiles([first, second]);
  assert.equal(result.type, 'application/pdf');
  const merged = await PDFDocument.load(await result.arrayBuffer());
  assert.equal(merged.getPageCount(), 5);
});

test('rejects PDF extension with invalid file contents', async () => {
  const invalid = Object.assign(new Blob(['not a pdf'], { type: 'application/pdf' }), { name: 'bad.pdf' }) as File;
  await assert.rejects(mergePdfFiles([await makePdf(1, 'ok.pdf'), invalid]), /not valid PDF/);
});
