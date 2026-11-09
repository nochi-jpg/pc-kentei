/* =========================================================
   1級（5・6年）
   ========================================================= */
/* 20 タイピング */
STAGES.push({id:'typing',g:1,title:'タイピング',icon:ICO.typing,desc:'見本の文を正確に写して入力する（コピー・はりつけは使えない）。',
 how:{keys:[['スペース','へんかん'],['Enter','かくてい'],['Backspace','1文字 けす']],cap:'見本を よく 見て うつ',lines:['見本の 文を よく 見る（コピーは できないよ）','ローマ字で うって、かん字は スペースで へんかん','ぜんぶ うてたら「送信」']},
 build(a,v){const T=v==='p'?'あさごはんに、パンをたべました。':['きのうの夜、家族でカレーライスを作りました。にんじんを切るのがむずかしかったです。','わたしの好きなスポーツは、バスケットボールです。シュートが入ると、とてもうれしいです。','図書室で、宇宙についての本を読みました。ロケットは、とても速いスピードで飛ぶそうです。'][v];
  const A=a.area;a.prog(0,1);a.task(v==='p'?'見本と 同じ 文を 入力して「送信」しよう':'見本と 同じ 文を 90びょう いないに 入力して「送信」しよう');
  const L=pos(el('div','sw',null,A),30,40,560,300);el('div','swbar','見本',L);const tx=pos(el('div','abs',null,L),20,60,512);tx.style.cssText+=';font-size:24px;line-height:1.8;word-break:normal;overflow-wrap:anywhere';tx.textContent=T;
  const ta=pos(el('textarea','inp abs',null,A),630,40,560,240);ta.style.fontSize='24px';ta.setAttribute('spellcheck','false');ta.setAttribute('aria-label','入力らん');ta.disabled=true;
  const sb=pos(el('button','btn y abs','送信',A),630,300,260,56);const tm=pos(el('div','abs',null,A),910,306,280,44);tm.style.cssText+=';font-size:22px;font-weight:700;display:flex;align-items:center';
  const cd=pos(el('div','abs',null,A),630,40,560,240);cd.style.cssText+=';display:flex;align-items:center;justify-content:center;font-size:90px;font-weight:700;color:#2a63c9;z-index:3;pointer-events:none';
  a.on(ta,'paste',e=>{e.preventDefault();a.info('はりつけは つかえないよ。見て うとう');});a.on(ta,'drop',e=>e.preventDefault());
  let t0=0,run=false;
  a.start=()=>{let n=3;cd.textContent=n;const iv=a.every(()=>{n--;if(n>0)cd.textContent=n;else{clearInterval(iv);cd.textContent='';ta.disabled=false;ta.focus();t0=Date.now();run=true;}},700);};
  const LIM=a.resumeLeft!=null?Math.max(5,a.resumeLeft):90;if(v!=='p')tm.textContent='のこり '+LIM+'びょう';
  if(v!=='p')a.every(()=>{if(!run)return;const left=LIM-Math.floor((Date.now()-t0)/1000);tm.textContent='のこり '+Math.max(0,left)+'びょう';a.typeTick(Math.max(0,left));if(left<=0){run=false;a.miss('時間ぎれ');}},250);
  a.on(sb,'click',()=>{if(!run)return;const val=ta.value.replace(/\n/g,'');const want=T;
   const norm=s=>s.trim();
   if(!val.trim()){a.info('入力してから 送信しよう');return;}
   if(norm(val)===norm(want)){run=false;a.prog(1,1);a.done();return;}
   const nv=norm(val),nw=norm(want);let i=0;while(i<nv.length&&nv[i]===nw[i])i++;
   a.miss(i>=nv.length?'まだ とちゅうだよ。さいごまで うとう':(i+1)+'文字目が ちがうよ');});}});

/* 21 漢字に変換 */
STAGES.push({id:'kanji',g:1,title:'漢字に 変換',icon:ICO.kanji,desc:'ひらがなで打ってスペースで変換し、正しい漢字を選んでEnterで確定する。',
 how:{keys:[['スペース','へんかん・つぎの こうほ'],['Enter','かくてい']],cap:'スペースで こうほを えらぶ',lines:['ひらがなで うつ','スペースで へんかん。ちがったら もう一度 スペース','正しい かん字に なったら Enter']},
 build(a,v){const Q=v==='p'?[['がっこう','学校','がっこう','がっこう'],['こうえん','公園','こうえん','こうえん']]
   :v===0?[['あつい','熱い','あつい おちゃ','おちゃ'],['あつい','厚い','あつい 本','ほん'],['あつい','暑い','あつい 夏','なつ']]
   :v===1?[['はかる','計る','時間を はかる','とけい'],['はかる','測る','長さを はかる','ものさし'],['はかる','量る','重さを はかる','はかり']]
   :[['きかい','機械','大きな きかい','きかい'],['きかい','機会','いい きかい（チャンス）','チャンス']];
  a.task(v==='p'?'ひらがなの ことばを 入力して、正しい かん字に へんかんしよう':'線の ことばを、文に あう かん字に へんかんして「けってい」を おそう');
  let n=0;a.prog(0,Q.length);const rows=[],ok=[],marks=[];const y0=v==='p'?40:6,dy=v==='p'?130:112;
  Q.forEach((q,i)=>{const r=pos(el('div','abs',null,a.area),70,y0+i*dy,1100,100);r.style.cssText+=';display:flex;align-items:center;gap:20px';
   const pc=el('div',null,ART[q[3]],r);pc.style.cssText='width:92px;height:92px;flex:none;border:3px solid #c3d4f0;border-radius:14px;background:#fff;padding:6px';pc.firstChild.style.cssText='width:100%;height:100%';
   const qb=el('div','qbox',null,r);qb.style.width='330px';qb.innerHTML=esc(q[2]).replace(q[0],'<u>'+q[0]+'</u>');el('div','lbl','→',r);
   const ip=el('input','inp'+(a.exam?'':' allowctx'),null,r);ip.style.width='300px';ip.setAttribute('autocomplete','off');ip.setAttribute('spellcheck','false');ip.setAttribute('aria-label',q[2]);
   const mk=el('div','mark','まだ',r);if(v!=='p')mk.style.visibility='hidden';rows.push(ip);ok.push(false);marks.push(mk);
   if(v==='p'){let comp=false;const chk=()=>{if(ok[i]||comp)return;const val=ip.value.trim();if(!val)return;
     if(nosp(val).startsWith(q[1])){ok[i]=true;mk.textContent='OK';mk.classList.add('ok');ip.readOnly=true;n++;a.prog(n,Q.length);if(n>=Q.length)a.done();else{a.good('OK！ つぎへ');rows[i+1].focus();}return;}
     if(/^[ぁ-ん]+$/.test(val))a.info('スペースで かん字に へんかんしよう');else if(/[一-龠]/.test(val))a.miss('ちがう かん字だよ。スペースで こうほを えらびなおそう');};
    a.on(ip,'compositionstart',()=>{comp=true;});a.on(ip,'compositionend',()=>{comp=false;setTimeout(chk,0);});a.on(ip,'input',chk);}});
  if(v!=='p'){const b=pos(el('button','btn y abs','けってい',a.area),890,Q.length===3?380:260,300,52);
   a.on(b,'click',()=>{if(rows.some(r=>!r.value.trim())){a.info('ぜんぶ 入力しよう');return;}if(Q.some((q,i)=>!nosp(rows[i].value).startsWith(q[1]))){a.miss('ちがう かん字が あるよ');return;}
    marks.forEach(m=>{m.textContent='OK';m.classList.add('ok');m.style.visibility='';});a.prog(Q.length,Q.length);a.done();});}
  a.start=()=>rows[0].focus();}});

