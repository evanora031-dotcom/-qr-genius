import React, { useState } from 'react';
import { 
  Palette, 
  Shapes, 
  Image as ImageIcon, 
  Sliders, 
  Upload, 
  Trash2,
  Sparkles,
  Info
} from 'lucide-react';
import { 
  QRConfig, 
  Language, 
  DotStyle, 
  CornerSquareStyle, 
  CornerDotStyle, 
  ErrorCorrectionLevel 
} from '../../types';
import { translations } from '../../i18n/translations';
import { PRESET_LOGOS } from '../../utils/qrRenderer';

interface CustomizationPanelProps {
  config: QRConfig;
  onChangeConfig: (updated: Partial<QRConfig>) => void;
  lang: Language;
}

type TabType = 'colors' | 'shapes' | 'logo' | 'settings';

const COLOR_PRESETS = [
  { name: 'SaaS Indigo', fg: '#4F46E5', grad: '#7C3AED', bg: '#FFFFFF' },
  { name: 'Royal Violet', fg: '#6D28D9', grad: '#4338CA', bg: '#FFFFFF' },
  { name: 'Cyber Blue', fg: '#0284C7', grad: '#2563EB', bg: '#FFFFFF' },
  { name: 'Emerald Pro', fg: '#059669', grad: '#0D9488', bg: '#FFFFFF' },
  { name: 'Sunset Coral', fg: '#E11D48', grad: '#D97706', bg: '#FFFFFF' },
  { name: 'Modern Noir', fg: '#0F172A', grad: '#334155', bg: '#FFFFFF' },
];

