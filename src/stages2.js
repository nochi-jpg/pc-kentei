/* =========================================================
   2級（3・4年）
   ========================================================= */
/* 入力らんの まもり（うつのを ふせぐ・けすのを しらべる） */
function guardInput(a,ip,o){let last=ip.value,comp=false;
 a.on(ip,'beforeinput',e=>{const t=e.inputType||'';
  if(t==='insertFromPaste'||t==='deleteByCut'||t==='insertFromDrop'){if(t==='insertFromDrop')e.preventDefault();return;}
  if(t==='historyUndo'||t==='historyRedo'){e.preventDefault();return;}
  if(t.startsWith('insertComposition'))return;
  if(t.startsWith('insert')){if(o.space&&e.data&&/^[\s　]+$/.test(e.data))return;e.preventDefault();if(o.typed)o.typed();return;}
  if(t.startsWith('delete')){const s=ip.selectionStart,en=ip.selectionEnd;let rem;
   if(s!==en)rem=ip.value.slice(s,en);else if(t.indexOf('Backward')>=0)rem=ip.value.slice(Math.max(0,s-1),s);else rem=ip.value.slice(s,s+1);
   if(/[^\s　]/.test(rem)){if(!o.del||!o.del(rem))e.preventDefault();}}});
 a.on(ip,'compositionstart',()=>{comp=true;});
 a.on(ip,'compositionend',()=>{comp=false;setTimeout(()=>{ip.value=last;if(o.typed)o.typed();},0);});
 a.on(ip,'cut',()=>{if(o.cut)o.cut(ip.value.slice(ip.selectionStart,ip.selectionEnd));});
 a.on(ip,'paste',e=>{if(o.paste)o.paste(e);});
 a.on(ip,'drop',e=>e.preventDefault());
 a.on(ip,'input',e=>{if(comp)return;last=ip.value;if(o.change)o.change(e);});
 return{set(v){ip.value=v;last=v;}};}
function words(s){return nsp(s.replace(/　/g,' ')).split(' ').filter(Boolean);}

/* 11 文字入力 */
STAGES.push({id:'input',g:2,title:'文字入力',icon:ICO.input,desc:'ひらがな・カタカナ・数字・英字を「半角/全角」キーで切りかえて入力する。',
 how:{keys:[['半角/全角','きりかえ'],['Shift','A','大文字'],['スペース','へんかん'],['Enter','かくてい']],cap:'キーボード',lines:['「半角/全角」キーで 日本語と 英数字を きりかえる','ひらがなは ローマ字で うって Enter で かくてい','カタカナは スペースで へんかん。大文字は Shift']},
 build(a,v){const Q=v==='p'?[['がっこう','k'],['2026','n'],['abc','a']]:v===0?[['さんすう 25ページ','m']]:v===1?[['サッカー','c'],['コンピューター','c']]:[['ABC','a'],['Tokyo','a']];
  a.task(v==='p'?'お題と 同じに なるように 入力しよう':'お題と 同じに 入力して「けってい」を おそう');
  let n=0;a.prog(0,Q.length);const rows=[],marks=[],ok=[];const y0=v==='p'?24:60;
  Q.forEach((q,i)=>{const r=pos(el('div','abs',null,a.area),120,y0+i*112,980,70);r.style.cssText+=';display:flex;align-items:center;gap:24px';
   const qb=el('div','qbox',null,r);qb.textContent=q[0];qb.style.width='340px';el('div','lbl','→',r);
   const ip=el('input','inp'+(a.exam?'':' allowctx'),null,r);ip.style.width='400px';ip.setAttribute('autocomplete','off');ip.setAttribute('spellcheck','false');ip.setAttribute('aria-label','お題 '+(i+1));
   const mk=el('div','mark','まだ',r);rows.push(ip);marks.push(mk);ok.push(false);
   const norm=s=>s.replace(/　/g,' ').replace(/\s+/g,' ').trim();
   if(v==='p'){let comp=false;const chk=()=>{if(ok[i]||comp)return;const val=ip.value;
     if(val===q[0]){ok[i]=true;mk.textContent='OK';mk.classList.add('ok');ip.readOnly=true;n++;a.prog(n,Q.length);if(n>=Q.length)a.done();else{a.good('OK！ つぎへ');rows[i+1].focus();}return;}
     if(/[０-９Ａ-Ｚａ-ｚ]/.test(val)){a.info('全角に なっているよ。「半角/全角」キーで きりかえよう');return;}
     if(q[1]==='k'&&/[a-z]/i.test(val)&&val.length>=3){a.info('ローマ字の ままだよ。「半角/全角」キーで「あ」に しよう');return;}
     if(q[1]!=='k'&&/[ぁ-ん]/.test(val)){a.info('ひらがなに なったよ。「半角/全角」キーで「A」に しよう');return;}
     if(q[1]==='k'&&/[一-龠ァ-ヶ]/.test(val))a.info('へんかん しないで、ひらがなの まま Enter');};
    a.on(ip,'compositionstart',()=>{comp=true;});a.on(ip,'compositionend',()=>{comp=false;setTimeout(chk,0);});a.on(ip,'input',chk);}
   else a.on(ip,'input',()=>{mk.textContent=ip.value?'入力中':'まだ';mk.classList.remove('ok');});
   ip._norm=norm;});
  if(v!=='p'){const b=pos(el('button','btn y abs','けってい',a.area),540,y0+Q.length*112+10,400,56);
   a.on(b,'click',()=>{if(rows.some(r=>!r.value.trim())){a.info('ぜんぶ 入力しよう');return;}
    const bad=Q.findIndex((q,i)=>rows[i]._norm(rows[i].value)!==q[0]);
    if(bad>=0){a.miss('お題と ちがう ところが あるよ');return;}Q.forEach((q,i)=>{marks[i].textContent='OK';marks[i].classList.add('ok');});a.prog(Q.length,Q.length);a.done();});}
  a.start=()=>rows[0].focus();}});

/* 12 文字をえらぶ */
function selOffsets(box){const sel=getSelection();if(!sel.rangeCount)return null;const r=sel.getRangeAt(0);
 if(!box.contains(r.startContainer)||!box.contains(r.endContainer))return null;const pre=document.createRange();pre.selectNodeContents(box);pre.setEnd(r.startContainer,r.startOffset);
 const s=pre.toString().length;return[s,s+r.toString().length];}
