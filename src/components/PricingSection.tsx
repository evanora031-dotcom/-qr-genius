import React, { useState } from 'react';
import { Check, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface PricingSectionProps {
  lang: Language;
  onSelectFree?: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ lang, onSelectFree }) => {
  const t = translations[lang];
  const [showProModal, setShowProModal] = useState(false);

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.pro.badge}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            {t.pro.title}
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            {t.pro.subtitle}
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto items-stretch">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl border-2 border-indigo-600/30 p-5 sm:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 bg-indigo-600 text-white text-[11px] font-bold px-4 py-1 rounded-bl-xl rtl:rounded-bl-none rtl:rounded-br-xl uppercase tracking-wider">
              {lang === 'ar' ? 'الباقة المجانية' : lang === 'fr' ? 'Offre gratuite' : lang === 'es' ? 'Plan gratuito' : 'Free plan'}
            </div>

            <div>
              <div className="text-xl font-bold text-slate-900 mb-2">
                {t.pro.freeTitle}
              </div>
              <p className="text-xs text-slate-500 mb-6">
                {lang === 'ar' ? 'استخدم أدوات إنشاء QR المتاحة وخصّص رموزك ونزّلها بالصيغ المدعومة.' : lang === 'fr' ? 'Utilisez les outils QR disponibles, personnalisez vos codes et téléchargez-les dans les formats pris en charge.' : lang === 'es' ? 'Utilice las herramientas QR disponibles, personalice sus códigos y descárguelos en los formatos compatibles.' : 'Use the available QR tools, customize your codes, and download them in supported formats.'}
              </p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-extrabold text-slate-900">$0</span>
                <span className="text-xs text-slate-500 font-medium">{lang === 'ar' ? '/ بدون رسوم حالياً' : lang === 'fr' ? '/ actuellement sans frais' : lang === 'es' ? '/ actualmente sin coste' : '/ currently at no charge'}</span>
              </div>

              <ul className="space-y-3.5 text-xs text-slate-700 mb-8">
                {t.pro.freeFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <button
                onClick={onSelectFree}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
              >
                {t.pro.freeCta}
              </button>
            </div>
          </div>

          {/* Pro / Enterprise Plan */}
          <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-8 shadow-xl flex flex-col justify-between relative border border-indigo-500/30">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-semibold mb-3">
                <Sparkles className="w-3 h-3" />
                <span>{lang === 'ar' ? 'مستوى المؤسسات' : 'Enterprise Grade'}</span>
              </div>

              <div className="text-xl font-bold text-white mb-2">
                {t.pro.proTitle}
              </div>
              <p className="text-xs text-slate-300 mb-6">
                {lang === 'ar' ? 'لفرق التسويق والوكالات والعلامات التجارية التي تحتاج إلى روابط ديناميكية وتحليلات وإنشاء جماعي.' : 'For marketing teams, agencies, and brands requiring dynamic URLs, analytics, and bulk generation.'}
              </p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-extrabold text-white">$19</span>
                <span className="text-xs text-slate-400 font-medium">{lang === 'ar' ? '/ شهرياً (تُدفع سنوياً)' : '/ month (billed annually)'}</span>
              </div>

              <ul className="space-y-3.5 text-xs text-slate-200 mb-8">
                {t.pro.proFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-indigo-500/30 text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <button
                onClick={() => setShowProModal(true)}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-white via-indigo-100 to-white hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-lg"
              >
                <span>{t.pro.proCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Note underneath */}
        <p className="text-center text-xs text-slate-500 mt-8 max-w-xl mx-auto">
          {t.pro.note}
        </p>

        {/* Enterprise Inquiry Modal */}
        {showProModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 text-slate-900 shadow-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">{lang === 'ar' ? 'معاينة QR GENIUS للمؤسسات' : 'QR GENIUS Enterprise Preview'}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {lang === 'ar' ? 'هذه معاينة لخيارات المؤسسات. ميزات الرموز الديناميكية والتحليلات والاستضافة المخصصة ليست متاحة للاستخدام حالياً.' : lang === 'fr' ? 'Ceci est un aperçu des options entreprise. Les QR dynamiques, les statistiques et l’hébergement personnalisé ne sont pas disponibles actuellement.' : lang === 'es' ? 'Esta es una vista previa de las opciones empresariales. Los códigos dinámicos, las analíticas y el alojamiento personalizado no están disponibles actualmente.' : 'This is a preview of enterprise options. Dynamic QR codes, analytics, and custom hosting are not currently available.'}
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 mb-6 space-y-1.5">
                <div>✓ {lang === 'ar' ? 'يمكنك تجربة أدوات QR المتاحة دون إنشاء حساب.' : lang === 'fr' ? 'Vous pouvez essayer les outils QR disponibles sans créer de compte.' : lang === 'es' ? 'Puede probar las herramientas QR disponibles sin crear una cuenta.' : 'You can try the available QR tools without creating an account.'}</div>
                <div>✓ {lang === 'ar' ? 'تعتمد صلاحية رمز QR على محتواه وبقاء الوجهة متاحة، وليس على تاريخ تنزيل الملف.' : lang === 'fr' ? 'La validité d’un QR code dépend de son contenu et de la disponibilité de sa destination, pas de la date de téléchargement.' : lang === 'es' ? 'La validez de un código QR depende de su contenido y de que el destino siga disponible, no de la fecha de descarga.' : 'A QR code’s usefulness depends on its content and destination availability, not on its download date.'}</div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowProModal(false)}
                  className="flex-1 py-2.5 px-4 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors"
                >
                  {lang === 'ar' ? 'متابعة الاستخدام المجاني' : 'Continue Free Use'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
