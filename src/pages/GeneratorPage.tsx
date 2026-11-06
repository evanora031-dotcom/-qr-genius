import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  HelpCircle,
  FileCode,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { 
  QRType, 
  QRConfig, 
  Language, 
  PageId,
  WifiData,
  WhatsappData,
  EmailData,
  SmsData,
  MapsData,
  VCardData
} from '../types';
import { translations } from '../i18n/translations';
import { TypeSelector } from '../components/QRStudio/TypeSelector';
import { FormInputs } from '../components/QRStudio/FormInputs';
import { CustomizationPanel } from '../components/QRStudio/CustomizationPanel';
import { QRPreviewCard } from '../components/QRStudio/QRPreviewCard';
import { formatPayload } from '../utils/qrFormatter';
import { AdPlacement } from '../components/AdPlacement';


type GuideTool = 'url' | 'wifi' | 'whatsapp' | 'business';

const GUIDE_LINKS: { page: GuideTool; path: string }[] = [
  { page: 'url', path: '/tools/url' },
  { page: 'wifi', path: '/tools/wifi' },
  { page: 'whatsapp', path: '/tools/whatsapp' },
  { page: 'business', path: '/tools/business-vcard' }
];

const GENERATOR_GUIDE: Record<Language, {
  heading: string;
  intro: string;
  steps: [string, string, string];
  relatedHeading: string;
  relatedIntro: string;
  tools: Record<GuideTool, { title: string; description: string }>;
}> = {
  en: {
    heading: 'How to create a QR code for free',
    intro: 'Create a static QR code for a link, Wi-Fi network, WhatsApp conversation or contact card. Your QR content is generated in your browser; you can customize its appearance before downloading it.',
    steps: [
      'Choose a QR code type and enter the destination or details you want to share.',
      'Customize the colors, dot style or logo, then check the preview for readability.',
      'Download the QR code as PNG, SVG or PDF, and scan it with your phone before sharing or printing.'
    ],
    relatedHeading: 'Choose the right QR code generator',
    relatedIntro: 'Prefer a simpler form? Open a dedicated tool for the information you want to share.',
    tools: {
      url: { title: 'URL to QR code', description: 'Turn a website or online menu link into a scannable code.' },
      wifi: { title: 'Wi-Fi QR code', description: 'Help guests connect to your wireless network.' },
      whatsapp: { title: 'WhatsApp QR code', description: 'Open a chat with an optional pre-filled message.' },
      business: { title: 'vCard QR code', description: 'Share a digital contact card with your details.' }
    }
  },
  ar: {
    heading: 'كيفية إنشاء رمز QR مجاناً',
    intro: 'أنشئ رمز QR ثابتاً لرابط أو شبكة واي فاي أو محادثة واتساب أو بطاقة اتصال. تتم معالجة محتوى الرمز داخل متصفحك، ويمكنك تخصيص شكله قبل تنزيله.',
    steps: [
      'اختر نوع رمز QR وأدخل الرابط أو المعلومات التي تريد مشاركتها.',
      'خصّص الألوان أو شكل النقاط أو الشعار، وتحقق من وضوح المعاينة.',
      'نزّل الرمز بصيغة PNG أو SVG أو PDF، وامسحه بهاتفك قبل المشاركة أو الطباعة.'
    ],
    relatedHeading: 'اختر أداة إنشاء رمز QR المناسبة',
    relatedIntro: 'هل تريد نموذجاً أبسط؟ انتقل إلى الأداة المتخصصة حسب نوع المعلومات.',
    tools: {
      url: { title: 'تحويل الرابط إلى QR', description: 'حوّل رابط موقع أو قائمة طعام إلكترونية إلى رمز قابل للمسح.' },
      wifi: { title: 'رمز QR للواي فاي', description: 'سهّل اتصال الضيوف بشبكتك اللاسلكية.' },
      whatsapp: { title: 'رمز QR لواتساب', description: 'افتح محادثة مع رسالة اختيارية جاهزة.' },
      business: { title: 'رمز QR لبطاقة vCard', description: 'شارك بطاقة اتصال رقمية تتضمن بياناتك.' }
    }
  },
  fr: {
    heading: 'Comment créer un QR code gratuit',
    intro: 'Créez un QR code statique pour un lien, un réseau Wi-Fi, une conversation WhatsApp ou une carte de contact. Le contenu est généré dans votre navigateur et vous pouvez personnaliser le code avant de le télécharger.',
    steps: [
      'Choisissez un type de QR code et saisissez le lien ou les informations à partager.',
      'Personnalisez les couleurs, les points ou le logo, puis vérifiez la lisibilité de l’aperçu.',
      'Téléchargez le code en PNG, SVG ou PDF et scannez-le avec votre téléphone avant de le partager ou de l’imprimer.'
    ],
    relatedHeading: 'Choisissez le générateur de QR code adapté',
    relatedIntro: 'Vous préférez un formulaire plus simple ? Utilisez un outil dédié.',
    tools: {
      url: { title: 'QR code pour URL', description: 'Transformez un site ou un menu en ligne en QR code.' },
      wifi: { title: 'QR code Wi-Fi', description: 'Facilitez la connexion de vos invités au réseau.' },
      whatsapp: { title: 'QR code WhatsApp', description: 'Ouvrez une conversation avec un message facultatif.' },
      business: { title: 'QR code vCard', description: 'Partagez une carte de contact numérique.' }
    }
  },
  es: {
    heading: 'Cómo crear un código QR gratis',
    intro: 'Crea un código QR estático para un enlace, una red Wi-Fi, una conversación de WhatsApp o una tarjeta de contacto. El contenido se genera en tu navegador y puedes personalizarlo antes de descargarlo.',
    steps: [
      'Elige el tipo de código QR e introduce el enlace o los datos que quieras compartir.',
      'Personaliza los colores, los puntos o el logotipo y comprueba la vista previa.',
      'Descarga el código en PNG, SVG o PDF y escanéalo con tu teléfono antes de compartirlo o imprimirlo.'
    ],
    relatedHeading: 'Elige el generador de códigos QR adecuado',
    relatedIntro: '¿Prefieres un formulario sencillo? Abre una herramienta especializada.',
    tools: {
      url: { title: 'QR para enlaces URL', description: 'Convierte un sitio web o menú digital en un código QR.' },
      wifi: { title: 'Código QR Wi-Fi', description: 'Facilita la conexión de invitados a tu red.' },
      whatsapp: { title: 'Código QR WhatsApp', description: 'Abre un chat con un mensaje opcional.' },
      business: { title: 'Código QR vCard', description: 'Comparte una tarjeta de contacto digital.' }
    }
  }
};

