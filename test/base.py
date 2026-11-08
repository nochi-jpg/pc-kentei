import sys; from pw import *
OUT = ROOT/'test/shots'; OUT.mkdir(exist_ok=True)
with sync_playwright() as p:
    b, pg = launch(p)
    openapp(pg, {})
    pg.evaluate("localStorage.clear()"); pg.reload(); pg.wait_for_timeout(1200)
    def shot(n, wait=1300):
        pg.wait_for_timeout(wait); pg.screenshot(path=str(OUT/(n+'.png'))); r = check(pg); print(n, 'OK' if not r else r)
    shot('01_name_hello')
    pg.evaluate("document.querySelectorAll('.step')[1].click()"); shot('02_name_kana')
    for t in ['ぱ','そ','た']: pass
    pg.evaluate("SAVE.name='はなこ';store();go(scrName)"); 
    pg.wait_for_timeout(900); pg.evaluate("document.querySelectorAll('.step')[0].click()"); shot('03_name_roma')
    pg.evaluate("go(scrTitle)"); shot('04_title')
    pg.mouse.click(int((28+58)*1366/1280*0+ (1366-1280*0.0)/1 ), 1) if False else None
    pg.evaluate("document.querySelector('.dicon').click()"); shot('05_title_hint', 2600)
    pg.evaluate("SAVE.name='やまだ はなこ';go(scrHome)"); shot('06_home')
    pg.evaluate("go(scrSettings)"); shot('07_settings')
    pg.evaluate("go(scrTeacher,0)"); shot('08_teacher')
    b.close()
