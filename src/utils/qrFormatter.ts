import {
  QRType,
  WifiData,
  WhatsappData,
  EmailData,
  SmsData,
  MapsData,
  VCardData
} from '../types';

export function escapeWifiString(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/:/g, '\\:').replace(/,/g, '\\,');
}

export function formatUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export function formatWifi(data: WifiData): string {
  const { ssid, password, encryption, hidden } = data;
  if (!ssid?.trim() || (encryption !== 'nopass' && !password?.trim())) return '';
  const safeSsid = escapeWifiString(ssid || '');
  const safePassword = escapeWifiString(password || '');
  return `WIFI:T:${encryption};S:${safeSsid};P:${safePassword};H:${hidden ? 'true' : 'false'};;`;
}

export function formatWhatsapp(data: WhatsappData): string {
  const cleanPhone = (data.phoneNumber || '').replace(/[^\d+]/g, '');
  const cleanCode = (data.countryCode || '').replace(/[^\d+]/g, '');
  const fullNumber = cleanPhone.startsWith('+') ? cleanPhone.slice(1) : `${cleanCode.replace('+', '')}${cleanPhone}`;
  const msg = (data.message || '').trim();
  if (!cleanPhone.replace(/\D/g, '') || !fullNumber) return '';
  return msg ? `https://wa.me/${fullNumber}?text=${encodeURIComponent(msg)}` : `https://wa.me/${fullNumber}`;
}

export function formatEmail(data: EmailData): string {
  const { email, subject, body } = data;
  if (!email?.trim()) return '';
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  const query = params.length > 0 ? `?${params.join('&')}` : '';
  return `mailto:${email.trim()}${query}`;
}

export function formatPhone(phone: string): string {
  const clean = phone.trim().replace(/[^\d+]/g, '');
  return clean ? `tel:${clean}` : '';
}

export function formatSms(data: SmsData): string {
  const cleanPhone = (data.phoneNumber || '').trim().replace(/[^\d+]/g, '');
  const msg = (data.message || '').trim();
  return cleanPhone ? `smsto:${cleanPhone}:${msg}` : '';
}

export function formatInstagram(handleOrUrl: string): string {
  const trimmed = handleOrUrl.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  const handle = trimmed.replace(/^@/, '');
  return `https://instagram.com/${handle}`;
}

export function formatFacebook(handleOrUrl: string): string {
  const trimmed = handleOrUrl.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://facebook.com/${trimmed}`;
}

export function formatYouTube(urlOrId: string): string {
  const trimmed = urlOrId.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  if (trimmed.startsWith('@')) {
    return `https://youtube.com/${trimmed}`;
  }
  return `https://youtube.com/watch?v=${trimmed}`;
}

export function formatMaps(data: MapsData): string {
  if (data.locationType === 'coordinates') {
    const lat = data.latitude.trim();
    const lng = data.longitude.trim();
    if (!lat || !lng) return '';
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }
  const addr = data.address.trim();
  if (!addr) return '';
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr)}`;
}

function escapeVCardText(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/\r\n|\r|\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
}

export function formatVCard(data: VCardData): string {
  if (!Object.values(data).some(value => typeof value === 'string' && value.trim())) return '';
  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escapeVCardText(data.lastName || '')};${escapeVCardText(data.firstName || '')};;;`,
    `FN:${escapeVCardText(`${data.firstName || ''} ${data.lastName || ''}`.trim())}`
  ];

  if (data.company) lines.push(`ORG:${escapeVCardText(data.company)}`);
  if (data.jobTitle) lines.push(`TITLE:${escapeVCardText(data.jobTitle)}`);
  if (data.phone) lines.push(`TEL;TYPE=CELL:${escapeVCardText(data.phone)}`);
  if (data.workPhone) lines.push(`TEL;TYPE=WORK:${escapeVCardText(data.workPhone)}`);
  if (data.email) lines.push(`EMAIL:${escapeVCardText(data.email)}`);
  if (data.website) lines.push(`URL:${escapeVCardText(data.website)}`);
  if (data.street || data.city || data.state || data.zip || data.country) {
    lines.push(`ADR;TYPE=WORK:;;${escapeVCardText(data.street || '')};${escapeVCardText(data.city || '')};${escapeVCardText(data.state || '')};${escapeVCardText(data.zip || '')};${escapeVCardText(data.country || '')}`);
  }
  if (data.notes) lines.push(`NOTE:${escapeVCardText(data.notes)}`);

  lines.push('END:VCARD');
  return lines.join('\n');
}

export function formatPayload(type: QRType, raw: any): string {
  switch (type) {
    case 'url':
      return typeof raw === 'string' ? formatUrl(raw) : '';
    case 'text':
      return typeof raw === 'string' ? raw : '';
    case 'wifi':
      return formatWifi(raw);
    case 'whatsapp':
      return formatWhatsapp(raw);
    case 'email':
      return formatEmail(raw);
    case 'phone':
      return typeof raw === 'string' ? formatPhone(raw) : formatPhone(raw?.phone || '');
    case 'sms':
      return formatSms(raw);
    case 'instagram':
      return formatInstagram(typeof raw === 'string' ? raw : raw?.usernameOrUrl || '');
    case 'facebook':
      return formatFacebook(typeof raw === 'string' ? raw : raw?.usernameOrUrl || '');
    case 'youtube':
      return formatYouTube(typeof raw === 'string' ? raw : raw?.usernameOrUrl || '');
    case 'maps':
      return formatMaps(raw);
    case 'vcard':
      return formatVCard(raw);
    default:
      return String(raw || '');
  }
}
