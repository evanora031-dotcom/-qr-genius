import { readFileSync } from 'node:fs';
const root='dist/';
const png=readFileSync(root+'og-image.png');
if(png.subarray(0,8).toString('hex')!=='89504e470d0a1a0a'||png.readUInt32BE(16)!==1200||png.readUInt32BE(20)!==630)throw Error('Invalid social image PNG dimensions or signature');
if(png.length>300*1024)throw Error('Social image exceeds 300 KiB: '+png.length);
const routes = {
  'index.html': 'image',
  'es/index.html': 'image',
  'tools/wifi.html': 'wifi',
  'ar/tools/whatsapp.html': 'whatsapp',
  'fr/tools/business-vcard.html': 'business',
  'tools/url.html': 'url',
  'tools/image-compressor.html': 'image-compressor',
  'tools/image-resizer.html': 'image-resizer',
  'tools/merge-pdf.html': 'pdf-merge',
  'tools/images-to-pdf.html': 'images-to-pdf'
};
for (const [route, card] of Object.entries(routes)) {
  const file = 'og-' + card + '.png';
  const image = readFileSync(root + file);
  const html = readFileSync(root + route, 'utf8');
  const alt = card === 'image' ? 'QR Genius — Free QR Code Generator' : 'QR Genius — ' + html.match(/<h1>(.*?)<\/h1>/)[1];
  for (const field of ['property="og:image"', 'name="twitter:image"']) {
    if (!html.includes(field + ' content="https://getqrgenius.com/' + file + '"')) throw Error('Wrong image on ' + route);
  }
  if (!html.includes('property="og:image:alt" content="' + alt + '"')) throw Error('Wrong alternative text on ' + route);
  if (image.readUInt32BE(16) !== 1200 || image.readUInt32BE(20) !== 630 || image.length > 300*1024) throw Error('Invalid card ' + file);
}
console.log('Verified page-specific social previews.');
