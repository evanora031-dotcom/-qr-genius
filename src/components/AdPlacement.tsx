import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface AdPlacementProps {
  lang: Language;
  format?: 'horizontal-leaderboard' | 'rectangle-box' | 'in-feed';
  className?: string;
}

export const AdPlacement: React.FC<AdPlacementProps> = ({ 
  lang, 
  format = 'horizontal-leaderboard',
  className = '' 
}) => {
  const t = translations[lang];

  return (
    <aside 
      aria-label={t.ad.label} 
      className={`my-8 mx-auto w-full max-w-5xl rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-4 transition-colors ${className}`}
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/80">
        <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400">
          {t.ad.label}
        </span>
        <span className="text-[10px] text-slate-400">
          Clean Monetization Ready
        </span>
      </div>

      {/* Responsive Ad Area with clean placeholder for Google AdSense */}
      <div className="min-h-[90px] flex flex-col items-center justify-center text-center p-3 rounded-lg bg-white/70 border border-slate-200/50">
        <div className="text-xs font-semibold text-slate-600 mb-0.5">
          {t.ad.placeholderTitle}
        </div>
        <p className="text-[11px] text-slate-400 max-w-md">
          {t.ad.placeholderDesc}
        </p>

        {/* Real Google AdSense hook slot for production activation */}
        <ins 
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client="ca-pub-0000000000000000"
          data-ad-slot="0000000000"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
};
