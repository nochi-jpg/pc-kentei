from pw import *
with sync_playwright() as p:
    b,pg=launch(p); openapp(pg,{'name':'t','method':'roma','clear':{},'mclear':{},'certs':[{'g':1,'date':'2026-11-08','miss':0,'time':100}],'sound':True})
    pg.evaluate("go(scrSelect,'m',2)"); pg.wait_for_timeout(1200)
    pg.evaluate("[...document.querySelectorAll('.mrow .btn')][1].click()"); pg.wait_for_timeout(1500)
    print('mprac title:', pg.evaluate("document.querySelector('.wtitle').textContent"), 'how btn visible:', pg.evaluate("!document.querySelector('.tstrip .btn').classList.contains('hide')"), 'overlay:', pg.evaluate("!!OV"))
    print(check(pg))
    pg.evaluate("go(scrExamIntro,'m')"); pg.wait_for_timeout(1200)
    pg.evaluate("[...document.querySelectorAll('.btn')].find(b=>b.textContent==='はじめる').click()"); pg.wait_for_timeout(1800)
    print('master exam:', pg.evaluate("document.querySelector('.tprog').textContent"), pg.evaluate("document.querySelector('.ttext').textContent"))
    print(check(pg))
    # タスクバーから ぬけようとすると かくにん
    pg.evaluate("document.getElementById('tStart').click()"); pg.wait_for_timeout(500); print('guard overlay:', pg.evaluate("!!OV"))
    pg.screenshot(path='shots/ui/master_guard.png')
    b.close()
