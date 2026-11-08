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
console.log('Verified localized structured data on',routes.length,'generated HTML pages.');
