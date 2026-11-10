import React, { useEffect, useRef, useState } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  Scan, 
  FileCode, 
  FileText, 
  Bookmark, 
  CheckCircle2, 
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { QRConfig, Language, QRType } from '../../types';
import { translations } from '../../i18n/translations';
import { 
  renderQRToCanvas, 
  renderQRToSVG, 
  downloadCanvasPNG, 
  downloadSVG, 
  downloadPrintablePDF, 
  copyCanvasToClipboard 
} from '../../utils/qrRenderer';
import { saveToHistory } from '../../utils/storage';
import { trackEvent } from '../../utils/analytics';

interface QRPreviewCardProps {
  config: QRConfig;
  type: QRType;
  title: string;
  lang: Language;
  onHistoryUpdated: () => void;
}

export const QRPreviewCard: React.FC<QRPreviewCardProps> = ({
  config,
  type,
  title,
  lang,
  onHistoryUpdated
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [pngResolution, setPngResolution] = useState<number>(1024);
  const [showResMenu, setShowResMenu] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [renderError, setRenderError] = useState(false);
  const [actionError, setActionError] = useState('');

  const t = translations[lang];
  const hasContent = Boolean(config.content && config.content.trim());
  const canUseQR = hasContent && !loading && !renderError && Boolean(canvasRef.current);
  const exportErrorText = lang === 'ar'
    ? 'تعذّر تنفيذ العملية. حاول مجدداً.'
    : lang === 'fr'
      ? 'Impossible de terminer cette action. Réessayez.'
      : lang === 'es'
        ? 'No se pudo completar la acción. Inténtalo de nuevo.'
        : 'Could not complete this action. Please try again.';

  // Render QR Code onto DOM
  useEffect(() => {
    let active = true;
    if (!hasContent) {
      canvasRef.current = null;
      if (containerRef.current) containerRef.current.innerHTML = '';
      setRenderError(false);
      setActionError('');
      setShowResMenu(false);
      setShowScanModal(false);
      setLoading(false);
      return () => { active = false; };
    }

    setLoading(true);
    setRenderError(false);
    setActionError('');

    renderQRToCanvas(config, 512)
      .then((generatedCanvas) => {
        if (!active) return;
        canvasRef.current = generatedCanvas;

        if (containerRef.current) {
          containerRef.current.innerHTML = '';
          generatedCanvas.className = 'qr-preview-canvas w-full h-auto max-w-[280px] sm:max-w-[320px] rounded-xl shadow-xs mx-auto';
          containerRef.current.appendChild(generatedCanvas);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        console.error('QR Render error:', err);
        canvasRef.current = null;
        if (containerRef.current) containerRef.current.innerHTML = '';
        setRenderError(true);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [config, hasContent]);

  // Handle PNG Download at selected resolution
  const handleDownloadPNG = async (resolution: number = pngResolution) => {
    if (!canUseQR) return;
    setActionError('');
    setLoading(true);
    try {
      const exportCanvas = await renderQRToCanvas(config, resolution);
      const filename = `qrgenius_${type}_${Date.now()}.png`;
      downloadCanvasPNG(exportCanvas, filename);
      trackEvent('qr_code_downloaded', { qr_type: type, format: 'png', resolution });
      autoSaveHistory(exportCanvas);
    } catch (e) {
      console.error(e);
      setActionError(exportErrorText);
    } finally {
      setLoading(false);
      setShowResMenu(false);
    }
  };

  // Handle SVG Download
  const handleDownloadSVG = () => {
    if (!canUseQR) return;
    setActionError('');
    try {
      const svgStr = renderQRToSVG(config, 1000);
      const filename = `qrgenius_${type}_${Date.now()}.svg`;
      downloadSVG(svgStr, filename);
      trackEvent('qr_code_downloaded', { qr_type: type, format: 'svg' });
      if (canvasRef.current) autoSaveHistory(canvasRef.current);
    } catch (e) {
      console.error(e);
      setActionError(exportErrorText);
    }
  };

  // Handle PDF Download
  const handleDownloadPDF = async () => {
    if (!canUseQR) return;
    setActionError('');
    setLoading(true);
    try {
      const exportCanvas = await renderQRToCanvas(config, 1500);
      const filename = `qrgenius_${type}_${Date.now()}.pdf`;
      await downloadPrintablePDF(exportCanvas, filename, {
        title: title || 'Scan QR Code',
        typeLabel: t.qrTypes[type].label,
        content: config.content
      });
      trackEvent('qr_code_downloaded', { qr_type: type, format: 'pdf' });
      autoSaveHistory(exportCanvas);
    } catch (e) {
      console.error(e);
      setActionError(exportErrorText);
    } finally {
      setLoading(false);
    }
  };

  // Copy Image to Clipboard
  const handleCopyImage = async () => {
    if (!canUseQR || !canvasRef.current) return;
    setActionError('');
    try {
      const ok = await copyCanvasToClipboard(canvasRef.current);
      if (ok) {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2500);
      } else {
        await navigator.clipboard.writeText(config.content);
        setActionError(lang === 'ar'
          ? 'تعذّر نسخ الصورة، فتم نسخ بيانات الرمز كنص بدلاً منها.'
          : lang === 'fr'
            ? 'Image non prise en charge : les données ont été copiées en texte.'
            : lang === 'es'
              ? 'No se pudo copiar la imagen; se copiaron los datos como texto.'
              : 'Image copy unavailable; QR data was copied as text instead.');
      }
    } catch (e) {
      console.error(e);
      setActionError(exportErrorText);
    }
  };

  // Auto-save or Manual save to localStorage
  const autoSaveHistory = (canvas: HTMLCanvasElement) => {
    try {
      const preview = canvas.toDataURL('image/png', 0.5);
      saveToHistory({
        type,
        title: title || config.content.slice(0, 30),
        previewDataUrl: preview,
        content: config.content,
        config
      });
      onHistoryUpdated();
      return true;
    } catch (e) {
      console.warn('Could not auto-save to history:', e);
      return false;
    }
  };

  const handleManualSave = () => {
    if (!canUseQR || !canvasRef.current) return;
    setActionError('');
    if (autoSaveHistory(canvasRef.current)) {
      trackEvent('qr_code_saved', { qr_type: type });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } else {
      setActionError(exportErrorText);
    }
  };

  return (
    <div className="qr-studio-card qr-preview-wrapper w-full box-border bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm flex flex-col justify-between lg:sticky lg:top-24 overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
            {t.preview.title}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
            {lang === 'ar' ? 'مباشر' : 'Live'}
          </span>
        </div>
        <button
          type="button"
          onClick={handleManualSave}
            disabled={!canUseQR}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title={lang === 'ar' ? 'حفظ في سجل المتصفح المحلي' : 'Save to local browser history'}
        >
          {saveSuccess ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-600">{lang === 'ar' ? 'تم الحفظ' : 'Saved'}</span>
            </>
          ) : (
            <>
              <Bookmark className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'حفظ' : 'Save'}</span>
            </>
          )}
        </button>
      </div>

      {/* QR Canvas Display */}
      <div className="qr-preview-canvas-box w-full box-border flex flex-col items-center justify-center p-3 sm:p-6 bg-slate-50 rounded-2xl border border-slate-100 my-2 relative min-h-[220px] sm:min-h-[280px]">
        {loading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center z-10 rounded-2xl">
            <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <div ref={containerRef} className="flex items-center justify-center" />
        {!hasContent && (
          <p className="mt-3 max-w-xs text-center text-xs text-slate-500" role="status">
            {lang === 'ar' ? 'أدخل بياناتك أولاً لعرض رمز QR. ستُفعّل أزرار التنزيل بعد إنشاء الرمز.' : lang === 'fr' ? 'Saisissez vos données pour afficher le QR code et activer les téléchargements.' : lang === 'es' ? 'Introduce tus datos para mostrar el QR y activar las descargas.' : 'Enter your details to preview the QR code and enable downloads.'}
          </p>
        )}
        {renderError && (
          <p className="mt-3 max-w-xs text-center text-xs text-red-700" role="alert">
            {lang === 'ar' ? 'تعذّر إنشاء المعاينة. تحقق من البيانات وحاول مجدداً.' : lang === 'fr' ? 'Impossible de générer l’aperçu. Vérifiez les données et réessayez.' : lang === 'es' ? 'No se pudo generar la vista previa. Revisa los datos e inténtalo de nuevo.' : 'Could not generate the preview. Check your input and try again.'}
          </p>
        )}

        <div className="mt-4 text-center">
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
            <Scan className="w-3.5 h-3.5 text-indigo-500" />
            <span>{t.preview.liveScanHint}</span>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 mt-4">
        {/* Primary Download PNG with Resolution Selector */}
        <div className="relative">
          <div className="flex rounded-xl shadow-xs overflow-hidden">
            <button
              type="button"
              onClick={() => handleDownloadPNG(pngResolution)}
            disabled={!canUseQR}
              className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              <span>{t.preview.downloadPng} ({pngResolution}px)</span>
            </button>
            <button
              type="button"
              onClick={() => setShowResMenu(!showResMenu)}
            disabled={!canUseQR}
              className="px-3 bg-indigo-700 hover:bg-indigo-800 text-white border-l border-indigo-500 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={lang === 'ar' ? 'اختيار دقة PNG' : 'Select PNG resolution'}
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {showResMenu && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowResMenu(false)} />
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-40 text-xs text-slate-700">
                <button
                  type="button"
                  onClick={() => { setPngResolution(512); handleDownloadPNG(512); }}
                  className="w-full text-left rtl:text-right px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700 flex justify-between"
                >
                  <span>{t.preview.resolutionStandard}</span>
                  <span className="text-slate-600 font-mono">512×512</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setPngResolution(1024); handleDownloadPNG(1024); }}
                  className="w-full text-left rtl:text-right px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700 flex justify-between font-semibold text-indigo-600"
                >
                  <span>{t.preview.resolutionHigh}</span>
                  <span className="text-indigo-500 font-mono">1024×1024</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setPngResolution(2048); handleDownloadPNG(2048); }}
                  className="w-full text-left rtl:text-right px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700 flex justify-between"
                >
                  <span>{t.preview.resolutionUltra}</span>
                  <span className="text-slate-600 font-mono">2048×2048</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Secondary Downloads: SVG & PDF */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleDownloadSVG}
            disabled={!canUseQR}
            className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            title={lang === 'ar' ? 'تنزيل SVG متجهي بدقة قابلة للتكبير' : 'Download infinite resolution vector SVG'}
          >
            <FileCode className="w-3.5 h-3.5 text-indigo-600" />
            <span>{lang === 'ar' ? 'ملف SVG متجهي' : 'SVG Vector'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={!canUseQR}
            className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            title={lang === 'ar' ? 'تنزيل ملف PDF للطباعة بحجم A4' : 'Download printable A4 card PDF'}
          >
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            <span>{lang === 'ar' ? 'طباعة PDF' : 'Print PDF'}</span>
          </button>
        </div>

        {/* Quick Utility Actions: Copy Image & Verify */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={handleCopyImage}
            disabled={!canUseQR}
            className="py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5 border border-slate-200/60 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {copySuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">{lang === 'ar' ? 'تم النسخ!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>{t.preview.copyImage}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowScanModal(true)}
            disabled={!canUseQR}
            className="py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5 border border-slate-200/60 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Scan className="w-3.5 h-3.5 text-slate-500" />
            <span>{t.preview.testScanner}</span>
          </button>
        </div>
      </div>

      {actionError && (
        <p className="mt-3 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2" role="alert">
          {actionError}
        </p>
      )}

      {/* Scan & Verification Modal */}
      {showScanModal && hasContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-slate-900 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Scan className="w-4 h-4 text-indigo-600" />
                <span>{lang === 'ar' ? 'مساعد التحقق من رمز QR' : 'QR Verification Helper'}</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowScanModal(false)}
                className="text-slate-600 hover:text-slate-800 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              {lang === 'ar' ? 'امسح هذا الرمز باستخدام كاميرا iOS أو Google Lens أو أي قارئ QR. فيما يلي البيانات المشفّرة داخل الرمز:' : 'Scan this code with an iOS Camera, Google Lens, or any QR scanner. Below is the exact payload encoded into the code:'}
            </p>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mb-3 font-mono text-[11px] text-slate-800 break-all max-h-28 overflow-y-auto">
              {config.content}
            </div>

            {/* Smart Payload Diagnostics */}
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100 mb-3 text-xs text-emerald-800 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-900">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{lang === 'ar' ? 'بيانات الرمز جاهزة للاختبار' : lang === 'fr' ? 'Données du QR prêtes à tester' : lang === 'es' ? 'Datos del QR listos para probar' : 'QR data ready to test'}</span>
              </div>
              <p className="text-[11px] text-emerald-700 leading-normal">
                {lang === 'ar' ? 'هذه معاينة للبيانات المشفّرة، وليست نتيجة فحص بالكاميرا. امسح الرمز بهاتفك للتأكد من عمله.' : lang === 'fr' ? 'Ceci est un aperçu des données, pas un test de lecture. Scannez le QR avec votre téléphone pour vérifier.' : lang === 'es' ? 'Esta es una vista previa de los datos, no una prueba de escaneo. Escanea el QR con tu móvil para verificarlo.' : 'This previews the encoded data; it is not a camera scan test. Scan with your phone to verify it.'}
              </p>
              <p className="text-[11px] text-emerald-700 leading-normal">
                {type === 'wifi' && (lang === 'ar' ? 'يعرض خيار الاتصال بشبكة Wi-Fi مباشرةً على أجهزة iOS وAndroid.' : 'Triggers instant "Join Wi-Fi Network" prompt on iOS & Android devices.')}
                {type === 'vcard' && (lang === 'ar' ? 'يعرض خيار إضافة جهة الاتصال أو إنشاء جهة جديدة على iOS وAndroid.' : 'Triggers native "Add to Contacts / Create New Contact" on iOS & Android.')}
                {type === 'whatsapp' && (lang === 'ar' ? 'يفتح محادثة واتساب مباشرةً دون الحاجة إلى حفظ رقم الهاتف أولاً.' : 'Opens WhatsApp chat directly without saving phone number first.')}
                {type === 'url' && (lang === 'ar' ? 'يفتح وجهة الويب مباشرةً في متصفح الهاتف الافتراضي.' : 'Opens web destination directly in default mobile browser.')}
                {type !== 'wifi' && type !== 'vcard' && type !== 'whatsapp' && type !== 'url' && (lang === 'ar' ? 'بيانات متوافقة مع المعايير ويمكن قراءتها بكاميرات الهواتف الحديثة.' : 'Standard compliant payload readable by any modern smartphone camera.')}
              </p>
            </div>

            <div className="text-[11px] text-slate-500 space-y-1 mb-4">
              <div className="flex items-center justify-between">
                <span>{lang === 'ar' ? 'مستوى تصحيح الأخطاء' : 'Error Correction Level'}</span>
                <span className="font-semibold text-slate-700">Level {config.errorCorrectionLevel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{lang === 'ar' ? 'المواصفة' : 'Specification'}</span>
                <span className="font-semibold text-slate-700">ISO/IEC 18004 {lang === 'ar' ? 'المعيار' : 'Standard'}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(config.content);
                  setShowScanModal(false);
                }}
                className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'نسخ البيانات' : 'Copy Payload'}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowScanModal(false)}
                className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                {lang === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
