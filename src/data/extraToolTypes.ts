import type { QRType } from '../types';

/**
 * Landing pages for QR types that already exist in the studio but did not
 * have their own indexable URL. Each id doubles as the PageId and the QRType.
 */
export const EXTRA_TOOL_IDS = [
  'text',
  'email',
  'phone',
  'sms',
  'instagram',
  'facebook',
  'youtube',
  'maps'
] as const;

export type ExtraToolId = typeof EXTRA_TOOL_IDS[number];

export const EXTRA_TOOL_PATHS: Record<ExtraToolId, string> = {
  text: '/tools/text',
  email: '/tools/email',
  phone: '/tools/phone',
  sms: '/tools/sms',
  instagram: '/tools/instagram',
  facebook: '/tools/facebook',
  youtube: '/tools/youtube',
  maps: '/tools/maps'
};

export const EXTRA_TOOL_QR_TYPES: Record<ExtraToolId, QRType> = {
  text: 'text',
  email: 'email',
  phone: 'phone',
  sms: 'sms',
  instagram: 'instagram',
  facebook: 'facebook',
  youtube: 'youtube',
  maps: 'maps'
};

export interface ExtraToolMeta {
  title: string;
  description: string;
  keywords: string;
  h1: string;
}

export interface ExtraToolPage {
  badge: string;
  title: string;
  subtitle: string;
  benefits: string[];
  faqs: { q: string; a: string }[];
}

export interface ExtraToolCopy {
  heading: string;
  body: string;
  steps: string[];
  tip: string;
}

export interface ExtraToolLocale {
  /** Short label used in footer / related-tool links. */
  label: string;
  meta: ExtraToolMeta;
  page: ExtraToolPage;
  copy: ExtraToolCopy;
}

export type ExtraToolContent = Record<ExtraToolId, ExtraToolLocale>;
