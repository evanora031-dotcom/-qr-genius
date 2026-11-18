import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
import { copy } from './copy';
import { guestLink, type Card } from './model';

export async function cardPDF(cards: Card[]) {
  const pdf=new jsPDF({unit:'mm',format:'a4',compress:true});
  for (const [i, card] of cards.entries()) {
    if (i && i%2===0) pdf.addPage();
    const y=i%2*140+10;
    pdf.setDrawColor('#9baea7').roundedRect(15,y,180,130,4,4);
    const name=document.createElement('canvas');
    name.width=1400; name.height=100;
    const pen=name.getContext('2d');
    if (!pen) throw new Error('Canvas unavailable');
    pen.font='bold 56px sans-serif'; pen.fillStyle='#17463e'; pen.textAlign='center';
    pen.fillText(card.venue,700,75,1350);
    pdf.addImage(name.toDataURL(),'PNG',35,y+2,140,10);
    pdf.setTextColor('#17463e');
    pdf.setFontSize(22).text('Room '+card.room,105,y+26,{align:'center'});
    const qr=await QRCode.toDataURL(guestLink(card),{width:600,margin:4,errorCorrectionLevel:'M'});
    pdf.addImage(qr,'PNG',71,y+29,68,68);
    pdf.setFontSize(14).text(copy.en.scan,105,y+103,{align:'center'});
    if (card.desk!=='en') {
      const canvas=document.createElement('canvas'); canvas.width=1200; canvas.height=85;
      const ctx=canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas unavailable');
      ctx.fillStyle='#17463e';ctx.font='40px sans-serif';ctx.textAlign='center';ctx.direction=card.desk==='ar'?'rtl':'ltr';
      ctx.fillText(copy[card.desk].scan,600,56);
      pdf.addImage(canvas.toDataURL(),'PNG',45,y+104,120,8.5);
    }
    pdf.setFontSize(11).text('WhatsApp  +'+card.phone,105,y+121,{align:'center'});
  }
  return pdf;
}
