import React from 'react';
import { Zap, Globe, Sparkles, Lock } from 'lucide-react';
import { Language, PageId } from '../types';

interface AboutPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ lang, onNavigate }) => {
  const text = (en: string, ar: string, fr: string, es: string) =>
    lang === 'ar' ? ar : lang === 'fr' ? fr : lang === 'es' ? es : en;

  return (
    <div className="py-12 sm:py-16 bg-white overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{text('Our Mission', 'رسالتنا', 'Notre mission', 'Nuestra misión')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {text('About QR GENIUS', 'عن كيو آر جينيوس', 'À propos de QR GENIUS', 'Acerca de QR GENIUS')}
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {text(
              'We built QR GENIUS to provide a fast, truly free, and privacy-focused QR code generator for creators, developers, small businesses, and organizations worldwide.',
              'أنشأنا QR GENIUS لتوفير أداة سريعة ومجانية فعلاً وتحافظ على الخصوصية لإنشاء رموز QR، لخدمة المبدعين والمطورين والشركات الصغيرة والمؤسسات حول العالم.',
              'Nous avons créé QR GENIUS pour proposer un générateur de codes QR rapide, réellement gratuit et respectueux de la vie privée, destiné aux créateurs, développeurs, petites entreprises et organisations du monde entier.',
              'Creamos QR GENIUS para ofrecer un generador de códigos QR rápido, realmente gratuito y respetuoso con la privacidad para creadores, desarrolladores, pequeñas empresas y organizaciones de todo el mundo.'
            )}
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            {text('Why Does the Internet Need Another QR Code Generator?', 'لماذا يحتاج الإنترنت إلى مولّد آخر لرموز QR؟', 'Pourquoi Internet a-t-il besoin d’un autre générateur de codes QR ?', '¿Por qué necesita Internet otro generador de códigos QR?')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {text(
              'Some commercial QR code services require paid plans to keep certain codes active. Others use external redirect and tracking links that may affect privacy and scanning speed.',
              'تعتمد بعض مولدات رموز QR التجارية على نماذج مضللة؛ فقد تتوقف الرموز بعد فترة قصيرة ما لم تشترك في باقة مدفوعة. كما تستخدم بعض الخدمات روابط تحويل وتتبع خارجية قد تؤثر في الخصوصية وسرعة المسح.',
              'Certains services commerciaux de génération de codes QR exigent un abonnement payant pour maintenir certains codes actifs. D’autres utilisent des redirections et des liens de suivi externes susceptibles de nuire à la confidentialité et à la vitesse de lecture.',
              'Algunos servicios comerciales de códigos QR exigen planes de pago para mantener activos ciertos códigos. Otros utilizan redirecciones y enlaces de seguimiento externos que pueden afectar a la privacidad y a la velocidad de lectura.'
            )}
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {text(
              'At QR GENIUS, QR codes are generated directly in your browser. Your data is encoded in the QR code itself, without intermediary servers or expiring redirect links.',
              'في QR GENIUS، تُنشأ أنواع الرموز الاثنا عشر داخل متصفحك وفق معيار ISO/IEC 18004. وتُشفّر البيانات المطلوبة مباشرةً داخل الرمز، دون خوادم وسيطة أو روابط تنتهي صلاحيتها.',
              'Avec QR GENIUS, les codes QR sont générés directement dans votre navigateur. Vos données sont intégrées au code lui-même, sans serveur intermédiaire ni lien de redirection à expiration.',
              'Con QR GENIUS, los códigos QR se generan directamente en tu navegador. Tus datos se codifican en el propio código, sin servidores intermediarios ni enlaces de redirección que caduquen.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{text('Privacy on Your Device', 'خصوصية كاملة على جهازك', 'Confidentialité sur votre appareil', 'Privacidad en tu dispositivo')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {text(
                'QR code generation and rendering happen locally on your device using browser technologies. The content you enter for a code is not sent to our database.',
                'تتم جميع عمليات إنشاء رموز QR وعرضها محلياً على جهازك باستخدام تقنيات المتصفح. ولا نرسل البيانات التي تدخلها لإنشاء الرمز إلى قاعدة بياناتنا.',
                'La création et l’affichage des codes QR s’effectuent localement sur votre appareil grâce aux technologies du navigateur. Le contenu saisi pour créer un code n’est pas envoyé à notre base de données.',
                'La creación y visualización de códigos QR se realizan localmente en tu dispositivo mediante tecnologías del navegador. El contenido que introduces para crear un código no se envía a nuestra base de datos.'
              )}
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{text('No Expiration for Static Codes', 'صلاحية غير محدودة للرموز الثابتة', 'Pas d’expiration pour les codes statiques', 'Los códigos estáticos no caducan')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {text(
                'Static QR codes contain the data itself. They continue to work as long as the printed code is readable and any linked destination remains available.',
                'تحتوي رموز QR الثابتة على البيانات نفسها. وتظل صالحة ما دام الرمز المطبوع قابلاً للقراءة والوجهة المرتبطة به متاحة.',
                'Les codes QR statiques contiennent directement les données. Ils restent utilisables tant que le code imprimé est lisible et que la destination liée reste disponible.',
                'Los códigos QR estáticos contienen los propios datos. Siguen funcionando mientras el código impreso sea legible y el destino enlazado continúe disponible.'
              )}
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{text('Global & Multilingual', 'عالمي ومتعدد اللغات', 'International et multilingue', 'Global y multilingüe')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {text(
                'The interface supports English, Arabic with right-to-left layout, French, and Spanish.',
                'تدعم الواجهة الإنجليزية والعربية بتنسيق من اليمين إلى اليسار والفرنسية والإسبانية.',
                'L’interface est disponible en anglais, en arabe avec une mise en page de droite à gauche, en français et en espagnol.',
                'La interfaz está disponible en inglés, árabe con diseño de derecha a izquierda, francés y español.'
              )}
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-12 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">{text('Engineering Standards', 'المعايير الهندسية', 'Normes techniques', 'Estándares técnicos')}</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {text(
              'QR GENIUS is built with React, TypeScript, and Tailwind CSS. QR code generation follows the ISO/IEC 18004 specification and uses Reed–Solomon error correction.',
              'تم بناء QR GENIUS باستخدام React وTypeScript وTailwind CSS. وتتبع عملية إنشاء رموز QR مواصفات ISO/IEC 18004 وتستخدم تصحيح الأخطاء Reed–Solomon.',
              'QR GENIUS est développé avec React, TypeScript et Tailwind CSS. La génération des codes QR suit la norme ISO/IEC 18004 et utilise la correction d’erreurs Reed–Solomon.',
              'QR GENIUS está desarrollado con React, TypeScript y Tailwind CSS. La generación de códigos QR sigue la norma ISO/IEC 18004 y utiliza la corrección de errores Reed–Solomon.'
            )}
          </p>
          <div className="pt-4">
            <button
              onClick={() => onNavigate('generator')}
              className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-2"
            >
              <span>{text('Try QR Studio Now', 'جرّب استوديو QR الآن', 'Essayer QR Studio', 'Probar QR Studio ahora')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
