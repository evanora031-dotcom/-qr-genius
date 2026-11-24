import type { Language } from '../types';

export const mergeGuide: Record<Language, { heading: string; body: string }[]> = {
  en: [
    { heading: 'How do I keep the pages in the right order?', body: 'Plan the order of the documents before opening the file picker. For a job application, for example, place the cover letter first, then the résumé and finally the references. The merger copies every page from the first PDF before adding any pages from the next PDF. A three-page résumé therefore stays together. Numbering your source files can make them easier to identify. After downloading, check the first page of each section against the originals.' },
    { heading: 'Why was my selection rejected?', body: 'Check both the size of each file and the total size of the selection. For example, four 16 MB documents fit the individual limit but exceed the combined limit. If the sizes look right, open each source separately and check that it contains pages. A file renamed from another format to PDF is still in its original format. Export a real PDF from the application that created it. For a locked document, ask the sender for an unlocked copy.' },
    { heading: 'Can I include a photograph between two documents?', body: 'If your attachment is a JPEG or PNG, first convert it with the images to PDF tool. Open that PDF and check that the photograph faces the right way and that small text is readable. Then select it alongside the other PDFs in the position where the photograph belongs. To place it inside a single existing document, prepare separate PDFs for the parts that go before and after the image.' },
    { heading: 'What should I check before sending the result?', body: 'Open the downloaded PDF in the reader your recipient will use. Compare the page count with the sum of the originals and look at the joins between documents for missing or duplicate pages. If the recipient sets a file size limit, check the downloaded file itself. Merging assembles pages and does not guarantee a smaller attachment. Keep the originals so you can correct a source document or change the order and merge again.' }
  ],
  ar: [
    { heading: "متى يفيد دمج ملفات PDF؟", body: "اجمع فصولاً أو تقارير أو مستندات ممسوحة ضوئياً في ملف PDF واحد يسهل مشاركته. تبقى صفحات كل ملف متتابعة حسب ترتيب اختياره." },
    { heading: "ما الذي أراجعه قبل الدمج؟", body: "اختر من ملفين إلى 10 ملفات PDF غير محمية وبالترتيب المطلوب. الحد الأقصى 20 ميغابايت لكل ملف و60 ميغابايت للمجموع. راجع الملف الناتج قبل مشاركته." },
    { heading: "هل يؤدي الدمج إلى تعديل الصفحات أو ضغطها؟", body: "لا. تجمع الأداة صفحات ملفات PDF الموجودة، ولا تعيد كتابة النصوص أو تحذف الصفحات أو تضمن تقليل الحجم." }
  ],
  fr: [
    { heading: "Quand fusionner des PDF ?", body: "Réunissez des chapitres, rapports ou documents numérisés dans un seul PDF plus simple à partager. Les pages de chaque fichier restent groupées dans l’ordre de sélection." },
    { heading: "Que vérifier avant la fusion ?", body: "Choisissez 2 à 10 PDF non protégés dans le bon ordre. Chaque fichier doit faire au plus 20 Mo, pour un total de 60 Mo. Vérifiez le résultat avant de le partager." },
    { heading: "La fusion modifie-t-elle ou compresse-t-elle les pages ?", body: "Non. L’outil assemble les pages existantes ; il ne réécrit pas le texte, ne supprime pas de pages et ne garantit pas un fichier plus léger." }
  ],
  es: [
    { heading: "¿Cuándo conviene unir archivos PDF?", body: "Reúne capítulos, informes o documentos escaneados en un solo PDF más fácil de compartir. Las páginas de cada archivo se mantienen juntas en el orden de selección." },
    { heading: "¿Qué debo comprobar antes de unirlos?", body: "Elige de 2 a 10 PDF sin contraseña en el orden deseado. Cada archivo admite hasta 20 MB y el total hasta 60 MB. Revisa el resultado antes de compartirlo." },
    { heading: "¿La unión edita o comprime las páginas?", body: "No. La herramienta reúne páginas PDF existentes; no reescribe el texto, elimina páginas ni garantiza reducir el tamaño." }
  ]
};