/* 22 ショートカットキー */
const SC=[{k:'A',n:'ぜんぶ えらぶ',d:'文や ものを ぜんぶ えらぶ'},{k:'C',n:'コピー',d:'えらんだものを うつしとる'},{k:'V',n:'はりつけ',d:'コピーしたものを はりつける'},{k:'X',n:'切り取り',d:'えらんだものを 切りとる'},{k:'Z',n:'元に戻す',d:'ひとつ前に もどす'},{k:'Y',n:'やり直し',d:'もどしたことを やり直す'},{k:'S',n:'保存',d:'ファイルを 保存する'},{k:'F',n:'検索',d:'ことばを さがす'}];
const SEQ=[{n:'ぜんぶ えらんで → コピー',k:['A','C']},{n:'切り取って → はりつけ',k:['X','V']},{n:'元に戻して → やり直し',k:['Z','Y']},{n:'コピーして → はりつけ',k:['C','V']},{n:'ぜんぶ えらんで → 切り取り',k:['A','X']},{n:'検索して → 保存',k:['F','S']}];
STAGES.push({id:'short',g:1,title:'ショートカットキー',icon:ICO.short,desc:'Ctrlキーと組み合わせて、すばやく操作する（A・C・V・X・Z・Y・S・F）。',
 how:{keys:[['Ctrl','C','コピー'],['Ctrl','V','はりつけ'],['Ctrl','Z','元に戻す']],cap:'Ctrl を おしたまま 文字キー',lines:['左下の Ctrl キーを おしたまま','もう1つの キーを トンと おす','しけんでは キーが かくれるよ']},
 build(a,v){const L=shuffle(SC.map(c=>({n:c.n,d:c.d,k:[c.k]})).concat(v==='p'?[]:shuffle(SEQ.slice()).slice(0,v+1).map(s=>({n:s.n,d:'れんぞく そうさ',k:s.k}))));
  let i=0,j=0;a.prog(0,L.length);a.task(a.exam?'出てきた そうさの ショートカットキーを おそう（キーは かくれているよ）':'出てきた そうさの ショートカットキーを おそう');
  const C=pos(el('div','scard',null,a.area),212,20,800,396);const sn=el('div','sn','',C),sd=el('div','sd','',C),sk=el('div','keyrow',null,C);sk.style.cssText+=';gap:14px';
  const show=()=>{const c=L[i];sn.textContent=c.n;sd.textContent=c.d;sk.innerHTML=c.k.map((k,q)=>'<span class="key">Ctrl</span><span>+</span><span class="key" style="'+(q<j?'background:#36c96f;color:#fff':'')+'">'+(a.exam&&q>=j?'？':k)+'</span>').join('<span style="margin:0 10px">→</span>');};show();
  a.key(e=>{if(['Control','Shift','Alt','Meta'].includes(e.key))return;
   if(!e.ctrlKey){if(/^Key/.test(e.code))a.info('Ctrl キーを おしたまま おそう');return;}
   e.preventDefault();const k=e.code.replace('Key','');const c=L[i];
   if(k===c.k[j]){j++;if(j<c.k.length){se('cursor');show();return;}i++;j=0;a.prog(i,L.length);if(i>=L.length){a.done();return;}a.good('せいかい！ Ctrl + '+c.k.join(' → Ctrl + '));show();}
   else a.miss(/^[A-Z]$/.test(k)?'それは Ctrl + '+k+'。もう一度':'ちがう キーだよ');});}});

