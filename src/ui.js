/* =========================================================
   画面（名前入力・タイトル・ホーム・せってい など）
   ========================================================= */
function winEl(parent,x,y,w,h,title,onClose,cls){const W=pos(el('div','win '+(cls||'openwin'),null,parent),x,y,w,h);
 const bar=el('div','wbar',null,W);const ic=el('img',null,null,bar);ic.src=ASSET.pasota.normal;ic.alt='';
 const t=el('div','wtitle',null,bar);t.textContent=title;
 el('span','wctl',IC.min,bar).setAttribute('aria-hidden','true');el('span','wctl',IC.max,bar).setAttribute('aria-hidden','true');
 const x2=el('button','wctl close',IC.x,bar);x2.setAttribute('aria-label','とじる');
 if(onClose){x2.addEventListener('click',()=>{se('cursor');guarded(onClose);});setBack(onClose);}else x2.classList.add('hide');
 const body=el('div','wbody',null,W);return{W,bar,title:t,body,x:x2};}
function fitText(e,max,min){let f=max;e.style.fontSize=f+'px';while(e.scrollWidth>e.clientWidth+1&&f>min){f--;e.style.fontSize=f+'px';}}

/* ---------- 名前入力 ---------- */
const KANA=[['あいうえお','かきくけこ','さしすせそ','たちつてと','なにぬねの'],['はひふへほ','まみむめも','や　ゆ　よ','らりるれろ','わ　を　ん']];
const DK={'か':'が','き':'ぎ','く':'ぐ','け':'げ','こ':'ご','さ':'ざ','し':'じ','す':'ず','せ':'ぜ','そ':'ぞ','た':'だ','ち':'ぢ','つ':'づ','て':'で','と':'ど','は':'ば','ひ':'び','ふ':'ぶ','へ':'べ','ほ':'ぼ','う':'ゔ'};
const HD={'は':'ぱ','ひ':'ぴ','ふ':'ぷ','へ':'ぺ','ほ':'ぽ'};
const SM={'あ':'ぁ','い':'ぃ','う':'ぅ','え':'ぇ','お':'ぉ','つ':'っ','や':'ゃ','ゆ':'ゅ','よ':'ょ','わ':'ゎ'};
function toKata(s){return s.replace(/[ぁ-ゖ]/g,c=>String.fromCharCode(c.charCodeAt(0)+0x60));}
function toHira(s){return s.replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60));}
function flipMap(m,c){for(const k in m){if(m[k]===c)return k;}return null;}

