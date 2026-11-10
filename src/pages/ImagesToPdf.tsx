import React, { useEffect, useRef, useState } from 'react';
import { imagesToPdf, validatePdfImages } from '../utils/imagesToPdf';
import type { Language } from '../types';

const COPY: Record<Language, { title: string; intro: string; choose: string; convert: string; busy: string; download: string; privacy: string; guide: string; error: string }> = {
  en: { title: 'Convert Images to PDF Free', intro: 'Turn up to 10 JPEG or PNG images into an A4 PDF. Each image becomes one page, in the order selected.', choose: 'Choose JPEG or PNG images (up to 10)', convert: 'Create PDF', busy: 'Creating PDF…', download: 'Download PDF', privacy: 'Images stay in your browser. No upload is required.', guide: 'Choose images, create your PDF, and download it. Each image is fitted to an A4 page without cropping.', error: 'Could not create the PDF. Check that all images are valid JPEG or PNG files.' },
  ar: { title: 'تحويل الصور إلى PDF مجاناً', intro: 'حوّل حتى 10 صور JPEG أو PNG إلى PDF بحجم A4. تظهر كل صورة في صفحة حسب ترتيب الاختيار.', choose: 'اختر صور JPEG أو PNG (حتى 10)', convert: 'إنشاء PDF', busy: 'جارٍ إنشاء PDF…', download: 'تنزيل PDF', privacy: 'تبقى الصور داخل متصفحك دون رفعها إلى الخادم.', guide: 'اختر الصور ثم أنشئ الملف ونزّله. تُضبط كل صورة لتناسب صفحة A4 دون قص.', error: 'تعذر إنشاء PDF. تأكد من أن الصور بصيغة JPEG أو PNG سليمة.' },
  fr: { title: 'Convertir des images en PDF gratuitement', intro: 'Convertissez jusqu’à 10 images JPEG ou PNG en PDF A4. Une image par page, dans l’ordre de sélection.', choose: 'Choisir des images JPEG ou PNG (10 maximum)', convert: 'Créer le PDF', busy: 'Création du PDF…', download: 'Télécharger le PDF', privacy: 'Les images restent dans votre navigateur, sans envoi au serveur.', guide: 'Sélectionnez les images, créez le PDF et téléchargez-le. Chaque image tient sur une page A4 sans recadrage.', error: 'Impossible de créer le PDF. Vérifiez vos fichiers JPEG ou PNG.' },
  es: { title: 'Convertir imágenes a PDF gratis', intro: 'Convierte hasta 10 imágenes JPEG o PNG en un PDF A4. Cada imagen ocupa una página en el orden seleccionado.', choose: 'Selecciona imágenes JPEG o PNG (máximo 10)', convert: 'Crear PDF', busy: 'Creando PDF…', download: 'Descargar PDF', privacy: 'Las imágenes permanecen en tu navegador, sin subirlas al servidor.', guide: 'Selecciona las imágenes, crea el PDF y descárgalo. Cada imagen se ajusta a una página A4 sin recortar.', error: 'No se pudo crear el PDF. Comprueba tus imágenes JPEG o PNG.' }
};

export const ImagesToPdf: React.FC<{ lang?: Language }> = ({ lang = 'en' }) => {
  const t = COPY[lang];
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');
  const selectionVersion = useRef(0);
  useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);
  const onSelect = (selected: File[]) => {
    selectionVersion.current += 1;
    setFiles(selected);
    setUrl('');
    try { validatePdfImages(selected); setError(''); }
    catch (err) { setError(err instanceof Error ? err.message : t.error); }
  };
  const onConvert = async () => {
    setError('');
    setBusy(true);
    const version = selectionVersion.current;
    try {
      const blob = await imagesToPdf(files);
      if (version === selectionVersion.current) setUrl(URL.createObjectURL(blob));
    } catch { if (version === selectionVersion.current) setError(t.error); }
    finally { setBusy(false); }
  };
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900">{t.title}</h1>
      <p className="text-slate-600">{t.intro}</p>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
        <label className="block font-semibold text-slate-800" htmlFor="pdf-images">{t.choose}</label>
        <input id="pdf-images" type="file" accept="image/jpeg,image/png" multiple disabled={busy} onChange={event => onSelect(Array.from(event.target.files || []))} className="block w-full text-sm" />
        {files.length > 0 && <p className="text-sm text-slate-600">{files.length} {lang === 'ar' ? 'صور' : 'images'}</p>}
        {error && <p role="alert" className="text-red-700">{error}</p>}
        <button type="button" disabled={busy || !files.length || !!error} onClick={onConvert} className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white disabled:opacity-50">{busy ? t.busy : t.convert}</button>
        {url && <a href={url} download="qr-genius-images.pdf" className="block w-fit rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white">{t.download}</a>}
      </section>
      <section className="space-y-3 text-slate-600">
        <h2 className="text-xl font-bold text-slate-900">{t.title}</h2>
        <p>{t.guide}</p>
        <p>{t.privacy}</p>
      </section>
    </main>
  );
};