STAGES.push({id:'select',g:2,title:'文字を えらぶ',icon:ICO.select,desc:'文の一部をぴったり選ぶ（Ctrl+A、はじめをクリック→Shiftをおしたまま終わりをクリック、なぞる・Shift+矢印）。',
 how:{keys:[['Ctrl','A','ぜんぶ えらぶ'],['Shift','クリック','ここまで えらぶ'],['Shift','→','1文字ずつ']],cap:'3つの えらびかた',lines:['ぜんぶ えらぶ ときは Ctrl + A','はじめを クリック → Shift を おしたまま おわりを クリック','左下を おしたまま なぞっても えらべる（Shift + ←→ で ちょうせい）']},
 build(a,v){let P;
  if(v==='p')P=[{t:'あしたは えんそくです。',w:'あしたは えんそくです。',m:'光っている 文を ぜんぶ えらぼう（Ctrl + A）'},
   {t:'きょうは こうえんで サッカーを しました。',w:'サッカーを しました',m:'光っている ところを えらぼう（はじめを クリック → Shift を おしたまま おわりを クリック）'},
   {t:'みんなで おおきな こえで うたを うたいました。',w:'おおきな こえで',m:'光っている ところを なぞって えらぼう（Shift + ←→ でも ちょうせい できるよ）'}];
  else if(v===0)P=[{t:'きのう こうえんで あそんだ。',w:'こうえん',m:'「こうえん」だけを えらんで「けってい」を おそう'}];
  else if(v===1)P=[{t:'ぼくは なつ\nやすみに うみへ いきました。',w:'なつ\nやすみ',m:'「なつやすみ」を えらんで「けってい」を おそう（2行に またがっているよ）'}];
  else P=[{t:'きょうは いい てんきです',w:'てんきです',m:'文の さいごの 5文字を えらんで「けってい」を おそう',noglow:1}];
  if(v!=='p')P.forEach(p=>p.noglow=1);
  let k=0;a.prog(0,P.length);let box=null,tgt=null;
  const wrap=pos(el('div','abs',null,a.area),112,70,1000,300);
  const show=()=>{const p=P[k];a.task(p.m);wrap.innerHTML='';const s=p.t.indexOf(p.w);tgt=[s,s+p.w.length];
   box=el('div','sel-box',null,wrap);box.tabIndex=0;box.style.fontSize='34px';
   const t1=document.createTextNode(p.t.slice(0,s));const sp=el('span',p.noglow?'':'glow');sp.textContent=p.w;const t3=document.createTextNode(p.t.slice(s+p.w.length));
   box.appendChild(t1);box.appendChild(sp);box.appendChild(t3);getSelection().removeAllRanges();};
  const exact=()=>{const o=selOffsets(box);return o&&o[0]===tgt[0]&&o[1]===tgt[1];};
  let busy=false;const check=()=>{if(v!=='p'||!a.alive()||busy)return;if(exact()){busy=true;a.later(()=>{busy=false;},720);k++;a.prog(k,P.length);if(k>=P.length){a.done();return;}a.good('ぴったり！ つぎの もんだい');a.later(()=>{show();},700);}};
  a.on(document,'pointerup',()=>setTimeout(check,10));
  a.key(e=>{if(!box)return;
   if(e.ctrlKey&&e.code==='KeyA'){e.preventDefault();const r=document.createRange();r.selectNodeContents(box);const s2=getSelection();s2.removeAllRanges();s2.addRange(r);setTimeout(check,10);return;}
   if(e.shiftKey&&(e.key==='ArrowLeft'||e.key==='ArrowRight')){const s2=getSelection();if(s2.rangeCount&&box.contains(s2.anchorNode)){e.preventDefault();s2.modify('extend',e.key==='ArrowRight'?'forward':'backward','character');setTimeout(check,10);}}});
  if(v!=='p'){const b=pos(el('button','btn y abs','けってい',a.area),462,330,300,60);
   a.on(b,'pointerdown',e=>e.preventDefault());
   a.on(b,'click',()=>{const o=selOffsets(box);if(!o||o[0]===o[1]){a.info('さきに 文字を えらぼう');return;}if(exact()){a.prog(1,1);a.done();}else a.miss('えらんだ ところが ちがうよ');});}
  show();}});