function scrName(s,opt){opt=opt||{};let name=opt.fromSettings?'':'';
 const R=winEl(s.el,40,20,1200,620,'なまえの とうろく',opt.fromSettings?()=>go(scrSettings):null);const B=R.body;
 const P=makePasota(s,B,40,40,300,{still:true});const bub=makeBubble(B,370,40,560,150,'left');bub.el.style.setProperty('--ty','60px');
 let stage='';
 const clear=()=>{B.querySelectorAll('.step').forEach(e=>e.remove());};
 const step=(n)=>{stage=n;clear();
  if(n==='hello'){P.el.classList.remove('hide');bub.el.classList.remove('hide');P.face(opt.fromSettings?'normal':'happy',1800);
   bub.set(opt.fromSettings?'あたらしい なまえを おしえてね。\nどちらで 入力する？':'はじめまして！ ぼくは ぱそた。\nきみの なまえを おしえてね。');
   const r=pos(el('div','abs step',null,B),40,330,1112,150);r.style.display='flex';r.style.gap='40px';r.style.justifyContent='center';
   const mk=(t,sub,m)=>{const b=el('button','btn step',null,r);b.style.cssText+=';width:440px;height:130px;flex-direction:column;gap:6px';
    b.innerHTML='<span style="font-size:30px">'+t+'</span><span style="font-size:17px;font-weight:400">'+sub+'</span>';
    b.addEventListener('click',()=>{se('decide');SAVE.method=m;step(m);});return b;};
   stag([mk('ローマ字入力','キーボードで うつ','roma'),mk('50音ボタン','画面の 文字を クリック','kana')]);
  }
  if(n==='roma'){P.el.classList.remove('hide');bub.el.classList.remove('hide');P.face('normal');bub.set('キーボードで なまえを うってね。\nうてたら「けってい」を クリック。');
   const ip=pos(el('input','inp abs step allowctx',null,B),370,250,560,80);ip.style.fontSize='36px';ip.maxLength=8;ip.value=name;ip.setAttribute('autocomplete','off');ip.setAttribute('aria-label','なまえ');
   const note=pos(el('div','abs step note',null,B),370,342,560);note.textContent='8文字まで。ひらがな・カタカナ・漢字・英字 どれでも OK';
   const ok=pos(el('button','btn y abs step','けってい',B),960,250,190,80);const bk=pos(el('button','btn abs step','もどる',B),960,400,190,60);
   const decide=()=>{const v=ip.value.replace(/^[\s　]+|[\s　]+$/g,'').slice(0,8);if(!v){P.face('trouble',1500);bub.set('なまえを 入れてね。');ip.focus();return;}name=v;se('decide');step('confirm');};
   ok.addEventListener('click',decide);bk.addEventListener('click',()=>{se('cursor');step('hello');});
   ip.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing&&e.keyCode!==229){e.preventDefault();decide();}});
   stag([ip,note,ok,bk]);setTimeout(()=>ip.focus(),450);
  }
  if(n==='kana'){P.el.classList.add('hide');bub.el.classList.add('hide');let kata=false;let cur=Array.from(name);
   const box=pos(el('div','namebox abs step',null,B),40,20,600,72);
   const show=()=>{box.innerHTML='';const t=el('span',null,null,box);t.textContent=cur.join('');el('span','cur',null,box);};
   const grid=pos(el('div','kgrid step',null,B),40,110);grid.style.gridTemplateColumns='repeat(10,64px)';grid.style.gridTemplateRows='repeat(5,64px)';grid.style.gap='8px 6px';
   const tip=pos(el('div','abs step',null,B),40,476,700);tip.style.cssText+=';height:30px;font-size:18px;font-weight:700;color:#d23b3b';
   const rows=()=>{grid.innerHTML='';KANA[0].concat(KANA[1]).forEach((r,ci)=>{Array.from(r).forEach((c,ri)=>{const b=el('button','kbtn'+(c==='　'?' blank':''),null,grid);
     b.style.gridColumn=String(10-ci);b.style.gridRow=String(ri+1);
     b.textContent=kata?toKata(c):c;if(c!=='　')b.addEventListener('click',()=>{se('cursor');if(cur.length>=8){tip.textContent='8文字までだよ';return;}cur.push(kata?toKata(c):c);show();});});});};
   const mb=pos(el('div','mbtns step',null,B),790,110);mb.style.gridTemplateColumns='repeat(2,170px)';mb.style.gap='12px 12px';
   const bH=el('button','btn','ひらがな',mb),bK=el('button','btn','カタカナ',mb);
   const bD=el('button','btn','゛ てんてん',mb),bHD=el('button','btn','゜ まる',mb);
   const bS=el('button','btn','小さい字',mb),bL=el('button','btn','ー',mb);
   const b1=el('button','btn','1もじ けす',mb),b2=el('button','btn','ぜんぶ けす',mb);
   const b3=el('button','btn y','けってい',mb),b4=el('button','btn','入力を えらぶ',mb);
   [bH,bK,bD,bHD,bS,bL,b1,b2,b3,b4].forEach(b=>{b.style.width='170px';b.style.fontSize='18px';});
   const upd=()=>{bH.classList.toggle('y',!kata);bK.classList.toggle('y',kata);rows();};
   bH.addEventListener('click',()=>{se('cursor');kata=false;upd();});bK.addEventListener('click',()=>{se('cursor');kata=true;upd();});
   const mod=(m)=>{if(!cur.length)return;const last=cur[cur.length-1];const isK=/[ァ-ヶ]/.test(last);const h=toHira(last);
    let r=m[h]||flipMap(m,h);if(!r)return;if(isK)r=toKata(r);cur[cur.length-1]=r;se('cursor');show();};
   bD.addEventListener('click',()=>mod(DK));bHD.addEventListener('click',()=>mod(HD));bS.addEventListener('click',()=>mod(SM));
   bL.addEventListener('click',()=>{se('cursor');if(cur.length>=8){tip.textContent='8文字までだよ';return;}cur.push('ー');show();});
   b1.addEventListener('click',()=>{se('cursor');cur.pop();tip.textContent='';show();});
   b2.addEventListener('click',()=>{se('cursor');cur=[];tip.textContent='';show();});
   b3.addEventListener('click',()=>{if(!cur.length){tip.textContent='なまえを 入れてね';return;}name=cur.join('');se('decide');step('confirm');});
   b4.addEventListener('click',()=>{se('cursor');step('hello');});
   const mp=makePasota(s,B,900,432,140,{still:true});mp.el.classList.add('step');
   upd();show();stag([box,grid,mb]);
  }
  if(n==='confirm'){P.el.classList.remove('hide');bub.el.classList.remove('hide');P.face('happy');
   bub.set(name+' さん で いいかな？');
   const r=pos(el('div','abs step',null,B),40,330,1112,150);r.style.cssText+=';display:flex;gap:40px;justify-content:center';
   const y=el('button','btn y',null,r),no=el('button','btn',null,r);y.textContent='はい';no.textContent='なおす';
   [y,no].forEach(b=>{b.style.width='300px';b.style.height='90px';b.style.fontSize='30px';});
   y.addEventListener('click',()=>{SAVE.name=name;store();se('chime');P.face('happy');lockFor(900);
     setTimeout(()=>{if(opt.fromSettings)go(scrSettings);else go(scrTitle);},700);});
   no.addEventListener('click',()=>{se('cursor');step(SAVE.method==='kana'?'kana':'roma');});
   stag([y,no]);}
  lockFor(600);};
 step('hello');}

