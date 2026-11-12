import React, { useEffect, useState } from 'react';
import { compressImage, type CompressedImageFormat } from '../utils/imageCompression';

import type { Language } from '../types';

const COPY: Record<Language, Record<'title' | 'intro' | 'choose' | 'privacy' | 'format' | 'jpeg' | 'quality' | 'dimension' | 'busy' | 'compress' | 'unsupported' | 'tooLarge' | 'failed' | 'original' | 'output' | 'warning' | 'download' | 'howTitle' | 'howText' | 'privacyTitle' | 'privacyText', string>> = {
  "en": {
    "title": "Free Online Image Compressor",
    "intro": "Resize and compress JPEG, PNG, or WebP images directly in your browser. Your image stays on your device. Export as WebP or JPEG.",
    "choose": "Choose an image (up to 20 MB)",
    "privacy": "Images are processed locally; no upload is required.",
    "format": "Output format",
    "jpeg": "JPEG (white background for transparency)",
    "quality": "Quality",
    "dimension": "Maximum width or height",
    "busy": "Compressing…",
    "compress": "Compress image",
    "unsupported": "Please choose a JPEG, PNG, or WebP image.",
    "tooLarge": "Choose an image smaller than 20 MB.",
    "failed": "This image could not be processed. Try another supported image.",
    "original": "Original",
    "output": "Output",
    "warning": "Compression does not always make every image smaller.",
    "download": "Download compressed image",
    "howTitle": "How to compress an image",
    "howText": "Select a JPEG, PNG, or WebP image, choose WebP or JPEG, adjust the quality and maximum dimension, then compress and download.",
    "privacyTitle": "Does this tool upload my photos?",
    "privacyText": "No. Compression uses your browser’s image canvas; files are not sent to QR Genius servers by this tool."
  },
  "ar": {
    "title": "ضغط الصور مجاناً عبر الإنترنت",
    "intro": "اضغط صور JPEG وPNG وWebP مباشرة في متصفحك. تبقى صورك على جهازك ويمكنك تنزيلها بصيغة WebP أو JPEG.",
    "choose": "اختر صورة (حتى 20 ميغابايت)",
    "privacy": "تُعالج الصور محلياً دون رفعها إلى الخادم.",
    "format": "صيغة الصورة الناتجة",
    "jpeg": "JPEG (خلفية بيضاء بدلاً من الشفافية)",
    "quality": "الجودة",
    "dimension": "الحد الأقصى للعرض أو الارتفاع",
    "busy": "جارٍ الضغط…",
    "compress": "اضغط الصورة",
    "unsupported": "اختر صورة JPEG أو PNG أو WebP.",
    "tooLarge": "اختر صورة أصغر من 20 ميغابايت.",
    "failed": "تعذرت معالجة هذه الصورة. جرّب صورة أخرى مدعومة.",
    "original": "الأصلية",
    "output": "الناتجة",
    "warning": "قد لا يقل حجم كل صورة بعد الضغط.",
    "download": "تنزيل الصورة المضغوطة",
    "howTitle": "كيفية ضغط صورة",
    "howText": "اختر صورة JPEG أو PNG أو WebP، وحدد الصيغة والجودة والأبعاد، ثم اضغط الصورة ونزّلها.",
    "privacyTitle": "هل تُرفع صوري إلى الموقع؟",
    "privacyText": "لا. تتم معالجة الصور باستخدام المتصفح ولا ترسل هذه الأداة الملفات إلى خوادم QR Genius."
  },
  "fr": {
    "title": "Compresseur d’images gratuit",
    "intro": "Compressez des images JPEG, PNG ou WebP dans votre navigateur. Vos fichiers restent sur votre appareil. Exportez en WebP ou JPEG.",
    "choose": "Choisir une image (20 Mo maximum)",
    "privacy": "Traitement local, sans transfert de fichier.",
    "format": "Format de sortie",
    "jpeg": "JPEG (fond blanc pour la transparence)",
    "quality": "Qualité",
    "dimension": "Largeur ou hauteur maximale",
    "busy": "Compression…",
    "compress": "Compresser l’image",
    "unsupported": "Choisissez une image JPEG, PNG ou WebP.",
    "tooLarge": "Choisissez une image de moins de 20 Mo.",
    "failed": "Impossible de traiter cette image. Essayez un autre fichier pris en charge.",
    "original": "Original",
    "output": "Résultat",
    "warning": "La compression ne réduit pas toujours la taille du fichier.",
    "download": "Télécharger l’image compressée",
    "howTitle": "Comment compresser une image",
    "howText": "Choisissez une image JPEG, PNG ou WebP, réglez le format, la qualité et la taille maximale, puis téléchargez le résultat.",
    "privacyTitle": "Mes photos sont-elles envoyées au serveur ?",
    "privacyText": "Non. La compression se fait dans votre navigateur ; cet outil n’envoie pas vos fichiers aux serveurs QR Genius."
  },
  "es": {
    "title": "Compresor de imágenes gratis",
    "intro": "Comprime imágenes JPEG, PNG o WebP en tu navegador. Tus archivos permanecen en tu dispositivo. Exporta a WebP o JPEG.",
    "choose": "Selecciona una imagen (máximo 20 MB)",
    "privacy": "Procesamiento local, sin subir archivos.",
    "format": "Formato de salida",
    "jpeg": "JPEG (fondo blanco para transparencia)",
    "quality": "Calidad",
    "dimension": "Anchura o altura máxima",
    "busy": "Comprimiendo…",
    "compress": "Comprimir imagen",
    "unsupported": "Selecciona una imagen JPEG, PNG o WebP.",
    "tooLarge": "Selecciona una imagen de menos de 20 MB.",
    "failed": "No se pudo procesar esta imagen. Prueba con otro archivo compatible.",
    "original": "Original",
    "output": "Resultado",
    "warning": "La compresión no siempre reduce el tamaño del archivo.",
    "download": "Descargar imagen comprimida",
    "howTitle": "Cómo comprimir una imagen",
    "howText": "Selecciona una imagen JPEG, PNG o WebP, ajusta el formato, la calidad y el tamaño máximo, comprime y descarga.",
    "privacyTitle": "¿Se suben mis fotos al servidor?",
    "privacyText": "No. La compresión se realiza en tu navegador; esta herramienta no envía archivos a los servidores de QR Genius."
  }
};

