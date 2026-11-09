import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { CustomizationPanel } from '../src/components/QRStudio/CustomizationPanel';
import type { QRConfig } from '../src/types';

const config: QRConfig = {
  content: 'https://getqrgenius.com',
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

const render = (overrides: Partial<QRConfig> = {}, lang: 'en' | 'ar' = 'en') =>
  renderToStaticMarkup(React.createElement(CustomizationPanel, {
    config: { ...config, ...overrides },
    onChangeConfig: () => {},
    lang
  }));

test('high contrast QR colors do not show a warning', () => {
  assert.doesNotMatch(render(), /Low contrast:/);
});

test('low contrast QR colors show a warning', () => {
  assert.match(render({ fgColor: '#EEEEEE' }), /Low contrast:/);
});

test('low contrast gradient endpoint shows a warning', () => {
  assert.match(render({ useGradient: true, gradientColor: '#EEEEEE' }), /Low contrast:/);
});

test('warning is localized in Arabic', () => {
  assert.match(render({ fgColor: '#EEEEEE' }, 'ar'), /التباين/);
});

test('transparent backgrounds do not trigger an unreliable contrast warning', () => {
  assert.doesNotMatch(render({ transparentBg: true, fgColor: '#EEEEEE' }), /Low contrast:/);
});