/* 13 コピー＆はりつけ */
STAGES.push({id:'copy',g:2,title:'コピー＆はりつけ',icon:ICO.copy,desc:'文字を選んでコピーし、べつの場所にはりつける（Ctrl+C／Ctrl+V）。',
 how:{keys:[['Ctrl','C','コピー'],['Ctrl','V','はりつけ']],cap:'メニューでも できる（しけんは キーだけ）',lines:['うつしたい 文字を えらぶ（なぞる・Shift + クリック）','Ctrl + C で コピー','はりつけたい らんを クリックして Ctrl + V']},
 build(a,v){const A=a.area;const mkSrc=(y,t)=>{pos(el('div','abs lbl','もとの 文',A),160,y);const s=pos(el('input','inp abs'+(a.exam?'':' allowctx'),null,A),160,y+36,900);s.readOnly=true;s.value=t;s.style.fontSize='26px';return s;};
  const field=(x,y,w,label,after)=>{const r=pos(el('div','abs',null,A),x,y,1000,60);r.style.cssText+=';display:flex;align-items:center;gap:14px';
   if(label){const l=el('div','lbl',label,r);l.style.cssText+=';width:220px;text-align:right';}
   const ip=el('input','inp'+(a.exam?'':' allowctx'),null,r);ip.style.width=w+'px';ip.setAttribute('autocomplete','off');ip.setAttribute('spellcheck','false');
   if(after)el('div','lbl',after,r).style.fontSize='24px';const mk=el('div','mark','まだ',r);return{ip,mk};};
  const typed=()=>a.info('うたないで、コピーと はりつけで やってみよう');
  const hook=(f,want,onok)=>{let pasted=false;const g=guardInput(a,f.ip,{typed:typed,del:()=>true,paste:()=>{pasted=true;},
    change:()=>{if(!pasted)return;pasted=false;const val=f.ip.value.trim();if(val===want){f.ip.readOnly=true;f.mk.textContent='OK';f.mk.classList.add('ok');onok();}
     else{a.miss('はりつけた 文字が ちがうよ。えらびなおそう');g.set('');}}});return g;};
  if(v==='p'){const R=[{s:'あしたは えんそくです',w:'あしたは えんそくです',t:'上の 文を ぜんぶ コピーして、下に はりつけよう'},{s:'あめの あとに にじが でた',w:'にじ',t:'上の 文から「にじ」だけを コピーして、下に はりつけよう'}];
   let ri=0;a.prog(0,2);const src=mkSrc(20,'');pos(el('div','abs lbl','↓ コピーして、ここに はりつける',A),160,136);let f=null;
   const setR=()=>{if(f)f.ip.parentNode.remove();src.value=R[ri].s;a.task(R[ri].t);f=field(160,176,900,null);
    hook(f,R[ri].w,()=>{ri++;a.prog(ri,2);if(ri>=2)a.done();else{a.good('できた！ つぎの もんだい');a.later(setR,900);}});};setR();return;}
  if(v===0){a.prog(0,1);a.task('上の 文から ことばを コピーして、下の（　）に はりつけよう');const src=mkSrc(20,'きょう、こうえんで たんぽぽを 見つけました。');
   pos(el('div','abs lbl','あなあきの 文',A),160,150);const f=field(100,190,240,'（','）の わた毛が とんでいきました。');f.ip.parentNode.firstChild.style.width='40px';f.ip.parentNode.style.left='120px';
   hook(f,'たんぽぽ',()=>{a.prog(1,1);a.done();});void src;}
  if(v===1){a.prog(0,3);a.task('「ありがとう」を 1かい コピーして、3つの らんに はりつけよう');mkSrc(20,'みんな、いつも ありがとう！');
   let n=0;['せんせいへ','ともだちへ','おうちの 人へ'].forEach((l,i)=>{const f=field(40,140+i*90,300,l,'の きもち');hook(f,'ありがとう',()=>{n++;a.prog(n,3);if(n>=3)a.done();else a.good('はれた！');});});}
  if(v===2){a.prog(0,2);a.task('2つの ことばを コピーして、それぞれ あう らんに はりつけよう');mkSrc(20,'あかい りんごと きいろい バナナを かいました。');
   let n=0;[['あかい くだもの','りんご'],['きいろい くだもの','バナナ']].forEach((p,i)=>{const f=field(40,150+i*100,300,p[0]);hook(f,p[1],()=>{n++;a.prog(n,2);if(n>=2)a.done();else a.good('はれた！');});});}
 }});

/* 14 切り取り＆はりつけ */
STAGES.push({id:'cut',g:2,title:'切り取り＆はりつけ',icon:ICO.cut,desc:'文字を切り取って、べつの場所へ動かす（Ctrl+X／Ctrl+V）。',
 how:{keys:[['Ctrl','X','切り取り'],['Ctrl','V','はりつけ']],cap:'メニューでも できる（しけんは キーだけ）',lines:['うごかしたい 文字を えらぶ','Ctrl + X で 切り取り（もとの ばしょから きえる）','うつしたい ばしょを クリックして Ctrl + V']},
 build(a,v){const A=a.area;
  const box=(y,label,val)=>{pos(el('div','abs lbl',label,A),160,y);const ip=pos(el('input','inp abs'+(a.exam?'':' allowctx'),null,A),160,y+36,900);ip.style.fontSize='26px';ip.value=val;ip.setAttribute('autocomplete','off');ip.setAttribute('spellcheck','false');return ip;};
  const typed=()=>a.info('うたないで、切り取りと はりつけで やってみよう');
  const del=()=>{if(a.exam){a.miss('Delete で けすのでは なく、切り取りを つかおう');return false;}a.info('Delete で けすのでは なく、切り取りを つかおう');return false;};
  if(v===2){a.prog(0,1);a.task('「きのう」を 文の はじめに うつして、文を なおそう');
   const T='わたしは　きのう　こうえんへ　いきました。',EX='きのうわたしはこうえんへいきました。';const ip=box(120,'文',T);let cut=false;
   const g=guardInput(a,ip,{space:1,typed:typed,del:del,cut:()=>{cut=true;},change:()=>{const n2=nosp(ip.value);
     if(n2===EX){a.prog(1,1);a.done();return;}if(n2.length===nosp(T).length&&n2!==nosp(T)){a.miss('ちがう ばしょに うごいたよ');if(!a.exam)g.set(T);}}});return;}
  const R=v==='p'?[{a:'とりの なかま',av:'すずめ　いぬ　からす',b:'けものの なかま',bv:'ねこ　',w:['いぬ']},{a:'やさいの なかま',av:'にんじん　りんご　キャベツ',b:'くだものの なかま',bv:'みかん　',w:['りんご']}]
   :v===0?[{a:'とりの なかま',av:'すずめ　からす　いぬ　はと',b:'けものの なかま',bv:'ねこ　うま　',w:['いぬ']}]
   :[{a:'やさいの なかま',av:'にんじん　りんご　キャベツ　みかん',b:'くだものの なかま',bv:'バナナ　',w:['りんご','みかん']}];
  let ri=0;a.prog(0,R.length);
  const A1=box(20,'',''),B1=box(170,'','');const la=A.querySelectorAll('.lbl')[0],lb=A.querySelectorAll('.lbl')[1];
  let gA,gB;
  const setR=()=>{const r=R[ri];la.textContent=r.a;lb.textContent=r.b;gA.set(r.av);gB.set(r.bv);
   a.task(v==='p'?'「'+r.w[0]+'」は なかまが ちがうよ。切り取って「'+r.b+'」へ うつそう':v===0?'なかまはずれの ことばを 見つけて、あう グループへ うつそう':'「'+r.a+'」に まざっている くだものを 2つ、「'+r.b+'」へ うつそう');};
  const check=()=>{const r=R[ri];const av=A1.value,bv=B1.value,oa=words(r.av),ob=words(r.bv);
   const rest=(t,list)=>{let x=t;list.slice().sort((p,q)=>q.length-p.length).forEach(w=>{x=x.split(w).join('');});return x.replace(/[\s　]/g,'');};
   const known=oa.concat(ob);
   const bad=oa.some(w=>!r.w.includes(w)&&(!av.includes(w)||bv.includes(w)))||ob.some(w=>!bv.includes(w))||rest(av,known)||rest(bv,known);
   if(bad){a.miss('ちがう ことばが うごいたよ');if(!a.exam){gA.set(r.av);gB.set(r.bv);}return;}
   const done=r.w.every(w=>!av.includes(w)&&bv.includes(w));
   if(done){ri++;a.prog(ri,R.length);if(ri>=R.length)a.done();else{a.good('うつせた！ つぎの もんだい');a.later(setR,900);}}};
  gA=guardInput(a,A1,{space:1,typed:typed,del:del,change:e=>{if(e.inputType==='insertFromPaste')check();}});
  gB=guardInput(a,B1,{space:1,typed:typed,del:del,change:e=>{if(e.inputType==='insertFromPaste')check();}});
  setR();}});

