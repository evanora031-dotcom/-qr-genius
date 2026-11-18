import React,{useEffect,useState} from 'react';
import {copy} from './copy';
import {guide} from './guide';
import {chatLink,guestLink,isLang,languages,message,phoneNumber,readCard,roomNumbers,validVenue,type Card,type Lang} from './model';

export function pathFor(lang:Lang){return (lang==='en'?'':'/'+lang)+'/tools/guest-connect'}
const sample:Card={venue:'Riad Example',room:'4',phone:'12025550104',desk:'ar',mask:15,sample:true};

function Language({label,value,onChange}:{label:string;value:Lang;onChange:(value:Lang)=>void}){
  return <label>{label}<select value={value} onChange={e=>{if(isLang(e.target.value))onChange(e.target.value)}}>
    {languages.map(lang=><option key={lang} value={lang}>{copy[lang].name}</option>)}</select></label>;
}
function Preview({card,lang}:{card:Card;lang:Lang}){
  const [image,setImage]=useState('');
  const url=guestLink(card);
  useEffect(()=>{
    let active=true;
    setImage('');
    import('qrcode').then(q=>q.default.toDataURL(url,{width:320,margin:4})).then(src=>{if(active)setImage(src)}).catch(()=>{});
    return ()=>{active=false};
  },[url]);
  return <aside><small>{guide[lang].preview}</small><h2 dir="auto">{card.venue}</h2><p>{copy[lang].room} {card.room}</p>
    <div className="qr">{image&&<img alt="QR" width="160" height="160" src={image}/>}</div><p>{copy[lang].scan}</p></aside>;
}
export function Screen({initialLang,hash=''}:{initialLang:Lang;hash?:string}){
  const [lang,setLang]=useState(initialLang),[desk,setDesk]=useState<Lang>(initialLang);
  const [venue,setVenue]=useState(''),[phone,setPhone]=useState(''),[rooms,setRooms]=useState('4, 5');
  const [mask,setMask]=useState(15),[demo,setDemo]=useState(false),[choice,setChoice]=useState(0);
  const [busy,setBusy]=useState(false),[error,setError]=useState('');
  const t=copy[lang],g=guide[lang],scanned=hash?readCard(hash):null;
  useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr'},[lang]);
  const guest=scanned||(demo?{...sample,desk}:null);
  const numbers=roomNumbers(rooms);
  const cards:Card[]=numbers.map(room=>({venue:venue.trim(),desk,mask,room,phone:phoneNumber(phone)}));
  const valid=validVenue(venue.trim())&&!!phoneNumber(phone)&&!!mask&&cards.length>0;
  let tooLong=false;
  if(valid){try{cards.forEach(guestLink)}catch{tooLong=true}}
  async function download(example:boolean){
    setError('');
    if(!example&&(!valid||tooLong)){setError(tooLong?g.short:t.invalid);return}
    setBusy(true);
    try{
      const {cardPDF}=await import('./pdf');
      const items=example?['4','5'].map(room=>({...sample,room,desk})):cards;
      (await cardPDF(items)).save(example?'guest-connect-demo.pdf':'guest-connect-rooms.pdf');
    }catch{setError(t.failed)}finally{setBusy(false)}
  }
  const request=guest && !(guest.mask & (1<<choice)) ? [0,1,2,3].find(i=>guest.mask&(1<<i))! : choice;
  const href=guest?chatLink(guest,lang,request):null;
  return <div className="shell"><header><a href="/" dir="ltr">QR Genius</a><span>Guest Connect</span></header>
    {hash&&!scanned?<p role="alert">{t.invalidLink}</p>:guest?<section>
      <small dir="auto">{guest.venue}</small><h1>{t.room} {guest.room}</h1>
      <Language label={t.guestLanguage} value={lang} onChange={setLang}/>
      <h2>{t.choose}</h2><div className="requests">{t.requests.map((item,i)=>guest.mask&(1<<i)?<button key={i} aria-pressed={i===request} onClick={()=>setChoice(i)}>{item}</button>:null)}</div>
      <h2>{t.preview}</h2><blockquote>{message(guest,lang,request).split('\n').map((line,i)=><p dir="auto" key={i}>{line}</p>)}</blockquote>
      {href?<a className="primary" rel="noreferrer" href={href}>{t.open} · <bdi>+{guest.phone}</bdi></a>:<p>{g.sampleNote}</p>}
      {demo&&<button onClick={()=>setDemo(false)}>{t.back}</button>}
    </section>:<>
    <h1>{t.title}</h1><p>{t.intro}</p>
    <div className="actions"><button onClick={()=>setDemo(true)}>{t.demo}</button><button disabled={busy} onClick={()=>download(true)}>{g.sample}</button></div>
    <Language label={g.language} value={lang} onChange={l=>{setLang(l);history.replaceState(null,'',pathFor(l))}}/>
    <div className="layout"><form onSubmit={e=>{e.preventDefault();download(false)}}>
      <label>{g.venue}<input required maxLength={96} value={venue} onChange={e=>setVenue(e.target.value)}/></label>
      <label>{t.phone}<input required type="tel" dir="ltr" placeholder="+212…" value={phone} onChange={e=>setPhone(e.target.value)}/></label>
      <Language label={t.deskLanguage} value={desk} onChange={setDesk}/>
      <label>{t.rooms}<input required maxLength={350} dir="ltr" value={rooms} onChange={e=>setRooms(e.target.value)}/></label>
      <fieldset><legend>{t.options}</legend>{t.requests.map((label,i)=><label className="check" key={i}><input type="checkbox" checked={!!(mask&(1<<i))} onChange={()=>setMask(mask^(1<<i))}/>{label}</label>)}</fieldset>
      <button className="primary" disabled={busy}>{t.pdf}</button>
    </form><Preview card={valid&&!tooLong?cards[0]:{...sample,desk}} lang={lang}/></div>
    {error&&<p role="alert">{error}</p>}
    <article><h2>{g.title}</h2><p>{g.about}</p><p>{g.privacy}</p></article></>}
  </div>;
}
