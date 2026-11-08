'use strict';
/* =========================================================
   小学校パソコンスキルマスター  core
   ========================================================= */
const APP=document.getElementById('app');
let S=1;
function fit(){S=Math.min(innerWidth/1280,innerHeight/720);APP.style.transform='translate(-50%,-50%) scale('+S+')';}
addEventListener('resize',fit);fit();

function el(tag,cls,html,parent){const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;if(parent)parent.appendChild(e);return e;}
function pos(e,x,y,w,h){e.style.left=x+'px';e.style.top=y+'px';if(w!=null)e.style.width=w+'px';if(h!=null)e.style.height=h+'px';return e;}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]];}return a;}
function pick(a){return a[Math.random()*a.length|0];}
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function z2h(s){return String(s).replace(/[０-９Ａ-Ｚａ-ｚ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0xFEE0));}
function nsp(s){return String(s).replace(/[\s　]+/g,' ').trim();}
function nosp(s){return String(s).replace(/[\s　]+/g,'');}
function today(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function jdate(s){const p=s.split('-');return p[0]+'年'+(+p[1])+'月'+(+p[2])+'日';}
function fmtTime(sec){sec=Math.round(sec);const m=Math.floor(sec/60),s=sec%60;return m>0?m+'分'+s+'びょう':s+'びょう';}

/* ---------- 保存 ---------- */
const SKEY='pcskillmaster_v1';
function defSave(){return{name:'',method:'',clear:{},mclear:{},certs:[],sound:true,susp:null};}
let SAVE=defSave();
try{const s=JSON.parse(localStorage.getItem(SKEY));if(s&&typeof s==='object')SAVE=Object.assign(defSave(),s);}catch(e){}
function store(){try{localStorage.setItem(SKEY,JSON.stringify(SAVE));}catch(e){}}

/* ---------- 音 ---------- */
const SND={};
function se(n){if(!SAVE.sound)return;try{const src=ASSET.se[n];if(!src)return;let a=SND[n];if(!a){a=SND[n]=new Audio(src);a.preload='auto';}
 const p=a.paused?a:a.cloneNode();p.volume=n==='cursor'?0.55:0.8;p.currentTime=0;const r=p.play();if(r&&r.catch)r.catch(()=>{});}catch(e){}}
let ACX=null;
function seFail(){if(!SAVE.sound)return;try{ACX=ACX||new (window.AudioContext||window.webkitAudioContext)();const t=ACX.currentTime;
 [[523,0],[440,.28],[349,.56]].forEach(([f,d])=>{const o=ACX.createOscillator(),g=ACX.createGain();o.type='triangle';o.frequency.setValueAtTime(f,t+d);o.frequency.linearRampToValueAtTime(f*0.94,t+d+.4);
  g.gain.setValueAtTime(0,t+d);g.gain.linearRampToValueAtTime(.22,t+d+.04);g.gain.exponentialRampToValueAtTime(.001,t+d+.5);o.connect(g);g.connect(ACX.destination);o.start(t+d);o.stop(t+d+.55);});}catch(e){}}

/* ---------- ロック（アニメーション中は反応しない） ---------- */
let lockUntil=0,lockTm=null;
function lockFor(ms){const u=Date.now()+ms;if(u>lockUntil)lockUntil=u;APP.classList.add('lock');clearTimeout(lockTm);lockTm=setTimeout(()=>{APP.classList.remove('lock');},lockUntil-Date.now());}

/* ---------- アイコン（SVG） ---------- */
const N='#10264d';
const IC={
 x:'<svg viewBox="0 0 20 20"><path d="M5 5l10 10M15 5L5 15" fill="none"/></svg>',
 min:'<svg viewBox="0 0 20 20"><path d="M4 14h12"/></svg>',
 max:'<svg viewBox="0 0 20 20"><rect x="4" y="4" width="12" height="12" rx="1"/></svg>',
 heart:'<svg viewBox="0 0 40 38"><path d="M20 34S4 24.5 3.2 14C2.6 7.8 7 4 11.6 4c3.6 0 6.2 2.2 8.4 5.2C22.2 6.2 24.8 4 28.4 4 33 4 37.4 7.8 36.8 14 36 24.5 20 34 20 34z" fill="#ff5a6e" stroke="'+N+'" stroke-width="3.4" stroke-linejoin="round"/><path d="M9 11c1-2.6 3.4-3.6 5.4-3" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/></svg>',
 heart0:'<svg viewBox="0 0 40 38"><path d="M20 34S4 24.5 3.2 14C2.6 7.8 7 4 11.6 4c3.6 0 6.2 2.2 8.4 5.2C22.2 6.2 24.8 4 28.4 4 33 4 37.4 7.8 36.8 14 36 24.5 20 34 20 34z" fill="#dfe5ee" stroke="#7f8ca3" stroke-width="3.4" stroke-linejoin="round"/></svg>',
 check:'<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" fill="#36c96f" stroke="'+N+'" stroke-width="3.5"/><path d="M11.5 20.5l6 6 11-12" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 ok:'<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="80" fill="none" stroke="#ff5a6e" stroke-width="26"/><circle cx="100" cy="100" r="80" fill="none" stroke="#fff" stroke-width="6" opacity=".55"/></svg>',
 clip:'<svg viewBox="0 0 24 24" fill="none" stroke="'+N+'" stroke-width="2.4" stroke-linecap="round"><path d="M20 11l-8 8a5 5 0 0 1-7-7l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7L9.7 16.7a1.7 1.7 0 0 1-2.4-2.4L15 6.6"/></svg>',
 send:'<svg viewBox="0 0 24 24"><path d="M3 20l18-8L3 4l2.5 8z" fill="#2a63c9" stroke="'+N+'" stroke-width="2" stroke-linejoin="round"/></svg>',
 copy:'<svg viewBox="0 0 24 24" fill="none" stroke="'+N+'" stroke-width="2.2"><rect x="8" y="8" width="12" height="13" rx="2" fill="#fff"/><path d="M5 16V5a2 2 0 0 1 2-2h9"/></svg>',
 trash:'<svg viewBox="0 0 24 24" fill="none" stroke="'+N+'" stroke-width="2.2" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14" fill="#e3eaf6"/></svg>',
 cmt:'<svg viewBox="0 0 24 24" fill="#fff4c2" stroke="'+N+'" stroke-width="2.2" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4z"/></svg>',
 undo:'<svg viewBox="0 0 24 24" fill="none" stroke="'+N+'" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/></svg>',
 redo:'<svg viewBox="0 0 24 24" fill="none" stroke="'+N+'" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14l5-5-5-5"/><path d="M20 9H10a6 6 0 0 0 0 12h3"/></svg>',
 find:'<svg viewBox="0 0 24 24" fill="none" stroke="'+N+'" stroke-width="2.6" stroke-linecap="round"><circle cx="10" cy="10" r="6" fill="#fff"/><path d="M15 15l6 6"/></svg>',
 rep:'<svg viewBox="0 0 24 24" fill="none" stroke="'+N+'" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13l-3-3M20 16H7l3 3"/></svg>',
 hist:'<svg viewBox="0 0 24 24" fill="none" stroke="'+N+'" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="9" fill="#fff"/><path d="M12 7v5l3 3"/></svg>',
 like:'<svg viewBox="0 0 32 32"><path d="M3 14h5v14H3z" fill="#e8b04a" stroke="'+N+'" stroke-width="2"/><path d="M10 14l5-10c2.2 0 4 1.7 4 4v4h7c1.7 0 3 1.6 2.6 3.2l-2.2 9.6c-.3 1.3-1.4 2.2-2.8 2.2H10z" fill="#ffd23f" stroke="'+N+'" stroke-width="2" stroke-linejoin="round"/></svg>',
 heartR:'<svg viewBox="0 0 32 32"><path d="M16 28S4 21 2.6 13.2C1.6 7.6 5 4 9 4c3 0 5 1.8 7 4.4C18 5.8 20 4 23 4c4 0 7.4 3.6 6.4 9.2C28 21 16 28 16 28z" fill="#ff5a6e" stroke="'+N+'" stroke-width="2" stroke-linejoin="round"/></svg>',
 smile:'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#ffd23f" stroke="'+N+'" stroke-width="2"/><circle cx="11" cy="13" r="1.8" fill="'+N+'"/><circle cx="21" cy="13" r="1.8" fill="'+N+'"/><path d="M9.5 18.5c2 3.4 11 3.4 13 0" stroke="'+N+'" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg>',
 wow:'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#ffd23f" stroke="'+N+'" stroke-width="2"/><circle cx="11" cy="12.5" r="2" fill="'+N+'"/><circle cx="21" cy="12.5" r="2" fill="'+N+'"/><ellipse cx="16" cy="21" rx="3" ry="3.8" fill="'+N+'"/></svg>'
};
const RN={like:'いいね',heartR:'ハート',smile:'にこにこ',wow:'びっくり'};

/* フォルダー・ファイルの絵 */
function svgFolder(open,col){col=col||'#ffc94d';return open?
 '<svg viewBox="0 0 86 80"><path d="M6 18h26l6 7h40v45H6z" fill="#e8a92e" stroke="'+N+'" stroke-width="3.5" stroke-linejoin="round"/><rect x="16" y="12" width="48" height="40" fill="#fff" stroke="'+N+'" stroke-width="3"/><path d="M22 22h34M22 30h34M22 38h22" stroke="#9fb2d3" stroke-width="3"/><path d="M4 36h78l-6 34H10z" fill="'+col+'" stroke="'+N+'" stroke-width="3.5" stroke-linejoin="round"/></svg>':
 '<svg viewBox="0 0 86 80"><path d="M6 14h26l6 7h42v49H6z" fill="#e8a92e" stroke="'+N+'" stroke-width="3.5" stroke-linejoin="round"/><path d="M6 28h74v42H6z" fill="'+col+'" stroke="'+N+'" stroke-width="3.5" stroke-linejoin="round"/><path d="M12 34h62" stroke="#fff" stroke-width="3" opacity=".6"/></svg>';}
function svgFile(col,mark){col=col||'#ffffff';return '<svg viewBox="0 0 86 80"><path d="M20 4h34l14 14v58H20z" fill="'+col+'" stroke="'+N+'" stroke-width="3.5" stroke-linejoin="round"/><path d="M54 4v14h14" fill="#dfe9fb" stroke="'+N+'" stroke-width="3.5" stroke-linejoin="round"/><path d="M28 32h32M28 42h32M28 52h24" stroke="#7f95bf" stroke-width="3.5" stroke-linecap="round"/>'+(mark||'')+'</svg>';}
function svgTrash(){return '<svg viewBox="0 0 86 80"><path d="M24 22h38l-4 52H28z" fill="#cfe0f7" stroke="'+N+'" stroke-width="3.5" stroke-linejoin="round"/><path d="M18 16h50v8H18z" fill="#9fb8de" stroke="'+N+'" stroke-width="3.5" stroke-linejoin="round"/><path d="M36 10h14v6H36z" fill="#9fb8de" stroke="'+N+'" stroke-width="3"/><path d="M34 32v34M43 32v34M52 32v34" stroke="'+N+'" stroke-width="3" stroke-linecap="round"/></svg>';}

/* ---------- ぱそた ---------- */
const TIPS_FIRST='ぼくを クリックすると、パソコンの 豆知識を おしえるよ！';
let tipOrder=[],tipPos=0,tipFirstShown=false;
function nextTip(){if(!tipFirstShown){tipFirstShown=true;return TIPS_FIRST;}
 if(tipPos>=tipOrder.length){tipOrder=shuffle(TIPS.map((t,i)=>i));tipPos=0;}return TIPS[tipOrder[tipPos++]];}

function makePasota(scr,parent,x,y,w,opt){opt=opt||{};const h=Math.round(w*380/480);
 const b=pos(el('button','pasota'+(opt.still?' still':''),null,parent),x,y,w,h);b.setAttribute('aria-label','ぱそた');
 const f=el('div','pf',null,b),j=el('div','pj',null,f),img=el('img',null,null,j);img.alt='';img.src=ASSET.pasota.normal;img.draggable=false;
 let face='normal',tm=null,jn=0;
 const set=n=>{img.src=ASSET.pasota[n];};
 const P={el:b,
  face(n,ms){clearTimeout(tm);face=n;set(n);if(ms){tm=setTimeout(()=>{face='normal';set('normal');},ms);}},
  jump(){jn++;j.className='pj '+(jn%2?'jumpA':'jumpB');}
 };
 scr.every(8000,()=>{if(face!=='normal')return;set('blink');scr.after(160,()=>{if(face==='normal')set('normal');});});
 if(!opt.still)b.addEventListener('click',()=>{P.jump();se('cursor');if(opt.onClick)opt.onClick(P);});
 scr.offs.push(()=>clearTimeout(tm));
 return P;}

/* 吹き出し（2行まで・長いときは「つぎへ」） */
function makeBubble(parent,x,y,w,h,cls){const b=pos(el('div','bubble '+(cls||''),null,parent),x,y,w,h);const t=el('div','bt',null,b);
 return{el:b,set(s){t.textContent=String(s).replace(/\|/g,'\n');}};}

/* ---------- 画面の切りかえ ---------- */
const ROOT=document.getElementById('scr');
let SCR=null,leaveGuard=null,BACK=null;
function newScr(name){const s={name:name,el:el('div','screen',null,ROOT),offs:[],alive:true,
  after(ms,fn){const id=setTimeout(()=>{if(s.alive)fn();},ms);s.offs.push(()=>clearTimeout(id));return id;},
  every(ms,fn){const id=setInterval(()=>{if(s.alive)fn();},ms);s.offs.push(()=>clearInterval(id));return id;},
  on(t,ty,fn,o){t.addEventListener(ty,fn,o);s.offs.push(()=>t.removeEventListener(ty,fn,o));}};return s;}
function killScr(s){if(!s)return;s.alive=false;s.offs.forEach(f=>{try{f();}catch(e){}});s.el.remove();}
/* go(画面をつくる関数, 引数...) */
function go(fn,...args){leaveGuard=null;BACK=null;closeOverlay();const old=SCR;SCR=null;lockFor(700);
 const build=()=>{killScr(old);const s=newScr(fn.name);SCR=s;fn(s,...args);updTask();
  const n=s.el.querySelectorAll('.enter,.enterR,.openwin,.popin').length;lockFor(Math.min(1200,450+n*60));};
 if(old){old.el.classList.add('out');setTimeout(build,220);}else build();}
/* 入場アニメの順番 */
function stag(list){list.forEach((e,i)=>{e.classList.add('enter');e.style.setProperty('--i',i);
 const f=ev=>{if(ev.target!==e)return;e.classList.remove('enter');e.removeEventListener('animationend',f);};e.addEventListener('animationend',f);});}

/* ---------- オーバーレイ・確認 ---------- */
let OV=null;
function closeOverlay(){if(OV){OV.remove();OV=null;}}
function overlay(){closeOverlay();OV=el('div','ov',null,APP);lockFor(350);return OV;}
function ask(text,yes,no,cb,face){const o=overlay();const d=pos(el('div','dlgbox popin',null,o),250,150,780,380);
 const P=el('img',null,null,d);pos(P,36,40,170,135);P.className='abs';P.src=ASSET.pasota[face||'trouble'];P.alt='';
 const t=pos(el('div','abs',null,d),236,30,510,210);t.style.cssText+=';font-size:24px;font-weight:700;line-height:1.55;display:flex;align-items:center;word-break:keep-all;overflow-wrap:anywhere;white-space:pre-line';t.textContent=text;
 let f=24;while(t.scrollHeight>t.clientHeight+1&&f>16){f--;t.style.fontSize=f+'px';}
 const by=pos(el('button','btn y abs',yes,d),120,270,250,60),bn=pos(el('button','btn abs',no,d),402,270,250,60);
 by.addEventListener('click',()=>{se('decide');closeOverlay();cb(true);});bn.addEventListener('click',()=>{se('cursor');closeOverlay();cb(false);});}
/* ---------- 紙吹雪 ---------- */
function confetti(){const c=el('div','conf',null,APP);const cols=['#ff5a6e','#ffd23f','#36c96f','#3fa9ff','#9b6bff','#ff9f43','#ffffff'];
 for(let i=0;i<110;i++){const p=el('i',null,null,c);p.style.left=(Math.random()*1280)+'px';p.style.background=cols[i%cols.length];
  p.style.setProperty('--dx',(Math.random()*240-120)+'px');p.style.setProperty('--r',(Math.random()*1440-720)+'deg');
  p.style.animationDuration=(2.2+Math.random()*2)+'s';p.style.animationDelay=(Math.random()*0.9)+'s';if(i%3===0){p.style.width='10px';p.style.height='10px';p.style.borderRadius='50%';}}
 setTimeout(()=>c.remove(),5600);}

/* ---------- 級のデータ ---------- */
const GR={3:{g:3,label:'3級',sub:'1・2年 めやす',cls:'b3',cert:'c3',medal:'🥉'},2:{g:2,label:'2級',sub:'3・4年 めやす',cls:'b2',cert:'c2',medal:'🥈'},1:{g:1,label:'1級',sub:'5・6年 めやす',cls:'b1',cert:'c1',medal:'🥇'},
 m:{g:'m',label:'マスター',sub:'3級〜1級の もんだい ぜんぶ',cls:'bm',cert:'cm',medal:'🏆'}};
const STAGES=[];      /* ステージは stages*.js で追加 */
function stagesOf(g){return STAGES.filter(s=>s.g===g);}
function stageById(id){return STAGES.find(s=>s.id===id);}
function clearedCount(g){if(g==='m')return Object.keys(SAVE.mclear).length;return stagesOf(g).filter(s=>SAVE.clear[s.id]).length;}
function totalOf(g){return g==='m'?STAGES.length*3:stagesOf(g).length;}
function passed(g){return SAVE.certs.some(c=>String(c.g)===String(g));}
function prevG(g){return g===2?3:g===1?2:g==='m'?1:null;}
function masterOpen(){return passed(1);}
/* しけんの状態 */
function examState(g){if(g==='m')return passed('m')?'ok':'ready';
 const left=totalOf(g)-clearedCount(g),pv=prevG(g);
 if(passed(g))return 'ok';if(pv&&!passed(pv))return 'lock';if(left>0)return 'wait';return 'ready';}
function canExam(g){if(g==='m')return masterOpen();const pv=prevG(g);if(pv&&!passed(pv))return false;return clearedCount(g)>=totalOf(g);}

/* ---------- タスクバー ---------- */
const TASK=document.getElementById('task');
TASK.innerHTML='<button class="startbtn" id="tStart" aria-label="タイトルへ"><span></span><span></span><span></span><span></span></button><button class="tbtn tback" id="tBack">⇠ まえの がめんに もどる</button><div id="prog"></div><button class="tbtn" id="tSet">せってい</button>';
function progText(){return [3,2,1,'m'].map(g=>GR[g].label+'（'+clearedCount(g)+'/'+totalOf(g)+'）'+(passed(g)?GR[g].medal:'')).join('　');}
function updTask(){document.getElementById('prog').textContent=progText();
 const nm=SCR?SCR.name:'';document.getElementById('tSet').classList.toggle('hide',nm==='scrTitle'||nm==='scrName'||!SAVE.name||nm==='scrSettings');
 document.getElementById('tStart').classList.toggle('hide',(nm==='scrName'&&!SAVE.name)||nm==='scrTitle');
 document.getElementById('tBack').classList.toggle('hide',!BACK);}
function setBack(fn){BACK=fn;updTask();}
function guarded(fn){if(leaveGuard){leaveGuard(fn);}else fn();}
document.getElementById('tStart').addEventListener('click',()=>{se('cursor');guarded(()=>go(scrTitle));});
document.getElementById('tBack').addEventListener('click',()=>{se('cursor');if(BACK)guarded(BACK);});
document.getElementById('tSet').addEventListener('click',()=>{se('cursor');guarded(()=>go(scrSettings));});

/* ---------- 全体のキー・右クリック・ズームの制御 ---------- */
document.addEventListener('contextmenu',e=>{if(!e.target.closest('.allowctx'))e.preventDefault();});
addEventListener('wheel',e=>{if(e.ctrlKey)e.preventDefault();},{passive:false});
document.addEventListener('keydown',e=>{
 if((e.ctrlKey||e.metaKey)&&['KeyS','KeyF','KeyH','KeyP','KeyO','KeyG','KeyD','KeyU','KeyJ','KeyY','KeyN','KeyE','KeyK','KeyL','KeyR','Equal','Minus','Semicolon','Digit0','NumpadAdd','NumpadSubtract'].includes(e.code))e.preventDefault();
 if(e.key==='F5'||e.key==='F3'||e.key==='F7'||e.key==='F11'||e.key==='F12')e.preventDefault();
 if(KEYH)KEYH(e);});
let KEYH=null;   /* いまのステージのキー処理 */
document.addEventListener('dragstart',e=>{if(!e.target.closest||!e.target.closest('input,textarea'))e.preventDefault();});
