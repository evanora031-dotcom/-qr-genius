import QRCode from 'qrcode';
import type { Language, WifiData } from '../types';
import { formatWifi } from './qrFormatter';

export const wifiSignLabels = {
  en: { button: 'Download printable guest Wi-Fi sign (SVG)', title: 'Guest Wi-Fi', scan: 'Scan to join the network', error: 'Could not create the sign. Check the network details and try again.' },
  fr: { button: 'Télécharger l’affiche Wi-Fi à imprimer (SVG)', title: 'Wi-Fi invité', scan: 'Scannez pour rejoindre le réseau', error: 'Vérifiez les informations du réseau et réessayez.' },
  es: { button: 'Descargar cartel Wi-Fi para imprimir (SVG)', title: 'Wi-Fi para invitados', scan: 'Escanea para conectarte a la red', error: 'Comprueba los datos de la red y vuelve a intentarlo.' },
  ar: { button: 'تنزيل لافتة Wi-Fi للطباعة (SVG)', title: 'شبكة الضيوف', scan: 'امسح الرمز للاتصال بالشبكة', error: 'تعذّر إنشاء اللافتة. تحقق من بيانات الشبكة وحاول مجدداً.' }
};

export async function makeWifiSign(data: WifiData, lang: Language): Promise<string> {
  const content = formatWifi(data);
  if (!content) throw new Error('Missing Wi-Fi details');
  const qr = await QRCode.toString(content, { type: 'svg', margin: 4, errorCorrectionLevel: 'M' });
  const labels = wifiSignLabels[lang];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="148mm" height="210mm" viewBox="0 0 148 210" xml:lang="${lang}">
    <title>${labels.title}</title>
    <rect width="148" height="210" fill="white"/>
    <g font-family="sans-serif" text-anchor="middle" fill="#172033" direction="${lang === 'ar' ? 'rtl' : 'ltr'}">
      <text x="74" y="39" font-size="10" font-weight="bold">${labels.title}</text>
      <text x="74" y="163" font-size="6">${labels.scan}</text>
    </g>
    <svg x="29" y="56" width="90" height="90">${qr}</svg>
  </svg>`;
}
