"""全ステージを 実際の そうさで クリアできるか テスト（マウス・キーボードを うごかす）"""
import sys, re, time
from pw import *
only = sys.argv[1:]
SAVE = {'name':'テスト','method':'roma','clear':{},'mclear':{},'certs':[],'sound':False}
JS_HELP = r"""
window.TX=e=>{const c=e.cloneNode(true);c.querySelectorAll("rt").forEach(r=>r.remove());return c.textContent;};
window.T=(txt,sel)=>{const A=document.getElementById('app');const L=[...A.querySelectorAll(sel||'*')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&TX(e).trim()===txt;});return L[L.length-1]||null;};
window.TC=(txt,sel)=>{const A=document.getElementById('app');const L=[...A.querySelectorAll(sel||'*')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&TX(e).includes(txt);});return L[L.length-1]||null;};
"""
class Bot:
    def __init__(s, pg): s.pg = pg; s.issues = []
    def ev(s, js, arg=None): return s.pg.evaluate(js, arg)
    def h(s, js, arg=None):
        h = s.pg.evaluate_handle(js, arg); e = h.as_element()
        if e is None: raise Exception('not found: '+js+' '+str(arg))
        return e
    def c(s, e):
        b = e.bounding_box(); return b['x']+b['width']/2, b['y']+b['height']/2
    def click(s, e, **k): x,y = s.c(e); s.pg.mouse.click(x,y, **k); s.pg.wait_for_timeout(120)
    def dbl(s, e): x,y = s.c(e); s.pg.mouse.dblclick(x,y); s.pg.wait_for_timeout(200)
    def rclick(s, e): x,y = s.c(e); s.pg.mouse.click(x,y,button='right'); s.pg.wait_for_timeout(150)
    def text(s, t, sel=None): return s.h("([t,s])=>T(t,s)", [t, sel])
    def textc(s, t, sel=None): return s.h("([t,s])=>TC(t,s)", [t, sel])
    def drag(s, e, x2, y2):
        x,y = s.c(e); m = s.pg.mouse; m.move(x,y); m.down(); 
        for i in range(1,11): m.move(x+(x2-x)*i/10, y+(y2-y)*i/10)
        m.up(); s.pg.wait_for_timeout(150)
    def dragto(s, e, t): x,y = s.c(t); s.drag(e, x, y)
    def key(s, k): s.pg.keyboard.press(k); s.pg.wait_for_timeout(80)
    def ins(s, t): s.pg.keyboard.insert_text(t); s.pg.wait_for_timeout(80)
    def chk(s, tag):
        r = check(s.pg)
        if r: s.issues.append((tag, r))
    def wait(s, ms): s.pg.wait_for_timeout(ms)
    def sel_input(s, e, a, b): e.evaluate("(e,[a,b])=>{e.focus();e.setSelectionRange(a,b)}", [a,b])
    def task(s): return s.ev("TX(document.querySelector('.ttext'))")

