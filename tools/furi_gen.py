import re, json, pathlib, collections, pykakasi
K = pykakasi.kakasi()
src = ''.join(pathlib.Path('/home/claude/pc-kentei/src/'+n+'.js').read_text() for n in ['tips','core','ui','play','stages3','stages2','stages1'])
src = re.sub(r'/\*.*?\*/', '', src, flags=re.S)
strs = re.findall(r"'((?:[^'\\\n]|\\.)*)'", src)
KJ = r'[一-鿿々]'
occ = collections.defaultdict(collections.Counter)
for s in strs:
    if not re.search(KJ, s): continue
    s2 = re.sub(r'<[^>]+>', ' ', s)
    for seg in K.convert(s2):
        o, h = seg['orig'], seg['hira']
        for m in re.finditer(KJ+'+', o):
            run = m.group()
            # たいおうする よみ：orig と hira の 前後の かなを はずす
            pre = o[:m.start()]; post = o[m.end():]
            r = h
            if pre and r.startswith(K.convert(pre)[0]['hira'] if pre else ''): r = r[len(K.convert(pre)[0]['hira']):]
            ph = ''.join(x['hira'] for x in K.convert(post)) if post else ''
            if ph and r.endswith(ph): r = r[:len(r)-len(ph)]
            nxt = post[:1]
            occ[run][(r, nxt)] += 1
out = {}
for run, c in sorted(occ.items(), key=lambda x:-len(x[0])):
    rs = collections.Counter()
    for (r,n),k in c.items(): rs[r]+=k
    out[run] = {'r': rs.most_common(1)[0][0], 'all': dict(rs)}
json.dump(out, open('tools/furi.json','w'), ensure_ascii=False, indent=0)
print(len(out))
for run,v in out.items():
    print(run, v['r'], '' if len(v['all'])==1 else v['all'])