/* 23 検索と置換 */
STAGES.push({id:'replace',g:1,title:'検索と置換',icon:ICO.replace,desc:'Ctrl+Fでことばを探し、Ctrl+Hですべて置換（書きかえ）。',
 how:{keys:[['Ctrl','F','検索'],['Ctrl','H','置換']],cap:'ボタンでも ひらける（しけんは キーだけ）',lines:['Ctrl + F で ことばを さがす','Ctrl + H で 置換（書きかえ）','「すべて置換」で まとめて 書きかえる']},
 build(a,v){const A=a.area;let T0,ok,task;
  if(v==='p'||v===0){T0='たろうくんは サッカーが とくいです。きのうの しあいでも、たろうくんは 2点 きめました。みんな たろうくんを おうえん しています。';const F=T0.split('たろう').join('じろう');ok=t=>t===T0?0:t===F?2:-1;}
  if(v===1){T0='なつに すいかを たべました。あかい すいかは あまくて おいしかったです。また あかい すいかを たべたいです。';const s1=T0.split('すいか').join('メロン'),s2=T0.split('あかい').join('みどりの'),F=s1.split('あかい').join('みどりの');ok=t=>t===T0?0:(t===s1||t===s2)?1:t===F?2:-1;}
  if(v===2){T0='うちの ねこは まいあさ ニャーと なきます。ねこは ニャーと ないて ごはんを まちます。';const s1=T0.split('ねこ').join('いぬ'),s2=T0.split('ニャー').join('ワン'),F=s1.split('ニャー').join('ワン');ok=t=>t===T0?0:(t===s1||t===s2)?1:t===F?2:-1;}
  task=v==='p'?'名前を まちがえた！ まず 検索で「たろう」が いくつ あるか しらべよう':v===0?'「たろう」を ぜんぶ「じろう」に 置きかえよう':v===1?'「すいか」を「メロン」に、「あかい」を「みどりの」に 置きかえよう':'「ねこ」を ぜんぶ「いぬ」に、「ニャー」を ぜんぶ「ワン」に 置きかえよう';
  a.task(task);let text=T0,ph=v==='p'?0:1,mode='',q='',cur=-1;a.prog(0,v==='p'?2:1);
  const W=sw(A,16,4,720,428,'ワープロ ー ともだちの さくぶん');let bf=null,bh=null;
  if(!a.exam){bf=el('button','tb',IC.find+'検索',W.bar);bh=el('button','tb',IC.rep+'置換',W.bar);}
  const ET=pos(el('div','abs doc',null,W.body),0,6,712);ET.style.fontSize='22px';
  const FP=pos(el('div','sw',null,A),760,4,448,428);FP.style.display='none';const fpBar=el('div','swbar','',FP);const FB=el('div','swbody',null,FP);FB.style.padding='14px 18px';
  const render=()=>{if(q&&mode){let h='',i=0,p;while((p=text.indexOf(q,i))>=0){h+=esc(text.slice(i,p))+'<mark'+(p===cur?' class="cur"':'')+'>'+esc(q)+'</mark>';i=p+q.length;}h+=esc(text.slice(i));ET.innerHTML=h;}else ET.textContent=text;};render();
  const after=()=>{const s=ok(text);if(s===2){a.prog(1,1);if(v==='p')a.prog(2,2);a.done();return;}if(s<0){a.miss('ちがう 文に なったよ'+(a.exam?'':'。もとに もどすので もう一度'));if(!a.exam)a.later(()=>{text=T0;cur=-1;render();},1200);}else if(s===1)a.good('書きかえた！ のこりも やろう');};
  const open=m=>{if(m==='rep'&&ph===0){a.info('まずは 検索で かぞえよう（Ctrl + F）');return;}
   mode=m;FP.style.display='block';FB.innerHTML='';q='';cur=-1;fpBar.textContent=m==='find'?'検索':'置換';
   const lb=t=>{const d=el('div','lbl',t,FB);d.style.margin='6px 0';return d;};
   lb('検索する ことば');const i1=el('input','inp'+(a.exam?'':' allowctx'),null,FB);i1.style.width='400px';i1.setAttribute('autocomplete','off');
   if(m==='find'){const cn=el('div',null,null,FB);cn.style.cssText='height:36px;font-size:20px;font-weight:700;color:#2a63c9;margin:8px 0';
    const up=()=>{q=i1.value;render();cn.textContent=q?(text.split(q).length-1)+'けん 見つかりました':'';};a.on(i1,'input',up);a.on(i1,'compositionend',()=>setTimeout(up,0));
    if(v==='p'&&ph===0){lb('いくつ ありましたか？');const r3=el('div',null,null,FB);r3.style.cssText='display:flex;gap:12px';
     [2,3,4].forEach(n=>{const b=el('button','btn',n+'こ',r3);b.style.width='120px';a.on(b,'click',()=>{if(ph!==0)return;if(n===3){ph=1;a.prog(1,2);a.good('せいかい！ 3こ あったね');a.task('こんどは Ctrl + H で「たろう」を ぜんぶ「じろう」に 置きかえよう');FP.style.display='none';mode='';q='';render();}else a.miss('もう一度 かぞえよう。検索すると 色が つくよ');});});}}
   else{lb('置きかえる ことば');const i2=el('input','inp'+(a.exam?'':' allowctx'),null,FB);i2.style.width='400px';i2.setAttribute('autocomplete','off');
    const up=()=>{q=i1.value;cur=-1;render();};a.on(i1,'input',up);a.on(i1,'compositionend',()=>setTimeout(up,0));
    const r=el('div',null,null,FB);r.style.cssText='display:flex;gap:12px;margin-top:20px;width:400px';
    const ba=el('button','btn sm y','すべて置換',r);ba.style.width='400px';
    a.on(ba,'click',()=>{if(!i1.value){a.info('検索する ことばを 入れよう');return;}text=text.split(i1.value).join(i2.value);q='';cur=-1;render();after();});}
   setTimeout(()=>i1.focus(),0);};
  if(bf){a.on(bf,'click',()=>open('find'));a.on(bh,'click',()=>open('rep'));}
  a.key(e=>{if(e.ctrlKey&&e.code==='KeyF'){e.preventDefault();open('find');}else if(e.ctrlKey&&e.code==='KeyH'){e.preventDefault();open('rep');}});}});

