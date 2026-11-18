import React,{useEffect,useState} from 'react';
import { BedDouble, Brush, Check, Coffee, Copy, MessageCircle, Wrench } from 'lucide-react';
import {copy} from './copy';
import {guide} from './guide';
import {chatLink,guestLink,isLang,languages,message,phoneNumber,readCard,roomNumbers,validVenue,type Card,type Lang} from './model';

export function pathFor(lang:Lang){return (lang==='en'?'':'/'+lang)+'/tools/guest-connect'}
const sample:Card={venue:'Riad Example',room:'4',phone:'12025550104',desk:'ar',mask:15,sample:true};

function Language({label,value,onChange}:{label:string;value:Lang;onChange:(value:Lang)=>void}){
  return <label>{label}<select value={value} onChange={e=>{if(isLang(e.target.value))onChange(e.target.value)}}>
    {languages.map(lang=><option key={lang} value={lang}>{copy[lang].name}</option>)}</select></label>;
}
const previewLabels = {
  ar: {room: 'اختر غرفة للمعاينة', open: 'افتح البطاقة كضيف (تبويب جديد)'},
  en: {room: 'Choose a room to preview', open: 'Open as a guest (new tab)'},
  fr: {room: 'Choisir une chambre à prévisualiser', open: 'Ouvrir la carte côté client (nouvel onglet)'},
  es: {room: 'Elige una habitación para la vista previa', open: 'Abrir como huésped (pestaña nueva)'},
};

const validationText = {
  ar: {venue:'أدخل اسم المكان في 48 حرفًا أو أقل وتجنّب علامتي < و>.',phone:'أدخل رقم واتساب الاستقبال مع رمز الدولة، من 7 إلى 15 رقمًا.',rooms:'الحد الأقصى 50 غرفة. أدخل أرقامًا مثل 4، 7، 10-12.',services:'اختر خدمة واحدة على الأقل.'},
  en: {venue:'Enter a property name of up to 48 characters without < or >.',phone:'Enter the reception WhatsApp number with its country code, using 7–15 digits.',rooms:'Use up to 50 rooms. Enter numbers such as 4, 7, 10-12.',services:'Select at least one service.'},
  fr: {venue:'Saisissez un nom de 48 caractères maximum, sans < ni >.',phone:'Saisissez le numéro WhatsApp de la réception avec son indicatif pays (7 à 15 chiffres).',rooms:'Maximum 50 chambres. Saisissez des numéros comme 4, 7, 10-12.',services:'Sélectionnez au moins un service.'},
  es: {venue:'Escribe un nombre de hasta 48 caracteres sin < ni >.',phone:'Introduce el número de WhatsApp de recepción con el prefijo del país (7 a 15 dígitos).',rooms:'El máximo es de 50 habitaciones. Introduce números como 4, 7, 10-12.',services:'Selecciona al menos un servicio.'},
};

function Preview({cards,lang}:{cards:Card[];lang:Lang}){
  const [room,setRoom]=useState('');
  const card=cards.find(item=>item.room===room) ?? cards[0];
  const labels=previewLabels[lang];
  const [image,setImage]=useState('');
  const url=guestLink(card);
  useEffect(()=>{
    let active=true;
    setImage('');
    import('qrcode').then(q=>q.default.toDataURL(url,{width:320,margin:4})).then(src=>{if(active)setImage(src)}).catch(()=>{});
    return ()=>{active=false};
  },[url]);
  return <aside><small>{guide[lang].preview}</small>{card.sample&&<p>{guide[lang].sampleNote}</p>}
    {cards.length>1&&<label>{labels.room}
      <select value={card.room} onChange={event=>setRoom(event.target.value)}>
        {cards.map(item=><option key={item.room} value={item.room}>{copy[lang].room} {item.room}</option>)}
      </select>
    </label>}
    <h2 dir="auto">{card.venue}</h2><p>{copy[lang].room} {card.room}</p>
    <div className="qr">{image&&<img alt="QR" width="160" height="160" src={image}/>}</div><p>{copy[lang].scan}</p>
    <a className="primary" href={url} target="_blank" rel="noopener noreferrer">{labels.open}</a>
  </aside>;
}
const serviceIcons = [BedDouble, Brush, Coffee, Wrench];
const guestActions = {
  ar: {copy:'نسخ الرسالة', done:'تم نسخ الرسالة', manual:'حدّد نص الرسالة وانسخه يدويًا.', hint:'راجع طلبك هنا، ثم اضغط إرسال في واتساب عندما تكون جاهزًا.'},
  en: {copy:'Copy message', done:'Message copied', manual:'Select the message text and copy it manually.', hint:'Review your request here, then tap Send in WhatsApp when you’re ready.'},
  fr: {copy:'Copier le message', done:'Message copié', manual:'Sélectionnez le texte et copiez-le manuellement.', hint:'Relisez votre demande ici, puis appuyez sur Envoyer dans WhatsApp.'},
  es: {copy:'Copiar mensaje', done:'Mensaje copiado', manual:'Selecciona el texto y cópialo manualmente.', hint:'Revisa tu solicitud aquí y pulsa Enviar en WhatsApp cuando quieras.'},
};