/* 15 元に戻す */
STAGES.push({id:'undo',g:2,title:'元に戻す',icon:ICO.undo,desc:'まちがえたときは Ctrl+Z でひとつ前に戻す。Ctrl+Y でやり直し。',
 how:{keys:[['Ctrl','Z','元に戻す'],['Ctrl','Y','やり直し']],cap:'ボタンでも できる（しけんは キーだけ）',lines:['まちがえて けしても あわてない','Ctrl + Z で ひとつ前に もどる','くりかえし おすと、どんどん もどる']},
 build(a,v){const A=a.area;
  if(v===2){a.prog(0,1);a.task('文が けされちゃった！ Ctrl + Z で もどそう');const W=sw(A,212,8,800,420,'さくぶん - ワープロ');
   const S2=['はじめて キャンプに 行きました。','よるは ほしが たくさん 見えました。','また 行きたいです。'];
   const d=el('div','doc',null,W.body);const sp=S2.map(t=>{const s=el('div',null,null,d);s.textContent=t;s.style.transition='opacity .4s';return s;});
   let st=0,ready=false;
   a.start=()=>{a.later(()=>{sp[1].style.opacity='0';a.later(()=>{sp[1].style.display='none';st=1;ready=true;},420);},700);};
   a.key(e=>{if(e.ctrlKey&&e.code==='KeyZ'){e.preventDefault();if(!ready)return;if(st===1){st=0;sp[1].style.display='';a.later(()=>{sp[1].style.opacity='1';},20);a.prog(1,1);a.done();}else a.miss('もう もどすものは ないよ');}
    else if(e.ctrlKey&&e.code==='KeyY'){e.preventDefault();}});
   return;}
  const W=sw(A,v===1?60:312,8,600,420,'ブロック');const B=W.body;
  let bu=null,br=null;if(!a.exam){const bar=pos(el('div','abs',null,B),12,8,560,40);bar.style.cssText+=';display:flex;gap:10px';bu=el('button','tb',IC.undo+'元に戻す',bar);br=el('button','tb',IC.redo+'やり直し',bar);}
  const cols=['#ff6b6b','#ff9f43','#ffd23f','#36c96f','#3fa9ff','#9b6bff'];const BK=[];
  for(let i=0;i<15;i++){const b=pos(el('div','blk',null,B),46+(i%5)*100,62+Math.floor(i/5)*100);b.style.background=cols[(i+Math.floor(i/5))%6];BK.push(b);}
  const del=shuffle([...Array(15).keys()]).slice(0,3);const stack=[],red=[];let ready=false;
  const apply=()=>{BK.forEach((b,i)=>b.classList.toggle('gone',stack.includes(i)));};
  if(v===1){a.prog(0,1);a.task('もどしすぎちゃった！ Ctrl + Y で やり直して、見本と 同じに してから「けってい」');
   const M=pos(el('div','sw',null,A),720,8,440,340);el('div','swbar','見本',M);
   for(let i=0;i<15;i++){const b=pos(el('div','abs',null,M),40+(i%5)*74,62+Math.floor(i/5)*74,60,60);b.style.cssText+=';border:3px solid #10264d;border-radius:10px;background:'+(i===del[0]?'transparent':cols[(i+Math.floor(i/5))%6])+(i===del[0]?';border-style:dashed;opacity:.4':'');}
   const ok=pos(el('button','btn y abs','けってい',A),780,364,320,56);
   a.start=()=>{del.forEach((k,j)=>a.later(()=>{stack.push(k);apply();},300+j*450));
    [2,1,0].forEach((j,q)=>a.later(()=>{red.push(stack.pop());apply();if(q===2)ready=true;},1800+q*450));};
   a.key(e=>{if(!e.ctrlKey)return;if(e.code==='KeyZ'){e.preventDefault();if(!ready)return;if(!stack.length){a.miss('もう もどすものは ないよ');return;}red.push(stack.pop());apply();}
    if(e.code==='KeyY'){e.preventDefault();if(!ready||!red.length)return;stack.push(red.pop());apply();}});
   a.on(ok,'click',()=>{if(!ready)return;if(stack.length===1&&stack[0]===del[0]){a.prog(1,1);a.done();}else a.miss('見本と ちがうよ');});
   return;}
  a.prog(0,3);a.task('あっ、ブロックが けされた！ 元に戻すで ぜんぶ もどそう');
  const cnt=()=>a.prog(3-stack.length,3);
  a.start=()=>{del.forEach((k,j)=>a.later(()=>{stack.push(k);apply();if(j===2){ready=true;a.info(a.exam?'':'Ctrl + Z か「元に戻す」ボタンで もどそう');}},500+j*600));};
  const undo=()=>{if(!ready){a.info('まだ けされて いるよ。ちょっと まってね');return;}if(!stack.length){a.miss('もう もどすものは ないよ');return;}
   red.push(stack.pop());apply();cnt();if(!stack.length)a.done();else a.good('もどった！ あと '+stack.length+'こ');};
  const redo=()=>{if(!red.length){a.info('やり直す ものは ないよ');return;}stack.push(red.pop());apply();cnt();a.info('やり直しで また けしたよ。元に戻そう');};
  if(bu){a.on(bu,'click',undo);a.on(br,'click',redo);}
  a.key(e=>{if(e.ctrlKey&&e.code==='KeyZ'){e.preventDefault();undo();}else if(e.ctrlKey&&e.code==='KeyY'){e.preventDefault();redo();}});}});

