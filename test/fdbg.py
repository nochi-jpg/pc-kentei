from pw import *
with sync_playwright() as p:
    b,pg=launch(p); openapp(pg,{'name':'t','method':'roma','clear':{},'mclear':{},'certs':[],'sound':False})
    pg.evaluate("go(scrPlay,{mode:'exam',g:2,list:[{st:stageById('folder'),v:2}]})"); pg.wait_for_timeout(1500)
    files = pg.evaluate("[...document.querySelectorAll('#area .ico.drg')].map(d=>[d.querySelector('.in').textContent,+d.dataset.k])")
    print(files)
    for n,k in files:
        e = pg.evaluate_handle("n=>[...document.querySelectorAll('#area .ico.drg')].find(d=>d.querySelector('.in').textContent===n)", n).as_element()
        t = pg.evaluate_handle("k=>[...document.querySelectorAll('#area .ico:not(.drg)')][k]", k).as_element()
        a=e.bounding_box(); c=t.bounding_box()
        x,y=a['x']+a['width']/2,a['y']+a['height']/2; x2,y2=c['x']+c['width']/2,c['y']+c['height']/2
        hit = pg.evaluate("([x,y])=>{const e=document.elementFromPoint(x,y);return e.className+' / '+(e.closest('.ico')?e.closest('.ico').textContent:'')}", [x,y])
        pg.mouse.move(x,y); pg.mouse.down()
        for i in range(1,11): pg.mouse.move(x+(x2-x)*i/10, y+(y2-y)*i/10)
        pg.mouse.up(); pg.wait_for_timeout(200)
        print(n, k, 'hit:', hit, '->', pg.evaluate("document.querySelector('.mtext').textContent"))
