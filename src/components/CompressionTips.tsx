import React from 'react';
import type { Language } from '../types';

const tips = {
  en: [
    ['Choose a size for the destination', 'A small thumbnail and a full-width photograph need different amounts of detail. Start with the largest size at which the image will actually appear. Keep an original copy so you can prepare a larger version later.'],
    ['Compare small details', 'View both files at the same scale. Check lettering on signs, hair against the background and smooth areas such as skies. Increase quality if letters lose their edges or gradients turn into bands.'],
    ['Check the download', 'Open the exported file against the background you intend to use. Compare its size with the original before replacing it. An image that already uses efficient compression can become larger when encoded again.']
  ],
  fr: [
    ['Choisir les dimensions', 'Partez de la largeur réelle d’affichage et conservez une copie originale.'],
    ['Comparer les détails', 'Examinez les lettres, les cheveux et les dégradés au même niveau de zoom.'],
    ['Vérifier le fichier', 'Comparez le poids des deux fichiers et visualisez le résultat sur le fond prévu.']
  ],
  es: [
    ['Elegir las dimensiones', 'Parte del tamaño real de visualización y guarda el original.'],
    ['Comparar los detalles', 'Mira las letras, el pelo y los degradados con el mismo nivel de zoom.'],
    ['Comprobar el archivo', 'Compara el peso de ambos archivos y revisa la imagen sobre el fondo previsto.']
  ],
  ar: [
    ['اختيار الأبعاد', 'ابدأ بحجم العرض المطلوب واحتفظ بنسخة من الصورة الأصلية.'],
    ['مقارنة التفاصيل', 'قارن الكتابة والحواف وتدرجات الألوان عند مستوى التكبير نفسه.'],
    ['فحص الملف المنزّل', 'قارن حجم الملفين وجرّب الصورة فوق الخلفية التي ستستخدمها.']
  ]
};

const exampleCaptions = {
  en: ['The same QR image at 424 × 424 pixels', 'Original PNG', 'JPEG at 65% quality', 'The sharp black-and-white pattern takes fewer bytes as a PNG. Compare downloads before replacing an original.'],
  fr: ['La même image QR de 424 × 424 pixels', 'PNG original', 'JPEG à 65 % de qualité', 'Pour ce motif noir et blanc, le PNG occupe moins de place. Comparez les tailles avant de remplacer l’original.'],
  es: ['La misma imagen QR de 424 × 424 píxeles', 'PNG original', 'JPEG al 65 % de calidad', 'Este patrón en blanco y negro ocupa menos como PNG. Compara el tamaño de los archivos antes de sustituir el original.'],
  ar: ['صورة QR نفسها بأبعاد 424 × 424 بكسل', 'صورة PNG الأصلية', 'صورة JPEG بجودة 65٪', 'في هذا المثال تشغل صورة PNG بالأبيض والأسود مساحة أقل. قارن حجم الملفين قبل استبدال الأصل.']
};

export function CompressionTips({ lang }: { lang: Language }) {
  const [heading, original, compressed, explanation] = exampleCaptions[lang];
  return <div className="space-y-3">
    {tips[lang].map(([heading, body]) => <section key={heading}>
      <h3 className="font-semibold">{heading}</h3>
      <p>{body}</p>
    </section>)}
    <section>
      <h3 className="font-semibold">{heading}</h3>
      <div className="grid grid-cols-2 gap-3">
        <figure><img src="/examples/alex-example.png" width="424" height="424" loading="lazy" alt={original} className="h-auto w-full max-w-44" /><figcaption>{original} · 931 B</figcaption></figure>
        <figure><img src="/examples/contact-card-compressed.jpg" width="424" height="424" loading="lazy" alt={compressed} className="h-auto w-full max-w-44" /><figcaption>{compressed} · 2658 B</figcaption></figure>
      </div>
      <p>{explanation}</p>
    </section>
  </div>;
}
