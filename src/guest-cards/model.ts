import { formatWhatsapp } from '../utils/qrFormatter';
import { copy } from './copy';
export type Lang = keyof typeof copy;
export const languages = Object.keys(copy) as Lang[];
export const isLang = (value: string | null): value is Lang => languages.includes(value as Lang);
export interface Card { venue: string; sample?: boolean; room: string; phone: string; desk: Lang; mask: number }
export function validVenue(value: string) {
  return value.length > 0 && [...value].length <= 48 && !/[<>\p{Cc}\p{Cf}]/u.test(value);
}
function digits(value: string) {
  return value.replace(/[٠-٩]/g, c => String(c.charCodeAt(0)-1632));
}
export function phoneNumber(input: string) {
  const phone = digits(input).replace(/[ ()-]/g, '').replace(/^\+|^00/, '');
  return /^[1-9]\d{6,14}$/.test(phone) ? phone : '';
}
export function roomNumbers(input: string) {
  const rooms = new Set<string>();
  for (const token of digits(input).split(/[,،]/)) {
    const m = /^(\d{1,4})(?:\s*-\s*(\d{1,4}))?$/.exec(token.trim());
    if (!m) return [];
    if (!m[2]) rooms.add(m[1]);
    else {
      const start = Number(m[1]), end = Number(m[2]);
      if (end < start || end-start >= 50) return [];
      for (let n=start; n<=end; n++) rooms.add(m[1].startsWith('0') ? String(n).padStart(m[1].length,'0') : String(n));
    }
    if (rooms.size > 50) return [];
  }
  return [...rooms];
}
export function guestLink(card: Card) {
  const fragment = new URLSearchParams({venue:card.venue, room:card.room, phone:card.phone, desk:card.desk, requests:String(card.mask)});
  if (card.sample) fragment.set('demo','1');
  // Preview proofs must scan back into the same tested build before production release.
  const preview = typeof location !== 'undefined' && /^https:\/\/[a-z0-9-]+\.qr-genius-1on\.pages\.dev$/.test(location.origin);
  const origin = preview ? location.origin : 'https://getqrgenius.com';
  const url=origin+'/tools/guest-connect#'+fragment;
  if (url.length > 550) throw new Error('Card URL too long');
  return url;
}
export function readCard(hash: string): Card | null {
  if (hash.length > 550) return null;
  const p=new URLSearchParams(hash.replace(/^#/, ''));
  const room=p.get('room') || '', phone=p.get('phone') || '', desk=p.get('desk'), mask=Number(p.get('requests'));
  const venue=p.get('venue') || '';
  if (!validVenue(venue) || !/^\d{1,4}$/.test(room) || !phone || phoneNumber(phone)!==phone || !isLang(desk) || !Number.isInteger(mask) || mask<1 || mask>15) return null;
  return {venue,room,phone,desk,mask,...(p.get('demo')==='1'?{sample:true}:{})};
}
export function message(card: Card, guest: Lang, request: number) {
  return card.venue+'\n'+[...new Set([guest,card.desk])].map(lang=>copy[lang].room+' '+card.room+' · '+copy[lang].messages[request]).join('\n');
}

export function chatLink(card: Card, guest: Lang, request: number) {
  if (card.sample || !(card.mask & (1 << request))) return null;
  return formatWhatsapp({countryCode:'',phoneNumber:card.phone,message:message(card,guest,request)});
}
