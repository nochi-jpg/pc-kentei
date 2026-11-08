from pw import *
with sync_playwright() as p:
    b,pg=launch(p); openapp(pg,{'name':'t','method':'roma','clear':{},'mclear':{},'certs':[],'sound':False})
    pg.evaluate("go(scrPlay,{mode:'exam',g:3,list:[{st:stageById('zoom'),v:0}]})"); pg.wait_for_timeout(1500)
    tg=pg.evaluate_handle("[...document.querySelectorAll('#area .sw .abs')].find(d=>d.textContent.startsWith('ひみつ'))").as_element()
    for i in range(12):
        bb=tg.bounding_box(); pg.mouse.move(bb['x']+bb['width']/2,bb['y']+bb['height']/2); pg.keyboard.down('Control'); pg.mouse.wheel(0,-40); pg.keyboard.up('Control'); pg.wait_for_timeout(50)
        print(pg.evaluate("document.querySelector('#area .sw .abs').style.transform"), bb)
    pg.screenshot(path='shots/zdbg.png')
    print(pg.evaluate("[...document.querySelectorAll('#area button')].map(b=>b.textContent+':'+b.disabled)"))
