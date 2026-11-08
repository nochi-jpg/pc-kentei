/* =========================================================
   プレイ画面（れんしゅう・しけん）
   ========================================================= */
function padSVG(g){
 const f=(x,y,c)=>'<g class="'+c+'"><circle cx="'+x+'" cy="'+y+'" r="22" class="fg"/></g>';
 const L=[62,247],Rr=[362,247];let fs='',hl='';
 const zone=(x)=>'<rect x="'+x+'" y="214" width="190" height="66" fill="#ffd23f" opacity=".55" clip-path="url(#pclip)"/>';
 if(g==='tap1'){hl=zone(20);fs=f(L[0],L[1],'a-tap');}
 else if(g==='dbl'){hl=zone(20);fs=f(L[0],L[1],'a-dbl');}
 else if(g==='tap2'){hl=zone(210);fs=f(Rr[0],Rr[1],'a-tap');}
 else if(g==='drag'){hl=zone(20);fs='<g class="a-press">'+f(L[0],L[1],'')+'</g>'+'<g class="a-drag">'+f(220,120,'')+'</g>';}
 else if(g==='hover')fs='<g class="a-hover">'+f(210,120,'')+'</g>';
 else if(g==='scroll')fs='<g class="a-scroll">'+f(184,120,'')+f(238,120,'')+'</g>';
 else if(g==='scrollx')fs='<g class="a-scrollx">'+f(184,120,'')+f(238,120,'')+'</g>';
 else if(g==='pinch')fs='<g class="a-pinL">'+f(186,130,'')+'</g><g class="a-pinR">'+f(234,100,'')+'</g>';
 return '<svg class="pad" viewBox="0 0 420 300" width="400" height="286"><defs><clipPath id="pclip"><rect x="20" y="20" width="380" height="260" rx="22"/></clipPath></defs><rect x="20" y="20" width="380" height="260" rx="22" class="pd"/>'+hl+'<line x1="20" y1="214" x2="400" y2="214" class="pl"/><line x1="210" y1="214" x2="210" y2="280" class="pl"/><text x="140" y="254" class="pt">左クリック</text><text x="280" y="254" class="pt">右クリック</text>'+fs+'</svg>';}
function keysFig(rows){return '<div class="keyfig">'+rows.map(r=>{const k=r.slice(0,-1),l=r[r.length-1];return '<div class="keyrow">'+k.map(x=>'<span class="key">'+x+'</span>').join('<span>+</span>')+'<span class="kl">'+l+'</span></div>';}).join('')+'</div>';}

function showHow(st,first,cb){const o=overlay();const h=st.how;const d=el('div','dlgbox howbox popin',null,o);d.style.position='absolute';
 el('div','ht',st.title+' の やり方',d);
 const fg=el('div','howfig',h.keys?keysFig(h.keys):padSVG(h.g),d);void fg;
 el('div','howcap',h.cap,d);
 const L=el('div','howlines',null,d);h.lines.forEach((t,i)=>{el('div',null,'<b>'+(i+1)+'</b><span>'+esc(t)+'</span>',L);});
 if(SCR){const P=makePasota(SCR,d,716,392,150,{still:true});P.face(first?'cheer':'normal');}
 const b=pos(el('button','btn y abs',first?'はじめる':'とじる',d),334,460,224,60);b.style.fontSize='24px';
 b.addEventListener('click',()=>{se('decide');closeOverlay();lockFor(250);if(cb)cb();});}