/* ---------- タイトル ---------- */
function scrTitle(s){const lg=el('div','logo',null,s.el);
 lg.innerHTML='<div class="l1">小学校</div><div class="l2">パソコンスキルマスター</div><div class="l3">トラックパッドと キーボードの 名人を めざそう</div><div class="l4">ひだりうえの「はじめる」の アイコンを<br>ダブルクリック（2かい クリック）してね！</div>';
 stag(Array.from(lg.children));
 const ic=el('button','dicon popin',null,s.el);ic.setAttribute('aria-label','はじめる');const im=el('img',null,null,ic);im.src=ASSET.pasota.normal;im.alt='';el('span','lbl','はじめる',ic);
 let hint=null,ht=null,face='normal';
 s.every(8000,()=>{if(face!=='normal')return;im.src=ASSET.pasota.blink;s.after(160,()=>{im.src=ASSET.pasota.normal;});});
 s.on(ic,'click',e=>{clearTimeout(ht);ic.classList.add('sel');if(hint){hint.remove();hint=null;}if(e.detail>=2)return;
   ht=s.after(2000,()=>{if(!hint){hint=el('div','ibub',null,s.el);hint.textContent='ぼくを ダブルクリック\n（２かい クリック）してね';}});});
 s.on(ic,'dblclick',()=>{clearTimeout(ht);if(hint){hint.remove();hint=null;}se('decide');if(SAVE.susp){resumeAsk();return;}face='happy';im.src=ASSET.pasota.happy;go(scrHome);});
 s.on(s.el,'pointerdown',e=>{if(!ic.contains(e.target)){ic.classList.remove('sel');}});}

/* ---------- しけんの ちゅうだん ---------- */
function resumeAsk(){const G=GR[SAVE.susp.g];
 ask(G.label+'の しけんの とちゅうだよ。\nつづきから やりなおす？','つづきから やる','やりなおさない',ok=>{
  if(ok){const S2=SAVE.susp;const list=S2.list.map(x=>({st:stageById(x.id),v:x.v}));go(scrPlay,{mode:'exam',g:S2.g,list:list,resume:S2});return;}
  ask(G.label+'の しけんの「とちゅう」だけ なくなるよ。\nれんしゅうの クリアや にんていしょうは そのまま のこるから だいじょうぶ。\nこの しけんは、また さいしょから うけられるよ。','いい（ホームへ）','よくない',ok2=>{
   if(ok2){SAVE.susp=null;store();go(scrHome);}else resumeAsk();},'normal');},'cheer');}

