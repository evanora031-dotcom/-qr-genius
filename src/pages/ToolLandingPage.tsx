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
import { Language, PageId, QRType } from '../types';
import { translations } from '../i18n/translations';
import { AdPlacement } from '../components/AdPlacement';
import { FormInputs } from '../components/QRStudio/FormInputs';
import { QRPreviewCard } from '../components/QRStudio/QRPreviewCard';
import { formatPayload } from '../utils/qrFormatter';
import { Category3DIcon } from '../components/icons/Category3DIcon';

interface ToolLandingPageProps {
  tool: 'url' | 'wifi' | 'whatsapp' | 'business';
  lang: Language;
  onNavigate: (page: PageId, type?: QRType) => void;
  onHistoryUpdated: () => void;
}

const TOOL_CONFIGS = {
  url: {
    type: 'url' as QRType,
    badge: 'Official Web Tool',
    title: 'Free Website URL QR Code Generator',
    subtitle: 'Convert any website, landing page, blog post, or e-commerce shop into a permanent, scan-ready QR code with custom colors and logo embedding.',
    benefits: [
      'Instant redirects to any web address with zero middleman redirection',
      'Fully compatible with Google Analytics and UTM campaign tracking tags',
      'Download infinite-resolution vector SVG for banners and packaging',
      'No scan limits, no monthly subscriptions, and no expiration dates'
    ],
    faqs: [
      { q: 'Do URL QR codes generated here ever expire?', a: 'No! QR GENIUS generates standard static ISO QR codes containing your direct web address. As long as your website stays online, your QR code will work forever.' },
      { q: 'Can I include UTM tracking parameters in the URL?', a: 'Yes! Simply append your UTM parameters (e.g. ?utm_source=flyer&utm_medium=qr) directly into the URL input field.' },
      { q: 'What is the best format to print on physical flyers?', a: 'We recommend downloading the Vector SVG format or the Ultra High-Res 2048px PNG. Both ensure crisp sharpness even on large outdoor banners.' }
    ]
  },
  wifi: {
    type: 'wifi' as QRType,
    badge: 'Connect Without Passwords',
    title: 'Wi-Fi Network QR Code Generator',
    subtitle: 'Create a clean scan-to-connect Wi-Fi QR code for your guests, Airbnb, café, or office. Works natively on iPhone and Android with zero typing required.',
    benefits: [
      'Guests scan with their built-in camera and tap "Join Network" immediately',
      'Supports WPA, WPA2, WPA3 personal security, WEP, and Open networks',
      'Option to support hidden SSIDs (non-broadcasted networks)',
      '100% private: your Wi-Fi password is only encoded in the QR code, never stored on servers'
    ],
    faqs: [
      { q: 'Do guests need an app to scan the Wi-Fi code?', a: 'No! Both modern iOS (iPhone Camera) and Android (Google Lens / Camera) automatically recognize Wi-Fi QR codes and prompt the user to join the network.' },
      { q: 'Is it safe to generate my Wi-Fi QR code here?', a: 'Yes. QR GENIUS processes your Wi-Fi credentials 100% locally in your browser JavaScript. Your Wi-Fi password never leaves your device.' },
      { q: 'What happens if I change my Wi-Fi password in the future?', a: 'Static Wi-Fi QR codes contain the exact password you entered. If you change your router password, simply generate and print a new code.' }
    ]
  },
  whatsapp: {
    type: 'whatsapp' as QRType,
    badge: 'Direct Click-to-Chat',
    title: 'WhatsApp Direct Chat QR Code Generator',
    subtitle: 'Generate a click-to-message WhatsApp QR code with a pre-filled greeting. Ideal for customer service desks, flyers, product boxes, and menus.',
    benefits: [
      'Customers tap or scan to open a conversation directly in WhatsApp',
      'Pre-fill custom greeting messages to triage inquiries quickly',
      'Works internationally across all countries and mobile carriers',
      'Embed official WhatsApp logo inside the QR code with one click'
    ],
    faqs: [
      { q: 'How does WhatsApp QR code routing work?', a: 'The QR code encodes a standard https://wa.me/number link. When scanned by a phone camera, it immediately launches the WhatsApp app with your designated recipient.' },
      { q: 'Do I need to include the country code?', a: 'Yes! Always include the full international country calling code (e.g. +1 for USA/Canada, +44 for UK, +971 for UAE) without dashes or spaces.' },
      { q: 'Can users edit the pre-filled message before sending?', a: 'Yes. The pre-filled message appears in their text box, and they can freely modify it before hitting the send button.' }
    ]
  },
  business: {
    type: 'vcard' as QRType,
    badge: 'Digital Business Card',
    title: 'vCard Digital Business Card QR Code Generator',
    subtitle: 'Turn your contact info into a modern digital business card. When colleagues or clients scan your code, your name, phone, email, company, and website are saved directly to their phonebook.',
    benefits: [
      'Eliminates lost paper business cards and manual contact typing errors',
      'Stores full contact profiles: Name, Job Title, Company, Phone, Email, Address & Notes',
      'Industry-standard vCard 3.0 format recognized by iOS Contacts and Google Contacts',
      'Ideal for conferences, badges, email signatures, and resume portfolios'
    ],
    faqs: [
      { q: 'How does vCard scanning work on smartphones?', a: 'When scanned with an iPhone or Android camera, a prompt appears: "Add to Contacts". Tapping it immediately fills in all contact fields for one-tap saving.' },
      { q: 'Is there a limit on how many people can scan my vCard QR?', a: 'None at all. You can print it on 10,000 cards or display it on a presentation slide; it has unlimited lifetime scans.' },
      { q: 'Can I add my company logo to the center of the vCard QR?', a: 'Yes! Open our Full Studio designer to upload your company logo and adjust custom colors.' }
    ]
  }
};

