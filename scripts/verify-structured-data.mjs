import {readFileSync} from 'node:fs';
const root='dist/';
const routes=[
['index.html',['SoftwareApplication']],
['tools/wifi.html',['BreadcrumbList','FAQPage']],
['tools/whatsapp.html',['BreadcrumbList','FAQPage']],
['tools/business-vcard.html',['BreadcrumbList','FAQPage']],
['ar/tools/wifi.html',['BreadcrumbList']],
['fr/index.html',['SoftwareApplication']]
];
for(const [path,expected] of routes){
 const html=readFileSync(root+path,'utf8');
 const scripts=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
 const types=scripts.map(x=>x['@type']);
 for(const type of expected)if(!types.includes(type))throw Error(path+' missing '+type);
 if(types.includes('WebApplication'))throw Error(path+' contains obsolete generic schema');
 if(path.startsWith('ar/')&&types.includes('FAQPage'))throw Error('Unverified translated FAQ');
 for(const obj of scripts)if(obj['@context']!=='https://schema.org')throw Error(path+' invalid context');
}
// Validate article JSON-LD against the actual canonical URL and visible article metadata.
const articles = [
  'en/blog/how-to-make-business-card-qr-code.html',
  'en/blog/how-to-create-whatsapp-qr-code-for-customers.html',
  'en/blog/how-to-make-wifi-qr-code-for-guests.html',
];
for (const file of articles) {
  const html = readFileSync(root + file, 'utf8');
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  if (!canonical) throw Error(file + ' missing canonical');
  const schemas = [...html.matchAll(/<script type="application\\/ld\\+json">([\\s\\S]*?)<\\/script>/g)]
    .map(match => JSON.parse(match[1]));
  const article = schemas.filter(schema => schema['@type'] === 'Article');
  if (article.length !== 1) throw Error(file + ' requires exactly one Article schema');
  const data = article[0];
  if (data['@context'] !== 'https://schema.org') throw Error(file + ' invalid schema context');
  if (data.mainEntityOfPage !== canonical) throw Error(file + ' Article URL differs from canonical');
  if (!data.headline || !data.datePublished || !data.dateModified || !data.author?.name || !data.publisher?.name)
    throw Error(file + ' missing Article metadata');
  if (!html.includes(data.headline)) throw Error(file + ' Article headline not found in visible HTML');
}
console.log('Verified Article schema on', articles.length, 'English blog pages.');

console.log('Verified localized structured data on',routes.length,'generated HTML pages.');
