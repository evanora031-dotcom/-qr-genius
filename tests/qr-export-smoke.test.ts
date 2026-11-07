import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { QRPreviewCard } from '../src/components/QRStudio/QRPreviewCard';
import { getQRMatrix, renderQRToSVG } from '../src/utils/qrRenderer';
import type { QRConfig } from '../src/types';

const config: QRConfig = {
  content: 'https://getqrgenius.com',
  errorCorrectionLevel: 'M',
  margin: 2,
  fgColor: '#4F46E5',
  bgColor: '#FFFFFF',
  transparentBg: false,
  useGradient: false,
  gradientColor: '#7C3AED',
  gradientDirection: 'to-br',
  dotStyle: 'rounded',
  cornerSquareStyle: 'rounded',
  cornerDotStyle: 'rounded',
  customCornerColor: false,
  cornerSquareColor: '#4F46E5',
  cornerDotColor: '#4F46E5',
  logoSize: 22,
  logoPadding: 5,
  logoBgShape: 'rounded',
  logoBgColor: '#FFFFFF'
};

test('QR encoder produces a nonempty matrix for the production website URL', () => {
  const modules = getQRMatrix(config.content, config.errorCorrectionLevel);
  assert.ok(modules.size >= 21);
  assert.equal(modules.get(0, 0), true);
  assert.equal(modules.get(0, 6), true);
  assert.equal(modules.get(6, 0), true);
});

test('SVG export produces an image with the requested dimensions and QR modules', () => {
  for (const size of [512, 1024, 2048]) {
    const svg = renderQRToSVG(config, size);
    assert.match(svg, /<svg\b/);
    assert.ok(svg.includes(`viewBox="0 0 ${size} ${size}"`));
    assert.ok(svg.includes(`width="${size}" height="${size}"`));
    assert.match(svg, /<rect\b/);
    assert.match(svg, /<mask\b/);
    assert.ok(svg.includes('#4F46E5'));
  }
});

test('preview offers PNG, SVG and PDF exports, with a 1024px default PNG', () => {
  const html = renderToStaticMarkup(React.createElement(QRPreviewCard, {
    config, type: 'url', title: 'URL QR', lang: 'en', onHistoryUpdated: () => {}
  }));
  assert.match(html, /1024px/);
  assert.match(html, /SVG Vector/);
  assert.match(html, /Print PDF/);
  assert.match(html, /Select PNG resolution/);
});

test('empty QR input disables the download actions', () => {
  const html = renderToStaticMarkup(React.createElement(QRPreviewCard, {
    config: { ...config, content: '' },
    type: 'url', title: 'URL QR', lang: 'en', onHistoryUpdated: () => {}
  }));
  assert.match(html, /Enter your details to preview the QR code/);
  assert.match(html, /disabled=""/);
});
