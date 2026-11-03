import React, { useState } from 'react';
import { 
  Globe, 
  FileText, 
  Wifi, 
  MessageSquare, 
  Mail, 
  Phone, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  Youtube, 
  MapPin, 
  Contact,
  Box,
  Layers
} from 'lucide-react';
import { QRType, Language } from '../../types';
import { translations } from '../../i18n/translations';
import { Category3DIcon } from '../icons/Category3DIcon';

interface TypeSelectorProps {
  selectedType: QRType;
  onSelectType: (type: QRType) => void;
  lang: Language;
}

const FLAT_ICONS: Record<QRType, React.ElementType> = {
  url: Globe,
  text: FileText,
  wifi: Wifi,
  whatsapp: MessageSquare,
  email: Mail,
  phone: Phone,
  sms: MessageCircle,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  maps: MapPin,
  vcard: Contact
};

const ORDERED_TYPES: QRType[] = [
  'url',
  'wifi',
  'whatsapp',
  'vcard',
  'text',
  'email',
  'phone',
  'sms',
  'instagram',
  'facebook',
  'youtube',
  'maps'
];

export const TypeSelector: React.FC<TypeSelectorProps> = ({
  selectedType,
  onSelectType,
  lang
}) => {
  const [iconMode, setIconMode] = useState<'3d' | 'flat'>('3d');
  const t = translations[lang];

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {lang === 'ar' ? 'اختر نوع رمز QR' : 'Select QR Code Type'}
          </label>
          <span className="hidden sm:inline text-slate-400 text-xs ml-2">· {lang === 'ar' ? '12 فئة' : '12 Categories'}</span>
        </div>

        {/* 3D vs Flat Style Toggle */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg self-start sm:self-auto border border-slate-200">
          <button
            type="button"
            onClick={() => setIconMode('3d')}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
              iconMode === '3d'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Box className="w-3 h-3" />
            <span>{lang === 'ar' ? 'أيقونات ثلاثية الأبعاد' : '3D Icons'}</span>
          </button>
          <button
            type="button"
            onClick={() => setIconMode('flat')}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
              iconMode === 'flat'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>{lang === 'ar' ? 'ثنائية الأبعاد' : 'Flat 2D'}</span>
          </button>
        </div>
      </div>

      <div className="qr-type-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-2.5 w-full box-border">
        {ORDERED_TYPES.map((type) => {
          const FlatIcon = FLAT_ICONS[type];
          const isSelected = selectedType === type;
          const info = t.qrTypes[type];

          return (
            <button
              key={type}
              type="button"
              onClick={() => onSelectType(type)}
              className={`qr-type-card w-full box-border p-2.5 sm:p-3 rounded-2xl border text-left rtl:text-right transition-all flex flex-col justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 min-h-[86px] sm:min-h-[96px] ${
                isSelected
                  ? 'bg-indigo-50/90 border-indigo-600 text-indigo-950 shadow-sm shadow-indigo-100 ring-1 ring-indigo-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-slate-50/90 hover:shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                {iconMode === '3d' ? (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
                    <Category3DIcon type={type} size={34} animateHover={false} />
                  </div>
                ) : (
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-700'
                    }`}
                  >
                    <FlatIcon className="w-4 h-4" />
                  </div>
                )}

                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-indigo-200" />
                )}
              </div>

              <div className="w-full min-w-0">
                <div className="text-xs font-bold truncate text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {info.label}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                  {info.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
