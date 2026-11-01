import React from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface TermsPageProps {
  lang: Language;
}

export const TermsPage: React.FC<TermsPageProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="py-12 sm:py-16 bg-white overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        <div className="border-b border-slate-200 pb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700">
            <FileText className="w-3.5 h-3.5" />
            <span>Usage Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-500">
            Last Updated: November 1, 2026
          </p>
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2 text-indigo-700 text-sm font-bold mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>100% Free Commercial &amp; Personal License</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            All QR codes you generate using QR GENIUS are your exclusive property. You are granted an unconditional, royalty-free, perpetual worldwide license to use, print, reproduce, distribute, and display your generated codes for any personal or commercial purpose.
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and using QR GENIUS, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please discontinue use of this site.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Permitted Commercial and Print Use</h2>
            <p>
              You may freely print generated codes on packaging, business cards, billboards, magazines, restaurant menus, stickers, and electronic displays. We do not require branding attribution, watermarks, or back-links.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Prohibited Usage</h2>
            <p>
              You agree not to use QR GENIUS to generate QR codes that link to or promote:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Malicious software, viruses, or phishing schemes</li>
              <li>Unauthorized disclosure of confidential personal information</li>
              <li>Illegal, defamatory, fraudulent, or harassing content</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Disclaimer of Warranty</h2>
            <p>
              QR codes are generated locally &ldquo;as is&rdquo;. While QR GENIUS uses standard ISO/IEC error correction algorithms, we strongly advise testing all generated codes on multiple smartphone camera models prior to initiating large-scale physical print runs.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
