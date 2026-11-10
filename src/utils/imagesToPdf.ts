/**
 * Browser-only JPEG/PNG to PDF conversion.
 * jsPDF is dynamically imported so QR pages do not download the PDF library.
 */
export type PdfImageLayout = { width: number; height: number; x: number; y: number };
export const MAX_PDF_IMAGES = 10;
export const MAX_PDF_IMAGE_BYTES = 20 * 1024 * 1024;
export const MAX_PDF_TOTAL_BYTES = 60 * 1024 * 1024;

export function fitImageToPage(imageWidth: number, imageHeight: number, pageWidth = 210, pageHeight = 297, margin = 10): PdfImageLayout {
  if (![imageWidth, imageHeight, pageWidth, pageHeight, margin].every(Number.isFinite) ||
      imageWidth <= 0 || imageHeight <= 0 || pageWidth <= margin * 2 || pageHeight <= margin * 2 || margin < 0) {
    throw new Error('Invalid image or page dimensions');
  }
  const scale = Math.min((pageWidth - 2 * margin) / imageWidth, (pageHeight - 2 * margin) / imageHeight);
  const width = imageWidth * scale;
  const height = imageHeight * scale;
  return { width, height, x: (pageWidth - width) / 2, y: (pageHeight - height) / 2 };
}

export function validatePdfImages(files: readonly File[]): void {
  if (!files.length || files.length > MAX_PDF_IMAGES) throw new Error('Choose 1–10 images.');
  let total = 0;
  for (const file of files) {
    if (!['image/jpeg', 'image/png'].includes(file.type)) throw new Error('Only JPEG and PNG images are supported.');
    if (file.size <= 0 || file.size > MAX_PDF_IMAGE_BYTES) throw new Error('Each image must be under 20 MB.');
    total += file.size;
  }
  if (total > MAX_PDF_TOTAL_BYTES) throw new Error('Images must total 60 MB or less.');
}

function readDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read image.'));
    reader.onload = () => typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error('Invalid image data.'));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Image could not be decoded.'));
    image.src = src;
  });
}

export async function imagesToPdf(files: readonly File[]): Promise<Blob> {
  validatePdfImages(files);
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const dataUrl = await readDataUrl(file);
    const image = await loadImage(dataUrl);
    if (!image.naturalWidth || !image.naturalHeight) throw new Error('Invalid image dimensions.');
    const box = fitImageToPage(image.naturalWidth, image.naturalHeight);
    if (index) doc.addPage();
    doc.addImage(dataUrl, file.type === 'image/png' ? 'PNG' : 'JPEG', box.x, box.y, box.width, box.height);
  }
  return doc.output('blob');
}