/* 24 コメント */
STAGES.push({id:'comment',g:1,title:'コメントを 書く',icon:ICO.comment,desc:'友だちの作品の文を選んで、よいところやアドバイスをコメントする・返信する。',
 how:{g:'tap2',cap:'右下を カチッ →「コメントを追加」',lines:['コメントしたい 文を 右クリック（または 文を えらんで「コメント」）','「コメントを追加」を えらぶ','あいてが うれしくなる ことばで 書いて 送信']},
 build(a,v){const A=a.area;const SN=['わたしは 夏休みに 海へ 行きました。','海の 水は つめたくて、なみの 音が 大きく ひびいていました。','また 来年も 行きたいです。'];
  const need=v==='p'?[1]:v===0?[2]:v===1?[0,2]:[];
  a.task(v==='p'?'2つ目の 文を えらんで、よいところを コメントで つたえよう':v===0?'3つ目の 文に、よいところを コメントしよう':v===1?'1つ目の 文に よいところを、3つ目の 文に「こうすると もっと よくなる」を コメントしよう':'はるとさんの コメントに 返信しよう');
  const W=sw(A,16,4,760,428,'ゆいさんの 作文');const bc=el('button','tb',IC.cmt+'コメント',W.bar);
  const bx=pos(el('div','abs',null,W.body),20,16,712);let sel=-1;const total=v===2?1:need.length;let n=0;a.prog(0,total);const done2=new Set();
  const SE2=SN.map((s,i)=>{const d=el('div','sent',s,bx);a.on(d,'click',()=>pick(i));
   a.on(d,'contextmenu',e=>{e.preventDefault();pick(i);a.menu(e,[{t:'コメントを追加',ic:'cmt',fn:()=>compose()},{t:'コピー',ic:'copy',fn:()=>a.info('いまは「コメントを追加」だよ')}]);});return d;});
  const pick=i=>{sel=i;SE2.forEach((d,j)=>d.classList.toggle('on',j===i));};
  const CP=pos(el('div','sw',null,A),796,4,412,428);const cpb=el('div','swbar','コメント',CP);void cpb;const CB=el('div','swbody',null,CP);CB.style.padding='12px';
  const BAD=['ばか','バカ','へた','ヘタ','きもい','キモい','うざい','ウザい','しね','つまらない','だめ','ダメ','ブス','ぶす'];
  const list=()=>{CB.innerHTML='';const L=el('div',null,null,CB);L.style.cssText='display:flex;flex-direction:column;gap:10px';
   if(v===2){const c=el('div',null,null,L);c.style.cssText='border:3px solid #b9c8e3;border-radius:12px;padding:8px 12px;background:#fff';c.innerHTML='<div style="font-size:15px;font-weight:700;color:#4d6290">はると（2つ目の 文）</div><div style="font-size:19px">なみの 音の 書き方、すてきだね！</div>';
    if(done2.has('r')){const rr=el('div',null,null,c);rr.style.cssText='margin-top:6px;border-top:2px dashed #c3d4f0;padding-top:6px;font-size:18px';rr.innerHTML='<b style="font-size:15px;color:#2a63c9">あなた</b><br>'+esc(a._reply);}
    else{const rb=el('button','sbtn2',null,c);rb.textContent='返信';rb.style.marginTop='6px';a.on(rb,'click',()=>compose('r'));}}
   done2.forEach(k=>{if(k==='r')return;const c=el('div',null,null,L);c.style.cssText='border:3px solid #9fe0b6;border-radius:12px;padding:8px 12px;background:#e8f9ee;font-size:18px';c.innerHTML='<b style="font-size:15px;color:#1d8a47">あなた（'+(k+1)+'つ目の 文）</b><br>'+esc(a['_c'+k]);});
   if(!L.children.length){const e=el('div',null,'まだ コメントは ありません',L);e.style.cssText='font-size:18px;color:#4d6290';}};list();
  const compose=(reply)=>{if(reply!=='r'){if(sel<0){a.info('さきに 文を クリックして えらぼう');return;}
    if(v===2||!need.includes(sel)){a.miss('コメントする 文が ちがうよ');return;}if(done2.has(sel)){a.info('その 文には もう コメントしたよ');return;}}
   CB.innerHTML='';const h=el('div',null,null,CB);h.style.cssText='font-size:17px;line-height:1.9;color:#4d6290;margin-bottom:6px;height:66px;overflow:hidden';h.textContent=reply==='r'?'はるとさんへの 返信':'「'+SN[sel]+'」';
   const ta=el('textarea','inp'+(a.exam?'':' allowctx'),null,CB);ta.style.cssText+=';width:380px;height:140px';ta.setAttribute('aria-label','コメント');
   const r=el('div',null,null,CB);r.style.cssText='display:flex;gap:12px;margin-top:14px';const sb=el('button','btn y',null,r),cc=el('button','btn',null,r);sb.textContent='送信';cc.textContent='やめる';sb.style.width=cc.style.width='184px';
   const target=sel;
   a.on(cc,'click',()=>list());
   a.on(sb,'click',()=>{const val=ta.value.trim();
    if(BAD.some(w=>val.includes(w))){a.miss('あいてが うれしくなる ことばに しよう');return;}
    if(val.length<5){a.info('もう少し くわしく 書こう（5文字 いじょう）');return;}
    if(reply==='r'){a._reply=val;done2.add('r');}else{a['_c'+target]=val;done2.add(target);SE2[target].classList.remove('on');SE2[target].classList.add('cm');}
    n++;a.prog(n,total);se('decide');list();if(n>=total)a.done();else a.good('コメント できた！');});
   setTimeout(()=>ta.focus(),0);};
  a.on(bc,'click',()=>compose());}});