/* 16 フォルダーにせいり */
STAGES.push({id:'folder',g:2,title:'フォルダーに せいり',icon:ICO.folder,desc:'ファイル名から判断して、あうフォルダーへドラッグして整理する。',
 how:{g:'drag',cap:'左下を おしこんだまま なぞる',lines:['ファイルの 名前を よく 見る','あう フォルダーの 上まで ドラッグ','フォルダーが 光ったら はなす']},
 build(a,v){const A=a.area;const COL=['#ff9f9f','#9fd0ff','#a8e6a0'];
  let FD=['こくご','さんすう','しゃかい'],FL;
  if(v==='p')FL=[['かん字テスト',0],['音読カード',0],['かけ算ドリル',1],['グラフづくり',1],['ごみのゆくえ',2],['地図の きごう',2]];
  else if(v===0)FL=[['ものがたりの かんそう',0],['かんじ ドリル',0],['わり算 プリント',1],['ぼうグラフの よみかた',1],['ちいきの 地図',2],['ごみのゆくえ',2]];
  else if(v===1){FD=['こくご','さんすう','りか'];FL=[['音読カード',0],['かんじ ドリル',0],['わり算 プリント',1],['ぼうグラフ',1],['こん虫の かんさつ',2],['天気の しらべ',2]];}
  else{FD=['こくご','さんすう','しゃかい','ごみばこ'];FL=[['かんじ ドリル',0],['かんじ ドリル - コピー',3],['わり算 プリント',1],['ちいきの 地図',2],['ごみのゆくえ',2],['ごみのゆくえ - コピー（2）',3]];}
  a.task(v==='p'?'ファイルを あう フォルダーに ドラッグして せいりしよう（色が ヒント）':v===0?'ファイルの 名前から 考えて、あう フォルダーに 入れよう':v===1?'「4年1組」を ひらいて、中の フォルダーに ファイルを 入れよう':'「コピー」の いらない ファイルは ごみばこへ。のこりを せいりしよう');
  let n=0;a.prog(0,FL.length);const cnt=FD.map(()=>0);
  shuffle(FL).forEach((f,i)=>{const d=icoEl(A,20+i*198,6,svgFile(v==='p'?COL[f[1]]:'#fff'),f[0]);d.style.width='170px';d.dataset.k=f[1];});
  const files=Array.from(A.querySelectorAll('.ico'));
  let targets=[];
  const mkF=(parent,x,y,i)=>{const s=FD[i]==='ごみばこ'?svgTrash():svgFolder(false,v==='p'?COL[i]:undefined);const d=icoEl(parent,x,y,s,FD[i]+'　0こ');d.style.width='180px';d.style.cursor='default';targets[i]=d;return d;};
  let open=v!==1;
  if(v===1){const cls=icoEl(A,540,250,svgFolder(false,'#ffc94d'),'4年1組');cls.style.width='150px';
   a.on(cls,'click',()=>{A.querySelectorAll('.ico').forEach(x=>x.classList.remove('sel'));cls.classList.add('sel');});
   a.on(cls,'dblclick',()=>{if(open)return;open=true;cls.remove();se('cursor');const W=sw(A,180,160,864,272,'4年1組');FD.forEach((nm,i)=>mkF(W.body,100+i*240,40,i));a.good('ひらいた！ 中の フォルダーへ 入れよう');});
   targets=[];a._cls=cls;}
  else{const n2=FD.length;const gap=(1224-n2*180)/(n2+1);FD.forEach((nm,i)=>mkF(A,gap+i*(180+gap),270,i));}
  files.forEach(d=>{const k=+d.dataset.k;
   dragify(a,d,{hover:c=>{targets.forEach(t=>t&&t.classList.toggle('hot',!!c&&hitEl(c,t)));if(a._cls&&a._cls.isConnected)a._cls.classList.toggle('hot',!!c&&hitEl(c,a._cls));},
    drop:(c,moved,back)=>{if(v===1&&!open&&a._cls&&hitEl(c,a._cls)){back();a.info('フォルダーを ダブルクリックで ひらいて、中に 入れよう');return;}
     const hit=targets.findIndex(t=>t&&hitEl(c,t));
     if(hit<0){back();a.info(moved?'フォルダーの 上で はなそう':'おしたまま うごかそう');return;}
     if(hit!==k){back();a.miss('その フォルダーで いいかな？ 名前を よく 見よう');return;}
     d.style.display='none';cnt[hit]++;targets[hit].querySelector('.in').textContent=FD[hit]+'　'+cnt[hit]+'こ';n++;a.prog(n,FL.length);se('cursor');
     if(n>=FL.length)a.done();else a.good(hit===3&&FD[3]==='ごみばこ'?'すてた！':'せいり できた！');}});});
 }});

