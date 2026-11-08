"""全ステージ×（れんしゅう＋しけん3パターン）を ひらいて チェック"""
import sys
from pw import *
from PIL import Image
OUT = ROOT/'test/shots/stages'; OUT.mkdir(parents=True, exist_ok=True)
only = sys.argv[1:] 
SAVE = {'name':'やまだ はなこ','method':'roma','clear':{},'mclear':{},'certs':[],'sound':False}
res = {}
with sync_playwright() as p:
    b, pg = launch(p)
    openapp(pg, SAVE)
    ids = pg.evaluate("STAGES.map(s=>s.id)")
    for sid in ids:
        if only and sid not in only: continue
        imgs = []
        for v in ['p',0,1,2]:
            mode = 'prac' if v=='p' else 'exam'
            pg.evaluate("([id,v,m])=>{closeOverlay();const st=stageById(id);go(scrPlay,{mode:m,g:st.g,list:[{st:st,v:v}]})}", [sid, v, mode])
            pg.wait_for_timeout(1500)
            tag = '%s_%s' % (sid, v)
            if v=='p':
                r = check(pg); 
                if r: print(tag+'_how', r)
                pg.screenshot(path=str(OUT/(tag+'_how.png')))
                pg.evaluate("document.querySelector('.ov .btn.y').click()"); pg.wait_for_timeout(700)
            r = check(pg)
            print(tag, 'OK' if not r else r)
            f = OUT/(tag+'.png'); pg.screenshot(path=str(f)); imgs.append(f)
        # 4まいを 1まいに
        ims = [Image.open(x) for x in imgs]; w,h = ims[0].size
        sheet = Image.new('RGB', (w, h*2//1)); 
        sheet = Image.new('RGB', (w*2, h*2))
        for i,im in enumerate(ims): sheet.paste(im, ((i%2)*w, (i//2)*h))
        sheet.resize((w, h)).save(OUT/('sheet_%s.png' % sid))
    b.close()
