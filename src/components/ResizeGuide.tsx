import React from 'react';
import type { Language } from '../types';

const GUIDE = {
  "en": {
    "heading": "Resizing an image for a website or application",
    "steps": "Start with the pixel dimensions your destination asks for. A profile form might specify a width and height, while a website might specify only the maximum width. Work from the original photo or graphic so that you can make another size later. Resizing a copy that has already been reduced can make fine lettering and edges harder to read.",
    "exampleHeading": "What height should I use for a 500-pixel-wide image?",
    "example": "For a 1000 × 600 photo, enter 500 as the width and leave Keep aspect ratio selected. The height becomes 300. A portrait image with the dimensions reversed produces a different height at the same width. Check the calculated value before downloading, especially if the destination sets a maximum height as well. Compare the original and resized copies at the size your audience will actually see.",
    "ratioHeading": "How can I fit a square slot without stretching a photo?",
    "ratio": "A landscape picture and a square slot have different proportions. Setting width and height independently stretches the picture to the requested shape. If you need the whole photograph, keep its proportions and use the dimensions the form allows. If you need a tightly framed square portrait, crop a separate copy first and then resize it. Look at faces and circular shapes to spot accidental stretching.",
    "privacyHeading": "Which format should I download?",
    "privacy": "Use PNG for a graphic that needs a transparent background. JPEG fills transparent areas with white, so check a logo against the background where you plan to use it. For a photograph, try JPEG or WebP if the destination accepts it. A pixel limit and a file size limit are separate requirements. After downloading, check both the dimensions and the file size in the file properties. If your image has the right dimensions but is still too large, try the image compressor."
  },
  "ar": {
    "heading": "كيفية تغيير حجم صورة عبر الإنترنت",
    "steps": "اختر صورة JPEG أو PNG أو WebP، ثم أدخل العرض والارتفاع بالبكسل وحدد صيغة PNG أو JPEG أو WebP للتنزيل.",
    "exampleHeading": "تغيير عرض الصورة إلى 500 بكسل",
    "example": "مثلاً، إذا كانت الصورة 1000 × 600 بكسل وأدخلت 500 للعرض، يصبح الارتفاع 300 بكسل تلقائياً عند تفعيل الحفاظ على تناسب الأبعاد.",
    "ratioHeading": "الحفاظ على الأبعاد أو تحديد قيم مستقلة",
    "ratio": "اترك خيار الحفاظ على تناسب الأبعاد مفعلاً لتجنب تمدد الصورة. ألغِ تفعيله فقط إذا أردت ضبط العرض والارتفاع بشكل مستقل، وقد تتشوه الصورة.",
    "privacyHeading": "هل تُرفع الصورة إلى الخادم؟",
    "privacy": "لا. تتم المعالجة داخل المتصفح دون إرسال الملف إلى خوادم QR Genius. تُقبل صور JPEG وPNG وWebP حتى 20 ميغابايت."
  },
  "fr": {
    "heading": "Comment redimensionner une image en ligne",
    "steps": "Choisissez une image JPEG, PNG ou WebP, saisissez la largeur et la hauteur en pixels, puis sélectionnez PNG, JPEG ou WebP pour le téléchargement.",
    "exampleHeading": "Réduire la largeur à 500 pixels",
    "example": "Par exemple, une image de 1000 × 600 pixels devient 500 × 300 pixels si vous saisissez 500 en largeur et conservez les proportions.",
    "ratioHeading": "Conserver les proportions ou saisir deux dimensions",
    "ratio": "Gardez l’option de proportions activée pour éviter les déformations. Désactivez-la uniquement pour définir largeur et hauteur séparément, ce qui peut étirer l’image.",
    "privacyHeading": "Mes images sont-elles envoyées sur un serveur ?",
    "privacy": "Non. Le redimensionnement se fait dans votre navigateur, sans transfert vers les serveurs QR Genius. Formats acceptés : JPEG, PNG et WebP, jusqu’à 20 Mo."
  },
  "es": {
    "heading": "Cómo cambiar el tamaño de una imagen en línea",
    "steps": "Elige una imagen JPEG, PNG o WebP, introduce el ancho y el alto en píxeles y selecciona PNG, JPEG o WebP para descargar.",
    "exampleHeading": "Cambiar el ancho a 500 píxeles",
    "example": "Por ejemplo, una imagen de 1000 × 600 píxeles pasa a 500 × 300 al introducir 500 de ancho con la proporción bloqueada.",
    "ratioHeading": "Mantener la proporción o elegir medidas independientes",
    "ratio": "Deja activada la opción de proporción para evitar deformaciones. Desactívala solo si necesitas cambiar ancho y alto por separado; la imagen podría estirarse.",
    "privacyHeading": "¿Se suben mis imágenes al servidor?",
    "privacy": "No. El cambio de tamaño se realiza en tu navegador, sin enviar archivos a los servidores de QR Genius. Se admiten JPEG, PNG y WebP de hasta 20 MB."
  }
}satisfies Record<Language, Record<string, string>>;

export function ResizeGuide({ lang }: { lang: Language }) {
  const guide = GUIDE[lang];
  return (
    <section aria-labelledby="resizer-guide-heading" className="mt-10 space-y-5 text-slate-700">
      <h2 id="resizer-guide-heading" className="text-2xl font-bold text-slate-900">{guide.heading}</h2>
      <p>{guide.steps}</p>
      <h3 className="text-lg font-semibold text-slate-900">{guide.exampleHeading}</h3>
      <p>{guide.example}</p>
      <h3 className="text-lg font-semibold text-slate-900">{guide.ratioHeading}</h3>
      <p>{guide.ratio}</p>
      <h3 className="text-lg font-semibold text-slate-900">{guide.privacyHeading}</h3>
      <p>{guide.privacy}</p>
      {lang === 'en' && <a href="/tools/image-compressor" className="text-indigo-700 underline">Compress the resized image</a>}
    </section>
  );
}