/* 17 名前を付けて保存 */
STAGES.push({id:'save',g:2,title:'名前を付けて保存',icon:ICO.save,desc:'わかりやすい名前をつけて、決められた場所に保存する（Ctrl+S）。',
 how:{keys:[['Ctrl','S','保存']],cap:'メニューでも できる（しけんは キーだけ）',lines:['Ctrl + S か「ファイル」→「名前を付けて保存」','左の 一らんで 保存する ばしょを えらぶ','ファイル名を 入力して「保存」']},
 build(a,v){const A=a.area;const want=v===1?{f:'4年',name:'しょくぶつのかんさつ',path:'りか ＞ 4年'}:v===2?{f:'しゃかい',name:'ごみのゆくえ2'}:{f:'しゃかい',name:'ごみのゆくえ'};
  a.task(v===1?'「りか」の 中の「4年」フォルダーに「しょくぶつのかんさつ」で 保存しよう':v===2?'「しゃかい」に 同じ 名前が もう あるよ。上書き しないで、名前の うしろに「2」を つけて 保存しよう':'「しゃかい」フォルダーに「ごみのゆくえ」という 名前で 保存しよう');
  const W=sw(A,112,4,1000,428,'ワープロ ー 無題');const bar=W.bar;
  let fb=null;if(!a.exam){fb=el('button','tb','ファイル',bar);bar.insertBefore(fb,bar.firstChild);}
  const body=pos(el('div','abs doc',null,W.body),20,10,940);
  body.innerHTML=v===1?'しょくぶつの かんさつ（下書き）<br>ホウセンカの めが 出ました。はっぱは 2まいです。':'ごみのゆくえ（下書き）<br>わたしの 家では 1週間に ごみぶくろ 3こ 分の ごみが 出ます。<br>…';
  a.prog(0,2);let dd=null,dl=null,folder='ドキュメント',expand=false;
  const closeDD=()=>{if(dd){dd.remove();dd=null;}};
  const openDlg=()=>{closeDD();if(dl)return;a.prog(1,2);a.good('保存する ばしょと 名前を きめよう');
   dl=sw(A,182,8,860,420,'名前を付けて保存');dl.W.style.zIndex='10';dl.W.dataset.ovok='1';
   const fl=pos(el('div','abs',null,dl.body),14,14,250,350);fl.style.cssText+=';display:flex;flex-direction:column;gap:4px;border-right:3px solid #c3d4f0;padding-right:12px';
   const where=pos(el('div','abs lbl',null,dl.body),290,18,540);
   const ex=pos(el('div','abs',null,dl.body),290,58,540,100);ex.style.cssText+=';border:2px solid #c3d4f0;border-radius:10px;background:#f7faff;padding:6px 12px;font-size:17px;line-height:1.6;color:#4d6290';
   pos(el('div','abs lbl','ファイル名',dl.body),290,172);
   const nm=pos(el('input','inp abs'+(a.exam?'':' allowctx'),null,dl.body),290,206,540,56);nm.value='無題';nm.setAttribute('autocomplete','off');nm.setAttribute('aria-label','ファイル名');
   a.on(nm,'focus',()=>nm.select());
   const tree=()=>{fl.innerHTML='';const L=[['デスクトップ',0],['ドキュメント',0],['こくご',1],['さんすう',1],['しゃかい',1],['りか',1]];if(expand){L.push(['3年',2],['4年',2]);}
    L.forEach(f=>{const b=el('button','sbtn2'+(folder===f[0]?' on':''),null,fl);b.style.cssText+=';text-align:left;padding-left:'+(12+f[1]*22)+'px;height:36px;font-size:17px';b.innerHTML=svgFolder(false).replace('<svg','<svg width="22" height="20" style="vertical-align:-4px"')+' '+f[0];
     a.on(b,'click',()=>{folder=f[0];if(f[0]==='りか')expand=true;tree();upd();});});};
   const upd=()=>{where.textContent='保存先：'+(folder==='3年'||folder==='4年'?'りか ＞ '+folder:folder);
    const list=folder==='しゃかい'?(v===2?['ごみのゆくえ','地図の きごう']:['地図の きごう']):folder==='りか'?['3年','4年（フォルダー）']:folder==='こくご'?['音読カード']:[];
    ex.innerHTML='<b style="color:#10264d">この フォルダーに ある もの</b><br>'+(list.length?list.join('　/　'):'（なし）');};
   tree();upd();
   const sv=pos(el('button','btn y abs','保存',dl.body),290,290,250,56),cc=pos(el('button','btn abs','キャンセル',dl.body),580,290,250,56);
   a.on(cc,'click',()=>{dl.W.remove();dl=null;a.prog(0,2);});
   a.on(sv,'click',()=>{const val=z2h(nosp(nm.value));
    if(folder!==want.f){a.miss('保存する ばしょが ちがうよ');return;}
    if(v===2&&val==='ごみのゆくえ'){const cf=pos(el('div','sw popin',null,dl.body),150,60,560,230);cf.style.zIndex='12';cf.dataset.ovok='1';el('div','swbar','かくにん',cf);
     const t=pos(el('div','abs',null,cf),24,60,512);t.style.cssText+=';font-size:20px;line-height:1.6';t.textContent='「ごみのゆくえ」は もう あります。上書き しますか？';
     const y=pos(el('button','btn abs','はい',cf),40,150,220,52),n=pos(el('button','btn abs','いいえ',cf),300,150,220,52);
     a.on(y,'click',()=>{cf.remove();a.miss('上書きすると、まえの ファイルが きえちゃうよ');});a.on(n,'click',()=>{cf.remove();a.info('名前を かえよう');});return;}
    if(val!==want.name){a.miss('ファイル名を たしかめよう');return;}
    a.prog(2,2);dl.W.remove();W.title.textContent='ワープロ ー '+want.name;a.toast('保存 しました',540,380);a.done();});
   a.later(()=>nm.focus(),50);};
  if(fb)a.on(fb,'click',e=>{e.stopPropagation();if(dd){closeDD();return;}dd=pos(el('div','cmenu',null,W.W),10,46);
   [['ひらく','Ctrl+O',()=>a.info('いまは「名前を付けて保存」だよ')],['名前を付けて保存','Ctrl+S',openDlg],['いんさつ','Ctrl+P',()=>a.info('いまは「名前を付けて保存」だよ')]].forEach(x=>{const b=el('button',null,'<span style="flex:1">'+x[0]+'</span><span style="font-size:14px;color:#4d6290">'+x[1]+'</span>',dd);a.on(b,'click',ev=>{ev.stopPropagation();closeDD();x[2]();});});dd.style.width='300px';});
  a.on(W.W,'click',()=>closeDD());
  a.key(e=>{if(e.ctrlKey&&e.code==='KeyS'){e.preventDefault();openDlg();}});}});