// Advisory only: scan reliability also depends on size, lighting, and logo coverage.
const qrContrastRatio = (foreground: string, background: string): number | null => {
  const luminance = (hex: string): number | null => {
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return null;
    const rgb = [1, 3, 5].map((index) => {
      const channel = parseInt(hex.slice(index, index + 2), 16) / 255;
      return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    });
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  const fg = luminance(foreground);
  const bg = luminance(background);
  if (fg === null || bg === null) return null;
  return (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05);
};

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  config,
  onChangeConfig,
  lang
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('colors');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const t = translations[lang];
  const contrast = config.transparentBg ? null : qrContrastRatio(config.fgColor, config.bgColor);
  const gradientContrast = config.useGradient && !config.transparentBg
    ? qrContrastRatio(config.gradientColor, config.bgColor)
    : null;
  const lowContrast = (contrast !== null && contrast < 4.5)
    || (gradientContrast !== null && gradientContrast < 4.5);


  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    if (file.size > 2 * 1024 * 1024) {
      setUploadError(lang === 'ar' ? 'يرجى رفع صورة بحجم أقل من 2 ميجابايت.' : 'Please upload an image smaller than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onChangeConfig({
        logoUrl: result,
        logoPreset: undefined,
        // Raise error correction to Q or H when logo is uploaded
        errorCorrectionLevel: config.errorCorrectionLevel === 'L' || config.errorCorrectionLevel === 'M' ? 'Q' : config.errorCorrectionLevel
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPresetLogo = (presetKey: string) => {
    onChangeConfig({
      logoPreset: presetKey,
      logoUrl: undefined,
      errorCorrectionLevel: config.errorCorrectionLevel === 'L' || config.errorCorrectionLevel === 'M' ? 'Q' : config.errorCorrectionLevel
    });
  };

  const handleRemoveLogo = () => {
    onChangeConfig({
      logoUrl: undefined,
      logoPreset: undefined
    });
  };

  return (
    <div className="qr-studio-card w-full box-border bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Tab Navigation */}
      <div className="qr-customizer-tabs flex border-b border-slate-200 bg-slate-50/70 p-1 sm:p-1.5 gap-1 overflow-x-auto w-full box-border">
        <button
          type="button"
          onClick={() => setActiveTab('colors')}
          className={`qr-customizer-tab-btn flex-1 min-w-[64px] sm:min-w-[70px] flex items-center justify-center gap-1 sm:gap-1.5 py-2.5 px-1.5 sm:px-3 text-[11px] sm:text-xs font-bold rounded-xl transition-all min-h-[44px] ${
            activeTab === 'colors'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Palette className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{t.customizer.tabColors}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('shapes')}
          className={`qr-customizer-tab-btn flex-1 min-w-[64px] sm:min-w-[70px] flex items-center justify-center gap-1 sm:gap-1.5 py-2.5 px-1.5 sm:px-3 text-[11px] sm:text-xs font-bold rounded-xl transition-all min-h-[44px] ${
            activeTab === 'shapes'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Shapes className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{t.customizer.tabShapes}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('logo')}
          className={`qr-customizer-tab-btn flex-1 min-w-[64px] sm:min-w-[70px] flex items-center justify-center gap-1 sm:gap-1.5 py-2.5 px-1.5 sm:px-3 text-[11px] sm:text-xs font-bold rounded-xl transition-all min-h-[44px] ${
            activeTab === 'logo'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{t.customizer.tabLogo}</span>
          {(config.logoUrl || config.logoPreset) && (
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`qr-customizer-tab-btn flex-1 min-w-[64px] sm:min-w-[70px] flex items-center justify-center gap-1 sm:gap-1.5 py-2.5 px-1.5 sm:px-3 text-[11px] sm:text-xs font-bold rounded-xl transition-all min-h-[44px] ${
            activeTab === 'settings'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{t.customizer.tabSettings}</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-3.5 sm:p-6 w-full box-border">
        {/* TAB 1: COLORS */}
        {activeTab === 'colors' && (
          <div className="space-y-6">
            {lowContrast && (
              <p role="status" className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900">
                {lang === 'ar'
                  ? 'تنبيه: التباين بين ألوان الرمز والخلفية منخفض. قد يصعب مسح QR؛ جرّب لوناً داكناً على خلفية فاتحة واختبره بهاتفك.'
                  : lang === 'fr'
                    ? 'Attention : contraste faible. Le QR code peut être difficile à scanner. Essayez un premier plan foncé sur fond clair et testez-le.'
                    : lang === 'es'
                      ? 'Aviso: contraste bajo. El QR puede ser difícil de escanear. Prueba un color oscuro sobre fondo claro y escanéalo.'
                      : 'Low contrast: this QR code may be hard to scan. Try a dark foreground on a light background and test it with your phone.'}
              </p>
            )}
            {/* Quick Palettes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                {t.customizer.presets}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => onChangeConfig({
                      fgColor: preset.fg,
                      useGradient: true,
                      gradientColor: preset.grad,
                      bgColor: preset.bg,
                      transparentBg: false
                    })}
                    className="p-2 rounded-xl border border-slate-200 hover:border-indigo-400 bg-white flex items-center gap-2 transition-all text-left rtl:text-right"
                  >
                    <div 
                      className="w-5 h-5 rounded-lg shrink-0 shadow-xs" 
                      style={{ background: `linear-gradient(135deg, ${preset.fg}, ${preset.grad})` }}
                    />
                    <span className="text-xs font-semibold text-slate-700 truncate">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Solid or Gradient Pickers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              {/* Foreground Color */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.customizer.foreground}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.fgColor}
                    onChange={(e) => onChangeConfig({ fgColor: e.target.value })}
                    className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 p-0.5"
                  />
                  <input
                    type="text"
                    value={config.fgColor}
                    onChange={(e) => onChangeConfig({ fgColor: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-800"
                  />
                </div>
              </div>

              {/* Background Color */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.customizer.background}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.bgColor}
                    disabled={config.transparentBg}
                    onChange={(e) => onChangeConfig({ bgColor: e.target.value })}
                    className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 p-0.5 disabled:opacity-40"
                  />
                  <input
                    type="text"
                    value={config.bgColor}
                    disabled={config.transparentBg}
                    onChange={(e) => onChangeConfig({ bgColor: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 disabled:opacity-40"
                  />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="transparentBg"
                    checked={config.transparentBg}
                    onChange={(e) => onChangeConfig({ transparentBg: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                  />
                  <label htmlFor="transparentBg" className="text-xs text-slate-600 cursor-pointer select-none">
                    {t.customizer.transparentBg}
                  </label>
                </div>
              </div>
            </div>

            {/* Gradient Options */}
            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <label htmlFor="useGradient" className="text-xs font-bold text-slate-800 cursor-pointer">
                    {t.customizer.useGradient}
                  </label>
                </div>
                <input
                  type="checkbox"
                  id="useGradient"
                  checked={config.useGradient}
                  onChange={(e) => onChangeConfig({ useGradient: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
              </div>

              {config.useGradient && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      {t.customizer.gradientColor}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={config.gradientColor}
                        onChange={(e) => onChangeConfig({ gradientColor: e.target.value })}
                        className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200"
                      />
                      <input
                        type="text"
                        value={config.gradientColor}
                        onChange={(e) => onChangeConfig({ gradientColor: e.target.value })}
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-mono text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      {t.customizer.gradientDirection}
                    </label>
                    <select
                      value={config.gradientDirection}
                      onChange={(e) => onChangeConfig({ gradientDirection: e.target.value as any })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 bg-white"
                    >
                      <option value="to-br">{lang === 'ar' ? 'قطري (من أعلى اليسار إلى أسفل اليمين)' : 'Diagonal (Top-Left to Bottom-Right)'}</option>
                      <option value="to-r">{lang === 'ar' ? 'أفقي (من اليسار إلى اليمين)' : 'Horizontal (Left to Right)'}</option>
                      <option value="to-b">{lang === 'ar' ? 'عمودي (من الأعلى إلى الأسفل)' : 'Vertical (Top to Bottom)'}</option>
                      <option value="radial">{lang === 'ar' ? 'توهج دائري' : 'Radial Glow'}</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Custom Corner Colors */}
            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  {t.customizer.customCornerColors}
                </span>
                <input
                  type="checkbox"
                  id="customCornerColor"
                  checked={config.customCornerColor}
                  onChange={(e) => onChangeConfig({ customCornerColor: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
              </div>

              {config.customCornerColor && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      {t.customizer.cornerFrameColor}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={config.cornerSquareColor}
                        onChange={(e) => onChangeConfig({ cornerSquareColor: e.target.value })}
                        className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200"
                      />
                      <input
                        type="text"
                        value={config.cornerSquareColor}
                        onChange={(e) => onChangeConfig({ cornerSquareColor: e.target.value })}
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-mono text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      {t.customizer.cornerDotColor}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={config.cornerDotColor}
                        onChange={(e) => onChangeConfig({ cornerDotColor: e.target.value })}
                        className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200"
                      />
                      <input
                        type="text"
                        value={config.cornerDotColor}
                        onChange={(e) => onChangeConfig({ cornerDotColor: e.target.value })}
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-mono text-slate-800"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: SHAPES */}
        {activeTab === 'shapes' && (
          <div className="space-y-6">
            {/* Body Dot Pattern */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                {t.customizer.dotStyle}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'square', label: t.customizer.shapeSquare },
                  { id: 'dots', label: t.customizer.shapeDots },
                  { id: 'rounded', label: t.customizer.shapeRounded },
                  { id: 'extra-rounded', label: t.customizer.shapeExtraRounded },
                  { id: 'classy', label: t.customizer.shapeClassy },
                  { id: 'diamond', label: t.customizer.shapeDiamond },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onChangeConfig({ dotStyle: item.id as DotStyle })}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left rtl:text-right transition-all flex items-center justify-between ${
                      config.dotStyle === item.id
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {config.dotStyle === item.id && <span className="text-indigo-600">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Corner Frame Shape */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                {t.customizer.cornerFrame}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'square', label: t.customizer.shapeSquare },
                  { id: 'rounded', label: t.customizer.shapeRounded },
                  { id: 'extra-rounded', label: t.customizer.shapeExtraRounded },
                  { id: 'leaf', label: t.customizer.shapeLeaf },
                  { id: 'circle', label: t.customizer.shapeCircle },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onChangeConfig({ cornerSquareStyle: item.id as CornerSquareStyle })}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left rtl:text-right transition-all flex items-center justify-between ${
                      config.cornerSquareStyle === item.id
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {config.cornerSquareStyle === item.id && <span className="text-indigo-600">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Corner Eyeball Shape */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                {t.customizer.cornerDot}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'square', label: t.customizer.shapeSquare },
                  { id: 'dot', label: (lang === 'ar' ? 'دائرة / نقطة' : 'Circle / Dot') },
                  { id: 'rounded', label: t.customizer.shapeRounded },
                  { id: 'diamond', label: t.customizer.shapeDiamond },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onChangeConfig({ cornerDotStyle: item.id as CornerDotStyle })}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left rtl:text-right transition-all flex items-center justify-between ${
                      config.cornerDotStyle === item.id
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {config.cornerDotStyle === item.id && <span className="text-indigo-600">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LOGO */}
        {activeTab === 'logo' && (
          <div className="space-y-6">
            {/* Custom File Upload */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                {t.customizer.uploadLogo}
              </label>
              <div className="flex items-center gap-3">
                <label className="flex-1 flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-xl cursor-pointer bg-slate-50/50 hover:bg-indigo-50/30 transition-colors">
                  <Upload className="w-5 h-5 text-indigo-600 mb-1" />
                  <span className="text-xs font-semibold text-slate-700">Choose image file</span>
                  <span className="text-[10px] text-slate-600 mt-0.5">{t.customizer.uploadHint}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {(config.logoUrl || config.logoPreset) && (
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="p-3 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-semibold transition-colors flex flex-col items-center justify-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{t.customizer.removeLogo}</span>
                  </button>
                )}
              </div>
              {uploadError && (
                <p className="text-xs text-rose-600 font-medium mt-2 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                  {uploadError}
                </p>
              )}
            </div>

            {/* Built-in Brand Logo Presets */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                {t.customizer.logoPresets}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-2.5">
                {Object.keys(PRESET_LOGOS).map((key) => {
                  const isSelected = config.logoPreset === key && !config.logoUrl;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleSelectPresetLogo(key)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600'
                          : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                      }`}
                    >
                      <div 
                        className="w-7 h-7"
                        dangerouslySetInnerHTML={{ __html: PRESET_LOGOS[key] }}
                      />
                      <span className="text-[10px] font-medium capitalize text-slate-600 truncate w-full text-center">
                        {key}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Logo Formatting (Size, Padding, Shape) */}
            {(config.logoUrl || config.logoPreset) && (
              <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-4">
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
                    <span>{t.customizer.logoSize}</span>
                    <span>{config.logoSize}%</span>
                  </div>
                  <input
                    type="range"
                    min={12}
                    max={26}
                    value={config.logoSize}
                    onChange={(e) => onChangeConfig({ logoSize: Number(e.target.value) })}
                    className="w-full accent-indigo-600"
                  />
                  <span className="text-[10px] text-slate-600">Keep under 26% for 100% scan reliability</span>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
                    <span>{t.customizer.logoPadding}</span>
                    <span>{config.logoPadding}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={12}
                    value={config.logoPadding}
                    onChange={(e) => onChangeConfig({ logoPadding: Number(e.target.value) })}
                    className="w-full accent-indigo-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      {t.customizer.logoShape}
                    </label>
                    <select
                      value={config.logoBgShape}
                      onChange={(e) => onChangeConfig({ logoBgShape: e.target.value as any })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 bg-white"
                    >
                      <option value="rounded">Rounded Square</option>
                      <option value="circle">Circle</option>
                      <option value="square">Square</option>
                      <option value="none">None (Transparent)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      {t.customizer.logoBgColor}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={config.logoBgColor}
                        onChange={(e) => onChangeConfig({ logoBgColor: e.target.value })}
                        className="w-7 h-7 rounded cursor-pointer border border-slate-200"
                      />
                      <input
                        type="text"
                        value={config.logoBgColor}
                        onChange={(e) => onChangeConfig({ logoBgColor: e.target.value })}
                        className="flex-1 px-2 py-1 rounded border border-slate-200 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-1.5 text-[11px] text-indigo-700 bg-indigo-50 p-2.5 rounded-lg border border-indigo-100">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{t.customizer.ecRecommendedForLogo}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Error Correction Level */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                {t.customizer.errorCorrection}
              </label>
              <div className="space-y-2">
                {[
                  { level: 'L', label: t.customizer.ecLevelL },
                  { level: 'M', label: t.customizer.ecLevelM },
                  { level: 'Q', label: t.customizer.ecLevelQ },
                  { level: 'H', label: t.customizer.ecLevelH },
                ].map((item) => (
                  <label
                    key={item.level}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      config.errorCorrectionLevel === item.level
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="ecLevel"
                        value={item.level}
                        checked={config.errorCorrectionLevel === item.level}
                        onChange={() => onChangeConfig({ errorCorrectionLevel: item.level as ErrorCorrectionLevel })}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-xs font-semibold">{item.label}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-600 font-bold">
                      {item.level}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quiet Zone Margin */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-2">
                <span>{t.customizer.quietZone}</span>
                <span className="font-mono">{config.margin} modules</span>
              </div>
              <input
                type="range"
                min={0}
                max={5}
                step={1}
                value={config.margin}
                onChange={(e) => onChangeConfig({ margin: Number(e.target.value) })}
                className="w-full accent-indigo-600"
              />
              <p className="mt-1 text-[11px] text-slate-600">
                Quiet zone provides white padding around the QR code so mobile scanners easily separate it from background text.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
