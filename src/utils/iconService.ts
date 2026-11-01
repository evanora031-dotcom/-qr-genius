import React from 'react';
import { QRType } from '../types';
import { 
  Category3DIcon, 
  CATEGORY_3D_ICONS,
  Url3DIcon,
  Wifi3DIcon,
  Whatsapp3DIcon,
  VCard3DIcon,
  Text3DIcon,
  Email3DIcon,
  Phone3DIcon,
  Sms3DIcon,
  Instagram3DIcon,
  Facebook3DIcon,
  Youtube3DIcon,
  Maps3DIcon
} from '../components/icons/Category3DIcon';

export type IconStyleMode = '3d' | 'flat';

export interface CategoryIconMetadata {
  type: QRType;
  title: string;
  themeColor: string;
  gradient: [string, string];
  description3D: string;
}

export const CATEGORY_ICON_METADATA: Record<QRType, CategoryIconMetadata> = {
  url: {
    type: 'url',
    title: 'Website URL',
    themeColor: '#4F46E5',
    gradient: ['#818CF8', '#1E1B4B'],
    description3D: '3D glass digital globe with floating orbital link ring'
  },
  wifi: {
    type: 'wifi',
    title: 'Wi-Fi Network',
    themeColor: '#9333EA',
    gradient: ['#C084FC', '#581C87'],
    description3D: '3D floating wireless signal beacon with dimensional pulse waves'
  },
  whatsapp: {
    type: 'whatsapp',
    title: 'WhatsApp Chat',
    themeColor: '#22C55E',
    gradient: ['#4ADE80', '#14532D'],
    description3D: '3D glossy emerald chat sphere with dimensional phone handset'
  },
  vcard: {
    type: 'vcard',
    title: 'vCard Contact',
    themeColor: '#0284C7',
    gradient: ['#38BDF8', '#0369A1'],
    description3D: '3D floating identification badge with avatar relief and lanyard'
  },
  text: {
    type: 'text',
    title: 'Plain Text',
    themeColor: '#6366F1',
    gradient: ['#818CF8', '#312E81'],
    description3D: '3D layered isometric notebook with dimensional stylus pencil'
  },
  email: {
    type: 'email',
    title: 'Email',
    themeColor: '#7C3AED',
    gradient: ['#A855F7', '#5B21B6'],
    description3D: '3D glossy floating envelope with dimensional letter insert'
  },
  phone: {
    type: 'phone',
    title: 'Phone Call',
    themeColor: '#059669',
    gradient: ['#34D399', '#064E3B'],
    description3D: '3D rounded calling shield with radio acoustic waves'
  },
  sms: {
    type: 'sms',
    title: 'SMS Message',
    themeColor: '#0284C7',
    gradient: ['#38BDF8', '#4F46E5'],
    description3D: '3D overlapping dual chat capsules with glossy reply dots'
  },
  instagram: {
    type: 'instagram',
    title: 'Instagram',
    themeColor: '#E1306C',
    gradient: ['#F59E0B', '#8B5CF6'],
    description3D: '3D sunset-gradient camera housing with convex optical lens'
  },
  facebook: {
    type: 'facebook',
    title: 'Facebook',
    themeColor: '#2563EB',
    gradient: ['#60A5FA', '#1E40AF'],
    description3D: '3D beveled sapphire social cube with embossed lettermark'
  },
  youtube: {
    type: 'youtube',
    title: 'YouTube',
    themeColor: '#E11D48',
    gradient: ['#FF4D4D', '#9F1239'],
    description3D: '3D cinema screen with beveled play tetrahedron'
  },
  maps: {
    type: 'maps',
    title: 'Google Maps',
    themeColor: '#EF4444',
    gradient: ['#F87171', '#991B1B'],
    description3D: '3D isometric terrain map block with glowing red marker pin'
  }
};

/**
 * Service to retrieve a 3D icon React element for any QR type
 */
export function getCategory3DIcon(
  type: QRType, 
  size: number = 48, 
  className: string = ''
): React.ReactElement {
  return React.createElement(Category3DIcon, { type, size, className });
}

/**
 * Get category 3D styling metadata
 */
export function getCategoryMetadata(type: QRType): CategoryIconMetadata {
  return CATEGORY_ICON_METADATA[type] || CATEGORY_ICON_METADATA.url;
}

export {
  Category3DIcon,
  CATEGORY_3D_ICONS,
  Url3DIcon,
  Wifi3DIcon,
  Whatsapp3DIcon,
  VCard3DIcon,
  Text3DIcon,
  Email3DIcon,
  Phone3DIcon,
  Sms3DIcon,
  Instagram3DIcon,
  Facebook3DIcon,
  Youtube3DIcon,
  Maps3DIcon
};
