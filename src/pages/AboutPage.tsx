import React from 'react';
import { ShieldCheck, Zap, Globe, Sparkles, Heart, Lock, Code2, Users } from 'lucide-react';
import { Language, PageId } from '../types';
import { translations } from '../i18n/translations';

interface AboutPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ lang, onNavigate }) => {
  const t = translations[lang];

  return (
    <div className="py-12 sm:py-16 bg-white overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Mission</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About QR GENIUS
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We built QR GENIUS to provide a fast, truly free, and uncompromisingly private QR code generator for creators, developers, small businesses, and enterprises worldwide.
          </p>
        </div>

        {/* The Problem We Solved */}
        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            Why Does the Internet Need Another QR Code Generator?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Most commercial QR code generators operate on deceptive business models: they trick users into printing physical flyers and restaurant menus, only to disable the QR codes 14 days later unless you pay $35/month. Many also inject third-party redirect tracking domains that compromise user privacy and slow down scanning.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            At <strong>QR GENIUS</strong>, all 12 QR code generators compile directly to ISO/IEC 18004 standards inside your browser. They contain your exact URL, Wi-Fi password, or vCard payload directly in the dots. No middleman servers, no expiring links, and no hostage tactics.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">100% Client-Side Privacy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every QR matrix computation and rendering happens locally on your computer or phone using JavaScript and Canvas/SVG APIs. Your payloads are never sent to a database.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Infinite Lifespan</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Because static QR codes contain the raw data, they work as long as paper exists or your web server is alive. They can never be shut down by anyone.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Global &amp; Multilingual</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Engineered with full internationalization for English, Arabic with native RTL layout mirroring, French, and Spanish.
            </p>
          </div>
        </div>

        {/* Open Architecture */}
        <div className="border-t border-slate-200 pt-12 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Engineering Standards</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            QR GENIUS is built with modern React 19, TypeScript, and clean Tailwind CSS. All mathematical calculations follow QR code specifications ISO/IEC 18004:2015 with Reed-Solomon error correction algorithm implementations.
          </p>
          <div className="pt-4">
            <button
              onClick={() => onNavigate('generator')}
              className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-2"
            >
              <span>Try QR Studio Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