/* ローマ字ひょう */
const RJ1=[['あ','a'],['い','i'],['う','u'],['え','e'],['お','o'],['か','ka'],['き','ki'],['く','ku'],['け','ke'],['こ','ko'],['さ','sa'],['し','shi'],['す','su'],['せ','se'],['そ','so'],['た','ta'],['ち','chi'],['つ','tsu'],['て','te'],['と','to'],['な','na'],['に','ni'],['ぬ','nu'],['ね','ne'],['の','no'],['は','ha'],['ひ','hi'],['ふ','fu'],['へ','he'],['ほ','ho'],['ま','ma'],['み','mi'],['む','mu'],['め','me'],['も','mo'],['や','ya'],['',''],['ゆ','yu'],['',''],['よ','yo'],['ら','ra'],['り','ri'],['る','ru'],['れ','re'],['ろ','ro'],['わ','wa'],['',''],['を','wo'],['',''],['ん','nn']];
const RJ2=[['が','ga'],['ぎ','gi'],['ぐ','gu'],['げ','ge'],['ご','go'],['ざ','za'],['じ','ji'],['ず','zu'],['ぜ','ze'],['ぞ','zo'],['だ','da'],['ぢ','di'],['づ','du'],['で','de'],['ど','do'],['ば','ba'],['び','bi'],['ぶ','bu'],['べ','be'],['ぼ','bo'],['ぱ','pa'],['ぴ','pi'],['ぷ','pu'],['ぺ','pe'],['ぽ','po']];
const RJ3=[['きゃ','kya'],['きゅ','kyu'],['きょ','kyo'],['しゃ','sha'],['しゅ','shu'],['しょ','sho'],['ちゃ','cha'],['ちゅ','chu'],['ちょ','cho'],['にゃ','nya'],['にゅ','nyu'],['にょ','nyo'],['ひゃ','hya'],['ひゅ','hyu'],['ひょ','hyo'],['みゃ','mya'],['みゅ','myu'],['みょ','myo'],['りゃ','rya'],['りゅ','ryu'],['りょ','ryo'],['ぎゃ','gya'],['ぎゅ','gyu'],['ぎょ','gyo'],['じゃ','ja'],['じゅ','ju'],['じょ','jo'],['びゃ','bya'],['びゅ','byu'],['びょ','byo'],['ぴゃ','pya'],['ぴゅ','pyu'],['ぴょ','pyo']];
function romajiTable(after){const o=overlay();const d=pos(el('div','dlgbox popin',null,o),110,30,1060,640);let pg=0;
 const t=pos(el('div','abs h2',null,d),0,18,1052);t.style.textAlign='center';
 const area=pos(el('div','abs',null,d),20,72,1012,460);const note=pos(el('div','abs',null,d),40,476,980);note.style.cssText+=';font-size:18px;line-height:1.5';
 const pager=el('div','pager',null,d);pos(pager,200,560);
 const bp=el('button','btn sm','まえへ',pager),pn=el('div','pn','',pager),bn=el('button','btn sm','つぎへ',pager);
 const bc=pos(el('button','btn y abs','とじる',d),780,556,200,56);
 const draw=()=>{area.innerHTML='';const g=el('div','rtab',null,area);
  if(pg===0){t.textContent='ローマ字ひょう（あ〜ん）';g.style.cssText='grid-template-rows:repeat(5,74px);grid-auto-flow:column;grid-auto-columns:94px;left:22px;top:0';RJ1.forEach(r=>{const c=el('div',r[0]?'':'e','<b>'+r[0]+'</b><span>'+r[1]+'</span>',g);void c;});note.textContent='「ん」は n を 2かい（nn）。「を」は wo。';}
  if(pg===1){t.textContent='ローマ字ひょう（が〜ぽ）';g.style.cssText='grid-template-rows:repeat(5,74px);grid-auto-flow:column;grid-auto-columns:94px;left:262px;top:0';RJ2.forEach(r=>el('div',null,'<b>'+r[0]+'</b><span>'+r[1]+'</span>',g));note.textContent='「じ」は ji、「ぢ」は di、「づ」は du。';}
  if(pg===2){t.textContent='ローマ字ひょう（きゃ〜ぴょ・っ・ー）';g.style.cssText='grid-template-rows:repeat(3,74px);grid-auto-flow:column;grid-auto-columns:84px;left:46px;top:0';RJ3.forEach(r=>el('div',null,'<b>'+r[0]+'</b><span>'+r[1]+'</span>',g));
   note.innerHTML='小さい「っ」は、つぎの 字の さいしょの 文字を 2かい（例：きって → kitte）。<br>のばす「ー」は、ほ の 字の 右の「ー」キー。';}
  pn.textContent=(pg+1)+' / 3';bp.disabled=pg===0;bn.disabled=pg===2;};
 bp.addEventListener('click',()=>{se('cursor');pg--;draw();});bn.addEventListener('click',()=>{se('cursor');pg++;draw();});
 bc.addEventListener('click',()=>{se('cursor');closeOverlay();if(after)after();});draw();}