/* ---------- ホーム ---------- */
function scrHome(s){
 const hello=pos(el('div','hello enter',null,s.el),852,52,412);hello.textContent=SAVE.name+' さん、きょうも がんばろう';
 const bub=makeBubble(s.el,856,96,400,180,'down enter');bub.el.style.setProperty('--i',2);
 const P=makePasota(s,s.el,898,316,300,{onClick:(p)=>{bub.set(nextTip());p.face('happy',1600);}});P.el.classList.add('enter');P.el.style.setProperty('--i',3);
 bub.set(SAVE.susp?GR[SAVE.susp.g].label+'の しけんを ちゅうだん しているよ。|つづきは タイトルの「はじめる」から できるよ。':nextTip());
 const R=winEl(s.el,24,24,800,616,'小学校パソコンスキルマスター',()=>go(scrTitle));
 const cards=el('div','cards',null,R.body);const list=[3,2,1];if(masterOpen())list.push('m');
 const cs=list.map(g=>{const G=GR[g],c=el('div','card',null,cards);
  el('div','badge '+G.cls+(g==='m'?' bm':''),g==='m'?'マスター':G.label,c);
  const inf=el('div','info',null,c);el('div','cname',G.label+'　<span class="csub">'+G.sub+'</span>',inf);
  const cl=clearedCount(g),tt=totalOf(g);
  el('div','barrow','<span class="barlbl">れんしゅう '+cl+'/'+tt+'</span><div class="gauge"><div class="fill" style="width:'+Math.round(cl/tt*100)+'%"></div></div>',inf);
  const st=examState(g);const pv=prevG(g);
  const chip=st==='ok'?['c-ok','合格']:st==='ready'?['c-ready','しけんを うけられるよ']:st==='lock'?['c-lock',GR[pv].label+'に 合格すると しけん']:['c-wait','あと'+(tt-cl)+'ステージで しけん'];
  el('div','chip '+chip[0],chip[1],inf);
  const bs=el('div','cbtns',null,c);const bp=el('button','btn','れんしゅう',bs);const be=el('button','btn '+(canExam(g)?'y':'lockb'),'しけん',bs);
  if(SAVE.susp){bp.className='btn lockb';be.className='btn lockb';}
  bp.addEventListener('click',()=>{if(SAVE.susp){P.jump();bub.set(GR[SAVE.susp.g].label+'の しけんを ちゅうだん しているよ。|つづきは タイトルの「はじめる」から できるよ。');return;}se('decide');go(scrSelect,g,0);});
  be.addEventListener('click',()=>{if(SAVE.susp){P.jump();bub.set(GR[SAVE.susp.g].label+'の しけんを ちゅうだん しているよ。|つづきは タイトルの「はじめる」から できるよ。');return;}if(!canExam(g)){P.face('normal');bub.set(st==='lock'?'さきに '+GR[pv].label+'の しけんに|合格しようね。':'れんしゅうを ぜんぶ クリアすると|しけんを うけられるよ。あと '+(tt-cl)+'ステージ！');P.jump();return;}se('decide');go(scrExamIntro,g);});
  return c;});
 stag(cs);s.after(10,()=>fitText(hello,22,15));}

/* ---------- ステージえらび ---------- */
const SEL_ICON={};
function scrSelect(s,g,page){const G=GR[g];
 const R=winEl(s.el,16,12,1248,636,'れんしゅう　'+G.label,()=>go(scrHome));const B=R.body;
 const tabs=el('div','tabs',null,B);const gl=[3,2,1];if(masterOpen())gl.push('m');
 gl.forEach(x=>{const t=el('button','tab'+(x===g?' on':''),'<span class="dot '+GR[x].cls+'"></span>'+GR[x].label,tabs);t.addEventListener('click',()=>{if(x===g)return;se('cursor');go(scrSelect,x,0);});});
 const body=pos(el('div','abs',null,B),0,64,1240,510);body.style.borderTop='4px solid #10264d';body.style.background='#f7faff';
 if(g!=='m'){const grid=el('div','sgrid',null,body);grid.style.top='26px';
  const items=stagesOf(g).map((st,i)=>{const b=el('button','sbtn'+(SAVE.clear[st.id]?' done':''),null,grid);
   el('div','sno',String(i+1),b);el('div','sic',st.icon||'',b);el('div','snm',st.title,b);if(SAVE.clear[st.id])el('div','clr',IC.check,b);
   b.addEventListener('click',()=>{se('decide');go(scrPlay,{mode:'prac',g:g,list:[{st:st,v:'p'}]});});return b;});
  stag(items);}
 else{const all=[];[3,2,1].forEach(x=>stagesOf(x).forEach(st=>all.push(st)));
  const VH=500,PITCH=88;const vp=pos(el('div','abs',null,body),0,0,1240,VH);vp.style.overflow='hidden';vp.dataset.clip='1';
  const C=pos(el('div','abs',null,vp),0,0,1240,20+all.length*PITCH);
  all.forEach((st,i)=>{const r=el('div','mrow',null,C);r.style.top=(20+i*PITCH)+'px';r.style.width='1164px';
   el('div','badge '+GR[st.g].cls,GR[st.g].label,r).style.cssText='width:56px;height:56px;font-size:17px;-webkit-text-stroke:4px #10264d';
   el('div','mn',st.title,r);
   [0,1,2].forEach(v=>{const k=st.id+':'+v,b=el('button','btn sm'+(SAVE.mclear[k]?' done':''),(SAVE.mclear[k]?IC.check.replace('viewBox','width="26" height="26" viewBox'):'')+'もんだい '+(v+1),r);
    b.addEventListener('click',()=>{se('decide');go(scrPlay,{mode:'mprac',g:'m',page:off,list:[{st:st,v:v}]});});});});
  const trk=pos(el('div','mtrk',null,body),1206,12,22,VH-24),th=el('div','mthm',null,trk);
  let off=Math.max(0,page||0);const max=20+all.length*PITCH+12-VH;const TH=Math.max(60,(VH-24)*VH/(VH+max));th.style.height=TH+'px';
  const upd=()=>{off=Math.max(0,Math.min(max,off));C.style.transform='translateY('+(-off)+'px)';th.style.top=(off/max*(VH-24-TH))+'px';};upd();
  s.on(vp,'wheel',e=>{e.preventDefault();if(e.ctrlKey)return;off+=e.deltaY*(e.deltaMode===1?32:1);upd();},{passive:false});
  let dg=null;s.on(th,'pointerdown',e=>{e.preventDefault();try{th.setPointerCapture(e.pointerId);}catch(_){}dg={y:e.clientY,o:off};});
  s.on(th,'pointermove',e=>{if(!dg)return;off=dg.o+(e.clientY-dg.y)/S*max/(VH-24-TH);upd();});
  s.on(th,'pointerup',()=>{dg=null;});
  stag([vp]);}}

