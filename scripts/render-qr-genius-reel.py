#!/usr/bin/env python3
"""Build an original 18-second QR Genius vertical promo reel without external media."""
import math
import subprocess
import tempfile
import wave
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import qrcode

W, H = 720, 1280
DARK = "#06172f"
CYAN = "#00d4ed"
WHITE = "#f4faff"
BLUE = "#1878f7"
FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
OUT = Path("public/media/qr-genius-intro.mp4")

def f(size, bold=True):
    return ImageFont.truetype(FONT_BOLD if bold else FONT_REG, size)

def centered(draw, value, y, size, color=WHITE, bold=True):
    bb = draw.textbbox((0, 0), value, font=f(size, bold))
    draw.text(((W - bb[2] + bb[0]) / 2, y), value, font=f(size, bold), fill=color)

def qr(url, size):
    code = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=8, border=2)
    code.add_data(url)
    code.make(fit=True)
    return code.make_image(fill_color=DARK, back_color="white").convert("RGB").resize((size, size), Image.Resampling.NEAREST)

def base():
    im = Image.new("RGB", (W, H), DARK)
    d = ImageDraw.Draw(im)
    d.ellipse((390, -280, 1040, 400), fill="#092b56")
    d.ellipse((-350, 790, 270, 1430), fill="#092849")
    for y in range(65, 1230, 46):
        for x in range(38, 720, 46):
            d.ellipse((x, y, x + 2, y + 2), fill="#20517b")
    d.rounded_rectangle((43, 47, 104, 108), radius=12, fill=WHITE)
    for x, y in [(53, 57), (82, 57), (53, 86)]:
        d.rectangle((x, y, x + 15, y + 15), outline=DARK, width=4)
    d.text((126, 49), "QR", font=f(40), fill=WHITE)
    d.text((197, 49), "Genius", font=f(40), fill=CYAN)
    d.line((45, 127, 675, 127), fill="#1b6ca0", width=2)
    d.line((45, 1184, 675, 1184), fill="#1b6ca0", width=2)
    centered(d, "getqrgenius.com", 1211, 24, "#a3d9f2", False)
    return im

def card(d, box):
    d.rounded_rectangle(box, radius=42, fill="#eff8ff", outline="#37aaf2", width=5)

