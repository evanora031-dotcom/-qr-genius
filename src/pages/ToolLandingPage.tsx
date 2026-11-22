import { toolsByLanguage } from '../content/toolLanding';
import { SEO_METADATA } from '../utils/seo';
import React, { useState } from 'react';
import { 
  Globe, 
  Wifi, 
  MessageSquare, 
  Contact, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  Download,
  Share2
} from 'lucide-react';
import { Language, PageId, QRConfig, QRType } from '../types';
import { translations } from '../i18n/translations';
import { AdPlacement } from '../components/AdPlacement';
import { FormInputs } from '../components/QRStudio/FormInputs';
import { QRPreviewCard } from '../components/QRStudio/QRPreviewCard';
import { makeWifiSign, wifiSignLabels } from '../utils/wifiSign';
import { formatPayload } from '../utils/qrFormatter';
import { Category3DIcon } from '../components/icons/Category3DIcon';
import { getToolShareUrl } from '../utils/toolShare';
import { trackEvent } from '../utils/analytics';

interface ToolLandingPageProps {
  tool: 'url' | 'wifi' | 'whatsapp' | 'business';
  lang: Language;
  onNavigate: (page: PageId, type?: QRType) => void;
  onHistoryUpdated: () => void;
}

const exampleContact = { firstName: 'Alex', lastName: 'Example', company: 'Example Studio', email: 'alex@example.com' };
const contactCopy = {
  en: { example: 'Example contact', preview: 'Contact preview', use: 'Try this example' },
  fr: { example: 'Exemple de contact', preview: 'Aperçu du contact', use: 'Essayer cet exemple' },
  es: { example: 'Contacto de ejemplo', preview: 'Vista previa del contacto', use: 'Probar este ejemplo' },
  ar: { example: 'مثال لجهة اتصال', preview: 'معاينة جهة الاتصال', use: 'جرّب هذا المثال' },
};

function createEmptyToolPayload(tool: ToolLandingPageProps['tool']) {
  switch (tool) {
    case 'url':
      return '';
    case 'wifi':
      return { ssid: '', password: '', encryption: 'WPA' as const, hidden: false };
    case 'whatsapp':
      return { countryCode: '', phoneNumber: '', message: '' };
    case 'business':
      return {
        firstName: '',
        lastName: '',
        company: '',
        jobTitle: '',
        phone: '',
        workPhone: '',
        email: '',
        website: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        notes: ''
      };
  }
}

const TOOL_UI = {
en:{online:'Free Online Tool',customTitle:'Need full custom colors, logos & shapes?',customText:'Open our studio to access all custom options.',studio:'Full Studio',why:'Why Use Our',security:'Client-Side Security Guarantee',securityText:'QR GENIUS processes QR data locally in your browser; payloads are not sent to or logged on our servers.',customize:'Customize in Studio',faqs:'Frequently Asked Questions',sharePrompt:'Know someone who needs a QR code?',shareTool:'Share this free tool',shareCopied:'Tool link copied.',shareManual:'Copy this tool link to share it:',shareLinkLabel:'Shareable tool link'},
ar:{online:'أداة مجانية عبر الإنترنت',customTitle:'هل تريد تخصيص الألوان والشعارات والأشكال؟',customText:'افتح الاستوديو للوصول إلى جميع خيارات التخصيص.',studio:'الاستوديو الكامل',why:'لماذا تستخدم',security:'ضمان الأمان والمعالجة المحلية',securityText:'يعالج QR GENIUS بيانات الرمز محلياً داخل متصفحك ولا يرسلها إلى خوادمه أو يسجلها.',customize:'خصص الرمز في الاستوديو',faqs:'الأسئلة الشائعة',sharePrompt:'هل تعرف شخصاً يحتاج إلى إنشاء رمز QR؟',shareTool:'شارك هذه الأداة المجانية',shareCopied:'تم نسخ رابط الأداة.',shareManual:'انسخ رابط الأداة لمشاركته:',shareLinkLabel:'رابط الأداة للمشاركة'},
fr:{online:'Outil gratuit en ligne',customTitle:'Personnalisez couleurs, logos et formes',customText:'Ouvrez le studio pour accéder à toutes les options.',studio:'Studio complet',why:'Pourquoi utiliser',security:'Protection et traitement local',securityText:'QR GENIUS traite les données localement dans votre navigateur, sans les envoyer ni les enregistrer sur ses serveurs.',customize:'Personnaliser dans le studio',faqs:'Questions fréquentes',sharePrompt:'Vous connaissez quelqu’un qui a besoin d’un QR code ?',shareTool:'Partager cet outil gratuit',shareCopied:'Lien de l’outil copié.',shareManual:'Copiez ce lien pour partager l’outil :',shareLinkLabel:'Lien de partage de l’outil'},
es:{online:'Herramienta gratuita en línea',customTitle:'Personaliza colores, logotipos y formas',customText:'Abre el estudio para acceder a todas las opciones.',studio:'Estudio completo',why:'Por qué usar',security:'Protección y procesamiento local',securityText:'QR GENIUS procesa los datos localmente en tu navegador, sin enviarlos ni guardarlos en sus servidores.',customize:'Personalizar en el estudio',faqs:'Preguntas frecuentes',sharePrompt:'¿Conoces a alguien que necesite un código QR?',shareTool:'Compartir esta herramienta gratis',shareCopied:'Enlace de la herramienta copiado.',shareManual:'Copia este enlace para compartir la herramienta:',shareLinkLabel:'Enlace para compartir la herramienta'}
};

