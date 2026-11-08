"""1366x768 で 画面を ひらいて、はみだし・かぶり・切れを しらべる"""
import json, pathlib
from playwright.sync_api import sync_playwright
ROOT = pathlib.Path(__file__).resolve().parent.parent
FONT = '<link rel="stylesheet" href="file:///tmp/fnt/package/400.css"><link rel="stylesheet" href="file:///tmp/fnt/package/700.css">'
INIT = "document.addEventListener('DOMContentLoaded',()=>{document.head.insertAdjacentHTML('beforeend',%s)});" % json.dumps(FONT)
CHECK = r"""
(()=>{
const app=document.getElementById('app');const S=app.getBoundingClientRect().width/1280;
const AR=app.getBoundingClientRect();const out=[];
const vis=e=>{const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity===0)return false;const r=e.getBoundingClientRect();return r.width>0&&r.height>0;};
const name=e=>{let s=e.tagName.toLowerCase();if(e.id)s+='#'+e.id;if(e.className&&typeof e.className==='string')s+='.'+e.className.trim().split(/\s+/).join('.');const t=(e.textContent||'').trim().slice(0,18);return s+(t?' 「'+t+'」':'');};
const clipped=e=>!!e.closest('[data-clip]');
const all=[...app.querySelectorAll('*')].filter(vis);
// 1) 画面から切れる
for(const e of all){if(clipped(e))continue;const r=e.getBoundingClientRect();
 if(r.left<AR.left-1||r.top<AR.top-1||r.right>AR.right+1||r.bottom>AR.bottom+1){if(e.closest('.conf'))continue;out.push('切れ: '+name(e));}}
// 2) 文字のはみだし
const TXT='button,.chip,.ttext,.mtext,.bt,.snm,.cname,.barlbl,.hello,.lbl,.in,.namebox,.k,.v,.tab,.wtitle,.qbox,.mark,.pbtn,.vrow,.res,.srow,.pn2,.tg,.cdt,.cn,.cb,.ct,.cd,.ci,.howcap,.howlines div,.mn,.tprog,.zl,.toast,.inp,.ibub,.l3,.logo .l2,.scard .sn,.scard .sd,.rtab div,.cl div,.fchip,.sent,.cbub,.sbtn2,.key';
for(const e of app.querySelectorAll(TXT)){if(!vis(e)||clipped(e))continue;if(e.tagName==='INPUT'||e.tagName==='TEXTAREA')continue;
 if(e.scrollWidth>e.clientWidth+2||e.scrollHeight>e.clientHeight+2)out.push('はみだし: '+name(e)+' ('+e.scrollWidth+'x'+e.scrollHeight+' > '+e.clientWidth+'x'+e.clientHeight+')');}
// 3) 入れものから出る
const BOX='.win,.sw,.dlgbox,.card,.panel,.bubble,.srow2,.mrow,.tpage,#area,.cert .paper,.sbtn,.cbtn,.tstrip,.mstrip,#task,.zone,.scard';
for(const b of app.querySelectorAll(BOX)){if(!vis(b)||clipped(b))continue;const R=b.getBoundingClientRect();
 for(const e of b.querySelectorAll('*')){if(!vis(e)||clipped(e)||e.closest('.cmenu,.rbar,.toast'))continue;if(getComputedStyle(e).position==='fixed')continue;
  if(e.matches('.hd'))continue;
  const r=e.getBoundingClientRect();if(r.left<R.left-1||r.top<R.top-1||r.right>R.right+1||r.bottom>R.bottom+1){
   if(b.matches('.bubble')&&e.matches('.bnext'))continue;out.push('はみ出し('+name(b).slice(0,30)+'): '+name(e));}}}
// 4) かぶり（ボタンどうし・カードどうし）
const OV='button,.card,.ico,.chip,.zone,.qbox,.inp,.sw,.drg,.panel,.dlgbox,.bubble,.pasota,.hello,.namebox,.mark';
const items=[...app.querySelectorAll(OV)].filter(e=>vis(e)&&!clipped(e)&&!e.closest('.cmenu,.rbar,.ov .conf'));
for(let i=0;i<items.length;i++)for(let j=i+1;j<items.length;j++){const A=items[i],B=items[j];if(A.contains(B)||B.contains(A))continue;
 if(A.closest('.ov')!==B.closest('.ov'))continue;
 if(A.closest('[data-ovok]')!==B.closest('[data-ovok]'))continue;
 const a=A.getBoundingClientRect(),b=B.getBoundingClientRect();const w=Math.min(a.right,b.right)-Math.max(a.left,b.left),h=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top);
 if(w>3&&h>3){if(A.closest('.drg.dragging')||B.closest('.drg.dragging'))continue;
  // 同じ入れものの中の要素どうしだけ
  out.push('かぶり: '+name(A).slice(0,40)+' × '+name(B).slice(0,40));}}
// 5) スクロールバー
for(const e of all){const cs=getComputedStyle(e);if((cs.overflowY==='auto'||cs.overflowY==='scroll'||cs.overflowX==='auto'||cs.overflowX==='scroll')&&!e.closest('[data-scrollok]'))out.push('スクロール: '+name(e));}
// 6) スクロールする 入れもの（data-clip）から はみでて 見えていないか
for(const c of app.querySelectorAll('[data-clip]')){if(!vis(c))continue;const cs=getComputedStyle(c);if(cs.overflow==='hidden'||cs.overflowX==='hidden')continue;const R=c.getBoundingClientRect();
 for(const e of c.querySelectorAll('*')){if(!vis(e))continue;const r=e.getBoundingClientRect();if(r.left<R.left-1||r.top<R.top-1||r.right>R.right+1||r.bottom>R.bottom+1){out.push('スクロールで はみでる: '+name(e).slice(0,40));break;}}}
// 7) ふりがな の ない 漢字
{const w=document.createTreeWalker(app,NodeFilter.SHOW_TEXT);let n;const miss=new Set();while(n=w.nextNode()){const p=n.parentNode;if(!p||!vis(p))continue;if(p.closest('ruby,input,textarea,svg,.noruby,.sel-box'))continue;const m=n.nodeValue.match(/[\u4e00-\u9fff々]+/g);if(m)m.forEach(x=>miss.add(x));}
 if(miss.size)out.push('ふりがな なし: '+[...miss].join(' '));}
// 8) ふりがな が 入れものや 画面から 出ていないか（rt）
for(const rt of app.querySelectorAll('rt')){if(!vis(rt)||rt.closest('[data-clip]'))continue;const r=rt.getBoundingClientRect();if(r.top<AR.top-1){out.push('ふりがな 切れ: '+name(rt.parentNode));continue;}
 let p=rt.parentNode.parentElement;while(p&&p!==app){const cs=getComputedStyle(p);if(cs.overflow==='hidden'||cs.overflowY==='hidden'){const R=p.getBoundingClientRect();if(r.top<R.top-1||r.bottom>R.bottom+1){if(!p.closest('[data-clip]'))out.push('ふりがな はみでる: '+name(rt.parentNode)+' in '+name(p).slice(0,30));}break;}p=p.parentElement;}}
// 9) ふりがなが ボタンや わくから 出ていないか
for(const rt of app.querySelectorAll('rt')){if(!vis(rt)||rt.closest('[data-clip]'))continue;const r=rt.getBoundingClientRect();
 const box=rt.closest('button,.chip,.tab,.qbox,.mark,.tprog,.ttext,.mtext,.bubble,.card,.srow2,.mrow,.sw,.dlgbox,.panel,.cbub,.res,.vrow,.pbtn,.sbtn,.cbtn,.win,.tstrip,.key,.toast,.ibub,.l3,.namebox,.prow,.zone');
 if(!box)continue;const R=box.getBoundingClientRect();const bw=parseFloat(getComputedStyle(box).borderTopWidth)||0;
 if(r.top<R.top+bw-0.5||r.left<R.left-0.5||r.right>R.right+0.5)out.push('ふりがな はみでる: '+name(rt.parentNode)+' in '+name(box).slice(0,30));}
return [...new Set(out)];
})()
"""
def launch(p):
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width':1366,'height':768})
    pg.add_init_script(INIT)
    pg.on('pageerror', lambda e: print('PAGEERROR', e))
    pg.on('console', lambda m: print('CONSOLE', m.type, m.text) if m.type in ('error','warning') else None)
    return b, pg
def openapp(pg, save=None):
    pg.goto((ROOT/'index.html').as_uri())
    if save is not None:
        pg.evaluate("s=>{localStorage.setItem('pcskillmaster_v1',JSON.stringify(s));}", save)
        pg.goto((ROOT/'index.html').as_uri())
    pg.wait_for_timeout(900)
def check(pg): return pg.evaluate(CHECK)