const CONTENT_TIPS: Record<Language, { heading: string; body: string }[]> = {
  en: [
    { heading: "Which output format should I choose?", body: "WebP is a useful option for web graphics when the viewer supports it. JPEG is widely compatible with photos, but transparent areas become white in this tool." },
    { heading: "How do quality and dimensions affect the result?", body: "Lower quality can reduce file size but may blur fine details. A smaller maximum dimension can help with large photos. Compare the original and output sizes before downloading." },
    { heading: "Can this tool make every file smaller?", body: "No. Small, already optimized, or simple images can become larger after re-encoding. If the output is larger, keep the original or try different settings." }
  ],
  ar: [
    { heading: "أي صيغة أختار للصورة الناتجة؟", body: "صيغة WebP مناسبة لصور الويب عندما يدعمها البرنامج المستخدم. أما JPEG فتتميز بتوافق واسع مع الصور الفوتوغرافية، لكن المناطق الشفافة تصبح بيضاء في هذه الأداة." },
    { heading: "كيف تؤثر الجودة والأبعاد على النتيجة؟", body: "قد يقل الحجم عند خفض الجودة، لكن التفاصيل الدقيقة قد تصبح أقل وضوحاً. ويساعد تقليل الأبعاد القصوى للصور الكبيرة. قارن حجم الملف الأصلي بالناتج قبل التنزيل." },
    { heading: "هل تصبح كل صورة أصغر بعد الضغط؟", body: "لا. قد يزداد حجم الصور الصغيرة أو المحسنة مسبقاً بعد إعادة الترميز. إذا كان الملف الناتج أكبر، احتفظ بالأصل أو جرّب إعدادات أخرى." }
  ],
  fr: [
    { heading: "Quel format de sortie choisir ?", body: "WebP convient aux images destinées au Web lorsque le logiciel utilisé le prend en charge. JPEG est largement compatible avec les photos, mais les zones transparentes deviennent blanches dans cet outil." },
    { heading: "Comment la qualité et les dimensions influencent-elles le résultat ?", body: "Une qualité plus faible peut réduire la taille du fichier, au prix de détails moins nets. Réduire la dimension maximale aide aussi pour les grandes photos. Comparez les tailles avant de télécharger." },
    { heading: "Toutes les images deviennent-elles plus petites ?", body: "Non. Une petite image ou un fichier déjà optimisé peut grossir après réencodage. Dans ce cas, conservez l’original ou essayez d’autres réglages." }
  ],
  es: [
    { heading: "¿Qué formato de salida debo elegir?", body: "WebP puede ser útil para imágenes web cuando el programa de destino lo admite. JPEG es muy compatible con fotografías, pero las zonas transparentes se vuelven blancas en esta herramienta." },
    { heading: "¿Cómo afectan la calidad y las dimensiones al resultado?", body: "Reducir la calidad puede disminuir el tamaño, pero también perder detalle. Limitar las dimensiones ayuda con fotos grandes. Compara el tamaño original con el resultado antes de descargar." },
    { heading: "¿Todas las imágenes se vuelven más pequeñas?", body: "No. Una imagen pequeña o ya optimizada puede aumentar de tamaño al recodificarse. En ese caso, conserva el original o prueba otros ajustes." }
  ]
};