/* 18 2つのことばで検索 */
STAGES.push({id:'search2',g:2,title:'2つの ことばで 検索',icon:ICO.search2,desc:'1語では結果が多すぎるとき、スペースで区切って2語以上でしぼりこむ。',
 how:{keys:[['スペース','くぎる']],cap:'ことばと ことばの 間に スペース',lines:['1つの ことばだと けっかが 多すぎる ことが ある','「ねこ しいく」のように スペースで くぎって ことばを たす','けっかを よく 読んで、あう ページを えらぶ']},
 build(a,v){const D={p:{main:'いぬ',need:[['いぬ'],['さんぽ']],ok:'いぬの さんぽの しかた',many:['いぬの しゃしん','いぬの まんが','いぬの しゅるい','いぬの ぬいぐるみ']},
   0:{main:'ねこ',need:[['ねこ'],['しいく']],ok:'ねこの しいくの しかた',many:['ねこの しゃしん','ねこの まんが','ねこの なきごえ']},
   1:{main:'かぶとむし',need:[['かぶとむし'],['そだてかた','そだて方','育てかた','育て方']],ok:'かぶとむしの そだてかた',many:['かぶとむしの ずかん','かぶとむし ゲーム','かぶとむしの しゃしん']},
   2:{main:'ごみ',need:[['ごみ'],['りさいくる'],['ほうほう','方法']],ok:'ごみの リサイクルの ほうほう',many:['ごみの 日','ごみばこの えらびかた','ごみ しゅうしゅう車']}}[v];
  a.task(v==='p'?'まず「いぬ」で 検索してみよう':v===0?'「ねこ」と「しいく」の 2つの ことばで 検索して、あう けっかを えらぼう':v===1?'かぶとむしの そだてかたを しらべよう。ことばを たして しぼりこもう':'「ごみ」「リサイクル」「ほうほう」の 3つの ことばで 検索して、あう けっかを えらぼう');
  a.prog(0,v==='p'?3:2);let ph=0;
  const B=browser(a,120,4,984,428);const rt=el('button','sbtn2',null,B.top);rt.textContent='ローマ字ひょう';a.on(rt,'click',()=>{se('cursor');romajiTable(()=>B.ip.focus());});
  const match=ws=>D.need.length===ws.length&&D.need.every(alts=>ws.some(w=>alts.map(x=>toHira(x)).includes(w)));
  const run=()=>{const ws=words(toHira(B.ip.value));B.res.innerHTML='';if(!ws.length){a.info('ことばを 入れてから 検索しよう');return;}
   const head=el('div',null,null,B.res);head.style.cssText='font-size:15px;color:#4d6290;padding:0 14px 2px';
   let L;if(match(ws)){L=shuffle([[D.ok,1]].concat(D.many.slice(0,2).map(x=>[x,0])));head.textContent='「'+B.ip.value+'」の けっか　やく 120けん';if(v==='p'){ph=2;a.prog(2,3);}else a.prog(1,2);}
   else if(ws.includes(toHira(D.main))){L=D.many.map(x=>[x,0]);head.textContent='「'+B.ip.value+'」の けっか　やく 1,240,000けん';
    if(v==='p'&&ph===0){ph=1;a.prog(1,3);a.good('けっかが 多すぎるね');a.task('「いぬ さんぽ」のように スペースで くぎって、ことばを たそう');}
    else a.info('けっかが 多すぎるね。ことばを たして しぼりこもう');}
   else{head.textContent='「'+B.ip.value+'」の けっかは 見つかりませんでした';a.info('ことばを たしかめよう');return;}
   L.slice(0,4).forEach(r=>{const b=el('button','res','<div class="rt">'+r[0]+'</div><div class="rd">'+(r[1]?'しらべたい ことが のっている ページ':'しらべたい ことと ちょっと ちがう ページ')+'</div>',B.res);
    a.on(b,'click',()=>{if(r[1]){B.res.innerHTML='';const pg=el('div',null,null,B.res);pg.style.cssText='font-size:30px;font-weight:700;padding:20px';pg.textContent=r[0];a.prog(v==='p'?3:2,v==='p'?3:2);a.done();}
     else a.miss('しらべたい ページでは ないよ');});});};
  a.on(B.sb,'click',run);a.on(B.ip,'keydown',e=>{if(e.key==='Enter'&&!e.isComposing&&e.keyCode!==229){e.preventDefault();run();}});
  a.start=()=>B.ip.focus();}});