function CopyRequest({text,lang}:{text:string;lang:Lang}){
  const [status,setStatus]=useState<'idle'|'done'|'manual'>('idle');
  async function copyRequest(){
    try {
      await navigator.clipboard.writeText(text);
      setStatus('done');
    } catch {
      setStatus('manual');
    }
  }
  return <div className="copy-request"><button type="button" onClick={copyRequest}>
    <Copy size={16} aria-hidden="true"/>{guestActions[lang].copy}
  </button><span role="status">{status!=='idle' && guestActions[lang][status]}</span></div>;
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
  const [submitted,setSubmitted]=useState(false);
  const invalidVenue=!validVenue(venue.trim());
  const invalidPhone=!phoneNumber(phone);
  const valid=!invalidVenue&&!invalidPhone&&!!mask&&cards.length>0;
  let tooLong=false;
  if(valid){try{cards.forEach(guestLink)}catch{tooLong=true}}
  const labels=validationText[lang];
  const issues={
    venue: submitted && (invalidVenue ? labels.venue : tooLong && g.short),
    phone: submitted && invalidPhone && labels.phone,
    rooms: submitted && !numbers.length && labels.rooms,
    services: submitted && !mask && labels.services,
  };
  async function download(example:boolean){
    setError('');
    if(!example){
      setSubmitted(true);
      if(!valid||tooLong) return;
    }
    setBusy(true);
    try{
      const {cardPDF}=await import('./pdf');
      const items=example?['4','5'].map(room=>({...sample,room,desk})):cards;
      (await cardPDF(items)).save(example?'guest-connect-demo.pdf':'guest-connect-rooms.pdf');
    }catch{setError(t.failed)}finally{setBusy(false)}
  }
  const request=guest && !(guest.mask & (1<<choice)) ? [0,1,2,3].find(i=>guest.mask&(1<<i))! : choice;
  const requestText=guest?message(guest,lang,request):'';
  const href=guest?chatLink(guest,lang,request):null;
  return <div className="shell"><header><a href="/" dir="ltr">QR Genius</a><span>Guest Connect</span></header>
    {hash&&!scanned?<p role="alert">{t.invalidLink}</p>:guest?<section className="guest-page">
      <div className="room-banner"><p dir="auto">{guest.venue}</p><h1>{t.room} <bdi>{guest.room}</bdi></h1></div>
      <Language label={t.guestLanguage} value={lang} onChange={setLang}/>
      <h2>{t.choose}</h2><div className="requests">{t.requests.map((item,i)=>{
        if (!(guest.mask & (1<<i))) return null;
        const Icon=serviceIcons[i];
        return <button key={i} aria-pressed={i===request} onClick={()=>setChoice(i)}>
          <Icon size={21} aria-hidden="true"/><span>{item}</span>{i===request&&<Check size={16} aria-hidden="true"/>}
        </button>;
      })}</div>
      <div className="message-panel"><h2>{t.preview}</h2>
        <blockquote>{requestText.split('\n').map((line,i)=><p dir="auto" key={i}>{line}</p>)}</blockquote>
        <CopyRequest key={lang+requestText} text={requestText} lang={lang}/>
        {href?<><p>{guestActions[lang].hint}</p><a className="primary chat-action" rel="noreferrer" href={href}>
          <MessageCircle size={20} aria-hidden="true"/>{t.open} · <bdi>+{guest.phone}</bdi>
        </a></>:<p>{g.sampleNote}</p>}
      </div>
      {demo&&<button onClick={()=>setDemo(false)}>{t.back}</button>}
    </section>:<>
    <h1>{t.title}</h1><p>{t.intro}</p>
    <div className="actions"><button onClick={()=>setDemo(true)}>{t.demo}</button><button disabled={busy} onClick={()=>download(true)}>{g.sample}</button></div>
    <Language label={g.language} value={lang} onChange={l=>{setLang(l);history.replaceState(null,'',pathFor(l));document.title=guide[l].title+' | QR Genius Guest Connect';document.querySelector('link[rel="canonical"]')?.setAttribute('href','https://getqrgenius.com'+pathFor(l))}}/>
    <div className="layout"><form noValidate onSubmit={e=>{e.preventDefault();download(false)}}>
      <label>{g.venue}<input required maxLength={96} aria-invalid={!!issues.venue} aria-describedby={issues.venue ? 'error-venue' : undefined} value={venue} onChange={e=>setVenue(e.target.value)}/></label>
      {issues.venue && <p id="error-venue" role="alert">{issues.venue}</p>}
      <label>{t.phone}<input required type="tel" dir="ltr" placeholder="+212…" aria-invalid={!!issues.phone} aria-describedby={issues.phone ? 'error-phone' : undefined} value={phone} onChange={e=>setPhone(e.target.value)}/></label>
      {issues.phone && <p id="error-phone" role="alert">{issues.phone}</p>}
      <Language label={t.deskLanguage} value={desk} onChange={setDesk}/>
      <label>{t.rooms}<input required maxLength={350} dir="ltr" aria-invalid={!!issues.rooms} aria-describedby={issues.rooms ? 'error-rooms' : undefined} value={rooms} onChange={e=>setRooms(e.target.value)}/></label>
      {issues.rooms && <p id="error-rooms" role="alert">{issues.rooms}</p>}
      <fieldset aria-invalid={!!issues.services} aria-describedby={issues.services ? 'error-services' : undefined}><legend>{t.options}</legend>{t.requests.map((label,i)=><label className="check" key={i}><input type="checkbox" checked={!!(mask&(1<<i))} onChange={()=>setMask(mask^(1<<i))}/>{label}</label>)}</fieldset>
      {issues.services && <p id="error-services" role="alert">{issues.services}</p>}
      <button className="primary" disabled={busy}>{t.pdf}</button>
    </form><Preview cards={valid&&!tooLong?cards:[{...sample,desk}]} lang={lang}/></div>
    {error&&<p role="alert">{error}</p>}
    <article><h2>{g.title}</h2><p>{g.about}</p><p>{g.privacy}</p></article></>}
  </div>;
}