/* ---------- ステージで つかう 部品 ---------- */
function hitEl(p,e){const r=e.getBoundingClientRect();return p.x>=r.left&&p.x<=r.right&&p.y>=r.top&&p.y<=r.bottom;}
function centerOf(e){const r=e.getBoundingClientRect();return{x:(r.left+r.right)/2,y:(r.top+r.bottom)/2};}
/* ドラッグ（opt.drop(中心点,うごいたか,もどす関数)、opt.hover(中心点|null)） */
function dragify(a,node,opt){let sx,sy,ox,oy,on=false,moved=false;node.classList.add('drg');
 a.on(node,'pointerdown',e=>{if(e.button!==0||node.dataset.lock)return;e.preventDefault();try{node.setPointerCapture(e.pointerId);}catch(_){}on=true;moved=false;sx=e.clientX;sy=e.clientY;ox=node.offsetLeft;oy=node.offsetTop;node.classList.add('dragging');if(opt.start)opt.start();});
 a.on(node,'pointermove',e=>{if(!on)return;const P=node.offsetParent;const dx=(e.clientX-sx)/S,dy=(e.clientY-sy)/S;if(Math.abs(dx)+Math.abs(dy)>5)moved=true;
  const nx=Math.max(0,Math.min(P.clientWidth-node.offsetWidth,ox+dx)),ny=Math.max(0,Math.min(P.clientHeight-node.offsetHeight,oy+dy));node.style.left=nx+'px';node.style.top=ny+'px';
  if(opt.hover)opt.hover(centerOf(node));});
 const end=()=>{if(!on)return;on=false;node.classList.remove('dragging');if(opt.hover)opt.hover(null);
  opt.drop(centerOf(node),moved,()=>{node.style.left=ox+'px';node.style.top=oy+'px';});};
 a.on(node,'pointerup',end);a.on(node,'pointercancel',end);}
/* ステージ内の 小さな ウィンドウ */
function sw(parent,x,y,w,h,title,onX){const W=pos(el('div','sw',null,parent),x,y,w,h);const bar=el('div','swbar',null,W);const t=el('span',null,null,bar);t.textContent=title;el('span','sp',null,bar);
 let X=null;if(onX){X=el('button','swx','<svg viewBox="0 0 20 20"><path d="M5 5l10 10M15 5L5 15"/></svg>',bar);X.setAttribute('aria-label','とじる');X.addEventListener('click',e=>{e.stopPropagation();onX();});}
 const body=el('div','swbody',null,W);return{W,bar,body,title:t,X};}
function icoEl(parent,x,y,svg,name){const d=pos(el('div','ico',null,parent),x,y);d.innerHTML=svg+'<div class="in"></div>';d.querySelector('.in').textContent=name;return d;}

