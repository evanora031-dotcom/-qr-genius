import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ContactPage } from '../src/pages/ContactPage';
import type { Language } from '../src/types';

const render = (lang: Language = 'en') =>
  renderToStaticMarkup(React.createElement(ContactPage, { lang }));

test('mobile visitors see the contact form before secondary support information', () => {
  const html = render();
  const form = html.indexOf('<form');
  const support = html.indexOf('We Love Hearing From You');
  assert.ok(form >= 0 && support > form, 'The form must precede support information in document order');
  assert.match(html, /md:col-span-7 md:col-start-6 md:row-start-1/);
  assert.match(html, /md:col-span-5 md:col-start-1 md:row-start-1/);
  assert.match(html, /grid-cols-1 md:grid-cols-12/);
});

test('all visible form fields have associated accessible labels', () => {
  const html = render();
  for (const id of ['contact-name', 'contact-email', 'contact-topic', 'contact-message']) {
    assert.ok(html.includes(`for="${id}"`), `Missing label for ${id}`);
    assert.ok(html.includes(`id="${id}"`), `Missing input id ${id}`);
  }
  assert.match(html, /type="submit"/);
  assert.match(html, /min-h-11/);
});

test('contact form remains available in four supported languages', () => {
  assert.match(render('en'), /Send Message/);
  assert.match(render('ar'), /إرسال الرسالة/);
  assert.match(render('fr'), /Envoyer le message/);
  assert.match(render('es'), /Enviar mensaje/);
});

test('honeypot field remains hidden and does not enter keyboard navigation', () => {
  const html = render();
  assert.match(html, /name="company"[^>]*tabindex="-1"[^>]*aria-hidden="true"/);
});
