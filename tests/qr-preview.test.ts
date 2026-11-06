import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { QRPreviewCard } from '../src/components/QRStudio/QRPreviewCard';
import type { QRConfig, Language } from '../src/types';

const baseConfig: QRConfig = {
  content: '',
  errorCorrectionLevel: 'M',
  margin: 2,
  fgColor: '#111111',
  bgColor: '#FFFFFF',
  transparentBg: false,
  useGradient: false,
  gradientColor: '#222222',
  gradientDirection: 'to-br',
  dotStyle: 'rounded',
  cornerSquareStyle: 'rounded',
  cornerDotStyle: 'rounded',
  customCornerColor: false,
  cornerSquareColor: '#111111',
  cornerDotColor: '#111111',
  logoSize: 22,
  logoPadding: 5,
  logoBgShape: 'rounded',
  logoBgColor: '#FFFFFF'
};

function renderPreview(content: string, lang: Language = 'en') {
  return renderToStaticMarkup(
    React.createElement(QRPreviewCard, {
      config: { ...baseConfig, content },
      type: 'url',
      title: 'Website',
      lang,
      onHistoryUpdated: () => {}
    })
  );
}

test('all seven QR actions are disabled when input is empty', () => {
  const html = renderPreview('');
  assert.equal((html.match(/<button\b/g) || []).length, 7);
  assert.equal((html.match(/\bdisabled=""/g) || []).length, 7);
  assert.match(html, /Enter your details to preview the QR code and enable downloads/);
});

test('QR actions remain disabled while an initial preview is rendering', () => {
  const html = renderPreview('https://getqrgenius.com');
  assert.equal((html.match(/\bdisabled=""/g) || []).length, 7);
  assert.doesNotMatch(html, /Enter your details to preview/);
});

test('empty-preview guidance is localized in all supported languages', () => {
  assert.match(renderPreview('', 'ar'), /أدخل بياناتك أولاً/);
  assert.match(renderPreview('', 'fr'), /Saisissez vos données/);
  assert.match(renderPreview('', 'es'), /Introduce tus datos/);
});