/* ---------- しけんの前 ---------- */
function scrExamIntro(s,g){const G=GR[g];const n=g==='m'?stagesOf(3).length+stagesOf(2).length+stagesOf(1).length*2:stagesOf(g).length;
 const R=winEl(s.el,150,24,980,616,G.label+'　しけん',()=>go(scrHome));const B=R.body;
 const P=makePasota(s,B,40,70,300,{still:true});P.face('cheer');
 el('div','abs h2',G.label+' の しけん',B).style.cssText+=';left:380px;top:34px;font-size:34px';
 const L=pos(el('div','abs',null,B),380,104,550,300);L.style.cssText+=';display:flex;flex-direction:column;gap:14px';
 const lines=['もんだいは '+n+'もん。'+(g==='m'?'ぜんぶ せいかいで 合格！':'さいごまで いけたら 合格！'),'ハートが 3つ。ミスすると 1つ へるよ。|0に なったら そこで おわり。','やり方の せつめいや ヒントは 見られないよ。','ショートカットキーで できる そうさは、キーだけで やろう。'];
 const ls=lines.map((t,i)=>{const d=el('div',null,null,L);d.style.cssText='display:flex;gap:12px;font-size:20px;line-height:1.5;word-break:keep-all';
  d.innerHTML='<b style="flex:none;width:34px;height:34px;border-radius:50%;background:#2a63c9;color:#fff;display:flex;align-items:center;justify-content:center">'+(i+1)+'</b><span>'+t.replace('|','<br>')+'</span>';return d;});
 const hr=pos(el('div','abs hearts',IC.heart+IC.heart+IC.heart,B),40,350);
 const bs=pos(el('button','btn y abs','はじめる',B),380,440,260,64),bb=pos(el('button','btn abs','もどる',B),670,440,260,64);bs.style.fontSize=bb.style.fontSize='24px';
 bs.addEventListener('click',()=>{se('decide');startExam(g);});bb.addEventListener('click',()=>{se('cursor');go(scrHome);});
 stag(ls.concat([hr,bs,bb]));}
function startExam(g){let list;
 if(g==='m'){list=[];STAGES.forEach(st=>{const vs=shuffle([0,1,2]).slice(0,st.g===1?2:1);vs.forEach(v=>list.push({st:st,v:v}));});shuffle(list);}
 else list=stagesOf(g).map(st=>({st:st,v:Math.random()*3|0}));
 go(scrPlay,{mode:'exam',g:g,list:list});}

