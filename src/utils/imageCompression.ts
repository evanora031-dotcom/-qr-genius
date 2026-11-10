/**
 * Browser-only lossy image compression. No upload or external API is involved.
 * JPEG and WebP are supported; PNG is intentionally excluded because canvas
 * quality settings do not reliably compress PNG.
 */
export type CompressedImageFormat = 'image/jpeg' | 'image/webp';

export interface CompressionOptions {
  format: CompressedImageFormat;
  quality: number;
  maxDimension: number;
}

export interface CompressionResult {
  blob: Blob;
  width: number;
  height: number;
  originalBytes: number;
  outputBytes: number;
}

export function scaledDimensions(width: number, height: number, maxDimension: number) {
  if (![width, height, maxDimension].every(Number.isFinite) || width <= 0 || height <= 0 || maxDimension < 1 || maxDimension > 8192) {
    throw new Error('Invalid image dimensions');
  }
  const scale = Math.min(1, maxDimension / Math.max(width, height));
  return { width: Math.max(1, Math.round(width * scale)), height: Math.max(1, Math.round(height * scale)) };
}

export function validateCompressionOptions(options: CompressionOptions): void {
  if (!['image/jpeg', 'image/webp'].includes(options.format)) throw new Error('Unsupported output format');
  if (!Number.isFinite(options.quality) || options.quality < 0.1 || options.quality > 1) throw new Error('Quality must be between 0.1 and 1');
  scaledDimensions(1, 1, options.maxDimension);
}

export async function compressImage(file: File, options: CompressionOptions): Promise<CompressionResult> {
  validateCompressionOptions(options);
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Only JPEG, PNG, and WebP images are supported');
  if (file.size === 0 || file.size > 20 * 1024 * 1024) throw new Error('Image must be between 1 byte and 20 MB');

  const bitmap = await createImageBitmap(file);
  try {
    const { width, height } = scaledDimensions(bitmap.width, bitmap.height, options.maxDimension);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas is unavailable');
    // JPEG cannot preserve transparency; use a white background.
    if (options.format === 'image/jpeg') {
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, width, height);
    }
    context.drawImage(bitmap, 0, 0, width, height);
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(value => value ? resolve(value) : reject(new Error('Image encoding failed')), options.format, options.quality);
    });
    if (blob.type !== options.format) throw new Error('Requested image format is unsupported by this browser');
    return { blob, width, height, originalBytes: file.size, outputBytes: blob.size };
  } finally {
    bitmap.close();
  }
}
