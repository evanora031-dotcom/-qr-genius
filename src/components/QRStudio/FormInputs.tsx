import React from 'react';
import { 
  RotateCcw, 
  Trash2, 
  Copy, 
  Check, 
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { 
  QRType, 
  Language, 
  WifiData, 
  WhatsappData, 
  EmailData, 
  SmsData, 
  MapsData, 
  VCardData 
} from '../../types';
import { translations } from '../../i18n/translations';

interface FormInputsProps {
  type: QRType;
  lang: Language;
  rawPayload: any;
  onChangePayload: (updated: any) => void;
  onClear: () => void;
  onReset: () => void;
  formattedContent: string;
}

export const FormInputs: React.FC<FormInputsProps> = ({
  type,
  lang,
  rawPayload,
  onChangePayload,
  onClear,
  onReset,
  formattedContent
}) => {
  const t = translations[lang];
  const [copied, setCopied] = React.useState(false);
  const [showWifiPassword, setShowWifiPassword] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateField = (field: string, val: any) => {
    if (typeof rawPayload === 'object' && rawPayload !== null) {
      onChangePayload({ ...rawPayload, [field]: val });
    } else {
      onChangePayload(val);
    }
  };

  return (
    <div className="qr-studio-card w-full box-border bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 sm:mb-5 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900">
          {t.qrTypes[type].label} Details
        </h3>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors min-h-[36px]"
            title={t.forms.clear}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.forms.clear}</span>
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors min-h-[36px]"
            title={t.forms.reset}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.forms.reset}</span>
          </button>
        </div>
      </div>

      {/* Dynamic Form fields by Type */}
      <div className="space-y-4">
        {/* 1. Website URL */}
        {type === 'url' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t.forms.urlLabel} <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="url"
                value={typeof rawPayload === 'string' ? rawPayload : ''}
                onChange={(e) => onChangePayload(e.target.value)}
                placeholder={t.forms.urlPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600 transition-colors"
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-400">
              Enter any standard webpage link (e.g. https://yourdomain.com/landing).
            </p>
          </div>
        )}

        {/* 2. Plain Text */}
        {type === 'text' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t.forms.textLabel} <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              value={typeof rawPayload === 'string' ? rawPayload : ''}
              onChange={(e) => onChangePayload(e.target.value)}
              placeholder={t.forms.textPlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600 transition-colors resize-y"
            />
            <div className="flex justify-between items-center mt-1 text-[11px] text-slate-400">
              <span>{lang === 'ar' ? 'يظهر النص مباشرةً عند مسح الرمز' : 'Plain text payload directly displayed upon scan'}</span>
              <span>{(rawPayload || '').length} {t.forms.characterCount}</span>
            </div>
          </div>
        )}

        {/* 3. Wi-Fi */}
        {type === 'wifi' && (
          (() => {
            const wifi = (rawPayload || {}) as WifiData;
            return (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.forms.ssid} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={wifi.ssid || ''}
                    onChange={(e) => updateField('ssid', e.target.value)}
                    placeholder={lang === 'ar' ? 'مثال: Office_Guest_5G' : 'e.g. Office_Guest_5G'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.forms.password}
                    </label>
                    <div className="relative">
                      <input
                        type={showWifiPassword ? 'text' : 'password'}
                        value={wifi.password || ''}
                        disabled={wifi.encryption === 'nopass'}
                        onChange={(e) => updateField('password', e.target.value)}
                        placeholder={lang === 'ar' ? 'كلمة مرور الشبكة' : 'Network password'}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600 disabled:bg-slate-100"
                      />
                      {wifi.encryption !== 'nopass' && (
                        <button
                          type="button"
                          onClick={() => setShowWifiPassword(!showWifiPassword)}
                          className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showWifiPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.forms.encryption}
                    </label>
                    <select
                      value={wifi.encryption || 'WPA'}
                      onChange={(e) => updateField('encryption', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                    >
                      <option value="WPA">{lang === 'ar' ? 'WPA / WPA2 / WPA3 (قياسي)' : 'WPA / WPA2 / WPA3 (Standard)'}</option>
                      <option value="WEP">{lang === 'ar' ? 'WEP (قديم)' : 'WEP (Legacy)'}</option>
                      <option value="nopass">{lang === 'ar' ? 'بدون تشفير (شبكة مفتوحة)' : 'None (Open Network)'}</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="wifiHidden"
                    checked={Boolean(wifi.hidden)}
                    onChange={(e) => updateField('hidden', e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                  />
                  <label htmlFor="wifiHidden" className="text-xs text-slate-700 select-none cursor-pointer">
                    {t.forms.hiddenNetwork} (SSID is not broadcasted)
                  </label>
                </div>
              </div>
            );
          })()
        )}

        {/* 4. WhatsApp */}
        {type === 'whatsapp' && (
          (() => {
            const wa = (rawPayload || {}) as WhatsappData;
            return (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.forms.countryCode} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={wa.countryCode || '+1'}
                      onChange={(e) => updateField('countryCode', e.target.value)}
                      placeholder="+1"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.forms.phoneNumber} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={wa.phoneNumber || ''}
                      onChange={(e) => updateField('phoneNumber', e.target.value)}
                      placeholder={lang === 'ar' ? 'مثال: 5550192834' : 'e.g. 5550192834'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.forms.message}
                  </label>
                  <textarea
                    rows={3}
                    value={wa.message || ''}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder={lang === 'ar' ? 'مرحباً! أود معرفة المزيد عن خدماتكم...' : 'Hello! I would like more information about your services...'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600 resize-y"
                  />
                </div>
              </div>
            );
          })()
        )}

        {/* 5. Email */}
        {type === 'email' && (
          (() => {
            const emailData = (rawPayload || {}) as EmailData;
            return (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.forms.emailTo} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={emailData.email || ''}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="contact@yourcompany.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.forms.subject}
                  </label>
                  <input
                    type="text"
                    value={emailData.subject || ''}
                    onChange={(e) => updateField('subject', e.target.value)}
                    placeholder={lang === 'ar' ? 'استفسار / ملاحظات' : 'Inquiry / Feedback'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.forms.body}
                  </label>
                  <textarea
                    rows={3}
                    value={emailData.body || ''}
                    onChange={(e) => updateField('body', e.target.value)}
                    placeholder={lang === 'ar' ? 'أتواصل معكم بخصوص...' : 'Hello, I am reaching out regarding...'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600 resize-y"
                  />
                </div>
              </div>
            );
          })()
        )}

        {/* 6. Phone Call */}
        {type === 'phone' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t.forms.phoneNumber} <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              value={typeof rawPayload === 'string' ? rawPayload : (rawPayload?.phone || '')}
              onChange={(e) => onChangePayload(e.target.value)}
              placeholder="+1 (555) 234-5678"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
            />
            <p className="mt-1 text-[11px] text-slate-400">
              When scanned, phones will immediately prompt to dial this number.
            </p>
          </div>
        )}

        {/* 7. SMS */}
        {type === 'sms' && (
          (() => {
            const sms = (rawPayload || {}) as SmsData;
            return (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.forms.phoneNumber} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={sms.phoneNumber || ''}
                    onChange={(e) => updateField('phoneNumber', e.target.value)}
                    placeholder="+1 555 987 6543"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.forms.message}
                  </label>
                  <textarea
                    rows={3}
                    value={sms.message || ''}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder={lang === 'ar' ? 'أدخل نص الرسالة القصيرة هنا...' : 'Enter pre-filled SMS message text here...'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600 resize-y"
                  />
                </div>
              </div>
            );
          })()
        )}

        {/* 8. Instagram */}
        {type === 'instagram' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Instagram Username or Profile Link <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={typeof rawPayload === 'string' ? rawPayload : (rawPayload?.usernameOrUrl || '')}
              onChange={(e) => onChangePayload(e.target.value)}
              placeholder="@username or https://instagram.com/username"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
            />
          </div>
        )}

        {/* 9. Facebook */}
        {type === 'facebook' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Facebook Page or Profile Link <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={typeof rawPayload === 'string' ? rawPayload : (rawPayload?.usernameOrUrl || '')}
              onChange={(e) => onChangePayload(e.target.value)}
              placeholder="e.g. yourbrand or https://facebook.com/yourbrand"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
            />
          </div>
        )}

        {/* 10. YouTube */}
        {type === 'youtube' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              YouTube Channel, Video Link, or ID <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={typeof rawPayload === 'string' ? rawPayload : (rawPayload?.usernameOrUrl || '')}
              onChange={(e) => onChangePayload(e.target.value)}
              placeholder="https://youtube.com/watch?v=... or @channel"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
            />
          </div>
        )}

        {/* 11. Google Maps */}
        {type === 'maps' && (
          (() => {
            const maps = (rawPayload || { locationType: 'address' }) as MapsData;
            return (
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="mapsMode"
                      value="address"
                      checked={maps.locationType !== 'coordinates'}
                      onChange={() => updateField('locationType', 'address')}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>{lang === 'ar' ? 'البحث عن عنوان / مكان' : 'Search Address / Place'}</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="mapsMode"
                      value="coordinates"
                      checked={maps.locationType === 'coordinates'}
                      onChange={() => updateField('locationType', 'coordinates')}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>{lang === 'ar' ? 'إحداثيات GPS (خط العرض / الطول)' : 'GPS Coordinates (Lat / Lng)'}</span>
                  </label>
                </div>

                {maps.locationType === 'coordinates' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        {t.forms.latitude} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={maps.latitude || ''}
                        onChange={(e) => updateField('latitude', e.target.value)}
                        placeholder="37.7749"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        {t.forms.longitude} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={maps.longitude || ''}
                        onChange={(e) => updateField('longitude', e.target.value)}
                        placeholder="-122.4194"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.forms.address} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={maps.address || ''}
                      onChange={(e) => updateField('address', e.target.value)}
                      placeholder={lang === 'ar' ? 'مثال: برج إيفل، باريس' : 'e.g. Empire State Building, New York, NY'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                    />
                  </div>
                )}
              </div>
            );
          })()
        )}

        {/* 12. vCard Contact */}
        {type === 'vcard' && (
          (() => {
            const vc = (rawPayload || {}) as VCardData;
            return (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.forms.firstName} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={vc.firstName || ''}
                      onChange={(e) => updateField('firstName', e.target.value)}
                      placeholder="Alex"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.forms.lastName}
                    </label>
                    <input
                      type="text"
                      value={vc.lastName || ''}
                      onChange={(e) => updateField('lastName', e.target.value)}
                      placeholder="Morgan"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.forms.company}
                    </label>
                    <input
                      type="text"
                      value={vc.company || ''}
                      onChange={(e) => updateField('company', e.target.value)}
                      placeholder="Apex Digital Inc."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.forms.jobTitle}
                    </label>
                    <input
                      type="text"
                      value={vc.jobTitle || ''}
                      onChange={(e) => updateField('jobTitle', e.target.value)}
                      placeholder="Chief Architect"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.forms.phoneNumber} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={vc.phone || ''}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+1 (555) 902-1234"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.forms.emailTo}
                    </label>
                    <input
                      type="email"
                      value={vc.email || ''}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.forms.website}
                    </label>
                    <input
                      type="url"
                      value={vc.website || ''}
                      onChange={(e) => updateField('website', e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.forms.city} &amp; {t.forms.country}
                    </label>
                    <input
                      type="text"
                      value={vc.city ? `${vc.city}${vc.country ? `, ${vc.country}` : ''}` : ''}
                      onChange={(e) => {
                        const parts = e.target.value.split(',');
                        updateField('city', parts[0]?.trim() || '');
                        if (parts[1]) updateField('country', parts[1].trim());
                      }}
                      placeholder="New York, USA"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.forms.notes}
                  </label>
                  <input
                    type="text"
                    value={vc.notes || ''}
                    onChange={(e) => updateField('notes', e.target.value)}
                    placeholder={lang === 'ar' ? 'امسح الرمز لحفظ جهة الاتصال على الهاتف مباشرةً' : 'Scan to save to mobile contacts directly'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                  />
                </div>
              </div>
            );
          })()
        )}
      </div>

      {/* Raw payload preview & Copy */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 min-w-0 max-w-full overflow-hidden">
          <AlertCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
          <span className="font-mono text-[11px] truncate block w-full">{formattedContent}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 font-semibold shrink-0 self-start sm:self-auto min-h-[36px] px-2 py-1 rounded-lg hover:bg-indigo-50 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? t.forms.copied : t.forms.copyContent}</span>
        </button>
      </div>
    </div>
  );
};
