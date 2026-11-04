import React from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface TermsPageProps {
  lang: Language;
}

export const TermsPage: React.FC<TermsPageProps> = ({ lang }) => {
  const text = (en: string, ar: string, fr: string, es: string) =>
    lang === 'ar' ? ar : lang === 'fr' ? fr : lang === 'es' ? es : en;

  return (
    <div className="py-12 sm:py-16 bg-white overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        <div className="border-b border-slate-200 pb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700">
            <FileText className="w-3.5 h-3.5" />
            <span>{text('Terms of Use', 'اتفاقية الاستخدام', 'Conditions d’utilisation', 'Condiciones de uso')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {text('Terms of Service', 'شروط الاستخدام', 'Conditions de service', 'Términos del servicio')}
          </h1>
          <p className="text-xs text-slate-500">
            {text('Last Updated: November 1, 2026', 'آخر تحديث: 1 نوفمبر 2026', 'Dernière mise à jour : 1 novembre 2026', 'Última actualización: 1 de noviembre de 2026')}
          </p>
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2 text-indigo-700 text-sm font-bold mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{text('Free Personal and Commercial Use', 'ترخيص مجاني للاستخدام الشخصي والتجاري', 'Utilisation personnelle et commerciale gratuite', 'Uso personal y comercial gratuito')}</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {text(
              'You retain the right to use the QR codes you create with QR GENIUS. You are granted a free, perpetual, worldwide license to use, print, copy, distribute, and display those codes for personal or commercial purposes.',
              'تعود إليك حقوق استخدام رموز QR التي تنشئها عبر QR GENIUS. ويُمنح لك ترخيص عالمي ودائم ومجاني لاستخدام هذه الرموز وطباعتها ونسخها وتوزيعها وعرضها لأي غرض شخصي أو تجاري.',
              'Vous conservez le droit d’utiliser les codes QR créés avec QR GENIUS. Vous bénéficiez d’une licence gratuite, perpétuelle et mondiale pour utiliser, imprimer, copier, distribuer et afficher ces codes à des fins personnelles ou commerciales.',
              'Conservas el derecho a utilizar los códigos QR que crees con QR GENIUS. Se te concede una licencia gratuita, perpetua y mundial para usar, imprimir, copiar, distribuir y mostrar esos códigos con fines personales o comerciales.'
            )}
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              {text('1. Acceptance of Terms', '1. الموافقة على الشروط', '1. Acceptation des conditions', '1. Aceptación de los términos')}
            </h2>
            <p>
              {text(
                'By accessing and using QR GENIUS, you agree to comply with this agreement. If you do not agree to these terms, please stop using the website.',
                'بدخولك إلى QR GENIUS واستخدامه، فإنك توافق على الالتزام ببنود هذه الاتفاقية. إذا لم توافق على هذه الشروط، يُرجى التوقف عن استخدام الموقع.',
                'En accédant à QR GENIUS et en l’utilisant, vous acceptez de respecter les dispositions du présent accord. Si vous n’acceptez pas ces conditions, veuillez cesser d’utiliser le site.',
                'Al acceder y utilizar QR GENIUS, aceptas cumplir este acuerdo. Si no estás de acuerdo con estos términos, deja de utilizar el sitio web.'
              )}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              {text('2. Permitted Commercial and Print Use', '2. الاستخدام التجاري والطباعة المسموح بهما', '2. Utilisation commerciale et impression autorisées', '2. Uso comercial e impresión permitidos')}
            </h2>
            <p>
              {text(
                'You may print generated codes on packaging, business cards, billboards, magazines, restaurant menus, stickers, and electronic displays. We do not require branding attribution, watermarks, or backlinks.',
                'يمكنك طباعة الرموز التي تنشئها على العبوات وبطاقات الأعمال واللوحات الإعلانية والمجلات وقوائم المطاعم والملصقات والشاشات الإلكترونية. لا نشترط إضافة شعار أو علامة مائية أو رابط يعود إلى موقعنا.',
                'Vous pouvez imprimer les codes générés sur des emballages, cartes de visite, panneaux publicitaires, magazines, menus de restaurant, autocollants et écrans électroniques. Nous n’exigeons ni attribution de marque, ni filigrane, ni lien retour.',
                'Puedes imprimir los códigos generados en envases, tarjetas de visita, vallas publicitarias, revistas, menús de restaurantes, pegatinas y pantallas electrónicas. No exigimos atribución de marca, marcas de agua ni enlaces hacia nuestro sitio.'
              )}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              {text('3. Prohibited Use', '3. الاستخدامات المحظورة', '3. Utilisations interdites', '3. Usos prohibidos')}
            </h2>
            <p>
              {text(
                'You agree not to use QR GENIUS to create QR codes that link to or promote:',
                'تتعهد بعدم استخدام QR GENIUS لإنشاء رموز QR تؤدي إلى المحتوى التالي أو تروّج له:',
                'Vous vous engagez à ne pas utiliser QR GENIUS pour créer des codes QR qui renvoient vers les contenus suivants ou en font la promotion :',
                'Te comprometes a no utilizar QR GENIUS para crear códigos QR que enlacen con los siguientes contenidos o los promocionen:'
              )}
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>{text('Malicious software, viruses, or phishing schemes', 'البرامج الضارة أو الفيروسات أو محاولات التصيد الاحتيالي', 'Logiciels malveillants, virus ou tentatives d’hameçonnage', 'Software malicioso, virus o intentos de suplantación de identidad')}</li>
              <li>{text('Unauthorized disclosure of confidential personal information', 'الكشف غير المصرح به عن معلومات شخصية سرية', 'Divulgation non autorisée d’informations personnelles confidentielles', 'Divulgación no autorizada de información personal confidencial')}</li>
              <li>{text('Illegal, defamatory, fraudulent, or harassing content', 'المحتوى غير القانوني أو التشهيري أو الاحتيالي أو المسيء', 'Contenus illégaux, diffamatoires, frauduleux ou constitutifs de harcèlement', 'Contenido ilegal, difamatorio, fraudulento o de acoso')}</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              {text('4. Disclaimer of Warranty', '4. إخلاء المسؤولية عن الضمان', '4. Exclusion de garantie', '4. Exención de garantías')}
            </h2>
            <p>
              {text(
                'QR codes are generated locally and provided “as is”. Although QR GENIUS uses standard ISO/IEC error-correction algorithms, we recommend testing codes with more than one phone camera before printing large quantities.',
                'تُنشأ رموز QR محلياً «كما هي». وعلى الرغم من استخدام QR GENIUS لخوارزميات تصحيح الأخطاء القياسية ISO/IEC، ننصح باختبار الرموز باستخدام أكثر من كاميرا هاتف قبل البدء بالطباعة بكميات كبيرة.',
                'Les codes QR sont générés localement et fournis « en l’état ». Bien que QR GENIUS utilise des algorithmes standard de correction d’erreurs ISO/IEC, nous recommandons de tester les codes avec plusieurs appareils photo de téléphone avant toute impression en grande quantité.',
                'Los códigos QR se generan localmente y se proporcionan «tal cual». Aunque QR GENIUS utiliza algoritmos estándar de corrección de errores ISO/IEC, recomendamos probar los códigos con más de una cámara de teléfono antes de imprimir grandes cantidades.'
              )}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
