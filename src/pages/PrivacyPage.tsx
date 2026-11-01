import React from 'react';
import { ShieldCheck, Lock, EyeOff, Server, Database } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface PrivacyPageProps {
  lang: Language;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="py-12 sm:py-16 bg-white overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="border-b border-slate-200 pb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>GDPR &amp; CCPA Compliant Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500">
            Effective Date: November 1, 2026 · Version 2.0
          </p>
        </div>

        {/* Highlights banner */}
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-600" />
            <span>The QR GENIUS Privacy Pledge in Plain English</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            When you enter your Wi-Fi password, company website, personal vCard details, or text into QR GENIUS, <strong>we never see it, transmit it, or store it</strong>. The mathematical generation and drawing of the QR code occur 100% locally on your computer or smartphone using client-side JavaScript.
          </p>
        </div>

        {/* Clauses */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Information We Do Not Collect</h2>
            <p>
              Unlike legacy QR generator platforms, QR GENIUS does not require user accounts, email registration, or phone number verification to use our free service. We do not store:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Your Wi-Fi SSID or Wi-Fi encryption passwords</li>
              <li>Your personal contact information (vCard names, phone numbers, addresses)</li>
              <li>Your destination URLs, UTM tracking codes, or plain text messages</li>
              <li>Scanned contents or scan counts of static QR codes you create</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Local Browser Storage (localStorage)</h2>
            <p>
              For your convenience, QR GENIUS allows you to view recent codes in your &ldquo;History&rdquo; drawer. This history is stored strictly in your browser&rsquo;s local storage (HTML5 <code>localStorage</code>) on your individual device. This data is never synchronized to cloud servers and can be completely wiped at any time by clicking the &ldquo;Clear History&rdquo; button.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Third-Party Integrations &amp; Advertising</h2>
            <p>
              We maintain non-intrusive sponsor and Google AdSense advertisement placements to support server infrastructure costs and keep all 12 QR code generators 100% free forever. Third-party advertising partners may use cookies or web beacons in accordance with standard advertising policies. We never sell personal information to data brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Data Security</h2>
            <p>
              Because your QR code payloads never leave your browser, your risk of interception or server-side database breaches regarding generated codes is technically zero. We recommend using HTTPS when distributing or loading your destination websites.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">5. Contact Regarding Privacy</h2>
            <p>
              If you have any questions or data inquiries regarding this policy, contact us at <code>privacy@qrgenius.app</code>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
