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

export function CompressionTips({ lang }: { lang: Language }) {
  return <div className="space-y-3">
    {tips[lang].map(([heading, body]) => <section key={heading}>
      <h3 className="font-semibold">{heading}</h3>
      <p>{body}</p>
    </section>)}
  </div>;
}
