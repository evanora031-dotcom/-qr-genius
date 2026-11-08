import { mkdirSync, writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
// Dependency-free social preview renderer; runs before Vite copies public/ to dist/.
const W=1200,H=630,pixels=Buffer.alloc(W*H*4);
function rect(x,y,w,h,c){for(let yy=Math.max(0,y);yy<Math.min(H,y+h);yy++)for(let xx=Math.max(0,x);xx<Math.min(W,x+w);xx++){const i=(yy*W+xx)*4;pixels[i]=c[0];pixels[i+1]=c[1];pixels[i+2]=c[2];pixels[i+3]=255;}}
for(let y=0;y<H;y++){const t=y/H;rect(0,y,W,1,[Math.round(17+40*t),Math.round(28+19*t),Math.round(78+94*t)]);}
const font={
'A':['01110','10001','10001','11111','10001','10001','10001'],'B':['11110','10001','10001','11110','10001','10001','11110'],'C':['01111','10000','10000','10000','10000','10000','01111'],'D':['11110','10001','10001','10001','10001','10001','11110'],'E':['11111','10000','10000','11110','10000','10000','11111'],'F':['11111','10000','10000','11110','10000','10000','10000'],'G':['01111','10000','10000','10111','10001','10001','01111'],'H':['10001','10001','10001','11111','10001','10001','10001'],'I':['11111','00100','00100','00100','00100','00100','11111'],'L':['10000','10000','10000','10000','10000','10000','11111'],'N':['10001','11001','10101','10101','10011','10001','10001'],'O':['01110','10001','10001','10001','10001','10001','01110'],'Q':['01110','10001','10001','10001','10101','10010','01101'],'R':['11110','10001','10001','11110','10100','10010','10001'],'S':['01111','10000','10000','01110','00001','00001','11110'],'T':['11111','00100','00100','00100','00100','00100','00100'],'U':['10001','10001','10001','10001','10001','10001','01110'],'V':['10001','10001','10001','10001','10001','01010','00100'],'W':['10001','10001','10001','10101','10101','10101','01010'],'Y':['10001','10001','01010','00100','00100','00100','00100'],' ':['00000','00000','00000','00000','00000','00000','00000'],'.':['00000','00000','00000','00000','00000','00110','00110']};
function text(s,x,y,scale,color){for(const ch of s.toUpperCase()){const glyph=font[ch]||font[' '];glyph.forEach((line,ry)=>[...line].forEach((bit,rx)=>{if(bit==='1')rect(x+rx*scale,y+ry*scale,scale,scale,color);}));x+=6*scale;}}
const white=[255,255,255],light=[216,229,255],dark=[30,49,137];
text('QR GENIUS',78,90,10,white);
text('FREE QR CODE',78,250,10,white);
text('GENERATOR',78,350,10,white);
rect(76,488,405,68,[236,242,255]);text('GETQRGENIUS.COM',100,508,6,dark);
rect(805,150,300,300,white);
const blue=[39,62,174];function finder(x,y){rect(x,y,75,75,blue);rect(x+13,y+13,49,49,white);rect(x+25,y+25,25,25,blue);}
finder(831,176);finder(1004,176);finder(831,349);
const bits=[[923,176],[948,201],[923,250],[973,275],[1004,280],[1054,295],[931,312],[970,335],[1004,355],[1054,365],[931,396],[978,407],[1055,414],[927,440]];
for(const [x,y] of bits)rect(x,y,19,19,blue);
const crcTable=Array.from({length:256},(_,n)=>{let c=n;for(let i=0;i<8;i++)c=c&1?0xedb88320^(c>>>1):c>>>1;return c>>>0;});
function crc32(b){let c=0xffffffff;for(const v of b)c=crcTable[(c^v)&255]^(c>>>8);return (c^0xffffffff)>>>0;}
function chunk(type,data){const tag=Buffer.from(type),len=Buffer.alloc(4),crc=Buffer.alloc(4);len.writeUInt32BE(data.length);crc.writeUInt32BE(crc32(Buffer.concat([tag,data])));return Buffer.concat([len,tag,data,crc]);}
const raw=Buffer.alloc(H*(1+W*4));for(let y=0;y<H;y++)pixels.copy(raw,y*(1+W*4)+1,y*W*4,(y+1)*W*4);
const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(W,0);ihdr.writeUInt32BE(H,4);ihdr[8]=8;ihdr[9]=6;
const png=Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ihdr),chunk('IDAT',deflateSync(raw,{level:9})),chunk('IEND',Buffer.alloc(0))]);
mkdirSync('public',{recursive:true});writeFileSync('public/og-image.png',png);console.log('Generated public/og-image.png',W+'x'+H,png.length+' bytes');