export const ToolLandingPage: React.FC<ToolLandingPageProps> = ({
  tool,
  lang,
  onNavigate,
  onHistoryUpdated
}) => {
  const toolData = toolsByLanguage[lang][tool];
  const ui = TOOL_UI[lang];
  const t = translations[lang];

  // Dedicated local state for instant mini-studio
  const [payload, setPayload] = useState<any>(() => createEmptyToolPayload(tool));
  const [shareFeedback, setShareFeedback] = useState<'copied' | 'manual' | null>(null);
  const shareUrl = getToolShareUrl(tool, lang);

  const [signError, setSignError] = useState(false);
  const downloadWifiSign = async () => {
    setSignError(false);
    try {
      const svg = await makeWifiSign(payload, lang);
      const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'guest-wifi-sign.svg';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch {
      setSignError(true);
    }
  };

  const handleShareTool = async () => {
    setShareFeedback(null);
    trackEvent('tool_share_clicked', { tool, lang });
    try {
      if (typeof navigator.share === 'function') {
        await navigator.share({ title: toolData.title, text: toolData.subtitle, url: shareUrl });
        return;
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setShareFeedback('copied');
        return;
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
    }
    setShareFeedback('manual');
  };

  const formattedContent = formatPayload(toolData.type, payload);

  const contact = formattedContent ? payload : exampleContact;
  const contactLabels = contactCopy[lang];

  const hasPresetLogo = tool !== 'business';
  const previewConfig: QRConfig = {
    content: formattedContent,
    errorCorrectionLevel: hasPresetLogo ? 'H' : 'M',
    margin: hasPresetLogo ? 4 : 2,
    fgColor: tool === 'wifi' ? '#6D28D9' : tool === 'whatsapp' ? '#059669' : tool === 'business' ? '#0284C7' : '#4F46E5',
    bgColor: '#FFFFFF',
    transparentBg: false,
    useGradient: true,
    gradientColor: tool === 'whatsapp' ? '#10B981' : '#7C3AED',
    gradientDirection: 'to-br',
    dotStyle: hasPresetLogo ? 'square' : 'rounded',
    cornerSquareStyle: 'rounded',
    cornerDotStyle: 'rounded',
    customCornerColor: false,
    cornerSquareColor: '#4F46E5',
    cornerDotColor: '#4F46E5',
    logoUrl: undefined,
    logoPreset: tool === 'whatsapp' ? 'whatsapp' : tool === 'wifi' ? 'wifi' : tool === 'url' ? 'link' : undefined,
    logoSize: 14,
    logoPadding: 5,
    logoBgShape: 'rounded',
    logoBgColor: '#FFFFFF'
  };

  return (
    <div className="py-4 sm:py-8 lg:py-12 bg-white overflow-x-hidden w-full box-border">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 lg:space-y-16 w-full box-border">
        {/* Header / Hero */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 max-w-4xl text-left rtl:text-right w-full box-border">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-700 tracking-wide uppercase mb-2 sm:mb-3">
              <span>{toolData.badge}</span>
              <span className="text-slate-300">·</span>
              <span>{ui.online}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {SEO_METADATA[tool][lang].h1}
            </h1>
            <p className="mt-2.5 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
              {toolData.subtitle}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleShareTool}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 hover:bg-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              >
                <Share2 className="h-4 w-4" aria-hidden="true" />
                {ui.shareTool}
              </button>
              <span className="text-xs text-slate-600">{ui.sharePrompt}</span>
            </div>
            {shareFeedback === 'copied' && (
              <p className="mt-2 text-sm font-medium text-emerald-700" role="status">{ui.shareCopied}</p>
            )}
            {shareFeedback === 'manual' && (
              <div className="mt-2 max-w-md space-y-1">
                <label htmlFor="tool-share-link" className="block text-xs font-medium text-slate-700">{ui.shareManual}</label>
                <input
                  id="tool-share-link"
                  aria-label={ui.shareLinkLabel}
                  type="text"
                  readOnly
                  value={shareUrl}
                  onFocus={(event) => event.currentTarget.select()}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
                />
              </div>
            )}
          </div>

          <div className="shrink-0 self-start sm:self-center p-3 sm:p-4 bg-slate-50 border border-slate-200/80 rounded-2xl sm:rounded-3xl shadow-sm">
            <Category3DIcon type={toolData.type} size={64} animateHover={true} />
          </div>
        </div>

        {/* Live Interactive Tool Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start bg-slate-50/70 p-2.5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 w-full box-border">
          <div className="lg:col-span-7 space-y-4">
            {tool === 'business' && (
              <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4 sm:p-5">
                <h2 className="text-sm font-bold text-indigo-800">
                  {formattedContent ? contactLabels.preview : contactLabels.example}
                </h2>
                <div className="mt-2 space-y-1 break-words text-sm text-slate-700">
                  <p dir="auto" className="text-lg font-bold text-slate-900">{[contact.firstName, contact.lastName].filter(Boolean).join(' ')}</p>
                  {[
                    [contact.jobTitle, contact.company].filter(Boolean).join(' · '),
                    contact.phone, contact.workPhone, contact.email, contact.website,
                    [contact.street, contact.city, contact.state, contact.zip, contact.country].filter(Boolean).join(', '),
                    contact.notes
                  ].map((line, index) => line && <p key={index} dir="auto">{line}</p>)}
                </div>
                {!formattedContent && (
                  <button type="button" className="mt-3 min-h-11 rounded-lg bg-indigo-700 px-4 text-sm font-bold text-white hover:bg-indigo-800"
                    onClick={() => {
                      setPayload({ ...payload, ...exampleContact });
                      trackEvent('vcard_example_loaded', { lang });
                    }}>
                    {contactLabels.use}
                  </button>
                )}
              </section>
            )}
            <FormInputs
              type={toolData.type}
              lang={lang}
              rawPayload={payload}
              onChangePayload={setPayload}
              onClear={() => setPayload(createEmptyToolPayload(tool))}
              onReset={() => setPayload(createEmptyToolPayload(tool))}
              formattedContent={formattedContent}
            />

            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="font-bold text-slate-800">{ui.customTitle}</span>
                <p className="text-slate-500 text-[11px] mt-0.5">{ui.customText}</p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('generator', toolData.type)}
                className="py-2 px-3.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span>{ui.studio}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <QRPreviewCard
              config={previewConfig}
              type={toolData.type}
              title={toolData.title}
              lang={lang}
              onHistoryUpdated={onHistoryUpdated}
            />
            {tool === 'wifi' && (
              <div className="mt-3">
                <button type="button" disabled={!formattedContent} onClick={downloadWifiSign}
                  className="w-full rounded-xl border border-indigo-200 bg-white p-3 text-sm font-semibold text-indigo-700 disabled:opacity-50">
                  {wifiSignLabels[lang].button}
                </button>
                {signError && <p role="alert">{wifiSignLabels[lang].error}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Benefits & Value Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
              {lang === 'ar' ? `لماذا تستخدم ${toolData.title}؟` : `${ui.why} ${toolData.title}?`}
            </h2>
            <div className="space-y-4">
              {toolData.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span>{ui.security}</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {ui.securityText}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('generator', toolData.type)}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <span>{ui.customize}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Practical, tool-specific guidance for English business card visitors. */}
        {lang === 'en' && tool === 'business' && (
          <section className="pt-8 border-t border-slate-200" aria-labelledby="business-card-print-guide">
            <h2 id="business-card-print-guide" className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
              How to put a QR code on your business card
            </h2>
            <p className="mb-4 text-sm text-slate-700">
              <a className="text-indigo-700 underline" href="/en/blog/how-to-make-business-card-qr-code#sample-card">Try a sample business card QR code</a> to see which contact details a phone can read.
            </p>
            <ol className="list-decimal pl-6 space-y-3 text-sm text-slate-700 leading-relaxed">
              <li><strong>Enter your professional contact details.</strong> Include the name, company, phone number and email you want others to save. Leave private fields blank.</li>
              <li><strong>Generate and download your vCard QR code.</strong> A vCard stores the contact details inside the code rather than linking to an editable profile.</li>
              <li><strong>Place the code on your card design.</strong> Start with a QR image about 2.5–3 cm wide, keep a clear margin around it and add the label “Scan to save contact.” More contact fields may require a larger code.</li>
              <li><strong>Test a printed proof.</strong> Scan with at least two phones if possible, open the contact preview and check the saved name, phone, company and email before printing a batch.</li>
            </ol>
            <p className="text-sm text-slate-600 mt-4 leading-relaxed">
              Need to update your details after printing? A static vCard cannot be edited. For a changeable destination, consider a <a className="text-indigo-700 underline underline-offset-2" href="/tools/url">website URL QR code</a> that points to a contact page you control.
            </p>
          </section>
        )}

        {/* Specific answers to common vCard search and printing problems. */}
        {lang === 'en' && tool === 'business' && (
          <section className="pt-8 border-t border-slate-200" aria-labelledby="vcard-troubleshooting">
            <h2 id="vcard-troubleshooting" className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
              Business card QR code: vCard or website link?
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              Choose a <strong>vCard QR code</strong> when the goal is to let someone save your name, phone number, company and email directly from a printed business card. Choose a <a href="/tools/url" className="text-indigo-700 underline underline-offset-2">website link QR code</a> when you want to send visitors to an online profile or contact page that you can update later.
            </p>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Why does my contact QR code not scan?</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm text-slate-700 leading-relaxed">
              <li><strong>The code is too small.</strong> More vCard fields create a denser QR code. Print a larger code and preserve its empty border.</li>
              <li><strong>The colors are hard to read.</strong> Use a dark foreground on a light background and avoid putting graphics over the code's key patterns.</li>
              <li><strong>The contact preview differs by phone.</strong> Some camera apps show a contact card while others offer a separate save-contact action. Test on the devices your audience uses.</li>
              <li><strong>Your contact information changed.</strong> Static vCard codes contain the details entered when generated. Create and print a new code after changing a phone number or email address.</li>
            </ul>
            <p className="mt-4 text-sm text-slate-700 leading-relaxed">
              For a print-ready workflow, start with a test card, scan it at normal viewing distance, and check the saved contact fields before ordering multiple copies. You can also read our <a href="/en/blog/how-to-make-business-card-qr-code" className="text-indigo-700 underline underline-offset-2">step-by-step business card QR code guide</a>.
            </p>
          </section>
        )}

        {/* Practical English Wi-Fi QR instructions, including guest-network safety. */}
        {lang === 'en' && tool === 'wifi' && (
          <section className="pt-8 border-t border-slate-200" aria-labelledby="wifi-guest-setup-guide">
            <h2 id="wifi-guest-setup-guide" className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
              How to make a Wi-Fi QR code for guests
            </h2>
            <ol className="list-decimal pl-6 space-y-3 text-sm text-slate-700 leading-relaxed">
              <li><strong>Choose the network to share.</strong> For a café, office or rental, use a separate guest Wi-Fi network when your router supports one.</li>
              <li><strong>Enter the exact Wi-Fi details.</strong> Type the network name (SSID), select the matching security type and add its current password. Capital letters and spaces matter.</li>
              <li><strong>Generate and download the code.</strong> Put the QR image on a guest sign, welcome card or reception desk with a clear “Scan to join Wi-Fi” label.</li>
              <li><strong>Test with a guest phone.</strong> Scan near the network, confirm the displayed network name and try connecting. Some devices or camera apps require manual entry instead.</li>
            </ol>
            <p className="text-sm text-slate-600 mt-4 leading-relaxed">
              <strong>Privacy reminder:</strong> A printed Wi-Fi QR code contains the credentials you entered. Anyone who scans it may be able to read or use them. If you change the password, create and replace the static QR code.
            </p>
          </section>
        )}

        {/* Answer Wi-Fi QR troubleshooting searches with actionable, safe guidance. */}
        {lang === 'en' && tool === 'wifi' && (
          <section className="pt-8 border-t border-slate-200" aria-labelledby="wifi-qr-troubleshooting">
            <h2 id="wifi-qr-troubleshooting" className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
              Wi-Fi QR code not connecting? Check these details
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              A Wi-Fi QR code encodes the network name, security setting and password you enter. It does not create a new wireless network or increase its range. Your guests still need to be near the router, and their device must support joining Wi-Fi from a scanned code.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-slate-700 leading-relaxed">
              <li><strong>Check the exact network name (SSID).</strong> Network names are case-sensitive; include any spaces or punctuation exactly as shown in your Wi-Fi settings.</li>
              <li><strong>Match the security type.</strong> Select the security option that corresponds to your network. If the network uses a login portal, scanning the QR code may not bypass that additional sign-in step.</li>
              <li><strong>Recheck the password.</strong> A changed guest-network password requires a new QR code. Avoid sharing the password for your private home or office network.</li>
              <li><strong>Test scanning and printing.</strong> Keep the code flat, high-contrast and surrounded by a clear border. Test it with an iPhone and an Android phone when possible.</li>
            </ul>
            <h3 className="text-lg font-bold text-slate-900 mt-5 mb-2">Where should you display a guest Wi-Fi QR code?</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Put a printed sign near the entrance, reception desk or guest welcome booklet. Label it “Scan to join guest Wi-Fi” and identify the correct network. For step-by-step setup, see our <a href="/en/blog/how-to-make-wifi-qr-code-for-guests" className="text-indigo-700 underline underline-offset-2">Wi-Fi QR code guide for guests</a>.
            </p>
          </section>
        )}

        {/* Practical English WhatsApp QR guide for customer-facing use. */}
        {lang === 'en' && tool === 'whatsapp' && (
          <section className="pt-8 border-t border-slate-200" aria-labelledby="whatsapp-customer-qr-guide">
            <h2 id="whatsapp-customer-qr-guide" className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
              How to create a WhatsApp QR code for customers
            </h2>
            <ol className="list-decimal pl-6 space-y-3 text-sm text-slate-700 leading-relaxed">
              <li><strong>Enter your WhatsApp business number.</strong> Include the correct country calling code and check every digit. The generated wa.me link uses the number in international format.</li>
              <li><strong>Add an optional opening message.</strong> For example, “Hello, I have a question about your services.” Customers can edit it and decide whether to send.</li>
              <li><strong>Generate and download the QR code.</strong> Place it on a menu, flyer, receipt or business card with a clear label such as “Scan to chat on WhatsApp.”</li>
              <li><strong>Test the finished code on a phone.</strong> Confirm that the intended chat opens and that any pre-filled message is correct. Test again after changing colors or adding a logo.</li>
            </ol>
            <p className="text-sm text-slate-600 mt-4 leading-relaxed">
              <strong>Before printing:</strong> Scanning does not automatically send a message. The customer must choose to send it. A static QR code keeps the original phone number, so generate a replacement if your WhatsApp number changes.
            </p>
          </section>
        )}

        {/* Tool FAQs */}
        <div className="pt-8 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-8">
            {ui.faqs}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {toolData.faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
                <h3 className="text-sm font-bold text-slate-900">{faq.q}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Crawlable, localized links to related QR tools */}
        <nav aria-label={lang === 'ar' ? 'أدوات QR ذات صلة' : lang === 'fr' ? 'Outils QR associés' : lang === 'es' ? 'Herramientas QR relacionadas' : 'Related QR code tools'} className="pt-8 border-t border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            {lang === 'ar' ? 'جرّب أدوات QR أخرى' : lang === 'fr' ? 'Découvrez d’autres outils QR' : lang === 'es' ? 'Prueba otras herramientas QR' : 'Explore more free QR code tools'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(['url', 'wifi', 'whatsapp', 'business'] as const).filter((related) => related !== tool).map((related) => {
              const relatedPage: PageId = related === 'business' ? 'business' : related;
              const path = related === 'business' ? '/tools/business-vcard' : `/tools/${related}`;
              const href = `${lang === 'en' ? '' : `/${lang}`}${path}`;
              const label = toolsByLanguage[lang][related].title;
              return (
                <a key={related} href={href} onClick={(event) => { event.preventDefault(); onNavigate(relatedPage); }} className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold text-indigo-700 hover:border-indigo-300 hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600">
                  {label} <ArrowRight className="inline-block w-4 h-4 ms-1" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </nav>

        {/* Contextual links to published Arabic guides; no false translated equivalents. */}
        {lang === 'ar' && (tool === 'business' || tool === 'wifi' || tool === 'whatsapp') && (
          <section className="pt-8 border-t border-slate-200" aria-labelledby="related-guide-title">
            <h2 id="related-guide-title" className="text-xl font-bold text-slate-900 mb-3">دليل عملي لاستخدام هذه الأداة</h2>
            <p className="text-sm text-slate-600 mb-3">تعرّف على الخطوات والنصائح قبل إنشاء رمز QR وطباعته.</p>
            <a
              href={tool === 'business' ? '/blog/business-card-qr-code-guide' : tool === 'wifi' ? '/blog/wifi-qr-code-for-guests' : '/blog/whatsapp-qr-code-for-customers'}
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 underline underline-offset-4 hover:text-indigo-900"
            >
              {tool === 'business' ? 'كيفية إنشاء رمز QR لبطاقة العمل' : tool === 'wifi' ? 'كيفية إنشاء رمز Wi-Fi QR للضيوف' : 'كيفية إنشاء رمز QR لواتساب للعملاء'}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </section>
        )}

        {/* Crawlable contextual English guides for the matching tools. */}
        {lang === 'en' && (tool === 'business' || tool === 'wifi' || tool === 'whatsapp') && (
          <section className="pt-8 border-t border-slate-200" aria-labelledby="english-related-guide-title">
            <h2 id="english-related-guide-title" className="text-xl font-bold text-slate-900 mb-3">Step-by-step QR code guide</h2>
            <p className="text-sm text-slate-600 mb-3">Learn how to prepare, scan-test and print your QR code before sharing it.</p>
            <a
              href={tool === 'business' ? '/en/blog/how-to-make-business-card-qr-code' : tool === 'wifi' ? '/en/blog/how-to-make-wifi-qr-code-for-guests' : '/en/blog/how-to-create-whatsapp-qr-code-for-customers'}
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 underline underline-offset-4 hover:text-indigo-900"
            >
              {tool === 'business' ? 'How to make a business card QR code' : tool === 'wifi' ? 'How to make a Wi-Fi QR code for guests' : 'How to create a WhatsApp QR code for customers'}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </section>
        )}

        {/* Ad Placement */}
        <AdPlacement lang={lang} format="horizontal-leaderboard" />
      </div>
    </div>
  );
};
