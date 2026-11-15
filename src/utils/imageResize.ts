/** Browser-only image resizing. The input file never leaves the device. */
export type ResizeFormat = 'image/png' | 'image/jpeg' | 'image/webp';

export interface ResizeOptions {
  width: number;
  height: number;
  format: ResizeFormat;
  quality: number;
}

export function fitImageDimensions(sourceWidth: number, sourceHeight: number, maxWidth: number, maxHeight: number) {
  if (![sourceWidth, sourceHeight, maxWidth, maxHeight].every(Number.isInteger) ||
      sourceWidth < 1 || sourceHeight < 1 || maxWidth < 1 || maxHeight < 1 ||
      maxWidth > 8192 || maxHeight > 8192) throw new Error('Invalid image dimensions');
  const scale = Math.min(1, maxWidth / sourceWidth, maxHeight / sourceHeight);
  return {
    width: Math.max(1, Math.round(sourceWidth * scale)),
    height: Math.max(1, Math.round(sourceHeight * scale))
  };
}

export function validateResizeOptions(options: ResizeOptions): void {
  if (!Number.isInteger(options.width) || !Number.isInteger(options.height) ||
      options.width < 1 || options.height < 1 ||
      options.width > 8192 || options.height > 8192 ||
      options.width * options.height > 16_000_000) throw new Error('Invalid output dimensions');
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(options.format)) throw new Error('Unsupported output format');
  if (!Number.isFinite(options.quality) || options.quality < 0.1 || options.quality > 1) throw new Error('Invalid image quality');
}

export async function resizeImage(file: File, options: ResizeOptions): Promise<Blob> {
  validateResizeOptions(options);
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type) ||
      file.size === 0 || file.size > 20 * 1024 * 1024) throw new Error('Unsupported image or file size');
  const bitmap = await createImageBitmap(file);
  try {
    const canvas = document.createElement('canvas');
    canvas.width = options.width;
    canvas.height = options.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas unavailable');
    if (options.format === 'image/jpeg') {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const result = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Encoding failed')), options.format, options.quality)
    );
    if (result.type !== options.format) throw new Error('Output format unsupported by browser');
    return result;
  } finally {
    bitmap.close();
  }
}