interface GeneratorPageProps {
  initialType?: QRType;
  lang: Language;
  onNavigate: (page: PageId) => void;
  onHistoryUpdated: () => void;
  externalConfigToLoad?: QRConfig | null;
  externalTypeToLoad?: QRType | null;
}

const DEFAULT_CONFIG: QRConfig = {
  content: 'https://getqrgenius.com',
  errorCorrectionLevel: 'M',
  margin: 2,
  fgColor: '#4F46E5',
  bgColor: '#FFFFFF',
  transparentBg: false,
  useGradient: true,
  gradientColor: '#7C3AED',
  gradientDirection: 'to-br',
  dotStyle: 'rounded',
  cornerSquareStyle: 'rounded',
  cornerDotStyle: 'rounded',
  customCornerColor: false,
  cornerSquareColor: '#4F46E5',
  cornerDotColor: '#4F46E5',
  logoUrl: undefined,
  logoPreset: undefined,
  logoSize: 22,
  logoPadding: 5,
  logoBgShape: 'rounded',
  logoBgColor: '#FFFFFF',
};

const DEFAULT_PAYLOADS: Record<QRType, any> = {
  url: 'https://getqrgenius.com',
  text: 'Hello from QR GENIUS! Create. Scan. Connect.',
  wifi: { ssid: 'MyHomeWiFi', password: 'SecretPassword123', encryption: 'WPA', hidden: false } as WifiData,
  whatsapp: { countryCode: '+1', phoneNumber: '5550192834', message: 'Hello! I scanned your QR code.' } as WhatsappData,
  email: { email: 'support@getqrgenius.com', subject: 'Inquiry from QR Code', body: 'Hello QR GENIUS team,' } as EmailData,
  phone: '+15552345678',
  sms: { phoneNumber: '+15559876543', message: 'Hi there! Scanned your SMS QR code.' } as SmsData,
  instagram: 'qrgeniusapp',
  facebook: 'qrgenius',
  youtube: 'https://youtube.com/@qrgenius',
  maps: { locationType: 'address', address: 'Times Square, New York, NY', latitude: '40.7580', longitude: '-73.9855' } as MapsData,
  vcard: {
    firstName: 'Alex',
    lastName: 'Morgan',
    company: 'Apex Digital Inc.',
    jobTitle: 'Product Director',
    phone: '+1 (555) 902-1234',
    workPhone: '+1 (555) 902-5678',
    email: 'alex.morgan@example.com',
    website: 'https://example.com',
    street: '100 Innovation Way',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107',
    country: 'USA',
    notes: 'Director of Platform Engineering at Apex Digital'
  } as VCardData
};

