"""ふりがなの 読みを、pykakasi の 読みと くらべて ちがう ところを 出す"""
import re, json, subprocess, pathlib, pykakasi
R = pathlib.Path(__file__).resolve().parent.parent
K = pykakasi.kakasi()
src = ''.join((R/'src'/(n+'.js')).read_text() for n in ['tips','core','ui','play','stages3','stages2','stages1','how'])
src = re.sub(r'/\*.*?\*/', '', src, flags=re.S)
strs = sorted({re.sub(r'<[^>]+>', ' ', s) for s in re.findall(r"'((?:[^'\\\n]|\\.)*)'", src) if re.search(r'[一-鿿]', s)})
js = (R/'src/furidict.js').read_text() + (R/'src/furi.js').read_text().split('function furiNode')[0]
js = js.replace('const KJR', 'var KJR')
code = js + '\nconst L=' + json.dumps(strs, ensure_ascii=False) + ';console.log(JSON.stringify(L.map(t=>furiSplit(t))));'
out = json.loads(subprocess.run(['node', '-e', code], capture_output=True, text=True, check=True).stdout)
def hira(s): return re.sub(r'[ァ-ヶ]', lambda m: chr(ord(m.group())-0x60), s)
def norm(s): return re.sub(r'[^ぁ-ゖ]', '', hira(s))
bad = []
for t, parts in zip(strs, out):
    mine = ''.join(p if isinstance(p, str) else p[1] for p in parts)
    ref = ''.join(x['hira'] for x in K.convert(t))
    if norm(mine) != norm(ref):
        rubies = ' '.join(p[0]+'='+p[1] for p in parts if not isinstance(p, str))
        bad.append((t[:50], rubies[:120]))
for b in bad: print(b[0], ' | ', b[1])
print(len(bad), '/', len(strs))