/* 25 ファイルを添付 */
STAGES.push({id:'attach',g:1,title:'ファイルを 添付',icon:ICO.attach,desc:'チャットでクリップから正しいファイルを選んで添付し、送信する。',
 how:{g:'tap1',cap:'クリップの マークを クリック',lines:['入力らんの よこの クリップを クリック','おくる ファイルを えらんで「ひらく」','ファイルが ついたのを たしかめて 送信']},
 build(a,v){const A=a.area;const FILES=v===1?['はっぴょう（したがき）','はっぴょう（かんせい）','しゃしん','さくぶん']:['はっぴょう','しゃしん','さくぶん','メモ'];
  const want=v===1?['はっぴょう（かんせい）']:v===2?['はっぴょう','しゃしん']:['はっぴょう'];const needMsg=v===2;
  a.task(v===1?'かんせいした ほうの「はっぴょう」の ファイルを 添付して 送信しよう':v===2?'「はっぴょう」と「しゃしん」の 2つを 添付して、メッセージも 書いて 送信しよう':'「はっぴょう」の ファイルを 添付して 送信しよう');
  a.prog(0,2);const W=sw(A,172,4,880,428,'5年2組 チャット');W.body.classList.add('chatw');W.body.style.paddingTop='12px';
  const m=el('div','cm',null,W.body);el('div','cav','先',m).style.background='#e8833a';el('div','cbub','<div class="nm">先生</div><div class="tx">'+(v===2?'はっぴょうの ファイルと しゃしんを おくってね。ひとこと メッセージも おねがいします。':'はっぴょうの ファイルを おくってね。')+'</div>',m);
  const sent=el('div',null,null,W.body);
  const bar=pos(el('div','abs',null,W.body),12,304,848,62);bar.style.cssText+=';border-top:3px solid #c3d4f0;padding-top:10px';
  const chips=pos(el('div','abs',null,W.body),70,246,780,48);chips.style.cssText+=';display:flex;gap:10px;align-items:center';
  const row=el('div',null,null,bar);row.style.cssText='display:flex;gap:10px;align-items:center';
  const clip=el('button','tb',IC.clip,row);clip.setAttribute('aria-label','添付');clip.style.cssText+=';height:50px;width:56px;justify-content:center';clip.querySelector('svg').style.cssText='width:28px;height:28px';
  const ip=el('input','inp'+(a.exam?'':' allowctx'),null,row);ip.style.width='600px';ip.placeholder='メッセージを 入力';ip.setAttribute('autocomplete','off');
  const sb=el('button','btn y sm',null,row);sb.innerHTML=IC.send+'送信';sb.style.width='130px';
  const att=[];const draw=()=>{chips.innerHTML='';att.forEach(f=>{const c=el('div','fchip',svgFile('#fff').replace('<svg','<svg class="fi"')+'<span></span>',chips);c.querySelector('span').textContent=f;const x=el('button','xb',IC.x,c);x.style.cssText+=';width:28px;height:28px';x.setAttribute('aria-label','はずす');a.on(x,'click',()=>{att.splice(att.indexOf(f),1);draw();});});a.prog(att.length?1:0,2);};
  a.on(clip,'click',()=>{if(A.querySelector('.pick'))return;const P=sw(A,330,20,560,396,'ファイルを えらぶ');P.W.classList.add('pick');P.W.style.zIndex='10';P.W.dataset.ovok='1';let ch=null;
   FILES.forEach((f,i)=>{const d=icoEl(P.body,20+(i%2)*260,10+Math.floor(i/2)*140,svgFile(f.includes('しゃしん')?'#bfe3ff':'#fff'),f);d.style.width='250px';
    a.on(d,'click',()=>{P.body.querySelectorAll('.ico').forEach(x=>x.classList.remove('sel'));d.classList.add('sel');ch=f;});a.on(d,'dblclick',()=>{ch=f;opn();});});
   const ob=pos(el('button','btn y abs','ひらく',P.body),50,292,210,52),cn=pos(el('button','btn abs','キャンセル',P.body),286,292,210,52);a.on(cn,'click',()=>P.W.remove());
   const opn=()=>{if(!ch){a.info('ファイルを クリックして えらぼう');return;}P.W.remove();if(att.includes(ch)){a.info('もう ついているよ');return;}att.push(ch);draw();se('cursor');a.good('ファイルが ついたよ');};
   a.on(ob,'click',opn);});
  a.on(sb,'click',()=>{if(!att.length){a.miss('ファイルが ついていないよ。クリップから 添付しよう');return;}
   if(att.length!==want.length||!want.every(w=>att.includes(w))){a.miss('ファイルが ちがうよ');return;}
   if(needMsg&&ip.value.trim().length<2){a.miss('メッセージも 書こう');return;}
   const mm=el('div','cm',null,sent);mm.style.justifyContent='flex-end';const bb=el('div','cbub',null,mm);bb.style.background='#e3eeff';bb.innerHTML='<div class="nm">あなた</div><div class="tx"></div>';bb.querySelector('.tx').textContent=(ip.value.trim()?ip.value.trim()+'　':'')+'（ファイル '+att.length+'こ）';
   chips.innerHTML='';ip.value='';a.prog(2,2);a.done();});}});

/* 26 共有の設定 */
STAGES.push({id:'share',g:1,title:'共有の 設定',icon:ICO.share,desc:'だれに、どこまで（編集できる・見るだけ）見せるかを決めて共有する。先生は「編集できる」。',
 how:{g:'tap1',cap:'クリックで えらぶ',lines:['共有する 人を 左の こうほから えらぶ','「編集できる」か「見るだけ」かを きめる（先生は 編集できる）','ちがう 人に 共有しないよう よく たしかめて 送信']},
 build(a,v){const A=a.area;let PL,goal,init={},note='';
  if(v==='p'){PL=[['たなか','同じ班'],['やまだ','となりの班'],['先生','たんにん'],['さとう','となりの クラス']];goal={たなか:'e',先生:'e'};}
  if(v===0){PL=[['たなか','同じ班'],['やまだ','となりの班'],['先生','たんにん'],['さとう','となりの クラス']];goal={たなか:'e',先生:'e',やまだ:'v'};}
  if(v===1){PL=[['たなか','同じ班'],['すずき','同じ班'],['こばやし','同じ班'],['先生','たんにん'],['さとう','となりの クラス']];goal={たなか:'e',すずき:'e',こばやし:'e',先生:'e'};}
  if(v===2){PL=[['たなか','同じ班'],['やまだ','班を ぬけた'],['先生','たんにん'],['さとう','となりの クラス']];goal={たなか:'e',先生:'e'};init={たなか:'e',やまだ:'e',先生:'v'};note='やまださんは 班を ぬけたよ。';}
  a.task(v==='p'?'同じ班の「たなか」さんと「先生」を「編集できる」で 共有しよう':v===0?'班の「たなか」さんと「先生」は 編集できる、となりの班の「やまだ」さんは 見るだけで 共有しよう':v===1?'班の 3人と 先生を「編集できる」で 共有しよう。となりの クラスの 人は 入れない':note+'班を ぬけた 人を はずして、先生を「見るだけ」から「編集できる」に かえよう');
  const D=pos(el('div','sw',null,A),136,4,952,428);el('div','swbar','「グループ発表」を 共有',D);const B=el('div','swbody',null,D);
  pos(el('div','abs lbl','こうほ（クリックで くわえる）',B),20,10);pos(el('div','abs lbl','共有する 人',B),390,10);
  const box=pos(el('div','abs',null,B),20,46,340);box.style.cssText+=';display:flex;flex-direction:column;gap:8px';
  const lst=pos(el('div','abs',null,B),390,42,540,290);
  const sh=Object.assign({},init);const keys=Object.keys(goal);
  const score=()=>keys.filter(k=>sh[k]===goal[k]).length;
  const draw=()=>{lst.innerHTML='';Object.keys(sh).forEach(n=>{const r=el('div','prow',null,lst);el('div','pn2',n,r);
    const e1=el('button','tg'+(sh[n]==='e'?' on':''),'編集できる',r),e2=el('button','tg'+(sh[n]==='v'?' on':''),'見るだけ',r),x=el('button','xb',IC.x,r);x.setAttribute('aria-label','はずす');
    a.on(e1,'click',()=>{sh[n]='e';draw();});a.on(e2,'click',()=>{sh[n]='v';draw();});a.on(x,'click',()=>{delete sh[n];draw();});});
   if(!Object.keys(sh).length){const e=el('div',null,'まだ だれも いません',lst);e.style.cssText='font-size:18px;color:#4d6290;padding:10px';}
   a.prog(score(),keys.length);};
  PL.forEach(p=>{const b=el('button','pbtn','<span class="a">'+p[0]+'</span><span class="b">'+p[1]+'</span>',box);
   a.on(b,'click',()=>{if(sh[p[0]]){a.info('もう 入っているよ');return;}sh[p[0]]='v';se('cursor');draw();});});
  draw();
  const sb=pos(el('button','btn y abs','送信',B),390,320,300,52);
  a.on(sb,'click',()=>{const k=Object.keys(sh);
   if(k.some(n=>!(n in goal))){a.miss('共有しなくて いい 人が 入っているよ');return;}
   if(keys.some(n=>!sh[n])){a.miss('まだ 入っていない 人が いるよ');return;}
   const bad=keys.find(n=>sh[n]!==goal[n]);if(bad){a.miss(bad+'さんの けんげんが ちがうよ');return;}
   a.done();});}});

