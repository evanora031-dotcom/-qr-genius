/** Merge PDF pages in selection order, entirely in the browser. */
import { validatePdfSignatures } from './pdfMergeValidation';

export async function mergePdfFiles(files: readonly File[]): Promise<Blob> {
  await validatePdfSignatures(files);
  // Loaded only when the merge tool is used; never part of the QR landing bundle.
  const { PDFDocument } = await import('pdf-lib');
  const output = await PDFDocument.create();
  for (const file of files) {
    let source;
    try {
      source = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: false });
    } catch {
      throw new Error('Could not read a PDF. Password-protected or damaged PDFs are not supported.');
    }
    if (source.getPageCount() === 0) throw new Error('An input PDF has no pages.');
    const pages = await output.copyPages(source, source.getPageIndices());
    for (const page of pages) output.addPage(page);
  }
  const bytes = await output.save();
  return new Blob([new Uint8Array(bytes)], { type: 'application/pdf' });
}