/* ---------- けっか ---------- */
function scrResult(s,r){const G=GR[r.g];
 const R=winEl(s.el,150,24,980,616,G.label+'　しけんの けっか',null);const B=R.body;setBack(()=>go(scrHome));
 const P=makePasota(s,B,50,90,300,{still:true});
 const big=pos(el('div','abs',null,B),380,60,560,90);big.style.cssText+=';font-size:46px;font-weight:700;display:flex;align-items:center';big.textContent='けっか はっぴょう…';
 se('drum');lockFor(2200);
 s.after(1900,()=>{
  if(r.pass){P.face('happy');big.innerHTML='<span class="outline" style="color:#36c96f;-webkit-text-stroke:8px #10264d">ごうかく！</span>';big.classList.add('popin');se('clap');s.after(300,()=>se('cheer'));confetti();
   const d=pos(el('div','abs',null,B),380,170,560,140);d.style.cssText+=';font-size:22px;line-height:1.8';
   d.innerHTML='おめでとう！ '+esc(SAVE.name)+' さんは<br>'+G.label+'に 合格したよ。<br>ミス '+r.miss+'かい　タイム '+fmtTime(r.time);
   const b1=pos(el('button','btn y abs','にんていしょうを 見る',B),380,420,300,64),b2=pos(el('button','btn abs','ホームへ',B),700,420,240,64);
   b1.addEventListener('click',()=>{se('decide');showCert(SAVE.certs[SAVE.certs.length-1]);});b2.addEventListener('click',()=>{se('cursor');go(scrHome);});
   stag([d,b1,b2]);s.after(1400,()=>{if(SCR===s&&!OV)showCert(SAVE.certs[SAVE.certs.length-1]);});}
  else{P.face('trouble');seFail();big.textContent='ざんねん…';big.classList.add('popin');
   const d=pos(el('div','abs',null,B),380,150,560,60);d.style.cssText+=';font-size:20px;line-height:1.5;word-break:keep-all';d.textContent='ミスが おおかった ステージを れんしゅうしてから、また ちょうせんしよう！';
   const ks=Object.keys(r.missBy).sort((a,b)=>r.missBy[b]-r.missBy[a]).slice(0,3);
   const rows=ks.map((id,i)=>{const st=stageById(id);const row=pos(el('div','abs',null,B),380,226+i*68,560,58);row.style.cssText+=';display:flex;align-items:center;gap:12px;background:#fff;border:3px solid #10264d;border-radius:14px;padding:0 8px 0 16px';
    const nm=el('div',null,null,row);nm.style.cssText='flex:1;font-size:20px;line-height:1.9;font-weight:700;white-space:nowrap;overflow:hidden';nm.textContent=st.title+'（ミス '+r.missBy[id]+'）';
    const b=el('button','btn sm','このステージを れんしゅう',row);b.style.width='250px';b.addEventListener('click',()=>{se('decide');go(scrPlay,{mode:'prac',g:st.g,list:[{st:st,v:'p'}]});});return row;});
   const b2=pos(el('button','btn y abs','もういちど しけん',B),380,450,270,60),b3=pos(el('button','btn abs','ホームへ',B),670,450,270,60);
   b2.addEventListener('click',()=>{se('decide');go(scrExamIntro,r.g);});b3.addEventListener('click',()=>{se('cursor');go(scrHome);});
   stag([d].concat(rows,[b2,b3]));}
  updTask();});}

/* ---------- 認定証 ---------- */
function showCert(c,onClose){const o=overlay();se('chime');const G=GR[c.g];
 const C=el('div','cert '+G.cert+' popin',null,o);const p=el('div','paper',null,C);el('div','in2',null,p);
 el('div','cs','小学校パソコンスキルマスター',p);
 el('div','ct',(c.g===3?'３きゅう':G.label)+'　'+(c.g===3?'にんていしょう':'認定証'),p);
 const nm=el('div','cn',null,p);nm.textContent=(c.name||SAVE.name)+' さん';
 const body=el('div','cb',null,p);
 body.textContent=c.g===3?'小学校パソコンスキルマスター ３きゅうに ごうかくしたことを ここに みとめます。':'小学校パソコンスキルマスター '+G.label+'に 合格したことを ここに みとめます。';
 const cl=el('div','cl',null,p);
 if(c.g==='m'){const d=el('div',null,IC.check+'<span>3級・2級・1級の そうさ ぜんぶ（'+STAGES.length+'こ）</span>',cl);d.style.gridColumn='1 / 3';}
 else stagesOf(c.g).forEach(st=>{el('div',null,IC.check+'<span>'+st.title+'</span>',cl);});
 el('div','cd',(c.g===3?'ごうかくした日':'合格日')+'：'+jdate(c.date)+'<br>きろく：ミス '+c.miss+'かい　タイム '+fmtTime(c.time),p);
 const im=el('img','cp',null,p);im.src=ASSET.pasota.happy;im.alt='';
 el('div','ci','はっこう：ぱそた',p);
 const b=pos(el('button','btn y abs','とじる',o),540,650,200,56);
 b.addEventListener('click',()=>{se('cursor');closeOverlay();if(onClose)onClose();});
 lockFor(500);}