/* 27 変更履歴 */
STAGES.push({id:'history',g:1,title:'変更履歴',icon:ICO.history,desc:'「変更履歴」を開き、版の一覧（だれが・いつ）から選んで「この版にもどす」。',
 how:{g:'tap1',cap:'「変更履歴」→ 版を えらぶ',lines:['「変更履歴」を クリックして ひらく','版を クリックすると、その ときの 中身が 見られる','もどしたい 版を えらんで「この版に もどす」']},
 build(a,v){const A=a.area;
  const P1='ごみのゆくえ',P2='<b>はじめ</b>　わたしの 家では 1週間に ごみぶくろ 3こ 分の ごみが 出ます。',P3='<b>なか</b>　しらべると、ごみの 半分は リサイクル できる ことが わかりました。',P4='<b>まとめ</b>　これからは ごみを 分けて 出したいです。';
  let V,want,task;
  if(v==='p'){V=[['11月8日 10:20','はると（いま）',[P1,P2,P3]],['11月8日 9:45','ゆい',[P1,P2,P3,P4]],['11月7日 15:10','はると',[P1,P2,P3,P4]],['11月6日 14:30','ゆい',[P1,P2]]];want=2;task='「11月7日 15:10　はると」の 版に もどそう';}
  if(v===0){V=[['11月8日 10:20','たろう（いま）',[P1,P2,P4]],['11月8日 10:05','たろう',[P1,P2,P3,P4]],['11月8日 9:30','ゆい',[P1,P2,P3]],['11月7日 16:00','はると',[P1,P2]]];want=1;task='友だちが まちがえて「なか」の 文を けしちゃった。けす 前の 版に もどそう';}
  if(v===1){V=[['11月8日 11:00','はると（いま）',[P1,P2]],['11月8日 10:30','はると',[P1,P2,P3]],['11月8日 9:50','ゆい',[P1,P2,P3,P4]],['11月7日 15:00','たろう',[P1]]];want=2;task='変更履歴の 一らんで「だれが」を 読んで、ゆいさんが 書いた 版に もどそう';}
  if(v===2){V=shuffle([['11月8日 10:40','（いま）',[P1,P2,P3]],['11月8日 10:10','はると',[P1,P2,P3,P4]],['11月8日 9:20','ゆい',[P1,P2]],['11月7日 14:00','たろう',[P1,P3,P4]]]);V.sort((x,y)=>y[0]>x[0]?1:-1);want=V.findIndex(x=>x[2].length===4);task='版の 中身を 見くらべて、「はじめ・なか・まとめ」が ぜんぶ そろっている 版に もどそう';}
  a.task(task);a.prog(0,2);
  const W=sw(A,16,4,720,428,'ワープロ ー ごみのゆくえ');const bh=el('button','tb',IC.hist+'変更履歴',W.bar);
  const info=pos(el('div','abs',null,W.body),16,8,680,30);info.style.cssText+=';font-size:16px;font-weight:700;color:#2a63c9';
  const D=pos(el('div','abs doc',null,W.body),0,34,712);D.style.cssText+=';font-size:20px;line-height:1.7;padding-top:0';
  const showDoc=(i)=>{const c=V[i][2];D.innerHTML='<div style="font-size:24px;font-weight:700;text-align:center">'+c[0]+'</div>'+c.slice(1).map(x=>'<div>'+x+'</div>').join('');info.textContent=i===0?'いまの 版':'見ている 版：'+V[i][0]+'　'+V[i][1];};
  showDoc(0);let selI=-1,opened=false;
  const PN=pos(el('div','sw',null,A),756,4,452,428);PN.style.display='none';el('div','swbar','変更履歴',PN);const PB=el('div','swbody',null,PN);PB.style.padding='12px';
  a.on(bh,'click',()=>{if(opened)return;opened=true;PN.style.display='block';a.prog(1,2);se('cursor');a.good('版を クリックすると 中身が 見られるよ');
   const L=el('div',null,null,PB);L.style.cssText='display:flex;flex-direction:column;gap:8px';
   const rows=V.map((x,i)=>{const r=el('button','vrow','<span class="v1">'+x[0]+'</span><span class="v2">'+x[1]+'</span>',L);a.on(r,'click',()=>{selI=i;rows.forEach((y,j)=>y.classList.toggle('on',j===i));showDoc(i);});return r;});
   const rb=el('button','btn y',null,PB);rb.textContent='この版に もどす';rb.style.cssText+=';width:420px;margin-top:16px';
   a.on(rb,'click',()=>{if(selI<0){a.info('さきに 版を えらぼう');return;}if(selI===0){a.info('それは いまの 版だよ');return;}
    if(selI!==want){a.miss('その 版では ないよ');return;}a.prog(2,2);info.textContent='「'+V[selI][0]+'」の 版に もどしました';a.done();});});}});

