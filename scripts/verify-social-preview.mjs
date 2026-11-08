import { readFileSync, existsSync } from 'node:fs';
const root='dist/';
const png=readFileSync(root+'og-image.png');
if(png.subarray(0,8).toString('hex')!=='89504e470d0a1a0a'||png.readUInt32BE(16)!==1200||png.readUInt32BE(20)!==630)throw Error('Invalid social image PNG dimensions or signature');
if(png.length>300*1024)throw Error('Social image exceeds 300 KiB: '+png.length);
const routes=['index.html','tools/wifi.html','ar/tools/whatsapp.html','fr/tools/business-vcard.html','es/index.html'];
for(const route of routes){
 if(!existsSync(root+route))throw Error('Missing prerendered route '+route);
 const html=readFileSync(root+route,'utf8');
 for(const tag of ['<meta property="og:image" content="https://getqrgenius.com/og-image.png" />','<meta name="twitter:image" content="https://getqrgenius.com/og-image.png" />','<meta property="og:image:alt" content="QR Genius — Free QR Code Generator" />','<meta property="og:image:width" content="1200" />','<meta property="og:image:height" content="630" />']){
 if(!html.includes(tag))throw Error('Missing social metadata '+route+': '+tag);
 }
}
console.log('Verified social image PNG and prerendered metadata on',routes.length,'routes.');