/* ---------- せってい ---------- */
function scrSettings(s){const R=winEl(s.el,16,12,1248,636,'せってい',()=>go(scrHome));const B=R.body;const rows=[];
 const row=(y,k)=>{const r=el('div','srow2',null,B);r.style.top=y+'px';el('div','k',k,r);rows.push(r);return r;};
 const r1=row(24,'なまえ');el('div','v',null,r1).textContent=SAVE.name+' さん';el('button','btn','かえる',r1).addEventListener('click',()=>{se('decide');go(scrName,{fromSettings:true});});
 const r2=row(112,'おと');const v2=el('div','v',null,r2);v2.textContent='教室で いっせいに 鳴るときは オフに';v2.style.cssText+=';font-size:17px;color:#4d6290';
 const on=el('button','btn','オン',r2),off=el('button','btn','オフ',r2);const su=()=>{on.classList.toggle('y',SAVE.sound);off.classList.toggle('y',!SAVE.sound);};su();
 on.addEventListener('click',()=>{SAVE.sound=true;store();su();se('decide');});off.addEventListener('click',()=>{SAVE.sound=false;store();su();});
 const r3=row(200,'にんていしょう');el('div','v',null,r3).textContent=SAVE.certs.length+'まい';el('button','btn','見る',r3).addEventListener('click',()=>{se('decide');go(scrCerts,0);});
 const r4=row(288,'先生へ');const v4=el('div','v',null,r4);v4.textContent='計画表との たいおう・トラックパッドの せってい';v4.style.cssText+=';font-size:17px;color:#4d6290';
 el('button','btn','ひらく',r4).addEventListener('click',()=>{se('decide');go(scrTeacher,0);});
 const r5=row(376,'きろくを ぜんぶ けす');el('div','v',null,r5);
 el('button','btn r','けす',r5).addEventListener('click',()=>{ask('ぜんぶの きろくを けして いい？\n（なまえ・れんしゅう・にんていしょう）','けす','やめる',ok=>{if(!ok)return;
   ask('ほんとうに けすよ？\nもとに もどせないよ。','けす','やめる',ok2=>{if(!ok2)return;SAVE=defSave();store();tipFirstShown=false;go(scrName);});});});
 const ft=pos(el('div','abs',null,B),900,524,320);ft.style.cssText+=';text-align:right;font-size:14px;color:#4d6290;cursor:default';ft.textContent='作った人：K.nom';
 let dbg=0;ft.addEventListener('click',()=>{dbg++;if(dbg<20)return;dbg=0;
  STAGES.forEach(st=>{SAVE.clear[st.id]=true;[0,1,2].forEach(v=>{SAVE.mclear[st.id+':'+v]=true;});});
  [3,2,1,'m'].forEach(g=>{if(!passed(g))SAVE.certs.push({g:g,date:today(),miss:0,time:0,name:SAVE.name});});SAVE.susp=null;store();updTask();se('finish');
  ask('デバッグモード：\nぜんぶの 級を 合格に して、ぜんぶ ひらいたよ。','OK','とじる',()=>go(scrSettings),'happy');});
 stag(rows);}

function scrCerts(s,page){const R=winEl(s.el,16,12,1248,636,'にんていしょう',()=>go(scrSettings));const B=R.body;
 const L=SAVE.certs.map((c,i)=>({c,i})).reverse();const per=10,np=Math.max(1,Math.ceil(L.length/per));page=Math.max(0,Math.min(np-1,page||0));
 const t=pos(el('div','abs h2',null,B),24,22,800);t.textContent='これまでの にんていしょう（'+L.length+'まい）';
 if(!L.length){const m=pos(el('div','abs',null,B),24,120,900);m.style.fontSize='22px';m.textContent='まだ にんていしょうは ないよ。しけんに 合格すると もらえるよ。';stag([t,m]);return;}
 const g=el('div','clist',null,B);const items=L.slice(page*per,page*per+per).map(o=>{const G=GR[o.c.g];const b=el('button','cbtn',null,g);
  el('div','badge '+G.cls,o.c.g==='m'?'マスター':G.label,b);el('div','cdt',jdate(o.c.date),b);b.addEventListener('click',()=>{se('decide');showCert(o.c);});return b;});
 const pg=el('div','pager',null,B);pos(pg,380,500);
 const bp=el('button','btn sm','まえへ',pg),pn=el('div','pn',(page+1)+' / '+np,pg),bn=el('button','btn sm','つぎへ',pg);
 if(page===0)bp.disabled=true;if(page>=np-1)bn.disabled=true;
 bp.addEventListener('click',()=>{se('cursor');go(scrCerts,page-1);});bn.addEventListener('click',()=>{se('cursor');go(scrCerts,page+1);});
 stag([t].concat(items,[pg]));}

