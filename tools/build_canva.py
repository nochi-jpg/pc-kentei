#!/usr/bin/env python3
"""Canva用の1ファイル版（dist/pc-kentei_canva.html）を作る。
index.html に、BIZ UDPゴシック（つかう字だけ）を入れる。
つかいかた: python3 build.py && python3 tools/build_canva.py <BIZUDPGothic-Regular.ttf と Bold.ttf のあるフォルダ>"""
import sys, base64, pathlib, subprocess, re, json
R = pathlib.Path(__file__).resolve().parent.parent
fdir = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '/tmp/bizf')
html = (R/'index.html').read_text(encoding='utf-8')
# つかう字：ソースの字 ＋ ふりがな ＋ ひらがな・カタカナ・英数字・記号ぜんぶ
text = ''.join((R/'src'/p).read_text(encoding='utf-8') for p in ['tips.js','core.js','furidict.js','ui.js','play.js','stages3.js','stages2.js','stages1.js','how.js'])
chars = set(text)
for a, b in [(0x20,0x7e),(0x3000,0x30ff),(0xff01,0xff5e),(0x2010,0x2027),(0x2190,0x21ff),(0x25a0,0x25ff)]:
    chars |= {chr(c) for c in range(a, b+1)}
# 名前などで つかう かもしれない 漢字（JIS 第1水準）も 入れる
for c in range(0x4e00, 0xa000):
    ch = chr(c)
    try:
        b = ch.encode('shift_jis')
        if len(b) == 2 and 0x88 <= b[0] <= 0x98: chars.add(ch)
    except UnicodeEncodeError: pass
chars = ''.join(sorted(c for c in chars if ord(c) >= 0x20))
(R/'dist').mkdir(exist_ok=True)
faces = ''
for w, name in [(400,'Regular'),(700,'Bold')]:
    out = R/'dist'/('_biz_%s.woff2' % name)
    subprocess.run(['pyftsubset', str(fdir/('BIZUDPGothic-%s.ttf' % name)), '--text=' + chars, '--flavor=woff2', '--output-file=' + str(out), '--layout-features=*'], check=True)
    faces += "@font-face{font-family:'PSM Gothic';font-weight:%d;src:url(data:font/woff2;base64,%s) format('woff2');}\n" % (w, base64.b64encode(out.read_bytes()).decode())
    out.unlink()
html = html.replace('<style>\n', '<style>\n' + faces + ":root{--font:'PSM Gothic','BIZ UDPGothic','BIZ UDPゴシック',sans-serif !important}\n", 1)
(R/'dist'/'pc-kentei_canva.html').write_text(html, encoding='utf-8')
print('dist/pc-kentei_canva.html', round(len(html.encode())/1024), 'KB')
