import assert from 'node:assert/strict';
import {test} from 'node:test';
import QRCode from 'qrcode';
import {chatLink, guestLink, languages, message, phoneNumber, readCard, roomNumbers, validVenue, type Card} from '../src/guest-cards/model';
const card:Card={venue:'رياض المثال',room:'4',phone:'12025550104',desk:'ar',mask:15};
test('room cards round trip and each guest request targets the correct desk and room',()=>{
  for(const room of ['4','5']) for(const desk of languages) for(const guest of languages) for(const i of [0,1,2,3]){
    const value={...card,room,desk};
    assert.deepEqual(readCard(new URL(guestLink(value)).hash),value);
    const url=new URL(chatLink(value,guest,i)!);
    assert.equal(url.origin,'https://wa.me');assert.equal(url.pathname,'/'+card.phone);
    const text=url.searchParams.get('text')!;
    assert.equal(text,message(value,guest,i));assert.ok(text.includes(room));
    assert.equal(text.split('\n').length,guest===desk?2:3);
    assert.equal(text.split('\n')[0],card.venue);
  }
  assert.notEqual(guestLink(card),guestLink({...card,room:'5'}));
  assert.equal(chatLink({...card,sample:true},'en',0),null);
  assert.equal(chatLink({...card,mask:1},'en',1),null);
});
test('bounds, international numbers, room ranges and malformed cards',()=>{
  assert.deepEqual(roomNumbers('٠٤، 07-09, 08'),['04','07','08','09']);
  assert.equal(roomNumbers('1-50').length,50);
  for(const bad of ['1-51','4-2','<b>','-1']) assert.deepEqual(roomNumbers(bad),[]);
  assert.equal(phoneNumber('+1 (202) 555-0104'),card.phone);
  for(const bad of ['012345678','1e8098765','+1234567890123456'])assert.equal(phoneNumber(bad),'');
  assert.equal(validVenue('<script>'),false);
  assert.equal(readCard('#room=4'),null);
  assert.throws(()=>guestLink({...card,venue:'😀'.repeat(48)}));
  const url=guestLink({...card,venue:'ر'.repeat(48)});
  assert.ok(QRCode.create(url,{errorCorrectionLevel:'M'}).modules.size<100);
});