/* CapsLock */
/* CapsLock（キャップスロック） */
ICO.capslock=svg('<rect x="14" y="26" width="72" height="54" rx="10" fill="#fff" '+SW+'/><path d="M50 36l-14 16h8v12h12V52h8z" fill="#ffd23f" '+SW+'/><circle cx="76" cy="36" r="5" fill="#36c96f" stroke="#10264d" stroke-width="2.5"/>');
STAGES.push({id:'capslock',g:1,title:'CapsLock（キャップスロック）',icon:ICO.capslock,desc:'CapsLockのオン・オフで大文字と小文字が切りかわることを知り、使ったあとはオフにもどす。',
 how:{keys:[['Shift','英数','オン・オフ']],cap:'Shift を おしながら 英数キー',lines:['オンだと 大文字','切りかえ','さいごは オフ']},
 build(a,v){const A=a.area;const T=v==='p'?'ABC':v===0?'TOKYO':v===2?'ABCdef':'school';
  const P=pos(el('div','sw',null,A),212,10,800,416);el('div','swbar',v===1?'ログイン':'にゅうりょく',P);const B=el('div','swbody',null,P);
  const lamp=pos(el('div','abs',null,B),40,24,720,60);lamp.style.cssText+=';display:flex;align-items:center;gap:16px;font-size:24px;font-weight:700';
  const dot=el('span',null,null,lamp);dot.style.cssText='width:34px;height:34px;border-radius:50%;border:3px solid #10264d;background:#dfe5ee;flex:none';const lt=el('span',null,null,lamp);
  const q=pos(el('div','abs',null,B),40,100,720,50);q.style.cssText+=';display:flex;align-items:center;gap:16px;font-size:22px;font-weight:700';
  q.innerHTML=v===1?'パスワード：<span class="qbox" style="width:auto;padding:0 20px">school</span>（ぜんぶ 小文字）':'お題：<span class="qbox" style="width:auto;padding:0 20px"></span>';if(v!==1)q.querySelector('.qbox').textContent=T;
  const ip=pos(el('input','inp abs',null,B),40,170,720,60);ip.setAttribute('autocomplete','off');ip.setAttribute('spellcheck','false');ip.setAttribute('aria-label','入力');if(v===1)ip.type='password';
  const okb=pos(el('button','btn y abs',v===1?'ログイン':'けってい',B),250,262,300,56);
  let caps=null,used=false;const steps=v===1?1:3;a.prog(0,steps);
  const show=()=>{dot.style.background=caps===null?'#dfe5ee':caps?'#36c96f':'#dfe5ee';lt.textContent=caps===null?'CapsLock：キーを おすと わかるよ':caps?'CapsLock：オン（大文字に なる）':'CapsLock：オフ';};show();
  const upd=e=>{if(!e.getModifierState)return;const c=e.getModifierState('CapsLock');if(c!==caps){caps=c;show();if(v!==1&&a.alive()){if(caps&&!used){a.prog(1,3);a.good('オンに なった！ お題を うとう');}if(!caps&&used)a.info('オフに なったよ');}}};
  a.on(document,'keydown',e=>{upd(e);if(/^[A-Z]$/.test(e.key)&&!e.shiftKey&&e.getModifierState&&e.getModifierState('CapsLock'))used=true;
   if(/^[A-Z]$/.test(e.key)&&e.shiftKey&&v!==1)a.info('Shift では なく、CapsLock を オンに して うとう');},true);
  a.on(document,'keyup',upd,true);
  a.on(ip,'input',()=>{if(v!==1&&ip.value===T&&used)a.prog(2,3);});
  a.task(v===1?'パスワード「school」で ログインしよう。大文字に なって しまう ときは、CapsLock が オンに なって いないか たしかめよう':v===2?'「ABC」は CapsLock を オンに して、「def」は オフに もどして うとう。さいごは オフで「けってい」':'CapsLock を オンに して「'+T+'」と うち、オフに もどしてから「けってい」を おそう');
  a.on(okb,'click',()=>{const val=ip.value;
   if(v===1){if(val==='school'){a.prog(1,1);a.done();}else if(val.toLowerCase()==='school')a.miss('大文字に なって いるよ。CapsLock を オフに しよう');else a.miss('パスワードが ちがうよ');return;}
   if(val!==T){a.miss(val.toLowerCase()===T.toLowerCase()?'大文字と 小文字が ちがうよ':'お題と ちがうよ');return;}
   if(!used){a.miss('CapsLock を オンに して 大文字を うとう（Shift では なく）');return;}
   if(caps){a.miss('さいごに CapsLock を オフに もどそう');return;}
   a.prog(3,3);a.done();});
  a.start=()=>ip.focus();}});

/* 28 この 情報、しんじて いい？（情報モラル：情報の確かさ） */
ICO.trust=svg('<circle cx="42" cy="42" r="26" fill="#e3eeff" '+SW+'/><path d="M62 62l24 24" stroke="#10264d" stroke-width="10" stroke-linecap="round"/><path d="M30 42l9 9 16-18" fill="none" stroke="#36c96f" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>');
STAGES.push({id:'trust',g:1,title:'この 情報、しんじて いい？（情報モラル）',icon:ICO.trust,desc:'調べ学習で、だれが・いつ・なんのために書いたかを確かめて、信頼できるページを選ぶ。',
 how:{g:'tap1',cap:'3つを たしかめて えらぶ',lines:['だれが 書いた？（国や 市、専門の 人か）','いつ 書いた？（新しい 情報か）','なんの ため？（売るため・広告・うわさでは ないか）']},
 build(a,v){const A=a.area;
  const D=[{q:'日本で いちばん 高い 山の 高さ',r:[['ふじさんの 高さ','国の 地図を つくる 役所','2025年','正しい 地図を つたえる',''],['山すき たろうの ブログ','山が すきな 人（ひとり）','2012年','しゅみの 日記','ひとりの 人が むかしに 書いた 日記だよ'],['すごい山ランキング！','書いた人 わからない','わからない','広告が 多い','だれが いつ 書いたか わからないね'],['クイズゲームの こたえ集','ゲームの ファン','2019年','ゲームの こうりゃく','ゲームの ための ページだよ']]},
   {q:'台風が いま どこに いるか',r:[['台風の いまの いち','天気を しらべる 国の 役所','きょう','ぼうさいの ため',''],['去年の 台風ニュース','ニュース会社','1年前','むかしの ニュース','1年前の 台風の ことだよ'],['「台風 来るらしい！」','SNSの 書きこみ（だれか わからない）','きょう','うわさ','だれが 書いたか わからない うわさだよ'],['お天気 まとめブログ','書いた人 わからない','わからない','広告が 多い','だれが いつ 書いたか わからないね']]},
   {q:'カブトムシの よう虫が 食べる もの',r:[['よう虫の そだて方','みどり市 昆虫館','2024年','しらべた ことを つたえる',''],['カブトムシの えさ 大セール！','お店','2026年','ものを 売る','ものを 売る ための ページだよ'],['だれでも 書ける しつもん広場','書いた人 わからない','わからない','しつもんと こたえ','だれが 書いたか わからないね'],['むしの ページ（こうしん なし）','ひとりの 人','2016年','しゅみ','10年 近く 前から こうしん されていないよ']]}][v==='p'?0:v];
  a.task('「'+D.q+'」を しらべるよ。いちばん しんらい できる ページを えらぼう');a.prog(0,1);
  const W=sw(A,40,4,1144,428,'けんさく けっか');const B=W.body;let sel=-1;
  const L=shuffle(D.r.map((r,i)=>[r,i]));const rows=L.map(([r,i],k)=>{const b=pos(el('button','pres',null,B),20,8+k*76,1096,70);
   b.innerHTML='<div class="pt1"></div><div class="pt2"><span class="pm">書いた人：<b></b></span><span class="pm">日付：<b></b></span><span class="pm">なんの ため：<b></b></span></div>';
   b.querySelector('.pt1').textContent=r[0];const bs=b.querySelectorAll('.pm b');bs[0].textContent=r[1];bs[1].textContent=r[2];bs[2].textContent=r[3];
   a.on(b,'click',()=>{sel=k;rows.forEach((x,j)=>x.classList.toggle('on',j===k));se('cursor');a.info('だれが・いつ・なんの ため を たしかめたら「この ページで しらべる」');});return b;});
  const go2=pos(el('button','btn y abs','この ページで しらべる',B),412,318,320,52);
  a.on(go2,'click',()=>{if(sel<0){a.info('ページを クリックして えらぼう');return;}const r=L[sel][0];
   if(L[sel][1]!==0){a.miss(r[4]);return;}a.prog(1,1);a.done();});}});