def solve(B, sid, v):
    pg = B.pg
    A = lambda: B.h("document.getElementById('area')")
    if sid=='login':
        t = B.ev("document.getElementById('area').textContent"); idv = re.search(r'ID：(\d+)', t).group(1); pw = re.search(r'パスワード：(\d+)', t).group(1)
        if v==2:
            B.chk('popup'); B.click(B.text('おしえない','button'))
        ins = B.pg.query_selector_all('#area input')
        if v!=1: B.click(ins[0]); B.ins(idv)
        B.click(ins[1]); B.key('Control+a'); B.key('Backspace'); B.pg.keyboard.type(pw); B.click(B.text('ログイン','button'))
        if v in ('p',0): B.wait(300); B.chk('desk'); B.click(B.text('ログアウト','button'))
    elif sid=='click':
        for i in range(5):
            if v==2: e = B.h("[...document.querySelectorAll('#area .tgt')].find(t=>t.innerHTML.includes('#ff5a6e'))")
            else: e = B.h("document.querySelector('#area .tgt')")
            B.click(e); B.wait(100)
    elif sid=='dbl':
        if v=='p':
            for n in ['こくご','さんすう','せいかつ']: B.dbl(B.text(n,'.ico'))
        if v==0: B.dbl(B.text('せいかつ','.ico'))
        if v==1: B.dbl(B.text('どうぶつ','.ico')); B.wait(300); B.chk('win'); B.dbl(B.text('いぬ','.ico'))
        if v==2: B.dbl(B.text('カメラ','.ico'))
    elif sid=='rclick':
        def like(n): B.rclick(B.textc(n,'.sw')); B.chk('menu'); B.click(B.text('いいね','.cmenu button'))
        if v=='p':
            for n in ['たいようの え','やまの え','おうちの え']: like(n)
        if v==0: like('やまの え')
        if v==1: B.rclick(B.textc('たいようの え','.sw')); B.click(B.text('コピー','.cmenu button'))
        if v==2:
            B.rclick(B.textc('らくがき','.sw')); B.click(B.text('さくじょ','.cmenu button')); B.wait(400)
            like('やまの え'); like('おうちの え')
    elif sid=='drag':
        cards = B.ev("[...document.querySelectorAll('#area .card2')].map(c=>c.textContent)")
        for n in cards:
            e = B.text(n, '.card2')
            if v in ('p',1): z = B.h("document.querySelector('#area .zone')")
            elif v==0: z = B.textc('くだもの' if n in ['りんご','みかん','ぶどう','バナナ','メロン'] else 'やさい', '.zone')
            else: z = B.h("([n])=>document.querySelectorAll('#area .zone')[{'ぞう':0,'いぬ':1,'ねずみ':2}[n]]", [n])
            B.dragto(e, z)
    elif sid=='scroll':
        W = B.h("document.querySelector('#area .sw')"); x,y = B.c(W); pg.mouse.move(x,y)
        if v==1:
            for i in range(30): pg.mouse.wheel(150,0); B.wait(20)
            B.click(B.text('ゴール！','button'))
        else:
            tgt = 'ひまわり' if v==2 else None
            for i in range(40):
                if tgt:
                    ok = B.ev("()=>{const r=[...document.querySelectorAll('#area .srow')].find(r=>TX(r)==='ひまわり');const b=r.getBoundingClientRect(),w=document.querySelector('#area .swbody').getBoundingClientRect();return b.top>w.top+5&&b.bottom<w.bottom-5}")
                    if ok: break
                else:
                    ok = B.ev("()=>{const r=document.querySelector('#area .srow.goal');const b=r.getBoundingClientRect(),w=document.querySelector('#area .swbody').getBoundingClientRect();return b.top>w.top+5&&b.bottom<w.bottom-5}")
                    if ok: break
                pg.mouse.wheel(0,120); B.wait(20)
            B.chk('scrolled')
            B.click(B.text('ひまわり','.srow') if tgt else B.h("document.querySelector('#area .srow.goal')"))
            if v=='p':
                for i in range(40): pg.mouse.wheel(0,-150); B.wait(10)
                B.click(B.h("document.querySelector('#area .srow.start')"))
    elif sid=='zoom':
        if v==1: tg = B.h("[...document.querySelectorAll('#area .sw .abs')].find(d=>d.innerHTML.includes('#f3b562')&&d.offsetWidth===10)")
        else: tg = B.h("[...document.querySelectorAll('#area .sw .abs')].find(d=>d.textContent.startsWith('ひみつ')&&d.children.length===2)")
        ans = B.ev("()=>{const d=[...document.querySelectorAll('#area .sw .abs')].find(d=>d.textContent.startsWith('ひみつ')&&d.children.length===2);return d?d.lastChild.textContent:''}")
        for i in range(30):
            x,y = B.c(tg); pg.mouse.move(x,y); pg.keyboard.down('Control'); pg.mouse.wheel(0,-40); pg.keyboard.up('Control'); B.wait(20)
        B.chk('zoomed')
        if v==1: B.click(tg)
        else:
            B.click(B.text(ans,'button'))
            if v in ('p',2):
                for i in range(40): pg.keyboard.down('Control'); pg.mouse.wheel(0,60); pg.keyboard.up('Control'); B.wait(20)
    elif sid=='stamp':
        def send(m, k):
            b = B.textc(m, '.cbub'); x,y = B.c(b); pg.mouse.move(x,y); B.wait(150); B.chk('hover')
            B.click(B.h("([m,k])=>[...document.querySelectorAll('#area .cbub')].find(b=>TX(b.querySelector('.nm'))===m).querySelector('.rbar button[aria-label=\"'+k+'\"]')", [m,k]))
        RN = {'like':'いいね','heartR':'ハート','smile':'にこにこ','wow':'びっくり'}
        t = B.task()
        if v==2:
            B.click(B.h("document.querySelector('#area .rchip.mine')")); send('せんせい','ハート')
        else:
            for m,k in re.findall(r'(せんせい|はると)の メッセージに「(.+?)」', t): send(m,k)
            if v==1: send('せんせい','いいね')
    elif sid in ('search','search2'):
        ip = B.h("document.querySelector('#area input')"); B.click(ip)
        if v==2 and sid=='search': B.key('Control+a'); B.key('Backspace')
        if sid=='search':
            w = {'p':'いぬ',0:'さくら',1:'かぶとむし',2:'あさがお'}[v]; ok = {'p':'いぬの しゅるい',0:'さくらの はな',1:'かぶとむしの ずかん',2:'あさがおの はな'}[v]
            B.ins(w); B.key('Enter'); B.wait(200); B.chk('res')
        else:
            if v=='p': B.ins('いぬ'); B.key('Enter'); B.wait(200); B.ins(' さんぽ'); B.key('Enter')
            else: B.ins({0:'ねこ しいく',1:'かぶとむし そだてかた',2:'ごみ リサイクル ほうほう'}[v]); B.key('Enter')
            ok = {'p':'いぬの さんぽの しかた',0:'ねこの しいくの しかた',1:'かぶとむしの そだてかた',2:'ごみの リサイクルの ほうほう'}[v]
            B.wait(200); B.chk('res')
        if v==0 and sid=='search':
            B.click(B.text('ローマ字ひょう','button')); B.wait(400); B.chk('romaji')
            for i in range(2): B.click(B.text('つぎへ','button')); B.wait(150); B.chk('romaji%d'%i)
            B.click(B.text('とじる','button')); B.wait(300)
        B.click(B.text(ok,'.rt'))
    elif sid=='fileopen':
        B.dbl(B.text('ドキュメント','.ico')); B.wait(200)
        if v==2: B.dbl(B.text('がっこう','.ico')); B.wait(200)
        t = B.task(); f = re.findall(r'「(えにっき[^」]*)」', t)[-1]
        B.dbl(B.text(f,'.ico')); B.wait(300); B.chk('doc')
    elif sid=='input':
        Q = {'p':['がっこう','2026','abc'],0:['さんすう25ページ'],1:['サッカー','コンピューター'],2:['ABC','Tokyo']}[v]
        ins = pg.query_selector_all('#area input')
        for i,q in enumerate(Q): B.click(ins[i]); B.ins(q)
        if v!='p': B.click(B.text('けってい','button'))
    elif sid=='select':
        def sel_range(a,b, how):
            box = B.h("document.querySelector('#area .sel-box')")
            r = B.ev("([a,b])=>{const box=document.querySelector('#area .sel-box');const at=(o)=>{const w=document.createTreeWalker(box,NodeFilter.SHOW_TEXT);let n,c=0;while(n=w.nextNode()){if(o<c+n.length)return[n,o-c];c+=n.length;}};const rr=(o)=>{const[n,k]=at(o);const r=document.createRange();r.setStart(n,k);r.setEnd(n,k+1);return r.getBoundingClientRect();};const q1=rr(a),q2=rr(b-1);return[[q1.left,q1.top+q1.height/2],[q2.right,q2.top+q2.height/2]]}", [a,b])
            (x1,y1),(x2,y2) = r
            if how=='drag': pg.mouse.move(x1+1,y1); pg.mouse.down(); pg.mouse.move((x1+x2)/2,y1,steps=4); pg.mouse.move(x2-1,y2,steps=4); pg.mouse.up()
            else: pg.mouse.click(x1+1,y1); pg.keyboard.down('Shift'); pg.mouse.click(x2-1,y2); pg.keyboard.up('Shift')
            B.wait(150)
        def tg(): return B.ev("()=>{const box=document.querySelector('#area .sel-box');const t=box.textContent;const s=box.querySelector('span');const pre=t.indexOf(s.textContent);return[pre,pre+s.textContent.length]}")
        if v=='p':
            B.click(B.h("document.querySelector('#area .sel-box')")); B.key('Control+a'); B.wait(900)
            a,b = tg(); sel_range(a,b,'shift'); B.wait(900)
            a,b = tg(); sel_range(a,b-1,'drag'); B.key('Shift+ArrowRight')
        else:
            a,b = tg(); sel_range(a,b,'shift'); B.click(B.text('けってい','button'))
    elif sid in ('copy','cut'):
        srcs = pg.query_selector_all('#area input')
        def cp(src_i, word, dst_i, key='c'):
            src = srcs[src_i]; val = src.input_value(); i = val.index(word); B.sel_input(src, i, i+len(word)); B.key('Control+'+key); B.wait(60)
            d = srcs[dst_i]; B.click(d); B.key('End'); B.key('Control+v'); B.wait(150)
        if sid=='copy':
            if v=='p':
                cp(0,'あしたは えんそくです',1); B.wait(1100); srcs = pg.query_selector_all('#area input'); cp(0,'にじ',1)
            if v==0: cp(0,'たんぽぽ',1)
            if v==1:
                for j in (1,2,3): cp(0,'ありがとう',j)
            if v==2: cp(0,'りんご',1); cp(0,'バナナ',2)
        else:
            if v=='p': cp(0,'いぬ',1,'x'); B.wait(1100); cp(0,'りんご',1,'x')
            if v==0: cp(0,'いぬ',1,'x')
            if v==1: cp(0,'りんご',1,'x'); cp(0,'みかん',1,'x')
            if v==2:
                s0 = srcs[0]; val = s0.input_value(); i = val.index('きのう'); B.sel_input(s0, i, i+4); B.key('Control+x'); B.key('Home'); B.key('Control+v')
    elif sid=='undo':
        B.wait(2400 if v==1 else 2200)
        if v==0 or v=='p':
            for i in range(3): B.key('Control+z')
        if v==1: B.key('Control+y'); B.click(B.text('けってい','button'))
        if v==2: B.key('Control+z')
    elif sid=='folder':
        if v==1: B.dbl(B.text('4年1組','.ico')); B.wait(400); B.chk('opened')
        files = B.ev("[...document.querySelectorAll('#area .ico.drg')].map(d=>[TX(d.querySelector('.in')),+d.dataset.k])")
        for n,k in files:
            B.dragto(B.text(n,'.ico'), B.h("([k])=>[...document.querySelectorAll('#area .ico:not(.drg)')].filter(x=>TX(x.querySelector('.in')).includes('こ'))[k]", [k]))
    elif sid=='save':
        if v=='p': B.click(B.text('ファイル','button')); B.chk('menu'); B.click(B.textc('名前を付けて保存','.cmenu button'))
        else: B.key('Control+s')
        B.wait(300); B.chk('dialog')
        f = {1:'りか'}.get(v,'しゃかい'); B.click(B.textc(f,'.sbtn2'))
        if v==1: B.wait(100); B.click(B.textc('4年','.sbtn2'))
        nm = B.h("document.querySelector('#area input[aria-label=\"ファイル名\"]')")
        B.click(nm); B.key('Control+a')
        if v==2:
            B.ins('ごみのゆくえ'); B.click(B.text('保存','button')); B.wait(300); B.chk('confirm'); B.click(B.text('いいえ','button')); B.click(nm); B.key('Control+a'); B.ins('ごみのゆくえ2')
        else: B.ins('しょくぶつのかんさつ' if v==1 else 'ごみのゆくえ')
        B.click(B.text('保存','button'))
    elif sid=='image':
        t = B.task()
        def insert(name):
            B.click(B.text('挿入','.rt2')); B.click(B.textc('画像','.tb')); B.wait(300); B.chk('picker'); B.click(B.text(name,'.ico')); B.click(B.text('挿入','.btn'))
        if v==2:
            B.click(B.h("document.querySelector('#area .resize')")); B.key('Delete'); insert('ロケット'); return
        if v!=1: insert(re.search(r'「(ひまわり|ちょうちょ|ロケット)」', t).group(1)); B.wait(200)
        fr = B.h("document.querySelector('#area .frame')").bounding_box()
        img = B.h("document.querySelector('#area .resize')")
        B.click(img); B.wait(100)
        b = img.bounding_box()
        hd = B.h("document.querySelector('#area .resize .hd.br')"); B.drag(hd, b['x']+fr['width'], b['y']+fr['height'])
        if v==1:
            b = img.bounding_box(); B.drag(img, b['x']+b['width']/2+(fr['x']-b['x']), b['y']+b['height']/2+(fr['y']-b['y']))
    elif sid=='typing':
        B.wait(2600); T = B.ev("TX(document.querySelector('#area .sw .abs'))")
        B.click(B.h("document.querySelector('#area textarea')")); B.ins(T); B.click(B.text('送信','button'))
    elif sid=='kanji':
        M = {'がっこう':'学校','こうえん':'公園','あつい おちゃ':'熱い','あつい 本':'厚い','あつい 夏':'暑い','時間を はかる':'計る','長さを はかる':'測る','重さを はかる':'量る','大きな きかい':'機械','いい きかい（チャンス）':'機会'}
        for ip in pg.query_selector_all('#area input'):
            B.click(ip); B.ins(M[ip.get_attribute('aria-label')])
        if v!='p': B.click(B.text('けってい','button'))
    elif sid=='short':
        K = {'ぜんぶ えらぶ':'a','コピー':'c','はりつけ':'v','切り取り':'x','元に戻す':'z','やり直し':'y','保存':'s','検索':'f'}
        for i in range(20):
            n = B.ev("()=>{const e=document.querySelector('#area .sn');return e?TX(e):''}")
            if not n or B.ev("!!document.querySelector('#area .okstamp')"): break
            for part in n.split(' → '):
                p2 = {'ぜんぶ えらんで':'ぜんぶ えらぶ','切り取って':'切り取り','元に戻して':'元に戻す','コピーして':'コピー','検索して':'検索'}.get(part, part)
                B.key('Control+'+K[p2])
            B.wait(60)
    elif sid=='replace':
        def panel(k, f, r=None):
            B.key('Control+'+k); B.wait(200); B.chk('panel')
            ins = pg.query_selector_all('#area .sw input'); B.click(ins[0]); B.key('Control+a'); B.ins(f)
            if r is not None: B.click(ins[1]); B.key('Control+a'); B.ins(r)
        if v=='p':
            panel('f','たろう'); B.click(B.text('3こ','button')); B.wait(200); panel('h','たろう','じろう'); B.click(B.text('すべて置換','button'))
        if v==0: panel('h','たろう','じろう'); B.click(B.text('すべて置換','button'))
        if v==1: panel('h','すいか','メロン'); B.click(B.text('すべて置換','button')); panel('h','あかい','みどりの'); B.click(B.text('すべて置換','button'))
        if v==2:
            panel('h','さくらが','もみじが'); B.click(B.text('すべて置換','button')); panel('h','さくらの','もみじの'); B.click(B.text('すべて置換','button'))
    elif sid=='comment':
        def cm(i, how):
            s2 = pg.query_selector_all('#area .sent')[i]
            if how=='r': B.rclick(s2); B.click(B.text('コメントを追加','.cmenu button'))
            else: B.click(s2); B.click(B.textc('コメント','.tb'))
            B.wait(150); B.chk('compose'); B.click(B.h("document.querySelector('#area textarea')")); B.ins('とても わかりやすいです'); B.click(B.text('送信','button'))
        if v=='p': cm(1,'b')
        if v==0: cm(2,'r')
        if v==1: cm(0,'b'); cm(2,'r')
        if v==2: B.click(B.text('返信','button')); B.click(B.h("document.querySelector('#area textarea')")); B.ins('ありがとう！ うれしいよ'); B.click(B.text('送信','button'))
    elif sid=='attach':
        want = {'p':['はっぴょう'],0:['はっぴょう'],1:['はっぴょう（かんせい）'],2:['はっぴょう','しゃしん']}[v]
        for f in want:
            B.click(B.h("document.querySelector('#area button[aria-label=\"添付\"]')")); B.wait(250); B.chk('picker'); B.click(B.text(f,'.ico')); B.click(B.text('ひらく','button'))
        if v==2: B.click(B.h("document.querySelector('#area .chatw input')")); B.ins('よろしく おねがいします')
        B.chk('chips'); B.click(B.textc('送信','button'))
    elif sid=='share':
        def add(n, p):
            if not B.ev("([n])=>[...document.querySelectorAll('#area .pn2')].some(e=>e.textContent===n)", [n]): B.click(B.textc(n,'.pbtn'))
            B.click(B.h("([n,p])=>[...document.querySelectorAll('#area .prow')].find(r=>TX(r.querySelector('.pn2'))===n).querySelectorAll('.tg')[p]", [n,p]))
        if v=='p': add('たなか',0); add('先生',0)
        if v==0: add('たなか',0); add('先生',0); add('やまだ',1)
        if v==1:
            for n in ['たなか','すずき','こばやし','先生']: add(n,0)
        if v==2:
            B.click(B.h("[...document.querySelectorAll('#area .prow')].find(r=>TX(r.querySelector('.pn2'))==='やまだ').querySelector('.xb')")); add('先生',0)
        B.chk('list'); B.click(B.text('送信','button'))
    elif sid=='privacy':
        cards = B.ev("[...document.querySelectorAll('#area .tcard')].map(d=>TX(d))")
        for n in cards:
            k = B.ev("([n])=>{const st=stageById('privacy');return null}", [n])
        for i in range(6):
            n = B.ev("()=>{const d=[...document.querySelectorAll('#area .tcard')].find(d=>!d.dataset.lock);return d?TX(d):null}")
            if not n: break
            ng = n in ['住所','電話番号','パスワード','本名（フルネーム）','学校の 名前','自分の パスワード','友だちの 住所','友だちの 悪口']
            e = B.h("([n])=>[...document.querySelectorAll('#area .tcard')].find(d=>TX(d)===n)", [n])
            z = B.h("([k])=>document.querySelectorAll('#area .zone')[k]", [1 if ng else 0])
            B.dragto(e, z)
    elif sid=='trust':
        ok = {'p':'ふじさんの 高さ',0:'ふじさんの 高さ',1:'台風の いまの いち',2:'よう虫の そだて方'}[v]
        B.click(B.h("([t])=>[...document.querySelectorAll('#area .pres')].find(b=>TX(b.querySelector('.pt1'))===t)", [ok])); B.chk('sel')
        B.click(B.text('この ページで しらべる','button'))
    elif sid=='quote':
        tx = B.h("document.querySelector('#area textarea')"); val = tx.input_value()
        w = val.split('\n')[1 if v in ('p',0) else 0]; i = val.index(w)
        B.sel_input(tx, i, i+len(w)); B.key('Control+c')
        B.click(B.h("document.querySelector('#area input[aria-label=\"引用\"]')")); B.key('Control+v'); B.wait(150)
        B.click(B.h("[...document.querySelectorAll('#area .sbtn2')].find(b=>/「|『|2026年/.test(b.textContent)&&b.textContent.length>8)")); B.chk('chosen')
        B.click(B.text('かんせい','button'))
    elif sid=='history':
        B.click(B.textc('変更履歴','.tb')); B.wait(200); B.chk('panel')
        rows = pg.query_selector_all('#area .vrow')
        if v=='p': t='11月7日 15:10'
        if v==0: t='10:05'
        if v==1: t='ゆい'
        if v==2:
            for r in rows:
                B.click(r); doc = B.ev("TX(document.querySelector('#area .doc'))")
                if all(k in doc for k in ['はじめ','なか','まとめ']): break
        else:
            r = [r for r in rows if t in r.evaluate('e=>TX(e)')][0]; B.click(r)
        B.click(B.text('この版に もどす','button'))

