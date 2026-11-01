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

interface GeneratorPageProps {
  initialType?: QRType;
  lang: Language;
  onNavigate: (page: PageId) => void;
  onHistoryUpdated: () => void;
  externalConfigToLoad?: QRConfig | null;
  externalTypeToLoad?: QRType | null;
}

const DEFAULT_CONFIG: QRConfig = {
  content: 'https://qrgenius.app',
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
  url: 'https://qrgenius.app',
  text: 'Hello from QR GENIUS! Create. Scan. Connect.',
  wifi: { ssid: 'MyHomeWiFi', password: 'SecretPassword123', encryption: 'WPA', hidden: false } as WifiData,
  whatsapp: { countryCode: '+1', phoneNumber: '5550192834', message: 'Hello! I scanned your QR code.' } as WhatsappData,
  email: { email: 'hello@qrgenius.app', subject: 'Inquiry from QR Code', body: 'Hello QR GENIUS team,' } as EmailData,
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
              QR Code Studio &amp; Designer
            </h1>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold text-slate-700 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
              <span>Client-Side Local Engine</span>
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

        {/* Monetization Slot */}
        <AdPlacement lang={lang} format="horizontal-leaderboard" />
      </div>
    </div>
  );
};
