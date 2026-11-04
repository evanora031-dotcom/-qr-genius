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
            <span>{lang === 'ar' ? 'رسالتنا' : lang === 'fr' ? 'Notre mission' : lang === 'es' ? 'Nuestra misión' : 'lang === 'ar' ? 'رسالتنا' : lang === 'fr' ? 'Notre mission' : lang === 'es' ? 'Nuestra misión' : 'Our Mission''}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'ar' ? 'عن كيو آر جينيوس' : lang === 'fr' ? 'À propos de QR GENIUS' : lang === 'es' ? 'Acerca de QR GENIUS' : 'lang === 'ar' ? 'عن كيو آر جينيوس' : lang === 'fr' ? 'À propos de QR GENIUS' : lang === 'es' ? 'Acerca de QR GENIUS' : 'About QR GENIUS''}
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {lang === 'ar' ? 'أنشأنا QR GENIUS لتقديم أداة سريعة ومجانية وتحترم الخصوصية لإنشاء رموز QR للمبدعين والمطورين والشركات حول العالم.' : lang === 'fr' ? 'Nous avons créé QR GENIUS pour proposer un générateur de QR codes rapide, réellement gratuit et respectueux de la vie privée, destiné aux créateurs, développeurs et entreprises du monde entier.' : lang === 'es' ? 'Creamos QR GENIUS para ofrecer un generador de códigos QR rápido, realmente gratuito y respetuoso con la privacidad para creadores, desarrolladores y empresas de todo el mundo.' : 'lang === 'ar' ? 'أنشأنا QR GENIUS لتقديم أداة سريعة ومجانية وتحترم الخصوصية لإنشاء رموز QR للمبدعين والمطورين والشركات حول العالم.' : lang === 'fr' ? 'Nous avons créé QR GENIUS pour proposer un générateur de QR codes rapide, réellement gratuit et respectueux de la vie privée, destiné aux créateurs, développeurs et entreprises du monde entier.' : lang === 'es' ? 'Creamos QR GENIUS para ofrecer un generador de códigos QR rápido, realmente gratuito y respetuoso con la privacidad para creadores, desarrolladores y empresas de todo el mundo.' : 'We built QR GENIUS to provide a fast, truly free, and uncompromisingly private QR code generator for creators, developers, small businesses, and enterprises worldwide.''}
          </p>
        </div>

        {/* The Problem We Solved */}
        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            {lang === 'ar' ? 'لماذا يحتاج الإنترنت إلى مولّد آخر لرموز QR؟' : lang === 'fr' ? 'Pourquoi Internet a-t-il besoin d’un autre générateur de QR codes ?' : lang === 'es' ? '¿Por qué necesita Internet otro generador de códigos QR?' : 'lang === 'ar' ? 'لماذا يحتاج الإنترنت إلى مولّد آخر لرموز QR؟' : lang === 'fr' ? 'Pourquoi Internet a-t-il besoin d’un autre générateur de QR codes ?' : lang === 'es' ? '¿Por qué necesita Internet otro generador de códigos QR?' : 'Why Does the Internet Need Another QR Code Generator?''}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {lang === 'ar' ? 'تعتمد بعض مولدات QR التجارية على نماذج اشتراك قد تؤدي إلى تعطيل الرموز لاحقاً، كما تستخدم أحياناً روابط تحويل وتتبع خارجية قد تؤثر في الخصوصية وسرعة المسح.' : lang === 'fr' ? 'Certains générateurs commerciaux reposent sur des abonnements qui peuvent entraîner la désactivation des codes. D’autres utilisent des redirections et des traceurs tiers susceptibles de nuire à la confidentialité et à la vitesse de scan.' : lang === 'es' ? 'Algunos generadores comerciales utilizan suscripciones que pueden provocar la desactivación de los códigos. Otros emplean redirecciones y rastreadores externos que pueden afectar a la privacidad y a la velocidad de escaneo.' : 'lang === 'ar' ? 'تعتمد بعض مولدات QR التجارية على نماذج اشتراك قد تؤدي إلى تعطيل الرموز لاحقاً، كما تستخدم أحياناً روابط تحويل وتتبع خارجية قد تؤثر في الخصوصية وسرعة المسح.' : lang === 'fr' ? 'Certains générateurs commerciaux reposent sur des abonnements qui peuvent entraîner la désactivation des codes. D’autres utilisent des redirections et des traceurs tiers susceptibles de nuire à la confidentialité et à la vitesse de scan.' : lang === 'es' ? 'Algunos generadores comerciales utilizan suscripciones que pueden provocar la desactivación de los códigos. Otros emplean redirecciones y rastreadores externos que pueden afectar a la privacidad y a la velocidad de escaneo.' : 'Most commercial QR code generators operate on deceptive business models: they trick users into printing physical flyers and restaurant menus, only to disable the QR codes 14 days later unless you pay $35/month. Many also inject third-party redirect tracking domains that compromise user privacy and slow down scanning.''}
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {lang === 'ar' ? <>في <strong>QR GENIUS</strong>، تُنشأ أنواع الرموز الاثنا عشر داخل متصفحك وفق معيار ISO/IEC 18004. وتُشفّر البيانات المطلوبة مباشرةً داخل الرمز، دون خوادم وسيطة أو روابط تنتهي صلاحيتها.</> : <>{lang === 'ar' ? <>في <strong>QR GENIUS</strong>، تُنشأ أنواع الرموز الاثنا عشر داخل متصفحك وفق معيار ISO/IEC 18004، وتُشفّر البيانات مباشرةً داخل الرمز دون خوادم وسيطة.</> : lang === 'fr' ? <>Chez <strong>QR GENIUS</strong>, les douze types de codes sont générés dans votre navigateur selon la norme ISO/IEC 18004. Les données sont intégrées directement au code, sans serveur intermédiaire.</> : lang === 'es' ? <>En <strong>QR GENIUS</strong>, los doce tipos de códigos se generan en tu navegador según la norma ISO/IEC 18004. Los datos se incorporan directamente al código, sin servidores intermediarios.</> : <>At <strong>QR GENIUS</strong>, all 12 QR code types are generated in your browser according to ISO/IEC 18004, with data embedded directly and no intermediary servers.</>}</>}
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{lang === 'ar' ? 'خصوصية كاملة على جهازك' : lang === 'fr' ? 'Confidentialité entièrement locale' : lang === 'es' ? 'Privacidad totalmente local' : 'lang === 'ar' ? 'خصوصية كاملة على جهازك' : lang === 'fr' ? 'Confidentialité entièrement locale' : lang === 'es' ? 'Privacidad totalmente local' : '100% Client-Side Privacy''}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              lang === 'ar' ? 'تتم معالجة بيانات الرمز ورسمه محلياً على هاتفك أو حاسوبك باستخدام JavaScript، ولا تُرسل محتويات الرمز إلى قاعدة بيانات.' : lang === 'fr' ? 'Le calcul et le rendu du QR code sont effectués localement sur votre appareil avec JavaScript et les API Canvas/SVG. Les données du code ne sont pas envoyées à une base de données.' : lang === 'es' ? 'El cálculo y la generación del código QR se realizan localmente en tu dispositivo mediante JavaScript y las API Canvas/SVG. Los datos del código no se envían a ninguna base de datos.' : 'Every QR matrix computation and rendering happens locally on your computer or phone using JavaScript and Canvas/SVG APIs. Your payloads are never sent to a database.'
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{lang === 'ar' ? 'صلاحية غير محدودة' : lang === 'fr' ? 'Durée de vie illimitée' : lang === 'es' ? 'Duración ilimitada' : 'lang === 'ar' ? 'صلاحية غير محدودة' : lang === 'fr' ? 'Durée de vie illimitée' : lang === 'es' ? 'Duración ilimitada' : 'Infinite Lifespan''}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              lang === 'ar' ? 'تحتوي رموز QR الثابتة على البيانات نفسها، لذا تظل صالحة ما دامت الوجهة متاحة، ولا تعتمد على اشتراك أو رابط وسيط.' : lang === 'fr' ? 'Les QR codes statiques contiennent directement les données. Ils restent donc utilisables tant que leur destination est accessible, sans abonnement ni lien intermédiaire.' : lang === 'es' ? 'Los códigos QR estáticos contienen los propios datos. Por eso siguen funcionando mientras el destino esté disponible, sin suscripciones ni enlaces intermedios.' : 'Because static QR codes contain the raw data, they work as long as paper exists or your web server is alive. They can never be shut down by anyone.'
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{lang === 'ar' ? 'عالمي ومتعدد اللغات' : lang === 'fr' ? 'International et multilingue' : lang === 'es' ? 'Global y multilingüe' : 'lang === 'ar' ? 'عالمي ومتعدد اللغات' : lang === 'fr' ? 'International et multilingue' : lang === 'es' ? 'Global y multilingüe' : 'Global &amp; Multilingual''}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              lang === 'ar' ? 'يدعم الموقع الإنجليزية والعربية بتخطيط من اليمين إلى اليسار، إضافة إلى الفرنسية والإسبانية.' : lang === 'fr' ? 'Le site prend en charge l’anglais, l’arabe avec une mise en page RTL native, le français et l’espagnol.' : lang === 'es' ? 'El sitio admite inglés, árabe con diseño RTL nativo, francés y español.' : 'Engineered with full internationalization for English, Arabic with native RTL layout mirroring, French, and Spanish.'
            </p>
          </div>
        </div>

        {/* Open Architecture */}
        <div className="border-t border-slate-200 pt-12 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">{lang === 'ar' ? 'المعايير الهندسية' : lang === 'fr' ? 'Normes techniques' : lang === 'es' ? 'Estándares técnicos' : 'lang === 'ar' ? 'المعايير الهندسية' : lang === 'fr' ? 'Normes techniques' : lang === 'es' ? 'Estándares técnicos' : 'Engineering Standards''}</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            lang === 'ar' ? 'تم تطوير QR GENIUS باستخدام React 19 وTypeScript وTailwind CSS. وتتبع عمليات إنشاء الرموز مواصفة ISO/IEC 18004:2015 مع تصحيح الأخطاء Reed–Solomon.' : lang === 'fr' ? 'QR GENIUS est développé avec React 19, TypeScript et Tailwind CSS. La génération suit la norme ISO/IEC 18004:2015 et utilise la correction d’erreurs Reed–Solomon.' : lang === 'es' ? 'QR GENIUS está desarrollado con React 19, TypeScript y Tailwind CSS. La generación sigue la norma ISO/IEC 18004:2015 e implementa la corrección de errores Reed–Solomon.' : 'QR GENIUS is built with modern React 19, TypeScript, and clean Tailwind CSS. All mathematical calculations follow QR code specifications ISO/IEC 18004:2015 with Reed-Solomon error correction algorithm implementations.'
          </p>
          <div className="pt-4">
            <button
              onClick={() => onNavigate('generator')}
              className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-2"
            >
              <span>{lang === 'ar' ? 'جرّب استوديو QR الآن' : lang === 'fr' ? 'Essayer le studio QR' : lang === 'es' ? 'Probar el estudio QR' : 'lang === 'ar' ? 'جرّب استوديو QR الآن' : lang === 'fr' ? 'Essayer le studio QR' : lang === 'es' ? 'Probar el estudio QR' : 'Try QR Studio Now''}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