fails = []
with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={'width':1366,'height':768}, permissions=['clipboard-read','clipboard-write'])
    pg = ctx.new_page(); pg.add_init_script(INIT); pg.add_init_script(JS_HELP)
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)+' '+str(e.stack)[:400]))
    openapp(pg, SAVE)
    ids = pg.evaluate("STAGES.map(s=>s.id)")
    for sid in ids:
        if only and sid not in only: continue
        for v in ['p',0,1,2]:
            mode = 'prac' if v=='p' else 'exam'
            pg.evaluate("([id,v,m])=>{closeOverlay();const st=stageById(id);go(scrPlay,{mode:m,g:st.g,list:[{st:st,v:v}]})}", [sid, v, mode])
            pg.wait_for_timeout(1300)
            if v=='p': pg.evaluate("document.querySelector('.ov .btn.y').click()"); pg.wait_for_timeout(600)
            B = Bot(pg); hearts0 = pg.evaluate("document.querySelectorAll('.hearts svg').length")
            try:
                solve(B, sid, v)
                ok = False
                for i in range(30):
                    if pg.evaluate("!!document.querySelector('#area .okstamp')||(SCR&&SCR.name==='scrResult')"): ok = True; break
                    pg.wait_for_timeout(100)
                lost = pg.evaluate("document.querySelectorAll('.hearts svg path[fill=\"#dfe5ee\"]').length")
                msg = pg.evaluate("document.querySelector('.mtext')?TX(document.querySelector('.mtext')):''")
                st = 'CLEAR' if ok else 'FAIL'
                if lost: st += ' (ハート-%d)' % lost
                print('%-9s %-2s %s %s' % (sid, v, st, '' if ok else msg))
                if not ok or lost: fails.append((sid,v,msg)); pg.screenshot(path=str(ROOT/'test/shots'/('fail_%s_%s.png'%(sid,v))))
                if ok: pg.wait_for_timeout(200); r = check(pg); 
                if ok and r: B.issues.append(('done', r))
            except Exception as e:
                print('%-9s %-2s ERROR %s' % (sid, v, str(e)[:200])); fails.append((sid,v,str(e)[:100])); pg.screenshot(path=str(ROOT/'test/shots'/('fail_%s_%s.png'%(sid,v))))
            for tag, r in B.issues: print('    UI', tag, r)
            if errs: print('    JSERR', errs); errs.clear()
            for i in range(40):
                if pg.evaluate("SCR&&SCR.name")!='scrPlay' or v=='p': break
                pg.wait_for_timeout(100)
            pg.wait_for_timeout(2600 if v!='p' else 1700)
            pg.evaluate("closeOverlay()")
    b.close()
print('FAILS', len(fails), fails)