/* 19 画像を入れて大きさを変える */
STAGES.push({id:'image',g:2,title:'画像を入れて 大きさを 変える',icon:ICO.image,desc:'「挿入」→「画像」で画像を入れ、角のつまみをドラッグして大きさを変える。',
 how:{g:'drag',cap:'角の まるを ドラッグ',lines:['「挿入」→「画像」で えらんで 入れる','画像を クリックすると 角に まるが 出る','角の まるを ドラッグして 大きさを かえる。まん中を ドラッグすると うごく']},
 build(a,v){const A=a.area;const IMGS=['ひまわり','ちょうちょ','ロケット'];
  const IA={ひまわり:flowerSvg('#ffd23f'),ちょうちょ:svg('<ellipse cx="34" cy="38" rx="20" ry="16" fill="#ff8fd0" '+SW+'/><ellipse cx="66" cy="38" rx="20" ry="16" fill="#ff8fd0" '+SW+'/><ellipse cx="38" cy="66" rx="14" ry="12" fill="#ffb3e6" '+SW+'/><ellipse cx="62" cy="66" rx="14" ry="12" fill="#ffb3e6" '+SW+'/><rect x="46" y="28" width="8" height="50" rx="4" fill="#10264d"/>'),
   ロケット:svg('<path d="M50 8q20 18 18 52H32Q30 26 50 8z" fill="#fff" '+SW+'/><circle cx="50" cy="38" r="8" fill="#3fa9ff" '+SW+'/><path d="M32 60l-12 18 14-4M68 60l12 18-14-4" fill="#ff6b6b" '+SW+'/><path d="M42 62l8 26 8-26z" fill="#ff9f43" '+SW+'/>')};
  const want=v===2?'ロケット':pick(IMGS);
  const W=sw(A,40,4,1144,428,'ワープロ ー はっぴょう');const B=W.body;
  const rib=el('div','ribbon',null,B);const tH=el('button','rt2 on','ホーム',rib),tI=el('button','rt2','挿入',rib),tL=el('button','rt2','レイアウト',rib);
  const tools=el('div',null,null,rib);tools.style.cssText='display:flex;gap:8px;margin-left:20px';
  const page=pos(el('div','abs',null,B),20,56,1096,316);page.style.cssText+=';background:#fff;border:2px solid #c3d4f0;overflow:hidden';page.dataset.clip='1';
  const txt=pos(el('div','abs doc',null,page),0,0,560);txt.innerHTML='<b>なつの 思い出</b><br>家族で 海へ 行きました。<br>すなはまで あそびました。';
  let img=null,sel=false,frame=null,ph=0;const steps=v===2?2:2;a.prog(0,steps);
  const FR=v===1?{x:120,y:190,w:160,h:120}:v==='p'?{x:640,y:20,w:220,h:165}:{x:700,y:60,w:180,h:135};
  if(v!==2){frame=pos(el('div','frame',null,page),FR.x,FR.y,FR.w,FR.h);}
  a.task(v===2?'まちがえて 入れた 画像を Delete で けして、「ロケット」の 画像を 入れよう':v===1?'画像を 小さくして、文の 下の 点線の わくに 合わせよう':'「挿入」→「画像」で「'+want+'」を 入れて、角を 引っぱって 点線の わくに 合わせよう');
  const place=(name,x,y,w)=>{if(img)img.remove();img=pos(el('div','resize',IA[name],page),x,y,w,w*0.75);img.dataset.name=name;img.firstChild.style.cssText='width:100%;height:100%;pointer-events:none';
   ['tl','tr','bl','br'].forEach(c=>{const h=el('div','hd '+c,null,img);h.dataset.c=c;});sel=false;
   let mode=null,sx,sy,o;
   a.on(img,'pointerdown',e=>{if(e.button!==0)return;e.preventDefault();e.stopPropagation();sel=true;img.classList.add('on');try{img.setPointerCapture(e.pointerId);}catch(_){}
    mode=e.target.dataset.c||'move';sx=e.clientX;sy=e.clientY;o={x:img.offsetLeft,y:img.offsetTop,w:img.offsetWidth};});
   a.on(img,'pointermove',e=>{if(!mode)return;const dx=(e.clientX-sx)/S,dy=(e.clientY-sy)/S;let x=o.x,y=o.y,w=o.w;
    if(mode==='move'){x=o.x+dx;y=o.y+dy;}
    else{const sxs=(mode==='br'||mode==='tr')?1:-1,sys=(mode==='br'||mode==='bl')?1:-1;const d=Math.abs(dx)>Math.abs(dy)?dx*sxs:dy*sys*4/3;w=Math.max(60,Math.min(600,o.w+d));
     if(sxs<0)x=o.x+o.w-w;if(sys<0)y=o.y+(o.w-w)*0.75;}
    x=Math.max(60-w,Math.min(1096-60,x));y=Math.max(40-w*0.75,Math.min(316-40,y));pos(img,x,y,w,w*0.75);});
   const up=()=>{if(!mode)return;mode=null;checkFit();};a.on(img,'pointerup',up);a.on(img,'pointercancel',up);return img;};
  const checkFit=()=>{if(!img||!frame||img.dataset.name!==want)return;const x=img.offsetLeft,y=img.offsetTop,w=img.offsetWidth;
   if(Math.abs(x-FR.x)<=14&&Math.abs(y-FR.y)<=14&&Math.abs(w-FR.w)<=14){pos(img,FR.x,FR.y,FR.w,FR.w*0.75);img.classList.remove('on');a.prog(steps,steps);a.done();}};
  a.on(page,'pointerdown',e=>{if(img&&!img.contains(e.target)){sel=false;img.classList.remove('on');}});
  const showIns=()=>{tools.innerHTML='';const b1=el('button','tb',ICO.image.replace('<svg','<svg width="20" height="20"')+'画像',tools);el('button','tb','図形',tools).addEventListener('click',()=>a.info('いまは「画像」だよ'));el('button','tb','表',tools).addEventListener('click',()=>a.info('いまは「画像」だよ'));
   a.on(b1,'click',()=>{if(A.querySelector('.pick'))return;const P=sw(A,320,40,600,370,'画像を えらぶ');P.W.classList.add('pick');P.W.style.zIndex='10';P.W.dataset.ovok='1';let ch=null;
    IMGS.forEach((nm,i)=>{const d=icoEl(P.body,30+i*185,30,IA[nm],nm);d.style.width='170px';a.on(d,'click',()=>{P.body.querySelectorAll('.ico').forEach(x=>x.classList.remove('sel'));d.classList.add('sel');ch=nm;});a.on(d,'dblclick',()=>{ch=nm;ins();});});
    const ok=pos(el('button','btn y abs','挿入',P.body),70,236,210,56),cn=pos(el('button','btn abs','キャンセル',P.body),310,236,210,56);a.on(cn,'click',()=>P.W.remove());
    const ins=()=>{if(!ch){a.info('画像を クリックして えらぼう');return;}if(ch!==want){a.miss('ちがう 画像だよ');return;}P.W.remove();
     if(v===2&&img){a.info('まちがえた 画像を けしてから 入れよう');return;}
     place(ch,(v==='p'||v===0)?FR.x:300,(v==='p'||v===0)?FR.y:60,(v==='p'||v===0)?120:300);img.classList.add('on');sel=true;ph=1;a.prog(1,steps);
     if(v===2){a.prog(2,2);a.done();}else a.good('入った！ 角の まるを ドラッグして わくに 合わせよう');};
    a.on(ok,'click',ins);});};
  a.on(tI,'click',()=>{tI.classList.add('on');tH.classList.remove('on');tL.classList.remove('on');showIns();});
  a.on(tH,'click',()=>{tH.classList.add('on');tI.classList.remove('on');tL.classList.remove('on');tools.innerHTML='';a.info('画像は「挿入」に あるよ');});
  a.on(tL,'click',()=>{tL.classList.add('on');tI.classList.remove('on');tH.classList.remove('on');tools.innerHTML='';a.info('画像は「挿入」に あるよ');});
  if(v===1){place(want,560,10,360);a.prog(1,2);a.task('画像を 小さくして、文の 下の 点線の わくに 合わせよう');}
  if(v===2){place(pick(['ひまわり','ちょうちょ']),620,40,240);
   a.key(e=>{if((e.key==='Delete'||e.key==='Backspace')&&img&&sel){e.preventDefault();img.remove();img=null;a.prog(1,2);a.good('けせた！ つぎは「挿入」→「画像」');}});}
 }});