const MAX_FILE_BYTES = 20 * 1024 * 1024;

export function ImageCompressor({ lang = 'en' }: { lang?: Language }) {
  const t = COPY[lang];
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<CompressedImageFormat>('image/webp');
  const [quality, setQuality] = useState(0.75);
  const [maxDimension, setMaxDimension] = useState(1920);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ url: string; size: number; name: string } | null>(null);

  useEffect(() => () => { if (result) URL.revokeObjectURL(result.url); }, [result]);

  function chooseFile(next: File | null) {
    setFile(null);
    setResult(null);
    setError('');
    if (!next) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(next.type)) {
      setError(t.unsupported);
      return;
    }
    if (!next.size || next.size > MAX_FILE_BYTES) {
      setError(t.tooLarge);
      return;
    }
    setFile(next);
  }

  async function handleCompress(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file || busy) return;
    setBusy(true);
    setError('');
    setResult(null);
    try {
      const compressed = await compressImage(file, { format, quality, maxDimension });
      const url = URL.createObjectURL(compressed.blob);
      const base = file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 70) || 'image';
      setResult({ url, size: compressed.outputBytes, name: `${base}-compressed.${format === 'image/webp' ? 'webp' : 'jpg'}` });
    } catch {
      setError(t.failed);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section aria-labelledby="compressor-title" className="mx-auto max-w-3xl px-4 py-12">
      <h1 id="compressor-title" className="text-3xl font-bold text-slate-900">{t.title}</h1>
      <p className="mt-3 text-slate-600">{t.intro}</p>
      <form onSubmit={handleCompress} className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <label className="block font-semibold text-slate-800" htmlFor="image-file">{t.choose}</label>
        <input id="image-file" aria-describedby="image-privacy" type="file" accept="image/jpeg,image/png,image/webp" onChange={e => chooseFile(e.target.files?.[0] || null)} className="block w-full text-sm" />
        <p id="image-privacy" className="text-sm text-slate-500">{t.privacy}</p>
        <label className="block font-semibold text-slate-800" htmlFor="image-format">{t.format}</label>
        <select id="image-format" value={format} onChange={e => { setFormat(e.target.value as CompressedImageFormat); setResult(null); }} className="w-full rounded-lg border border-slate-300 p-3">
          <option value="image/webp">WebP</option>
          <option value="image/jpeg">{t.jpeg}</option>
        </select>
        <label className="block font-semibold text-slate-800" htmlFor="image-quality">{t.quality}: {Math.round(quality * 100)}%</label>
        <input id="image-quality" type="range" min="10" max="100" value={Math.round(quality * 100)} onChange={e => { setQuality(Number(e.target.value) / 100); setResult(null); }} className="w-full" />
        <label className="block font-semibold text-slate-800" htmlFor="image-dimension">{t.dimension}</label>
        <select id="image-dimension" value={maxDimension} onChange={e => { setMaxDimension(Number(e.target.value)); setResult(null); }} className="w-full rounded-lg border border-slate-300 p-3">
          <option value="640">640 px</option><option value="1280">1280 px</option><option value="1920">1920 px</option><option value="3840">3840 px</option>
        </select>
        <button type="submit" disabled={!file || busy} className="min-h-12 w-full rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">{busy ? t.busy : t.compress}</button>
        {error && <p role="alert" className="text-red-700">{error}</p>}
        {result && <div role="status" className="space-y-3 rounded-xl bg-slate-50 p-4">
          <p>{t.original}: {(file!.size / 1024).toFixed(1)} KB · {t.output}: {(result.size / 1024).toFixed(1)} KB</p>
          <p className="text-sm text-slate-600">{t.warning}</p>
          <a href={result.url} download={result.name} className="inline-flex min-h-12 items-center rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white">{t.download}</a>
        </div>}
      </form>
      <div className="mt-10 space-y-3 text-slate-700">
        <h2 className="text-xl font-bold">{t.howTitle}</h2>
        <p>{t.howText}</p>
        <h2 className="text-xl font-bold">{t.privacyTitle}</h2>
        <p>{t.privacyText}</p>
        {CONTENT_TIPS[lang].map((tip) => (
          <section key={tip.heading} className="pt-3">
            <h3 className="font-semibold text-slate-900">{tip.heading}</h3>
            <p className="mt-1 leading-relaxed">{tip.body}</p>
          </section>
        ))}
      </div>
    </section>
  );
}