def slide(n):
    im = base()
    d = ImageDraw.Draw(im)
    if n == 0:
        centered(d, "MEET QR GENIUS", 220, 40, CYAN)
        centered(d, "Your next QR code", 306, 48)
        centered(d, "starts here.", 379, 59)
        card(d, (130, 540, 590, 976))
        im.paste(qr("https://getqrgenius.com", 285), (218, 588))
        centered(d, "FREE QR GENERATOR", 917, 29, DARK)
        centered(d, "FREE  •  FAST  •  EASY", 1085, 27, CYAN)
    elif n == 1:
        centered(d, "SHARE A LINK", 235, 54)
        centered(d, "Website QR codes", 324, 31, CYAN)
        centered(d, "Share any page in one scan.", 390, 26, "#b6d9ed", False)
        card(d, (142, 529, 578, 1008))
        centered(d, "WEBSITE LINK", 573, 29, DARK)
        im.paste(qr("https://getqrgenius.com", 280), (220, 650))
        centered(d, "URL  →  QR CODE", 1088, 28, CYAN)
    elif n == 2:
        centered(d, "GUEST WI-FI", 229, 56)
        centered(d, "IN ONE SCAN", 312, 54, CYAN)
        centered(d, "No more typing long passwords.", 406, 25, "#b6d9ed", False)
        card(d, (103, 539, 617, 1020))
        for r in (60, 100, 140):
            d.arc((360-r, 600-r//2, 360+r, 600+r*3//2), 198, 343, fill=BLUE, width=13)
        d.ellipse((349, 713, 371, 735), fill=BLUE)
        centered(d, "Guest Wi-Fi", 784, 41, DARK)
        centered(d, "Scan to connect", 852, 27, "#55708b", False)
        im.paste(qr("https://getqrgenius.com/tools/wifi", 115), (302, 897))
        centered(d, "WI-FI QR CODES", 1086, 28, CYAN)
    elif n == 3:
        centered(d, "START A", 235, 55)
        centered(d, "WHATSAPP CHAT", 314, 46, CYAN)
        centered(d, "Connect with customers faster.", 401, 26, "#b6d9ed", False)
        card(d, (101, 538, 619, 1016))
        d.ellipse((265, 598, 455, 788), fill="#17bd67")
        d.arc((309, 629, 413, 730), 10, 150, fill=WHITE, width=20)
        d.line((328, 716, 313, 751, 353, 731), fill=WHITE, width=11)
        centered(d, "Scan. Chat. Connect.", 822, 32, DARK)
        centered(d, "WHATSAPP QR CODES", 1086, 27, CYAN)
    elif n == 4:
        centered(d, "DIGITAL", 231, 59)
        centered(d, "BUSINESS CARD", 313, 48, CYAN)
        centered(d, "Share contact details in seconds.", 402, 25, "#b6d9ed", False)
        card(d, (88, 555, 632, 963))
        d.ellipse((142, 614, 259, 731), fill=BLUE)
        d.ellipse((178, 634, 222, 681), fill=WHITE)
        d.rounded_rectangle((161, 685, 240, 716), radius=15, fill=WHITE)
        d.text((280, 634), "Your Business", font=f(28), fill=DARK)
        d.text((280, 681), "Digital contact card", font=f(19, False), fill="#536d89")
        d.line((142, 767, 576, 767), fill="#b8cde0", width=3)
        d.text((167, 812), "Phone  •  Email", font=f(27, False), fill="#335579")
        d.text((167, 869), "Website  •  Address", font=f(27, False), fill="#335579")
        centered(d, "VCARD QR CODES", 1086, 29, CYAN)
    else:
        centered(d, "FREE. FAST.", 221, 64)
        centered(d, "SIMPLE.", 313, 74, CYAN)
        centered(d, "Create your QR code today.", 437, 28, "#b6d9ed", False)
        card(d, (151, 549, 569, 979))
        im.paste(qr("https://getqrgenius.com", 310), (205, 597))
        centered(d, "SCAN TO TRY", 920, 28, DARK)
        d.rounded_rectangle((68, 1040, 652, 1130), radius=32, fill=CYAN)
        centered(d, "getqrgenius.com", 1060, 39, DARK)
    return im

def sound(path, length):
    sr = 22050
    tones = (196.0, 246.94, 293.66, 392.0, 329.63, 293.66)
    with wave.open(str(path), "wb") as out:
        out.setnchannels(1)
        out.setsampwidth(2)
        out.setframerate(sr)
        samples = bytearray()
        for i in range(int(sr * length)):
            t = i / sr
            k = int(t * 2)
            phase = t - k * 0.5
            note = tones[k % len(tones)]
            env = math.exp(-phase * 5.5)
            sig = .13 * math.sin(2 * math.pi * note * phase) * env
            sig += .028 * math.sin(2 * math.pi * 98 * t)
            beat = t - int(t)
            if beat < .17:
                sig += .13 * math.sin(2 * math.pi * (95 - 35 * beat) * beat) * math.exp(-beat * 25)
            fade = min(1, t / .7, (length - t) / .8)
            val = int(max(-1, min(1, sig * max(0, fade))) * 32767)
            samples.extend(val.to_bytes(2, "little", signed=True))
        out.writeframes(samples)

def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        files = []
        for n in range(6):
            p = Path(tmp) / ("scene%d.png" % n)
            slide(n).save(p)
            files.append(p)
        audio = Path(tmp) / "music.wav"
        sound(audio, 18.3)
        inputs = []
        for p in files:
            inputs.extend(["-loop", "1", "-t", "3.4", "-i", str(p)])
        inputs.extend(["-i", str(audio)])
        chain = ["[%d:v]fps=24,scale=720:1280,format=yuv420p,setsar=1[v%d]" % (n,n) for n in range(6)]
        last = "v0"
        for n in range(1,6):
            out = "xf%d" % n
            chain.append("[%s][v%d]xfade=transition=fade:duration=0.4:offset=%.1f[%s]" % (last,n,n*3.0,out))
            last = out
        cmd = ["ffmpeg","-hide_banner","-loglevel","error","-y",*inputs,"-filter_complex",";".join(chain),
               "-map","[%s]" % last,"-map","6:a","-c:v","libx264","-preset","veryfast","-crf","25",
               "-pix_fmt","yuv420p","-r","24","-c:a","aac","-b:a","96k","-movflags","+faststart",
               "-shortest",str(OUT)]
        subprocess.run(cmd,check=True)
    print("Created",OUT,OUT.stat().st_size,"bytes")

if __name__ == "__main__":
    main()