export const GeneratorPage: React.FC<GeneratorPageProps> = ({
  initialType = 'url',
  lang,
  onNavigate,
  onHistoryUpdated,
  externalConfigToLoad,
  externalTypeToLoad
}) => {
  const [selectedType, setSelectedType] = useState<QRType>(initialType);
  const [rawPayloads, setRawPayloads] = useState<Record<QRType, any>>(DEFAULT_PAYLOADS);
  const [config, setConfig] = useState<QRConfig>(DEFAULT_CONFIG);

  const t = translations[lang];
  const guide = GENERATOR_GUIDE[lang];

  // Handle external loading from history
  useEffect(() => {
    if (externalConfigToLoad && externalTypeToLoad) {
      setSelectedType(externalTypeToLoad);
      setConfig(externalConfigToLoad);
      // Synchronize payload
      setRawPayloads(prev => ({
        ...prev,
        [externalTypeToLoad]: externalConfigToLoad.content
      }));
    }
  }, [externalConfigToLoad, externalTypeToLoad]);

  // If initialType prop changes
  useEffect(() => {
    if (initialType) {
      setSelectedType(initialType);
    }
  }, [initialType]);

  // Recalculate formatted string when payload or type changes
  useEffect(() => {
    const raw = rawPayloads[selectedType];
    const formatted = formatPayload(selectedType, raw);
    setConfig(prev => ({ ...prev, content: formatted }));
  }, [selectedType, rawPayloads]);

  const handleSelectType = (newType: QRType) => {
    setSelectedType(newType);
    const raw = rawPayloads[newType];
    const formatted = formatPayload(newType, raw);
    setConfig(prev => ({ ...prev, content: formatted }));
  };

  const handleUpdatePayload = (updated: any) => {
    setRawPayloads(prev => ({ ...prev, [selectedType]: updated }));
  };

  const handleUpdateConfig = (partial: Partial<QRConfig>) => {
    setConfig(prev => ({ ...prev, ...partial }));
  };

  const handleClearCurrent = () => {
    const emptyValues: Record<QRType, any> = {
      url: '',
      text: '',
      wifi: { ssid: '', password: '', encryption: 'WPA', hidden: false },
      whatsapp: { countryCode: '+1', phoneNumber: '', message: '' },
      email: { email: '', subject: '', body: '' },
      phone: '',
      sms: { phoneNumber: '', message: '' },
      instagram: '',
      facebook: '',
      youtube: '',
      maps: { locationType: 'address', address: '', latitude: '', longitude: '' },
      vcard: {
        firstName: '', lastName: '', company: '', jobTitle: '', phone: '',
        workPhone: '', email: '', website: '', street: '', city: '', state: '',
        zip: '', country: '', notes: ''
      }
    };
    handleUpdatePayload(emptyValues[selectedType]);
  };

  const handleResetCurrent = () => {
    handleUpdatePayload(DEFAULT_PAYLOADS[selectedType]);
    setConfig({
      ...DEFAULT_CONFIG,
      content: formatPayload(selectedType, DEFAULT_PAYLOADS[selectedType])
    });
  };

  return (
    <div className="qr-studio-wrapper py-3 sm:py-6 lg:py-12 bg-slate-50/50 min-h-screen overflow-x-hidden w-full box-border">
      <div className="qr-studio-container max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 space-y-4 sm:space-y-6 lg:space-y-8 w-full box-border">
        {/* Breadcrumb / Top Zone */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 pb-3 sm:pb-4 border-b border-slate-200 text-left rtl:text-right w-full box-border">
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-500 mb-0.5 sm:mb-1 flex-wrap">
              <button 
                onClick={() => onNavigate('home')} 
                className="hover:text-indigo-600 transition-colors"
              >
                {t.nav.home}
              </button>
              <span>/</span>
              <span className="font-semibold text-indigo-600">{t.nav.studio}</span>
              <span>/</span>
              <span className="text-slate-700 font-bold">{t.qrTypes[selectedType].label}</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              {lang === 'ar' ? 'مولد رموز QR مجاني مع تخصيص التصميم' : lang === 'fr' ? 'Générateur de QR codes gratuit et personnalisable' : lang === 'es' ? 'Generador de códigos QR gratis y personalizable' : 'Free QR Code Generator & Designer'}
            </h1>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold text-slate-700 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
              <span>{lang === 'ar' ? 'محرك معالجة محلي' : lang === 'fr' ? 'Traitement local dans le navigateur' : lang === 'es' ? 'Procesamiento local en el navegador' : 'Client-Side Local Engine'}</span>
            </div>
          </div>
        </div>

        {/* 1. Type Selector Grid */}
        <TypeSelector
          selectedType={selectedType}
          onSelectType={handleSelectType}
          lang={lang}
        />

        {/* 2. Main Studio Workspace: Form & Customizer (Left) + Preview & Export (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start w-full box-border">
          {/* Left Column: Input Form & Customization Panels */}
          <div className="lg:col-span-7 space-y-4 lg:space-y-6 w-full box-border">
            {/* Input Form */}
            <FormInputs
              type={selectedType}
              lang={lang}
              rawPayload={rawPayloads[selectedType]}
              onChangePayload={handleUpdatePayload}
              onClear={handleClearCurrent}
              onReset={handleResetCurrent}
              formattedContent={config.content}
            />

            {/* Visual Customization Panel */}
            <CustomizationPanel
              config={config}
              onChangeConfig={handleUpdateConfig}
              lang={lang}
            />
          </div>

          {/* Right Column: Live QR Preview & Export System (Sticky on Desktop) */}
          <div className="lg:col-span-5 w-full box-border">
            <QRPreviewCard
              config={config}
              type={selectedType}
              title={t.qrTypes[selectedType].label}
              lang={lang}
              onHistoryUpdated={onHistoryUpdated}
            />
          </div>
        </div>

        {/* Crawlable, helpful guidance and direct links to specialized QR tools. */}
        <section aria-labelledby="generator-guide-heading" className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 space-y-5">
          <div className="max-w-3xl space-y-3">
            <h2 id="generator-guide-heading" className="text-xl sm:text-2xl font-bold text-slate-900">
              {guide.heading}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">{guide.intro}</p>
            <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700 leading-relaxed">
              {guide.steps.map((step) => <li key={step}>{step}</li>)}
            </ol>
          </div>
          <nav aria-label={guide.relatedHeading} className="border-t border-slate-200 pt-5 space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">{guide.relatedHeading}</h2>
            <p className="text-sm text-slate-600">{guide.relatedIntro}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GUIDE_LINKS.map(({ page, path }) => (
                <a
                  key={page}
                  href={lang === 'en' ? path : `/${lang}${path}`}
                  onClick={(event) => {
                    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                    event.preventDefault();
                    onNavigate(page);
                  }}
                  className="block rounded-xl border border-slate-200 p-4 hover:border-indigo-300 hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 transition-colors"
                >
                  <span className="block text-sm font-semibold text-indigo-700">{guide.tools[page].title}</span>
                  <span className="block mt-1 text-xs text-slate-600 leading-relaxed">{guide.tools[page].description}</span>
                </a>
              ))}
            </div>
          </nav>
        </section>

        {/* Monetization Slot */}
        <AdPlacement lang={lang} format="horizontal-leaderboard" />
      </div>
    </div>
  );
};