/* 29 引用の ルール（情報モラル：著作権） */
ICO.quote=svg('<rect x="12" y="16" width="76" height="68" rx="8" fill="#fff" '+SW+'/><text x="22" y="58" font-size="40" font-weight="700" fill="#2a63c9">「</text><text x="52" y="78" font-size="40" font-weight="700" fill="#2a63c9">」</text>');
STAGES.push({id:'quote',g:1,title:'引用の ルール（情報モラル）',icon:ICO.quote,desc:'人の文を使うときは、そのまま「」でくくって引用し、出典（どこからとったか）を書く。',
 how:{keys:[['Ctrl','C','コピー'],['Ctrl','V','はりつけ']],cap:'そのまま うつして、出典を 書く',lines:['つかいたい 文を そのまま コピーする（書きかえない）','レポートの「　」の 中に はりつける','どこから とったか（出典）を かならず えらぶ']},
 build(a,v){const A=a.area;
  const D=[{t:'ごみの リサイクル',p:'みどり市 かんきょう課',x:'みどりしでは、しげんごみを まいしゅう すいようびに あつめています。\nペットボトルは あらって つぶしてから だします。\nかんと びんは べつの ふくろに いれます。',w:'ペットボトルは あらって つぶしてから だします。',o:[['みどり市 かんきょう課「ごみの リサイクル」',1],['インターネット',0],['みどり市',0]]},
   {t:'しらべる 日本の れきし',p:'ひかり出版　24ページ',x:'むかしの ひとは、こめを ぜいとして おさめました。\nむらでは みんなで たんぼの しごとを しました。\nまつりで ゆたかな みのりを いのりました。',w:'むかしの ひとは、こめを ぜいとして おさめました。',o:[['ひかり出版『しらべる 日本の れきし』24ページ',1],['本',0],['図書室',0]]},
   {t:'みどり子ども新聞',p:'2026年10月5日',x:'しの プールは らいねん あたらしく なります。\nこうじは ふゆから はじまります。\nなつやすみまでに おわる よていです。',w:'しの プールは らいねん あたらしく なります。',o:[['みどり子ども新聞 2026年10月5日',1],['新聞',0],['きのうの ニュース',0]]}][v==='p'?0:v];
  a.task('「'+D.w+'」を レポートに 引用して、出典を えらび「かんせい」を おそう');a.prog(0,2);
  const Lw=sw(A,16,4,560,428,'もとの 文');const LB=Lw.body;
  const t1=pos(el('div','abs',null,LB),20,10,512);t1.style.cssText+=';font-size:22px;font-weight:700';t1.textContent=D.t;
  const t2=pos(el('div','abs note',null,LB),20,46,512);t2.textContent=D.p;
  const tx=pos(el('textarea','inp abs'+(a.exam?'':' allowctx'),null,LB),20,84,512,276);tx.readOnly=true;tx.value=D.x;tx.style.fontSize='20px';tx.setAttribute('aria-label','もとの 文');
  const Rw=sw(A,596,4,612,428,'レポート');const RB=Rw.body;
  pos(el('div','abs lbl','引用',RB),20,10);
  const row=pos(el('div','abs',null,RB),20,40,572,52);row.style.cssText+=';display:flex;align-items:center;gap:6px';
  el('span','lbl','「',row).style.fontSize='26px';const ip=el('input','inp'+(a.exam?'':' allowctx'),null,row);ip.style.cssText+=';width:500px;font-size:17px';ip.setAttribute('autocomplete','off');ip.setAttribute('aria-label','引用');el('span','lbl','」',row).style.fontSize='26px';
  pos(el('div','abs lbl','出典（どこから とったか）',RB),20,106);
  let src=-1;const ob=shuffle(D.o.slice()).map((o,i)=>{const b=pos(el('button','sbtn2 abs',null,RB),20,140+i*52,572,44);b.textContent=o[0];b.style.textAlign='left';
   a.on(b,'click',()=>{src=i;ob.forEach((x,j)=>x.classList.toggle('on',j===i));se('cursor');a.prog((ok()?1:0)+1,2);});return b;});
  const opts=ob.map((b,i)=>null);void opts;const OO=shuffle;void OO;
  const order=ob.map(b=>D.o.find(o=>o[0]===b.textContent));
  const ok=()=>ip.value.trim()===D.w;let pasted=false;
  guardInput(a,ip,{typed:()=>a.info('うたないで、コピーと はりつけで そのまま うつそう'),del:()=>true,paste:()=>{pasted=true;},change:()=>{if(!pasted)return;pasted=false;
   if(ok()){a.prog(src>=0?2:1,2);a.good('そのまま うつせたね。つぎは 出典を えらぼう');}else a.info('つかう 文 だけを ぴったり えらんで コピーしよう');}});
  const fin=pos(el('button','btn y abs','かんせい',RB),156,302,300,52);
  a.on(fin,'click',()=>{if(!ip.value.trim()){a.info('引用する 文を はりつけよう');return;}
   if(!ok()){a.miss('引用は、つかう 文を そのまま ぜんぶ うつすよ');return;}
   if(src<0){a.miss('出典を かならず 書こう');return;}
   if(!order[src][1]){a.miss('出典が ちがうよ。どこの だれが 書いたか わかるように しよう');return;}
   a.prog(2,2);a.done();});}});
