/* =========================================================
   ふりがな（漢字に 小さく ふる）
   ========================================================= */
const KJR=/[一-鿿々]/;
const DAYS={1:'ついたち',2:'ふつか',3:'みっか',4:'よっか',5:'いつか',6:'むいか',7:'なのか',8:'ようか',9:'ここのか',10:'とおか',14:'じゅうよっか',20:'はつか',24:'にじゅうよっか'};
const FKEYS=Object.keys(FURI).concat(Object.keys(FURI_CTX)).sort((a,b)=>b.length-a.length);
function furiSplit(t){const out=[];let i=0,buf='';
 const push=(b,r)=>{if(buf){out.push(buf);buf='';}out.push([b,r]);};
 while(i<t.length){const ch=t[i];if(!KJR.test(ch)){buf+=ch;i++;continue;}
  const pm=/(\d+)$/.exec(t.slice(0,i));const num=pm?+pm[1]:null;
  if(num!=null&&ch==='日'&&t[i+1]!=='本'){if(DAYS[num]){buf=buf.slice(0,buf.length-pm[1].length);push(pm[1]+'日',DAYS[num]);}else push('日','にち');i++;continue;}
  if(num!=null&&ch==='人'){if(num<=2){buf=buf.slice(0,buf.length-pm[1].length);push(pm[1]+'人',num===1?'ひとり':'ふたり');}else push('人','にん');i++;continue;}
  if(num!=null&&ch==='本'){const n1=num%10;push('本',[1,6,8,0].includes(n1)?'ぽん':n1===3?'ぼん':'ほん');i++;continue;}
  if(num!=null&&ch==='分'){const n1=num%10;push('分',[1,3,4,6,8,0].includes(n1)?'ぷん':'ふん');i++;continue;}
  if(num!=null&&ch==='行'){push('行','ぎょう');i++;continue;}
  let hit=null;for(const k of FKEYS){if(t.startsWith(k,i)){hit=k;break;}}
  if(hit&&FURI_CTX[hit]){const c=FURI_CTX[hit];push(c[0],c[1]);i+=c[0].length;continue;}
  if(hit){push(hit,FURI[hit]);i+=hit.length;continue;}
  buf+=ch;i++;}
 if(buf)out.push(buf);return out;}
function furiNode(n){const p=n.parentNode;if(!p||p.closest&&p.closest('ruby,input,textarea,script,style,svg,.noruby,.sel-box'))return;
 const t=n.nodeValue;if(!KJR.test(t))return;const parts=furiSplit(t);if(parts.length===1&&typeof parts[0]==='string')return;
 const f=document.createDocumentFragment();parts.forEach(x=>{if(typeof x==='string')f.appendChild(document.createTextNode(x));else{const r=document.createElement('ruby');r.appendChild(document.createTextNode(x[0]));const rt=document.createElement('rt');rt.textContent=x[1];r.appendChild(rt);f.appendChild(r);}});
 p.replaceChild(f,n);}
function furiAll(root){if(root.nodeType===3){furiNode(root);return;}if(root.nodeType!==1)return;if(root.closest&&root.closest('ruby,input,textarea,svg,.noruby,.sel-box'))return;
 const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const L=[];let n;while(n=w.nextNode())L.push(n);L.forEach(furiNode);}
const FOBS=new MutationObserver(ms=>{FOBS.disconnect();ms.forEach(m=>{if(m.type==='characterData')furiNode(m.target);else m.addedNodes.forEach(furiAll);});FOBS.observe(APP,{childList:true,subtree:true,characterData:true});});
FOBS.observe(APP,{childList:true,subtree:true,characterData:true});
