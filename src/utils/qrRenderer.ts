import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
import { QRConfig } from '../types';

export interface RenderResult {
  canvas: HTMLCanvasElement;
  svgString: string;
}

// Preset icon SVGs as data URIs or paths
export const PRESET_LOGOS: Record<string, string> = {
  qrgenius: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#6366F1"/><path d="M12 12H22V22H12V12ZM26 12H36V22H26V12ZM12 26H22V36H12V26Z" fill="white"/><path d="M15 15H19V19H15V15ZM29 15H33V19H29V15ZM15 29H19V33H15V29Z" fill="#6366F1"/><path d="M26 26H31V31H26V26ZM31 31H36V36H31V31Z" fill="white"/></svg>`,
  whatsapp: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#25D366"/><path d="M24 10C16.27 10 10 16.27 10 24C10 26.68 10.76 29.18 12.06 31.33L10.5 37.5L16.85 35.98C18.91 37.14 21.36 37.8 24 37.8C31.73 37.8 38 31.53 38 23.8C38 16.07 31.73 10 24 10ZM31.13 29.62C30.82 30.5 29.58 31.25 28.58 31.47C27.9 31.62 27.02 31.74 24.03 30.5C20.21 28.92 17.75 25.04 17.56 24.78C17.37 24.53 16 22.71 16 20.82C16 18.93 16.96 18.01 17.34 17.62C17.65 17.3 18.02 17.23 18.28 17.23C18.49 17.23 18.68 17.24 18.84 17.25C19.22 17.27 19.41 17.31 19.66 17.91C19.97 18.67 20.73 20.52 20.82 20.71C20.91 20.9 20.98 21.12 20.85 21.37C20.73 21.62 20.65 21.72 20.46 21.94C20.27 22.16 20.1 22.31 19.91 22.54C19.7 22.78 19.49 23.03 19.73 23.45C19.97 23.87 20.8 25.22 22.02 26.31C23.6 27.71 24.89 28.16 25.34 28.35C25.72 28.51 26.13 28.47 26.41 28.17C26.77 27.78 27.21 27.14 27.66 26.51C27.98 26.06 28.38 26.12 28.84 26.29C29.3 26.46 31.75 27.67 32.25 27.92C32.75 28.17 33.08 28.29 33.2 28.5C33.33 28.71 33.33 29.74 32.89 30.18L31.13 29.62Z" fill="white"/></svg>`,
  wifi: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#4F46E5"/><path d="M24 33C25.6569 33 27 31.6569 27 30C27 28.3431 25.6569 27 24 27C22.3431 27 21 28.3431 21 30C21 31.6569 22.3431 33 24 33Z" fill="white"/><path d="M17.636 23.636C21.1508 20.1213 26.8492 20.1213 30.364 23.636" stroke="white" stroke-width="3" stroke-linecap="round"/><path d="M13.3934 19.3934C19.2513 13.5355 28.7487 13.5355 34.6066 19.3934" stroke="white" stroke-width="3" stroke-linecap="round"/></svg>`,
  link: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#2563EB"/><path d="M20 28H18C15.7909 28 14 26.2091 14 24C14 21.7909 15.7909 20 18 20H20M28 20H30C32.2091 20 34 21.7909 34 24C34 26.2091 32.2091 28 30 28H28M19 24H29" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  email: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#7C3AED"/><path d="M12 16H36V32H12V16ZM12 16L24 25L36 16" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  phone: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#059669"/><path d="M34 30.5V34C34 35.1046 33.1046 36 32 36C21.5066 36 13 27.4934 13 17C13 15.8954 13.8954 15 15 15H18.5C19.0523 15 19.5 15.4477 19.5 16V19.5C19.5 20.0523 19.0523 20.5 18.5 20.5H16.8C17.5 23.5 20.5 26.5 23.5 27.2V25.5C23.5 24.9477 23.9477 24.5 24.5 24.5H28C28.5523 24.5 29 24.9477 29 25.5V29C29 29.5523 28.5523 30 28 30H27.5" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  instagram: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#E1306C"/><rect x="14" y="14" width="20" height="20" rx="6" stroke="white" stroke-width="2.5"/><circle cx="24" cy="24" r="5" stroke="white" stroke-width="2.5"/><circle cx="29.5" cy="18.5" r="1.5" fill="white"/></svg>`,
  youtube: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#FF0000"/><path d="M36 18C36 18 35.7 15.8 34.8 14.8C33.6 13.6 32.3 13.6 31.7 13.5C27.4 13.2 24 13.2 24 13.2C24 13.2 20.6 13.2 16.3 13.5C15.7 13.6 14.4 13.6 13.2 14.8C12.3 15.8 12 18 12 18C12 18 11.7 20.4 11.7 22.8V25.1C11.7 27.5 12 29.9 12 29.9C12 29.9 12.3 32.1 13.2 33.1C14.4 34.3 16 34.3 16.7 34.4C19.7 34.7 24 34.8 24 34.8C24 34.8 27.4 34.7 31.7 34.4C32.3 34.3 33.6 34.3 34.8 33.1C35.7 32.1 36 29.9 36 29.9C36 29.9 36.3 27.5 36.3 25.1V22.8C36.3 20.4 36 18 36 18ZM21.5 28.5V19.5L29.5 24L21.5 28.5Z" fill="white"/></svg>`,
  maps: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#EA4335"/><path d="M24 12C18.4772 12 14 16.4772 14 22C14 29.5 24 36 24 36C24 36 34 29.5 34 22C34 16.4772 29.5228 12 24 12ZM24 25C22.3431 25 21 23.6569 21 22C21 20.3431 22.3431 19 24 19C25.6569 19 27 20.3431 27 22C27 23.6569 25.6569 25 24 25Z" fill="white"/></svg>`,
  star: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#F59E0B"/><path d="M24 12L27.7 19.5L36 20.7L30 26.5L31.4 34.7L24 30.8L16.6 34.7L18 26.5L12 20.7L20.3 19.5L24 12Z" fill="white"/></svg>`
};

