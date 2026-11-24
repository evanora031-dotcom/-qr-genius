import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {Screen,pathFor} from '../src/guest-cards/Screen';
import {languages} from '../src/guest-cards/model';
import {guide} from '../src/guest-cards/guide';
import {copy} from '../src/guest-cards/copy';

export async function buildGuestPages(dir:string,origin:string) {
  const template=await readFile(path.join(dir,'tools/guest-connect.html'),'utf8');
  const alternates=[...languages.map(lang=>[lang,origin+pathFor(lang)]),['x-default',origin+pathFor('en')]];
  const attrs=alternates.map(([lang,url])=>'rel="alternate" hreflang="'+lang+'" href="'+url+'"');
  const entries:string[]=[];
  for(const lang of languages){
    const route=pathFor(lang),url=origin+route,title=guide[lang].title+' | QR Genius Guest Connect';
    const description=copy[lang].intro+' '+guide[lang].about;
    const schema={'@context':'https://schema.org','@type':'WebApplication',name:'QR Genius Guest Connect',description:copy[lang].intro,url,inLanguage:lang,applicationCategory:'BusinessApplication',operatingSystem:'Web'};
    const social = renderToString(React.createElement(React.Fragment, null,
      ...Object.entries({
        'og:title': title, 'og:description': description, 'og:url': url, 'og:type': 'website',
        'og:image': origin + '/og-guest.png', 'og:image:alt': title
      }).map(([property, content]) => React.createElement('meta', {key:property, property, content})),
      ...Object.entries({
        'twitter:card': 'summary_large_image', 'twitter:title': title,
        'twitter:description': description, 'twitter:image': origin + '/og-guest.png'
      }).map(([name, content]) => React.createElement('meta', {key:name, name, content}))
    ));
    const head=[social,'<title>'+title+'</title>','<meta name="description" content="'+description+'">','<link rel="canonical" href="'+url+'">',...attrs.map(a=>'<link '+a+'>'),'<script type="application/ld+json">'+JSON.stringify(schema)+'</script>'].join('\n');
    const html=template.replace(/<html lang="en">/,'<html lang="'+lang+'" dir="'+(lang==='ar'?'rtl':'ltr')+'">').replace(/<title>.*?<\/title>|<meta name="description"[^>]*>|<link rel="canonical"[^>]*>/g,'').replace('</head>',head+'\n</head>').replace(/<main id="root">[\s\S]*?<\/main>/,()=>'<main id="root">'+renderToString(React.createElement(Screen,{initialLang:lang}))+'</main>');
    const file=path.join(dir,route+'.html');
    await mkdir(path.dirname(file),{recursive:true});await writeFile(file,html);
    entries.push('<url><loc>'+url+'</loc>'+attrs.map(a=>'<xhtml:link '+a+' />').join('')+'</url>');
  }
  return entries;
}
