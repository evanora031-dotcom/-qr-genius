import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  formatPayload,
  formatUrl,
  formatWifi,
  formatWhatsapp,
  formatEmail,
  formatPhone,
  formatSms,
  formatInstagram,
  formatFacebook,
  formatYouTube,
  formatMaps,
  formatVCard
} from '../src/utils/qrFormatter';

const blankVCard = {
  firstName: '', lastName: '', company: '', jobTitle: '', phone: '',
  workPhone: '', email: '', website: '', street: '', city: '',
  state: '', zip: '', country: '', notes: ''
};

test('blank URL and invalid URL payload do not generate placeholder codes', () => {
  assert.equal(formatUrl('  '), '');
  assert.equal(formatPayload('url', undefined), '');
  assert.equal(formatUrl('example.com'), 'https://example.com');
  assert.equal(formatUrl('https://example.com'), 'https://example.com');
});

test('Wi-Fi requires a network name and a password for secured networks', () => {
  assert.equal(formatWifi({ ssid: '', password: 'secret', encryption: 'WPA', hidden: false }), '');
  assert.equal(formatWifi({ ssid: 'Office', password: '', encryption: 'WPA', hidden: false }), '');
  assert.equal(formatWifi({ ssid: 'Office', password: '', encryption: 'nopass', hidden: false }), 'WIFI:T:nopass;S:Office;P:;H:false;;');
  assert.match(formatWifi({ ssid: 'Guest', password: 'secret', encryption: 'WPA', hidden: false }), /^WIFI:T:WPA;S:Guest;P:secret;/);
});

test('WhatsApp requires a phone number beyond the country prefix', () => {
  assert.equal(formatWhatsapp({ countryCode: '+1', phoneNumber: '', message: 'Hello' }), '');
  assert.equal(formatWhatsapp({ countryCode: '+1', phoneNumber: '5550192834', message: 'Hello' }), 'https://wa.me/15550192834?text=Hello');
});

test('empty email, phone and SMS inputs do not produce unusable links', () => {
  assert.equal(formatEmail({ email: '', subject: 'Hi', body: '' }), '');
  assert.equal(formatPhone('  '), '');
  assert.equal(formatSms({ phoneNumber: '', message: 'Hi' }), '');
  assert.equal(formatEmail({ email: 'test@example.com', subject: 'Hello', body: '' }), 'mailto:test@example.com?subject=Hello');
  assert.equal(formatPhone('+1 (555) 019-2834'), 'tel:+15550192834');
  assert.equal(formatSms({ phoneNumber: '1234', message: 'Hello' }), 'smsto:1234:Hello');
});

test('blank social media inputs do not generate fake destination URLs', () => {
  assert.equal(formatInstagram(' '), '');
  assert.equal(formatFacebook(' '), '');
  assert.equal(formatYouTube(' '), '');
  assert.equal(formatInstagram('@qrgenius'), 'https://instagram.com/qrgenius');
  assert.equal(formatFacebook('qrgenius'), 'https://facebook.com/qrgenius');
  assert.equal(formatYouTube('@qrgenius'), 'https://youtube.com/@qrgenius');
});

test('maps require complete coordinates or a nonempty address', () => {
  assert.equal(formatMaps({ locationType: 'coordinates', latitude: '', longitude: '-73.9', address: '' }), '');
  assert.equal(formatMaps({ locationType: 'coordinates', latitude: '40.7', longitude: '', address: '' }), '');
  assert.equal(formatMaps({ locationType: 'address', latitude: '', longitude: '', address: ' ' }), '');
  assert.match(formatMaps({ locationType: 'coordinates', latitude: '0', longitude: '0', address: '' }), /query=0,0$/);
  assert.match(formatMaps({ locationType: 'address', latitude: '', longitude: '', address: 'New York' }), /query=New%20York$/);
});

test('blank vCards do not produce an empty contact record', () => {
  assert.equal(formatVCard(blankVCard), '');
  assert.match(formatVCard({ ...blankVCard, firstName: 'Alex' }), /FN:Alex/);
});

test('clearing each QR type returns an empty preview payload', () => {
  const emptyCases: [Parameters<typeof formatPayload>[0], unknown][] = [
    ['url', ''], ['text', ''], ['wifi', { ssid: '', password: '', encryption: 'WPA', hidden: false }],
    ['whatsapp', { countryCode: '+1', phoneNumber: '', message: '' }],
    ['email', { email: '', subject: '', body: '' }], ['phone', ''],
    ['sms', { phoneNumber: '', message: '' }], ['instagram', ''],
    ['facebook', ''], ['youtube', ''],
    ['maps', { locationType: 'address', address: '', latitude: '', longitude: '' }],
    ['vcard', blankVCard]
  ];
  for (const [type, input] of emptyCases) {
    assert.equal(formatPayload(type, input), '', `Unexpected content for cleared ${type}`);
  }
});