export const ToolLandingPage: React.FC<ToolLandingPageProps> = ({
  tool,
  lang,
  onNavigate,
  onHistoryUpdated
}) => {
  const toolData = TOOL_CONFIGS[tool];
  const t = translations[lang];

  // Dedicated local state for instant mini-studio
  const [payload, setPayload] = useState<any>(() => {
    switch (tool) {
      case 'url':
        return 'https://yourwebsite.com';
      case 'wifi':
        return { ssid: 'Guest_WiFi', password: 'WelcomeGuest2026', encryption: 'WPA', hidden: false };
      case 'whatsapp':
        return { countryCode: '+1', phoneNumber: '5550192834', message: 'Hello! I am interested in your services.' };
      case 'business':
        return {
          firstName: 'Jordan',
          lastName: 'Lee',
          company: 'Nexus Creative',
          jobTitle: 'Creative Director',
          phone: '+1 (555) 789-0123',
          email: 'jordan@nexuscreative.com',
          website: 'https://nexuscreative.com',
          city: 'Chicago',
          country: 'USA',
          notes: 'Connect with me on LinkedIn'
        };
    }
  });

  const formattedContent = formatPayload(toolData.type, payload);

  const previewConfig = {
    content: formattedContent,
    errorCorrectionLevel: 'M' as const,
    margin: 2,
    fgColor: tool === 'wifi' ? '#6D28D9' : tool === 'whatsapp' ? '#059669' : tool === 'business' ? '#0284C7' : '#4F46E5',
    bgColor: '#FFFFFF',
    transparentBg: false,
    useGradient: true,
    gradientColor: tool === 'whatsapp' ? '#10B981' : '#7C3AED',
    gradientDirection: 'to-br' as const,
    dotStyle: 'rounded' as const,
    cornerSquareStyle: 'rounded' as const,
    cornerDotStyle: 'rounded' as const,
    customCornerColor: false,
    cornerSquareColor: '#4F46E5',
    cornerDotColor: '#4F46E5',
    logoUrl: undefined,
    logoPreset: tool === 'whatsapp' ? 'whatsapp' : tool === 'wifi' ? 'wifi' : tool === 'url' ? 'link' : undefined,
    logoSize: 22,
    logoPadding: 5,
    logoBgShape: 'rounded' as const,
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
              <span>Free Online Tool</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {toolData.title}
            </h1>
            <p className="mt-2.5 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
              {toolData.subtitle}
            </p>
          </div>

          <div className="shrink-0 self-start sm:self-center p-3 sm:p-4 bg-slate-50 border border-slate-200/80 rounded-2xl sm:rounded-3xl shadow-sm">
            <Category3DIcon type={toolData.type} size={64} animateHover={true} />
          </div>
        </div>

        {/* Live Interactive Tool Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start bg-slate-50/70 p-2.5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 w-full box-border">
          <div className="lg:col-span-7 space-y-4">
            <FormInputs
              type={toolData.type}
              lang={lang}
              rawPayload={payload}
              onChangePayload={setPayload}
              onClear={() => setPayload('')}
              onReset={() => {}}
              formattedContent={formattedContent}
            />

            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="font-bold text-slate-800">Need full custom colors, logos &amp; shapes?</span>
                <p className="text-slate-500 text-[11px] mt-0.5">Open our studio to access all custom options.</p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('generator', toolData.type)}
                className="py-2 px-3.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span>Full Studio</span>
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
          </div>
        </div>

        {/* Benefits & Value Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
              Why Use Our {toolData.title}?
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
              <span>Client-Side Security Guarantee</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When creating sensitive codes such as Wi-Fi credentials or personal vCard details, privacy is essential. QR GENIUS renders and compiles all matrix algorithms 100% inside your local browser. No data payload is ever sent to or logged on our servers.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('generator', toolData.type)}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <span>Customize in Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tool FAQs */}
        <div className="pt-8 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-8">
            Frequently Asked Questions
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

        {/* Ad Placement */}
        <AdPlacement lang={lang} format="horizontal-leaderboard" />
      </div>
    </div>
  );
};
