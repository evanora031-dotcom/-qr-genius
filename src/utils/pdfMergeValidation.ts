/** Validation for client-side PDF merging. No files are uploaded. */
export const MAX_MERGE_FILES = 10;
export const MAX_MERGE_FILE_BYTES = 20 * 1024 * 1024;
export const MAX_MERGE_TOTAL_BYTES = 60 * 1024 * 1024;

export type PdfFileLike = Pick<File, 'name' | 'size' | 'type'>;

export function validateMergeFiles(files: readonly PdfFileLike[]): void {
  if (files.length < 2 || files.length > MAX_MERGE_FILES) throw new Error('Choose 2–10 PDF files.');
  let total = 0;
  for (const file of files) {
    if (!file.name.toLowerCase().endsWith('.pdf') || (file.type && file.type !== 'application/pdf')) {
      throw new Error('Only PDF files are supported.');
    }
    if (!Number.isSafeInteger(file.size) || file.size <= 0 || file.size > MAX_MERGE_FILE_BYTES) {
      throw new Error('Each PDF must be 20 MB or less.');
    }
    total += file.size;
  }
  if (total > MAX_MERGE_TOTAL_BYTES) throw new Error('PDF files must total 60 MB or less.');
}

/** Check actual file signatures, not only the filename or MIME type. */
export async function validatePdfSignatures(files: readonly File[]): Promise<void> {
  validateMergeFiles(files);
  for (const file of files) {
    const bytes = new Uint8Array(await file.slice(0, 5).arrayBuffer());
    if (bytes.length !== 5 || String.fromCharCode(...bytes) !== '%PDF-') {
      throw new Error('One or more files are not valid PDF documents.');
    }
  }
}
