import type { Language } from '../types';

export const imagePdfNotes: Record<Language, { title: string; body: string }[]> = {
  en: [
    { title: 'How should I prepare photographs of documents?', body: 'Open each image before selecting your files. Check the top and bottom of the page for missing lines and zoom in on dates, totals and small print. Crop out the surrounding desk and rotate a sideways image in your image editor first. If a photograph is blurred, retaking it usually helps more than enlarging it. Keep the originals until you have checked the downloaded PDF.' },
    { title: 'How will a landscape image fit on an A4 page?', body: 'Each image occupies a separate portrait A4 page. It is scaled proportionally and centered inside the margins. A wide photograph therefore leaves space above and below it, while a tall receipt may leave space on either side. If the lettering looks small, check how much of your original image shows the document itself. Removing empty background before conversion gives the document more of the available page.' },
    { title: 'Can I search or copy the words in my PDF?', body: 'The PDF contains pictures of your documents. Converting a photograph of a receipt does not turn the amount, date or merchant name into selectable text. If you need to search a box of scanned receipts by merchant, use an OCR step separately. If the source began as a text document and you still have it, exporting that original to PDF can preserve the text more directly.' },
    { title: 'How do I check the order before sending the PDF?', body: 'Choose the images in the sequence you want the reader to see, then open the downloaded file in a PDF reader. Compare the page count with the number of images you selected and skim the thumbnails from start to finish. Check the first and last page at normal reading size. If a page is missing, sideways or in the wrong position, correct the source or the selection and create a new copy.' }
  ],
  ar: [
    { title: "متى تفيد هذه الأداة؟", body: "اجمع صور الإيصالات أو الملاحظات أو المستندات في ملف PDF واحد يسهل مشاركته. يتضمن الملف صفحة A4 لكل صورة." },
    { title: "ما الذي أراجعه قبل التحويل؟", body: "اختر صوراً واضحة وبالاتجاه الصحيح وبالترتيب الذي تريد ظهوره. لا تعيد الأداة ترتيب الصور ولا تدوّرها أو تقصّها." },
    { title: "هل يصبح النص الموجود في الصور قابلاً للبحث؟", body: "لا. يحتوي ملف PDF على الصور نفسها، ولا تنفذ الأداة التعرف الضوئي على النصوص (OCR)." }
  ],
  fr: [
    { title: "Quand utiliser cet outil ?", body: "Réunissez des reçus, des notes ou des photos de documents dans un seul PDF facile à partager. Chaque image occupe une page A4." },
    { title: "Que vérifier avant la conversion ?", body: "Choisissez des images nettes, bien orientées et dans l’ordre souhaité. L’outil ne réorganise, ne pivote et ne recadre pas les images." },
    { title: "Le texte des images sera-t-il recherchable ?", body: "Non. Le PDF contient les images comme pages et n’effectue pas de reconnaissance optique de caractères (OCR)." }
  ],
  es: [
    { title: "¿Cuándo conviene usar esta herramienta?", body: "Reúne recibos, apuntes o fotos de documentos en un solo PDF fácil de compartir. Cada imagen ocupa una página A4." },
    { title: "¿Qué debo comprobar antes de convertir?", body: "Selecciona imágenes nítidas, bien orientadas y en el orden deseado. La herramienta no reordena, gira ni recorta las imágenes." },
    { title: "¿Se podrá buscar el texto de las imágenes?", body: "No. El PDF contiene las imágenes como páginas y no realiza reconocimiento óptico de caracteres (OCR)." }
  ]
};
