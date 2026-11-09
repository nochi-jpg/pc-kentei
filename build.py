#!/usr/bin/env python3
"""配布用の index.html（画像・音を ぜんぶ 中に入れた 1ファイル）を つくる"""
import base64, json, pathlib
R = pathlib.Path(__file__).parent
def b64(p, mime): return 'data:%s;base64,%s' % (mime, base64.b64encode(p.read_bytes()).decode())
asset = {'pasota': {}, 'se': {}}
for f in ['normal','blink','happy','trouble']:
    asset['pasota'][f] = b64(R/'assets/build'/('pasota_%s.webp' % f), 'image/webp')
for f in sorted((R/'assets/se').glob('*.mp3')):
    asset['se'][f.stem] = b64(f, 'audio/mpeg')
css = (R/'src/style.css').read_text(encoding='utf-8')
order = ['tips','core','furidict','furi','ui','play','stages3','stages2','stages1','how','boot']
js = '\n'.join((R/'src'/(n+'.js')).read_text(encoding='utf-8') for n in order if (R/'src'/(n+'.js')).exists())
html = ('<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="utf-8">\n'
 '<meta name="viewport" content="width=device-width,initial-scale=1">\n'
 '<title>小学校パソコンスキルマスター</title>\n<style>\n' + css + '\n</style>\n</head>\n<body>\n'
 '<div id="app"><div id="scr"></div><div id="task"></div></div>\n'
 '<script>\nconst ASSET=' + json.dumps(asset) + ';\n</script>\n<script>\n' + js + '\n</script>\n</body>\n</html>\n')
(R/'index.html').write_text(html, encoding='utf-8')
print('index.html', round(len(html.encode())/1024), 'KB')