/* ---------- 先生へ ---------- */
function teacherPages(){const tb=g=>'<table><tr><th style="width:60px">No.</th><th style="width:260px">ステージ（技能）</th><th>れんしゅうの内容</th></tr>'+
  stagesOf(g).map((st,i)=>'<tr><td>'+(i+1)+'</td><td>'+st.title+'</td><td>'+(st.desc||'')+'</td></tr>').join('')+'</table>';
 return[
 '<h3>このアプリについて</h3><ul><li>勤務校の「情報活用能力の計画（基本的操作）」にある操作を、どのアプリにも共通する形で練習します。</li><li>STEP1（1・2年）＝3級、STEP2（3・4年）＝2級、STEP3（5・6年）＝1級。学年はめやすで、どの級の練習もできます。</li><li>試験はその級の練習をすべてクリアすると受けられます（飛び級なし）。各技能3パターンからランダムに出題し、ハート3つ（ミス2回まで）で合格です。</li><li>1級に合格すると「マスター」が出現します。練習では全81問を選べます。試験は3級・2級の各技能から1問、1級の各技能から2問（計35問）をランダムに出題します。</li><li>タスクバー右はしの小さな文字は進行度です（クリア数/練習数、合格した級にメダル）。</li></ul>',
 '<h3>計画表との対応　3級（STEP1・1〜2年めやす）</h3>'+tb(3),
 '<h3>計画表との対応　2級（STEP2・3〜4年めやす）</h3>'+tb(2),
 '<h3>計画表との対応　1級（STEP3・5〜6年めやす）</h3>'+tb(1),
 '<h3>トラックパッドの設定（Windows 11）</h3><ul><li>「設定」→「Bluetooth とデバイス」→「タッチパッド」を開きます。</li><li>「タップ」で次をオンにします：「1本の指でタップしてシングルクリック」「2本の指でタップして右クリック」「2回タップしてドラッグで複数選択」「タッチパッドの右下を押して右クリック」。</li><li>「スクロールとズーム」で「2本の指をドラッグしてスクロール」「ピンチでズーム」をオンにします。</li><li>ズームのステージは、2本指のピンチ（ブラウザには Ctrl＋ホイールとして届きます）で拡大します。Edge 自体の拡大（ページのズーム）はアプリ内で止めています。</li><li>端末によって名前が少しちがうことがあります。</li></ul>',
 '<h3>記録の保存とリセット</h3><ul><li>記録はこの端末の Edge の中（localStorage）にだけ保存されます。サーバーには送りません。</li><li>Edge の閲覧データを消すと、記録も消えます。</li><li>次の年の子に端末をわたすときは、「せってい」→「きろくを ぜんぶ けす」で消せます（2回確認があります）。</li><li>試験の途中でやめた場合、その回の記録は残りません。合格するたびに認定証が1枚ふえ、「せってい」→「にんていしょう」で見返せます。</li><li>このファイル1つ（index.html）で動きます。画像・音もファイルの中に入っています。</li></ul>'];}
function scrTeacher(s,page){const P=teacherPages();page=Math.max(0,Math.min(P.length-1,page||0));
 const R=winEl(s.el,16,12,1248,636,'先生へ',()=>go(scrSettings));const B=R.body;
 const tp=el('div','tpage',P[page],B);
 const pg=el('div','pager',null,B);pos(pg,380,506);
 const bp=el('button','btn sm','まえへ',pg),pn=el('div','pn',(page+1)+' / '+P.length,pg),bn=el('button','btn sm','つぎへ',pg);
 if(page===0)bp.disabled=true;if(page>=P.length-1)bn.disabled=true;
 bp.addEventListener('click',()=>{se('cursor');go(scrTeacher,page-1);});bn.addEventListener('click',()=>{se('cursor');go(scrTeacher,page+1);});
 stag([tp,pg]);}
