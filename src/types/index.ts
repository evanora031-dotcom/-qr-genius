export type QRType = 
  | 'url' 
  | 'text' 
  | 'wifi' 
  | 'whatsapp' 
  | 'email' 
  | 'phone' 
  | 'sms' 
  | 'instagram' 
  | 'facebook' 
  | 'youtube' 
  | 'maps' 
  | 'vcard';

export type DotStyle = 
  | 'square' 
  | 'dots' 
  | 'rounded' 
  | 'classy' 
  | 'diamond' 
  | 'extra-rounded';

export type CornerSquareStyle = 
  | 'square' 
  | 'rounded' 
  | 'extra-rounded' 
  | 'leaf' 
  | 'circle';

export type CornerDotStyle = 
  | 'square' 
  | 'dot' 
  | 'rounded' 
  | 'diamond';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRConfig {
  content: string;
  errorCorrectionLevel: ErrorCorrectionLevel;
  margin: number;
  fgColor: string;
  bgColor: string;
  transparentBg: boolean;
  useGradient: boolean;
  gradientColor: string;
  gradientDirection: 'to-r' | 'to-b' | 'to-br' | 'radial';
  dotStyle: DotStyle;
  cornerSquareStyle: CornerSquareStyle;
  cornerDotStyle: CornerDotStyle;
  customCornerColor: boolean;
  cornerSquareColor: string;
  cornerDotColor: string;
  logoUrl?: string;
  logoPreset?: string;
  logoSize: number; // percentage 10 to 30
  logoPadding: number; // px padding
  logoBgShape: 'circle' | 'square' | 'rounded' | 'none';
  logoBgColor: string;
}

export interface QRHistoryItem {
  id: string;
  type: QRType;
  title: string;
  previewDataUrl: string;
  content: string;
  config: QRConfig;
  createdAt: number;
}

export type Language = 'en' | 'ar' | 'fr' | 'es';

export type PageId = 
  | 'home' 
  | 'generator' 
  | 'url' 
  | 'wifi' 
  | 'whatsapp' 
  | 'business'
  | 'text'
  | 'email'
  | 'phone'
  | 'sms'
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'maps'
  | 'about'
  | 'contact' 
  | 'privacy' 
  | 'terms' 
  | 'faq'
  | 'sitemap'
  | 'robots';

export interface VCardData {
  firstName: string;
  lastName: string;
  company: string;
  jobTitle: string;
  phone: string;
  workPhone: string;
  email: string;
  website: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  notes: string;
}

export interface WifiData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface WhatsappData {
  countryCode: string;
  phoneNumber: string;
  message: string;
}

export interface EmailData {
  email: string;
  subject: string;
  body: string;
}

export interface SmsData {
  phoneNumber: string;
  message: string;
}

export interface SocialData {
  usernameOrUrl: string;
}

export interface MapsData {
  locationType: 'address' | 'coordinates';
  address: string;
  latitude: string;
  longitude: string;
}