export function getPresetSvgDataUrl(presetKey: string): string {
  const svg = PRESET_LOGOS[presetKey];
  if (!svg) return '';
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Check if a module is inside one of the three finder patterns (including their 1-cell white border)
export function isFinderPattern(r: number, c: number, size: number): boolean {
  // Top-left
  if (r <= 7 && c <= 7) return true;
  // Top-right
  if (r <= 7 && c >= size - 8) return true;
  // Bottom-left
  if (r >= size - 8 && c <= 7) return true;
  return false;
}

// Check if a module is inside the logo area
export function isLogoArea(
  r: number, 
  c: number, 
  size: number, 
  logoScalePercent: number
): boolean {
  if (logoScalePercent <= 0) return false;
  const logoModules = Math.ceil(size * (logoScalePercent / 100));
  const center = (size - 1) / 2;
  const half = (logoModules + 1) / 2;
  return Math.abs(r - center) <= half && Math.abs(c - center) <= half;
}

// Generate the matrix from content with fallback resilience for high density payloads
export function getQRMatrix(content: string, errorCorrectionLevel: QRConfig['errorCorrectionLevel']) {
  const safeContent = (content || '').trim();
  if (!safeContent) throw new Error('QR content is required before generating a code.');
  try {
    const qr = QRCode.create(safeContent, {
      errorCorrectionLevel: errorCorrectionLevel || 'M'
    });
    return qr.modules;
  } catch {
    // If high ECC overflows matrix capacity on large data, progressively fallback
    try {
      const qrM = QRCode.create(safeContent, { errorCorrectionLevel: 'M' });
      return qrM.modules;
    } catch {
      try {
        const qrL = QRCode.create(safeContent, { errorCorrectionLevel: 'L' });
        return qrL.modules;
      } catch {
        throw new Error('This content is too long to encode as a QR code. Shorten it and try again.');
      }
    }
  }
}

// Draw a single custom body dot on Canvas
function drawCanvasDot(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  style: QRConfig['dotStyle']
) {
  switch (style) {
    case 'dots': {
      ctx.beginPath();
      ctx.arc(x + w / 2, y + w / 2, w * 0.44, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'rounded': {
      const r = w * 0.3;
      ctx.beginPath();
      ctx.roundRect(x + w * 0.05, y + w * 0.05, w * 0.9, w * 0.9, r);
      ctx.fill();
      break;
    }
    case 'extra-rounded': {
      const r = w * 0.48;
      ctx.beginPath();
      ctx.roundRect(x, y, w, w, r);
      ctx.fill();
      break;
    }
    case 'diamond': {
      ctx.beginPath();
      ctx.moveTo(x + w / 2, y);
      ctx.lineTo(x + w, y + w / 2);
      ctx.lineTo(x + w / 2, y + w);
      ctx.lineTo(x, y + w / 2);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'classy': {
      // Modern classy dot with smooth rounded corners
      const r = w * 0.4;
      ctx.beginPath();
      ctx.roundRect(x + w * 0.08, y + w * 0.08, w * 0.84, w * 0.84, [r, r, 0, r]);
      ctx.fill();
      break;
    }
    case 'square':
    default: {
      ctx.fillRect(x, y, w, w);
      break;
    }
  }
}

// Draw corner frame & eyeball on Canvas
function drawCanvasCorner(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  cellSize: number,
  frameStyle: QRConfig['cornerSquareStyle'],
  dotStyle: QRConfig['cornerDotStyle'],
  frameColor: string,
  dotColor: string
) {
  const totalW = cellSize * 7;
  const innerOffset = cellSize;
  const innerW = cellSize * 5;
  const eyeballOffset = cellSize * 2;
  const eyeballW = cellSize * 3;

  ctx.save();
  ctx.fillStyle = frameColor;

  // Draw 7x7 outer shape with 5x5 cut
  ctx.beginPath();
  switch (frameStyle) {
    case 'circle': {
      ctx.arc(startX + totalW / 2, startY + totalW / 2, totalW / 2, 0, Math.PI * 2);
      break;
    }
    case 'rounded': {
      ctx.roundRect(startX, startY, totalW, totalW, cellSize * 1.5);
      break;
    }
    case 'extra-rounded': {
      ctx.roundRect(startX, startY, totalW, totalW, cellSize * 2.5);
      break;
    }
    case 'leaf': {
      // Leaf style: diagonal rounded corners
      ctx.roundRect(startX, startY, totalW, totalW, [cellSize * 2.5, 0, cellSize * 2.5, 0]);
      break;
    }
    case 'square':
    default: {
      ctx.rect(startX, startY, totalW, totalW);
      break;
    }
  }

  // Cut out 5x5 inner hollow
  switch (frameStyle) {
    case 'circle': {
      ctx.arc(startX + totalW / 2, startY + totalW / 2, innerW / 2, 0, Math.PI * 2, true);
      break;
    }
    case 'rounded': {
      ctx.roundRect(startX + innerOffset, startY + innerOffset, innerW, innerW, cellSize);
      break;
    }
    case 'extra-rounded': {
      ctx.roundRect(startX + innerOffset, startY + innerOffset, innerW, innerW, cellSize * 1.5);
      break;
    }
    case 'leaf': {
      ctx.roundRect(startX + innerOffset, startY + innerOffset, innerW, innerW, [cellSize * 1.5, 0, cellSize * 1.5, 0]);
      break;
    }
    case 'square':
    default: {
      ctx.rect(startX + innerOffset, startY + innerOffset, innerW, innerW);
      break;
    }
  }

  // In standard canvas, filling with 'evenodd' rule cuts out the inner square!
  ctx.fill('evenodd');

  // Draw 3x3 eyeball
  ctx.fillStyle = dotColor;
  ctx.beginPath();
  const eyeX = startX + eyeballOffset;
  const eyeY = startY + eyeballOffset;

  switch (dotStyle) {
    case 'dot': {
      ctx.arc(eyeX + eyeballW / 2, eyeY + eyeballW / 2, eyeballW / 2, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'rounded': {
      ctx.roundRect(eyeX, eyeY, eyeballW, eyeballW, cellSize * 0.8);
      ctx.fill();
      break;
    }
    case 'diamond': {
      ctx.moveTo(eyeX + eyeballW / 2, eyeY);
      ctx.lineTo(eyeX + eyeballW, eyeY + eyeballW / 2);
      ctx.lineTo(eyeX + eyeballW / 2, eyeY + eyeballW);
      ctx.lineTo(eyeX, eyeY + eyeballW / 2);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'square':
    default: {
      ctx.fillRect(eyeX, eyeY, eyeballW, eyeballW);
      break;
    }
  }

  ctx.restore();
}

// Render full QR to Canvas (returns HTMLCanvasElement)
export async function renderQRToCanvas(
  config: QRConfig,
  targetSize: number = 1024
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  canvas.width = targetSize;
  canvas.height = targetSize;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D canvas context');

  // 1. Matrix
  const modules = getQRMatrix(config.content, config.errorCorrectionLevel);
  const matrixSize = modules.size;
  const marginModules = Math.max(0, config.margin);
  const totalModules = matrixSize + marginModules * 2;
  const cellSize = targetSize / totalModules;
  const offset = marginModules * cellSize;

  // 2. Background
  if (!config.transparentBg) {
    ctx.fillStyle = config.bgColor || '#ffffff';
    ctx.fillRect(0, 0, targetSize, targetSize);
  } else {
    ctx.clearRect(0, 0, targetSize, targetSize);
  }

  // 3. Prepare Foreground Paint (Solid or Gradient)
  let fgStyle: string | CanvasGradient = config.fgColor || '#4F46E5';
  if (config.useGradient && config.gradientColor) {
    let grad: CanvasGradient;
    switch (config.gradientDirection) {
      case 'to-r':
        grad = ctx.createLinearGradient(0, 0, targetSize, 0);
        break;
      case 'to-b':
        grad = ctx.createLinearGradient(0, 0, 0, targetSize);
        break;
      case 'radial':
        grad = ctx.createRadialGradient(targetSize / 2, targetSize / 2, targetSize * 0.1, targetSize / 2, targetSize / 2, targetSize * 0.7);
        break;
      case 'to-br':
      default:
        grad = ctx.createLinearGradient(0, 0, targetSize, targetSize);
        break;
    }
    grad.addColorStop(0, config.fgColor || '#4F46E5');
    grad.addColorStop(1, config.gradientColor || '#7C3AED');
    fgStyle = grad;
  }

  const cornerFrameColor = config.customCornerColor ? config.cornerSquareColor : config.fgColor;
  const cornerDotColor = config.customCornerColor ? config.cornerDotColor : config.fgColor;

  // 4. Render Body Modules
  ctx.fillStyle = fgStyle;
  const hasLogo = Boolean(config.logoUrl || config.logoPreset);
  const logoScale = hasLogo ? config.logoSize : 0;

  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      if (modules.get(r, c)) {
        // Skip finder patterns
        if (isFinderPattern(r, c, matrixSize)) continue;
        // Skip logo area
        if (hasLogo && isLogoArea(r, c, matrixSize, logoScale)) continue;

        const x = offset + c * cellSize;
        const y = offset + r * cellSize;
        drawCanvasDot(ctx, x, y, cellSize, config.dotStyle);
      }
    }
  }

  // 5. Render the 3 Finder Corners
  // Top-Left (0, 0)
  drawCanvasCorner(
    ctx,
    offset,
    offset,
    cellSize,
    config.cornerSquareStyle,
    config.cornerDotStyle,
    cornerFrameColor,
    cornerDotColor
  );

  // Top-Right (0, matrixSize - 7)
  drawCanvasCorner(
    ctx,
    offset + (matrixSize - 7) * cellSize,
    offset,
    cellSize,
    config.cornerSquareStyle,
    config.cornerDotStyle,
    cornerFrameColor,
    cornerDotColor
  );

  // Bottom-Left (matrixSize - 7, 0)
  drawCanvasCorner(
    ctx,
    offset,
    offset + (matrixSize - 7) * cellSize,
    cellSize,
    config.cornerSquareStyle,
    config.cornerDotStyle,
    cornerFrameColor,
    cornerDotColor
  );

  // 6. Draw Logo if present
  if (hasLogo) {
    let logoSrc = config.logoUrl;
    if (!logoSrc && config.logoPreset) {
      logoSrc = getPresetSvgDataUrl(config.logoPreset);
    }

    if (logoSrc) {
      await new Promise<void>((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const logoPixelSize = (targetSize * (config.logoSize / 100));
          const logoCenter = targetSize / 2;
          const logoX = logoCenter - logoPixelSize / 2;
          const logoY = logoCenter - logoPixelSize / 2;
          const padding = (config.logoPadding / 100) * logoPixelSize;

          // Draw Badge background
          if (config.logoBgShape !== 'none') {
            ctx.save();
            ctx.fillStyle = config.logoBgColor || '#ffffff';
            const bgX = logoX - padding;
            const bgY = logoY - padding;
            const bgSize = logoPixelSize + padding * 2;

            ctx.beginPath();
            if (config.logoBgShape === 'circle') {
              ctx.arc(logoCenter, logoCenter, bgSize / 2, 0, Math.PI * 2);
            } else if (config.logoBgShape === 'rounded') {
              ctx.roundRect(bgX, bgY, bgSize, bgSize, bgSize * 0.22);
            } else {
              ctx.rect(bgX, bgY, bgSize, bgSize);
            }
            ctx.fill();
            ctx.restore();
          }

          // Draw Logo Image
          ctx.drawImage(img, logoX, logoY, logoPixelSize, logoPixelSize);
          resolve();
        };
        img.onerror = () => {
          // Fail gracefully without breaking QR
          resolve();
        };
        img.src = logoSrc;
      });
    }
  }

  return canvas;
}

// Generate Clean Scalable Vector Graphics (SVG)
export function renderQRToSVG(config: QRConfig, size: number = 1000): string {
  const modules = getQRMatrix(config.content, config.errorCorrectionLevel);
  const matrixSize = modules.size;
  const marginModules = Math.max(0, config.margin);
  const totalModules = matrixSize + marginModules * 2;
  const cellSize = size / totalModules;
  const offset = marginModules * cellSize;

  const hasLogo = Boolean(config.logoUrl || config.logoPreset);
  const logoScale = hasLogo ? config.logoSize : 0;

  const bgRect = !config.transparentBg
    ? `<rect width="${size}" height="${size}" fill="${config.bgColor || '#ffffff'}" />`
    : '';

  // Gradient definition
  let defs = '';
  let fillRef = config.fgColor || '#4F46E5';

  if (config.useGradient && config.gradientColor) {
    const gradId = 'qr-grad-' + Math.random().toString(36).substring(2, 8);
    let x1 = '0%', y1 = '0%', x2 = '100%', y2 = '100%';
    if (config.gradientDirection === 'to-r') { x2 = '100%'; y2 = '0%'; }
    if (config.gradientDirection === 'to-b') { x2 = '0%'; y2 = '100%'; }

    defs = `<defs>
      <linearGradient id="${gradId}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
        <stop offset="0%" stop-color="${config.fgColor || '#4F46E5'}"/>
        <stop offset="100%" stop-color="${config.gradientColor || '#7C3AED'}"/>
      </linearGradient>
    </defs>`;
    fillRef = `url(#${gradId})`;
  }

  const cornerFrameColor = config.customCornerColor ? config.cornerSquareColor : config.fgColor;
  const cornerDotColor = config.customCornerColor ? config.cornerDotColor : config.fgColor;

  let bodyElements = '';

  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      if (modules.get(r, c)) {
        if (isFinderPattern(r, c, matrixSize)) continue;
        if (hasLogo && isLogoArea(r, c, matrixSize, logoScale)) continue;

        const x = offset + c * cellSize;
        const y = offset + r * cellSize;
        const w = cellSize;

        switch (config.dotStyle) {
          case 'dots':
            bodyElements += `<circle cx="${x + w / 2}" cy="${y + w / 2}" r="${w * 0.44}" fill="${fillRef}" />`;
            break;
          case 'rounded':
            bodyElements += `<rect x="${x + w * 0.05}" y="${y + w * 0.05}" width="${w * 0.9}" height="${w * 0.9}" rx="${w * 0.3}" fill="${fillRef}" />`;
            break;
          case 'extra-rounded':
            bodyElements += `<rect x="${x}" y="${y}" width="${w}" height="${w}" rx="${w * 0.48}" fill="${fillRef}" />`;
            break;
          case 'diamond':
            bodyElements += `<polygon points="${x + w / 2},${y} ${x + w},${y + w / 2} ${x + w / 2},${y + w} ${x},${y + w / 2}" fill="${fillRef}" />`;
            break;
          case 'square':
          default:
            bodyElements += `<rect x="${x}" y="${y}" width="${w}" height="${w}" fill="${fillRef}" />`;
            break;
        }
      }
    }
  }

  // Render SVG corner
  function renderSvgCorner(startX: number, startY: number): string {
    const totalW = cellSize * 7;
    const innerOffset = cellSize;
    const innerW = cellSize * 5;
    const eyeballOffset = cellSize * 2;
    const eyeballW = cellSize * 3;

    let outerRx = '0';
    if (config.cornerSquareStyle === 'rounded') outerRx = String(cellSize * 1.5);
    if (config.cornerSquareStyle === 'extra-rounded') outerRx = String(cellSize * 2.5);
    if (config.cornerSquareStyle === 'circle') outerRx = String(totalW / 2);

    let innerRx = '0';
    if (config.cornerSquareStyle === 'rounded') innerRx = String(cellSize);
    if (config.cornerSquareStyle === 'extra-rounded') innerRx = String(cellSize * 1.5);
    if (config.cornerSquareStyle === 'circle') innerRx = String(innerW / 2);

    let eyeballEl = '';
    const eyeX = startX + eyeballOffset;
    const eyeY = startY + eyeballOffset;

    switch (config.cornerDotStyle) {
      case 'dot':
        eyeballEl = `<circle cx="${eyeX + eyeballW / 2}" cy="${eyeY + eyeballW / 2}" r="${eyeballW / 2}" fill="${cornerDotColor}" />`;
        break;
      case 'rounded':
        eyeballEl = `<rect x="${eyeX}" y="${eyeY}" width="${eyeballW}" height="${eyeballW}" rx="${cellSize * 0.8}" fill="${cornerDotColor}" />`;
        break;
      case 'diamond':
        eyeballEl = `<polygon points="${eyeX + eyeballW / 2},${eyeY} ${eyeX + eyeballW},${eyeY + eyeballW / 2} ${eyeX + eyeballW / 2},${eyeY + eyeballW} ${eyeX},${eyeY + eyeballW / 2}" fill="${cornerDotColor}" />`;
        break;
      case 'square':
      default:
        eyeballEl = `<rect x="${eyeX}" y="${eyeY}" width="${eyeballW}" height="${eyeballW}" fill="${cornerDotColor}" />`;
        break;
    }

    const maskId = 'corner-mask-' + Math.random().toString(36).substring(2, 7);

    return `
      <mask id="${maskId}">
        <rect x="${startX}" y="${startY}" width="${totalW}" height="${totalW}" rx="${outerRx}" fill="white" />
        <rect x="${startX + innerOffset}" y="${startY + innerOffset}" width="${innerW}" height="${innerW}" rx="${innerRx}" fill="black" />
      </mask>
      <rect x="${startX}" y="${startY}" width="${totalW}" height="${totalW}" rx="${outerRx}" fill="${cornerFrameColor}" mask="url(#${maskId})" />
      ${eyeballEl}
    `;
  }

  const cornerTL = renderSvgCorner(offset, offset);
  const cornerTR = renderSvgCorner(offset + (matrixSize - 7) * cellSize, offset);
  const cornerBL = renderSvgCorner(offset, offset + (matrixSize - 7) * cellSize);

  // Logo in SVG
  let logoEl = '';
  if (hasLogo) {
    let logoHref = config.logoUrl;
    if (!logoHref && config.logoPreset) {
      logoHref = getPresetSvgDataUrl(config.logoPreset);
    }
    if (logoHref) {
      const logoPixelSize = size * (config.logoSize / 100);
      const logoCenter = size / 2;
      const logoX = logoCenter - logoPixelSize / 2;
      const logoY = logoCenter - logoPixelSize / 2;
      const padding = (config.logoPadding / 100) * logoPixelSize;

      let badgeEl = '';
      if (config.logoBgShape !== 'none') {
        const bgX = logoX - padding;
        const bgY = logoY - padding;
        const bgSize = logoPixelSize + padding * 2;
        let rx = '0';
        if (config.logoBgShape === 'circle') rx = String(bgSize / 2);
        if (config.logoBgShape === 'rounded') rx = String(bgSize * 0.22);

        badgeEl = `<rect x="${bgX}" y="${bgY}" width="${bgSize}" height="${bgSize}" rx="${rx}" fill="${config.logoBgColor || '#ffffff'}" />`;
      }

      logoEl = `
        ${badgeEl}
        <image href="${logoHref}" x="${logoX}" y="${logoY}" width="${logoPixelSize}" height="${logoPixelSize}" preserveAspectRatio="xMidYMid meet" />
      `;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    ${defs}
    ${bgRect}
    ${bodyElements}
    ${cornerTL}
    ${cornerTR}
    ${cornerBL}
    ${logoEl}
  </svg>`;
}

// Download Canvas as PNG
export async function downloadCanvasPNG(canvas: HTMLCanvasElement, filename: string = 'qrgenius-code.png'): Promise<void> {
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) throw new Error('Could not encode QR code as PNG');

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  try {
    a.click();
  } finally {
    a.remove();
    // Give the browser time to begin reading the object URL before releasing it.
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }
}

// Download SVG String as File
export function downloadSVG(svgString: string, filename: string = 'qrgenius-code.svg') {
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Download Printable PDF via jsPDF
export function downloadPrintablePDF(
  canvas: HTMLCanvasElement,
  filename: string = 'qrgenius-code.pdf',
  meta?: { title?: string; typeLabel?: string; content?: string }
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Clean Header bar
  doc.setFillColor(79, 70, 229); // #4F46E5 Indigo
  doc.rect(0, 0, pageWidth, 24, 'F');

  // Header Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('QR GENIUS', 15, 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(224, 231, 255);
  doc.text('Create. Scan. Connect.', 54, 15);

  // Content Box
  const cardX = 20;
  const cardY = 36;
  const cardW = pageWidth - 40;
  const cardH = pageHeight - 56;

  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(cardX, cardY, cardW, cardH, 4, 4, 'FD');

  // Title inside card
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  const heading = meta?.title || 'Scan This QR Code';
  doc.text(heading, pageWidth / 2, cardY + 18, { align: 'center' });

  if (meta?.typeLabel) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(100, 116, 139);
    doc.text(meta.typeLabel, pageWidth / 2, cardY + 25, { align: 'center' });
  }

  // QR Code Image
  const qrImageSize = 105; // mm
  const qrImageX = (pageWidth - qrImageSize) / 2;
  const qrImageY = cardY + 34;

  const imgData = canvas.toDataURL('image/png');
  doc.addImage(imgData, 'PNG', qrImageX, qrImageY, qrImageSize, qrImageSize);

  // Content Preview
  const contentY = qrImageY + qrImageSize + 16;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(79, 70, 229);
  doc.text('TARGET / PAYLOAD:', pageWidth / 2, contentY, { align: 'center' });

  doc.setFont('courier', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);

  const rawText = meta?.content || '';
  const lines = doc.splitTextToSize(rawText.length > 120 ? rawText.slice(0, 120) + '...' : rawText, cardW - 30);
  doc.text(lines, pageWidth / 2, contentY + 6, { align: 'center' });

  // Instructions at bottom
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text('Point your mobile device camera at the code to scan instantly.', pageWidth / 2, cardY + cardH - 12, { align: 'center' });

  doc.save(filename);
}

// Copy Image to Clipboard
export async function copyCanvasToClipboard(canvas: HTMLCanvasElement): Promise<boolean> {
  try {
    return await new Promise<boolean>((resolve) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          resolve(false);
          return;
        }
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          resolve(true);
        } catch {
          resolve(false);
        }
      }, 'image/png');
    });
  } catch {
    return false;
  }
}