/* ---------- プレイ画面 ---------- */
function scrPlay(s,cfg){const mode=cfg.mode;const exam=mode==='exam',soft=mode!=='exam';
 const list=cfg.list;const R0=cfg.resume||null;let idx=R0?R0.idx:0,hearts=R0?R0.hearts:3,miss=R0?R0.miss:0;const missBy=R0?Object.assign({},R0.missBy):{};
 const base=R0?R0.elapsed:0;const t0=Date.now();let ctx=null;let resumeLeft=R0&&R0.typeLeft!=null?R0.typeLeft:null,typeLeft=null;
 const elapsed=()=>base+(Date.now()-t0)/1000;
 const G=GR[cfg.g];
 function saveSusp(){if(!exam||!s.alive)return;SAVE.susp={g:cfg.g,list:list.map(x=>({id:x.st.id,v:x.v})),idx:idx,hearts:hearts,miss:miss,missBy:missBy,elapsed:Math.round(elapsed()),typeLeft:typeLeft};store();}
 const suspend=()=>{ask('しけんを いったん ちゅうだんする？\nつぎに タイトルの「はじめる」を おすと、つづきから できるよ。','ちゅうだんする','つづける',ok=>{if(ok){saveSusp();leaveGuard=null;go(scrTitle);}},'normal');};
 const askQuit=(fn)=>{ask('れんしゅうを やめて もどる？\nこの ステージは はじめから に なるよ。','もどる','つづける',ok=>{if(ok){leaveGuard=null;fn();}},'normal');};
 const close=()=>{if(mode==='mprac')go(scrSelect,'m',cfg.page||0);else if(!exam)go(scrSelect,list[0].st.g,0);else go(scrHome);};
 const R=winEl(s.el,16,12,1248,636,'',close);const B=R.body;B.style.background='#f7faff';
 if(exam){const sb=el('button','btn sm y',null,null);sb.textContent='ちゅうだん';sb.style.cssText+=';width:130px;height:34px;font-size:16px;border-width:3px;border-radius:8px;box-shadow:none';R.bar.insertBefore(sb,R.bar.children[2]);sb.addEventListener('click',()=>{se('cursor');suspend();});}
 const strip=el('div','tstrip',null,R.W);const ttext=el('div','ttext',null,strip);
 const rsB=el('button','btn sm','やりなおす',strip);rsB.style.width='150px';
 const howB=el('button','btn sm','やり方を 見る',strip);howB.style.width='170px';
 rsB.addEventListener('click',()=>{if(!ctx||ctx.fin||ctx.locked)return;se('cursor');load(false);});
 const tprog=el('div','tprog','',strip);
 const hr=el('div','hearts',null,strip);
 const area=el('div',null,null,R.W);area.id='area';
 const ms=el('div','mstrip',null,R.W);const mf=el('div','mface',null,ms);const mi=el('img',null,null,mf);mi.src=ASSET.pasota.normal;mi.alt='';
 const mt=el('div','mtext',null,ms);
 let faceTm=null;const face=(n,t)=>{clearTimeout(faceTm);mi.src=ASSET.pasota[n];if(t)faceTm=setTimeout(()=>{mi.src=ASSET.pasota.normal;},t);};
 s.offs.push(()=>clearTimeout(faceTm));
 const say=(t,k)=>{mt.textContent=t||'';mt.className='mtext '+(k||'');};
 const drawHearts=(lostI)=>{hr.innerHTML='';for(let i=0;i<3;i++){const w=el('span',null,i<hearts?IC.heart:IC.heart0,hr);if(i===lostI)w.firstChild.classList.add('lost');}};
 if(!exam)hr.classList.add('hide');else drawHearts(-1);
 if(exam)howB.classList.add('hide');
 leaveGuard=exam?()=>suspend():(fn)=>askQuit(fn);
 if(exam){s.every(2000,saveSusp);const ph=()=>saveSusp();addEventListener('pagehide',ph);s.offs.push(()=>removeEventListener('pagehide',ph));}
 howB.addEventListener('click',()=>{se('cursor');const st=list[idx].st;showHow(st,false);});
 KEYH=e=>{if(!ctx||!ctx.alive||OV)return;ctx.keys.forEach(f=>f(e));};s.offs.push(()=>{KEYH=null;if(ctx)cleanCtx();});
 function cleanCtx(){if(!ctx)return;ctx.alive=false;ctx.offs.forEach(f=>{try{f();}catch(e){}});ctx=null;area.innerHTML='';area.style.pointerEvents='';}
 function titleText(){const it=list[idx];if(mode==='prac')return 'れんしゅう　'+G.label+'　'+it.st.title;
  if(mode==='mprac')return 'マスター れんしゅう　'+it.st.title+'（もんだい '+(it.v+1)+'）';return G.label+'　しけん';}
 function load(first){cleanCtx();const it=list[idx];R.title.textContent=titleText();say('');face('normal');
  const c={alive:true,offs:[],keys:[],fin:false,locked:false};ctx=c;
  if(exam)tprog.textContent=(idx+1)+' / '+list.length;else tprog.textContent='';
  let menuEl=null;
  if(exam){typeLeft=null;saveSusp();}
  const a={area:area,v:it.v,prac:it.v==='p',exam:it.v!=='p',soft:soft,resumeLeft:resumeLeft,
   typeTick(n){typeLeft=n;},
   on(t,ty,fn,o){t.addEventListener(ty,fn,o);c.offs.push(()=>t.removeEventListener(ty,fn,o));},
   later(fn,ms){const id=setTimeout(()=>{if(c.alive)fn();},ms);c.offs.push(()=>clearTimeout(id));return id;},
   every(fn,ms){const id=setInterval(()=>{if(c.alive)fn();},ms);c.offs.push(()=>clearInterval(id));return id;},
   key(fn){c.keys.push(fn);},
   rel(e){const r=area.getBoundingClientRect();return{x:(e.clientX-r.left)/S,y:(e.clientY-r.top)/S};},
   task(t){ttext.innerHTML='';const sp=el('span',null,null,ttext);sp.textContent=t;const fit=()=>{let f=21;ttext.style.fontSize=f+'px';while(sp.offsetHeight>54&&f>13){f--;ttext.style.fontSize=f+'px';}};fit();requestAnimationFrame(fit);},
   prog(n,t){if(!exam)tprog.textContent=n+' / '+t;},
   info(t){if(soft&&c.alive&&!c.fin)say(t,'info');},
   good(t){if(!c.alive||c.fin)return;say(soft?t:'OK！','ok');se('decide');face('happy',900);},
   say(t,k){if(soft)say(t,k);},
   alive(){return c.alive&&!c.fin&&!c.locked;},
   miss(t){if(!c.alive||c.fin||c.locked)return;se('wrong');const fl=el('div','ngflash',null,area);setTimeout(()=>fl.remove(),700);face('trouble',1400);
    if(!exam){say(t||'ちがうよ。もう一度','ng');return;}
    c.locked=true;hearts--;miss++;missBy[it.st.id]=(missBy[it.st.id]||0)+1;drawHearts(hearts);typeLeft=null;saveSusp();
    say(hearts>0?'ミス！ この もんだいを はじめから やりなおそう':'ハートが なくなった…','ng');area.style.pointerEvents='none';
    setTimeout(()=>{if(SCR!==s)return;if(hearts<=0){endExam(false);}else load(false);},1200);},
   done(){if(!c.alive||c.fin||c.locked)return;c.fin=true;typeLeft=null;closeMenu();area.style.pointerEvents='none';
    el('div','okstamp',IC.ok,area);se('correct');face('happy');say(soft?'できた！':'せいかい！','ok');
    setTimeout(()=>{if(SCR!==s||ctx!==c)return;afterDone(it);},1500);},
   menu(e,items){closeMenu();const p=a.rel(e);const m=el('div','cmenu',null,area);
    items.forEach(t=>{const b=el('button',null,(t.ic?IC[t.ic]:'')+'<span>'+t.t+'</span>',m);b.addEventListener('click',ev=>{ev.stopPropagation();closeMenu();t.fn();});});
    const h=items.length*48+14;pos(m,Math.min(p.x,1224-226),Math.min(p.y,436-h));menuEl=m;return m;},
   closeMenu:()=>closeMenu(),
   menuOpen:()=>!!menuEl,
   toast(t,x,y,ms){const d=pos(el('div','toast',null,area),x,y);d.textContent=t;a.later(()=>d.remove(),ms||1400);return d;},
   start:null};
  function closeMenu(){if(menuEl){menuEl.remove();menuEl=null;}}
  a.on(area,'pointerdown',e=>{if(menuEl&&!menuEl.contains(e.target))closeMenu();},true);
  c.api=a;resumeLeft=null;
  try{it.st.build(a,it.v);}catch(err){console.error(err);say('エラー：'+err.message,'ng');}
  const stg=Array.from(area.children);stag(stg);lockFor(500);
  if(mode==='prac'&&first){showHow(it.st,true,()=>{if(a.start&&c.alive)a.start();});}
  else if(a.start)a.later(()=>a.start(),450);}
 function afterDone(it){
  if(!exam)leaveGuard=null;
  if(mode==='prac'){const was=canExam(it.st.g);SAVE.clear[it.st.id]=true;store();updTask();se('finish');clearDialog(it,!was&&canExam(it.st.g));}
  else if(mode==='mprac'){SAVE.mclear[it.st.id+':'+it.v]=true;store();updTask();se('finish');clearDialog(it,false);}
  else{idx++;if(idx>=list.length)endExam(true);else{typeLeft=null;load(false);}}}
 function clearDialog(it,newExam){const o=overlay();const d=pos(el('div','dlgbox popin',null,o),290,130,700,420);
  const im=pos(el('img','abs',null,d),36,40,240,190);im.src=ASSET.pasota.happy;im.alt='';
  const t=pos(el('div','abs',null,d),300,40,370,190);t.style.cssText+=';display:flex;flex-direction:column;justify-content:center;gap:10px';
  el('div','outline','クリア！',t).style.cssText='font-size:48px;font-weight:700;color:#ffd23f;-webkit-text-stroke:7px #10264d;paint-order:stroke fill';
  const m=el('div',null,null,t);m.style.cssText='font-size:21px;line-height:1.5;word-break:keep-all';m.textContent='「'+it.st.title+'」が できたね！';
  if(newExam){const n=el('div',null,null,t);n.style.cssText='font-size:18px;font-weight:700;color:#d23b3b';n.textContent=GR[it.st.g].label+'の しけんを うけられるよ！';}
  const row=pos(el('div','abs',null,d),30,286,632,70);row.style.cssText+=';display:flex;gap:16px';
  const b1=el('button','btn',null,row);b1.textContent='もういちど';
  let nx=null;if(mode==='prac'){const L=stagesOf(it.st.g);const k=L.indexOf(it.st);nx=L[k+1]||null;}
  const b2=el('button','btn y',null,row);b2.textContent=mode==='prac'?'つぎの ステージ':'もんだい えらび';
  const b3=el('button','btn',null,row);b3.textContent=mode==='prac'?'ステージ えらび':'ホームへ';
  [b1,b2,b3].forEach(b=>{b.style.width='200px';});
  if(mode==='prac'&&!nx){b2.disabled=true;}
  b1.addEventListener('click',()=>{se('cursor');closeOverlay();go(scrPlay,cfg);});
  b2.addEventListener('click',()=>{se('decide');closeOverlay();if(mode==='prac')go(scrPlay,{mode:'prac',g:nx.g,list:[{st:nx,v:'p'}]});else go(scrSelect,'m',cfg.page||0);});
  b3.addEventListener('click',()=>{se('cursor');closeOverlay();if(mode==='prac')go(scrSelect,it.st.g,0);else go(scrHome);});}
 function endExam(pass){leaveGuard=null;cleanCtx();const time=elapsed();SAVE.susp=null;store();s.alive=false;
  if(pass){SAVE.certs.push({g:cfg.g,date:today(),miss:miss,time:Math.round(time),name:SAVE.name});store();}
  go(scrResult,{g:cfg.g,pass:pass,miss:miss,time:time,missBy:missBy});}
 load(true);}
