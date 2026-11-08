/* =========================================================
   絵（SVG）とステージのアイコン
   ========================================================= */
const SW='stroke="#10264d" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"';
function svg(inner,vb){return '<svg viewBox="'+(vb||'0 0 100 100')+'">'+inner+'</svg>';}
const ART={
 りんご:svg('<circle cx="50" cy="58" r="32" fill="#e8533a" '+SW+'/><path d="M50 28q1-12 9-17" fill="none" stroke="#7a4a1c" stroke-width="5" stroke-linecap="round"/><path d="M53 24q14-14 27-5-12 13-27 5z" fill="#5aa83a" '+SW+'/><path d="M34 46q4-8 12-9" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".6"/>'),
 みかん:svg('<circle cx="50" cy="56" r="33" fill="#f39a2b" '+SW+'/><circle cx="40" cy="48" r="2" fill="#c56d10"/><circle cx="58" cy="62" r="2" fill="#c56d10"/><circle cx="62" cy="44" r="2" fill="#c56d10"/><circle cx="44" cy="68" r="2" fill="#c56d10"/><path d="M50 24q10-12 24-6-10 10-24 6z" fill="#5aa83a" '+SW+'/>'),
 ぶどう:svg('<path d="M52 12v12" stroke="#7a4a1c" stroke-width="5" stroke-linecap="round"/>'+[[38,32],[54,30],[70,34],[30,48],[46,48],[62,48],[78,50],[38,64],[54,64],[70,66],[46,80],[62,80]].map(p=>'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="10" fill="#8e5bd0" '+SW+'/>').join('')),
 バナナ:svg('<path d="M18 30q8 48 56 50 8 0 10-6-36-6-48-48-6-4-18 4z" fill="#ffd23f" '+SW+'/><path d="M14 26l8-4 4 6" fill="#7a4a1c" '+SW+'/>'),
 メロン:svg('<circle cx="50" cy="55" r="34" fill="#8fd16a" '+SW+'/><path d="M26 34q24 18 48 0M18 54q32 16 64 0M26 76q24-16 48 0M40 22q-8 34 0 66M60 22q8 34 0 66" fill="none" stroke="#e8f8d8" stroke-width="2.5"/><path d="M50 21v-9" stroke="#5a8a3a" stroke-width="5" stroke-linecap="round"/>'),
 にんじん:svg('<path d="M32 30l40 6-26 56z" fill="#f39a2b" '+SW+'/><path d="M44 46h10M48 62h8M42 38h12" stroke="#c56d10" stroke-width="3" stroke-linecap="round"/><path d="M48 30q-12-18-4-24 6 10 8 22M54 30q4-20 16-22-4 14-12 24" fill="#5aa83a" '+SW+'/>'),
 キャベツ:svg('<circle cx="50" cy="54" r="34" fill="#a8dc7c" '+SW+'/><path d="M50 22q-16 32 0 66M50 22q16 32 0 66M24 40q26 6 52 0" fill="none" stroke="#5aa83a" stroke-width="3"/>'),
 なす:svg('<ellipse cx="54" cy="60" rx="24" ry="32" fill="#6a3fa0" transform="rotate(-25 54 60)" '+SW+'/><path d="M30 26q12-6 22 6l-8 6q-8-6-14-12z" fill="#5aa83a" '+SW+'/><path d="M46 52q4-10 12-12" stroke="#fff" stroke-width="4" fill="none" opacity=".5" stroke-linecap="round"/>'),
 ぞう:svg('<ellipse cx="22" cy="50" rx="16" ry="22" fill="#9fb0c8" '+SW+'/><ellipse cx="78" cy="50" rx="16" ry="22" fill="#9fb0c8" '+SW+'/><circle cx="50" cy="46" r="26" fill="#b8c6da" '+SW+'/><path d="M44 62q0 22 10 26 6 2 8-4" fill="none" stroke="#10264d" stroke-width="12" stroke-linecap="round"/><path d="M44 62q0 22 10 26 6 2 8-4" fill="none" stroke="#b8c6da" stroke-width="5" stroke-linecap="round"/><circle cx="41" cy="42" r="3" fill="#10264d"/><circle cx="59" cy="42" r="3" fill="#10264d"/>'),
 いぬ:svg('<circle cx="50" cy="52" r="28" fill="#d9a066" '+SW+'/><path d="M24 30q-10 18-2 34 10-4 12-22zM76 30q10 18 2 34-10-4-12-22z" fill="#8a5a2b" '+SW+'/><circle cx="40" cy="48" r="3.5" fill="#10264d"/><circle cx="60" cy="48" r="3.5" fill="#10264d"/><ellipse cx="50" cy="62" rx="6" ry="4.5" fill="#10264d"/><path d="M44 70q6 5 12 0" fill="none" stroke="#10264d" stroke-width="3" stroke-linecap="round"/>'),
 ねずみ:svg('<circle cx="28" cy="34" r="16" fill="#c7cfdb" '+SW+'/><circle cx="72" cy="34" r="16" fill="#c7cfdb" '+SW+'/><ellipse cx="50" cy="58" rx="26" ry="24" fill="#dfe5ee" '+SW+'/><circle cx="41" cy="54" r="3" fill="#10264d"/><circle cx="59" cy="54" r="3" fill="#10264d"/><circle cx="50" cy="66" r="4" fill="#ff8fa0" '+SW+'/>'),
 ねこ:svg('<path d="M24 44l4-26 16 14M76 44l-4-26-16 14" fill="#f3b562" '+SW+'/><circle cx="50" cy="56" r="28" fill="#f3b562" '+SW+'/><circle cx="40" cy="52" r="3.5" fill="#10264d"/><circle cx="60" cy="52" r="3.5" fill="#10264d"/><path d="M46 62l4 4 4-4M22 58h14M64 58h14M24 66l12-3M64 63l12 3" fill="none" stroke="#10264d" stroke-width="2.5" stroke-linecap="round"/>'),
 うさぎ:svg('<ellipse cx="38" cy="26" rx="8" ry="22" fill="#fff" '+SW+'/><ellipse cx="62" cy="26" rx="8" ry="22" fill="#fff" '+SW+'/><circle cx="50" cy="62" r="26" fill="#fff" '+SW+'/><circle cx="41" cy="58" r="3.5" fill="#e8533a"/><circle cx="59" cy="58" r="3.5" fill="#e8533a"/><path d="M46 68l4 3 4-3" fill="none" stroke="#10264d" stroke-width="2.5"/>'),
 かぶとむし:svg('<ellipse cx="50" cy="62" rx="26" ry="30" fill="#7a4a1c" '+SW+'/><path d="M50 34v58" stroke="#10264d" stroke-width="3"/><circle cx="50" cy="32" r="13" fill="#5a3410" '+SW+'/><path d="M50 22q-2-14 8-20M50 20q-10-6-12-14" fill="none" stroke="#10264d" stroke-width="5" stroke-linecap="round"/><path d="M24 54l-14-6M24 66l-16 2M24 78l-12 8M76 54l14-6M76 66l16 2M76 78l12 8" stroke="#10264d" stroke-width="4" stroke-linecap="round"/><path d="M38 50q4-6 10-6" stroke="#fff" stroke-width="3" fill="none" opacity=".5"/>'),
 たいようの絵:svg('<rect width="100" height="100" fill="#bfe3ff"/><circle cx="50" cy="48" r="20" fill="#ffd23f" '+SW+'/>'+[0,45,90,135,180,225,270,315].map(d=>'<path d="M50 18v-10" transform="rotate('+d+' 50 48)" stroke="#f3a51b" stroke-width="5" stroke-linecap="round"/>').join('')+'<rect y="82" width="100" height="18" fill="#8fd18a"/>','0 0 100 100'),
 やまの絵:svg('<rect width="100" height="100" fill="#e8f6ff"/><path d="M-4 90L34 30l38 60z" fill="#5aa36a" '+SW+'/><path d="M40 90l30-44 34 44z" fill="#3d8a52" '+SW+'/><path d="M26 43l8-13 8 13-8 5z" fill="#fff"/><circle cx="80" cy="22" r="9" fill="#ffd23f"/>'),
 おうちの絵:svg('<rect width="100" height="100" fill="#fff6e3"/><path d="M14 50L50 18l36 32z" fill="#e8533a" '+SW+'/><rect x="22" y="50" width="56" height="38" fill="#ffd23f" '+SW+'/><rect x="44" y="64" width="14" height="24" fill="#a0703a" '+SW+'/><rect x="28" y="58" width="11" height="11" fill="#bfe3ff" '+SW+'/>'),
 らくがき:svg('<rect width="100" height="100" fill="#fff"/><path d="M14 30q20-24 30 6t28-6 14 26-30 10-20 20-14-24 22-16" fill="none" stroke="#7f8ca3" stroke-width="4" stroke-linecap="round"/><path d="M60 70q10 10 24 0" fill="none" stroke="#e8533a" stroke-width="4"/>'),
 カメラ:svg('<rect x="12" y="30" width="76" height="52" rx="10" fill="#4d6290" '+SW+'/><path d="M34 30l6-10h20l6 10" fill="#7f95bf" '+SW+'/><circle cx="50" cy="56" r="16" fill="#bfe3ff" '+SW+'/><circle cx="50" cy="56" r="7" fill="#10264d"/><circle cx="76" cy="40" r="3.5" fill="#ffd23f"/>'),
 ペイント:svg('<path d="M50 14c22 0 38 14 38 32 0 10-8 12-14 10-6-2-10 4-6 10 4 8-2 20-18 20-20 0-38-16-38-36s18-36 38-36z" fill="#fff4c2" '+SW+'/><circle cx="32" cy="38" r="6" fill="#e8533a"/><circle cx="50" cy="28" r="6" fill="#3fa9ff"/><circle cx="68" cy="36" r="6" fill="#36c96f"/><circle cx="30" cy="58" r="6" fill="#9b6bff"/>'),
 メモちょう:svg('<rect x="22" y="12" width="56" height="76" rx="6" fill="#fff" '+SW+'/><rect x="22" y="12" width="56" height="14" fill="#ffd23f" '+SW+'/><path d="M32 40h36M32 52h36M32 64h24" stroke="#7f95bf" stroke-width="4" stroke-linecap="round"/>'),
 でんたく:svg('<rect x="24" y="10" width="52" height="80" rx="8" fill="#a9b8cf" '+SW+'/><rect x="32" y="18" width="36" height="16" rx="3" fill="#e8f8d8" '+SW+'/>'+[0,1,2].map(r=>[0,1,2].map(c=>'<rect x="'+(32+c*13)+'" y="'+(42+r*14)+'" width="10" height="10" rx="2" fill="#fff" stroke="#10264d" stroke-width="2"/>').join('')).join('')),
 ブラウザ:svg('<circle cx="50" cy="50" r="36" fill="#3fa9ff" '+SW+'/><path d="M14 50h72M50 14q-18 36 0 72M50 14q18 36 0 72M22 30h56M22 70h56" fill="none" stroke="#fff" stroke-width="3"/>'),
 がっこう:svg('<rect x="12" y="40" width="76" height="48" fill="#fff4c2" '+SW+'/><path d="M8 42L50 18l42 24z" fill="#e8533a" '+SW+'/><rect x="42" y="60" width="16" height="28" fill="#a0703a" '+SW+'/><rect x="20" y="52" width="14" height="12" fill="#bfe3ff" '+SW+'/><rect x="66" y="52" width="14" height="12" fill="#bfe3ff" '+SW+'/><circle cx="50" cy="32" r="5" fill="#fff" '+SW+'/>'),
 こうえん:svg('<rect y="76" width="100" height="24" fill="#8fd18a"/><circle cx="30" cy="40" r="22" fill="#5aa36a" '+SW+'/><rect x="26" y="56" width="8" height="24" fill="#a0703a" '+SW+'/><path d="M54 70h38M58 70v10M88 70v10M54 62h38" stroke="#10264d" stroke-width="4" stroke-linecap="round"/>'),
 おちゃ:svg('<path d="M24 44h46v20a20 20 0 0 1-20 20h-6a20 20 0 0 1-20-20z" fill="#8fd16a" '+SW+'/><path d="M70 50q14 0 12 12-2 10-14 8" fill="none" '+SW+'/><path d="M36 34q-6-8 0-14M50 34q-6-8 0-14M62 34q-6-8 0-14" fill="none" stroke="#e8533a" stroke-width="3.5" stroke-linecap="round"/>'),
 ほん:svg('<path d="M14 30h64l8 8v42H22l-8-8z" fill="#3fa9ff" '+SW+'/><path d="M22 38h64M22 38v42M14 30l8 8" fill="none" '+SW+'/><path d="M30 46h48M30 54h48M30 62h48M30 70h48" stroke="#fff" stroke-width="2.5"/>'),
 なつ:svg('<circle cx="50" cy="50" r="20" fill="#ff9f43" '+SW+'/>'+[0,45,90,135,180,225,270,315].map(d=>'<path d="M50 20v-10" transform="rotate('+d+' 50 50)" stroke="#e8533a" stroke-width="5" stroke-linecap="round"/>').join('')),
 とけい:svg('<circle cx="50" cy="52" r="34" fill="#fff" '+SW+'/><path d="M50 52V30M50 52l14 8" stroke="#10264d" stroke-width="5" stroke-linecap="round"/><circle cx="50" cy="52" r="4" fill="#e8533a"/>'),
 ものさし:svg('<rect x="6" y="38" width="88" height="26" rx="4" fill="#ffd23f" '+SW+'/>'+[0,1,2,3,4,5,6,7,8].map(i=>'<path d="M'+(14+i*9.5)+' 38v'+(i%2?8:13)+'" stroke="#10264d" stroke-width="2.5"/>').join('')),
 はかり:svg('<rect x="18" y="56" width="64" height="30" rx="6" fill="#a9b8cf" '+SW+'/><path d="M14 50h72" stroke="#10264d" stroke-width="6" stroke-linecap="round"/><circle cx="50" cy="71" r="10" fill="#fff" '+SW+'/><path d="M50 71l5-6" stroke="#e8533a" stroke-width="3"/><path d="M36 50q14-26 28 0z" fill="#e8533a" '+SW+'/>'),
 きかい:svg('<circle cx="40" cy="56" r="20" fill="#a9b8cf" '+SW+'/><circle cx="40" cy="56" r="7" fill="#fff" '+SW+'/>'+[0,60,120,180,240,300].map(d=>'<rect x="36" y="28" width="8" height="10" transform="rotate('+d+' 40 56)" fill="#a9b8cf" '+SW+'/>').join('')+'<circle cx="72" cy="34" r="12" fill="#ffd23f" '+SW+'/><circle cx="72" cy="34" r="4" fill="#fff"/>'),
 チャンス:svg('<path d="M50 10l11 24 26 3-19 18 5 26-23-13-23 13 5-26-19-18 26-3z" fill="#ffd23f" '+SW+'/>')
};
function flowerSvg(c){return svg('<g fill="'+c+'" '+SW+'>'+[0,72,144,216,288].map(d=>'<ellipse cx="50" cy="28" rx="13" ry="20" transform="rotate('+d+' 50 50)"/>').join('')+'</g><circle cx="50" cy="50" r="12" fill="#ffd23f" '+SW+'/>');}
const ICO={
 login:svg('<rect x="22" y="44" width="56" height="44" rx="8" fill="#ffd23f" '+SW+'/><path d="M34 44V32a16 16 0 0 1 32 0v12" fill="none" stroke="#10264d" stroke-width="7"/><circle cx="50" cy="62" r="6" fill="#10264d"/><path d="M50 66v10" stroke="#10264d" stroke-width="5"/>'),
 click:svg('<circle cx="40" cy="40" r="26" fill="none" stroke="#3fa9ff" stroke-width="5" stroke-dasharray="8 7"/><path d="M40 40l40 16-16 6-6 16z" fill="#fff" '+SW+'/>'),
 dbl:svg(svgFolder(true).replace(/<\/?svg[^>]*>/g,'').replace('','')+'','0 0 86 80'),
 rclick:svg('<rect x="34" y="20" width="56" height="64" rx="8" fill="#fff" '+SW+'/><path d="M42 36h40M42 52h40M42 68h40" stroke="#7f95bf" stroke-width="5" stroke-linecap="round"/><path d="M12 12l26 10-10 4-4 10z" fill="#ffd23f" '+SW+'/>'),
 drag:svg('<rect x="52" y="52" width="36" height="36" rx="8" fill="#fff" stroke="#10264d" stroke-width="3.5" stroke-dasharray="6 5"/><rect x="12" y="14" width="36" height="36" rx="8" fill="#ff9f43" '+SW+'/><path d="M40 40l26 26" stroke="#10264d" stroke-width="5" stroke-linecap="round"/><path d="M56 70l12-2-2-12" fill="none" stroke="#10264d" stroke-width="5" stroke-linecap="round"/>'),
 scroll:svg('<rect x="20" y="10" width="50" height="80" rx="8" fill="#fff" '+SW+'/><path d="M30 26h30M30 40h30M30 54h30M30 68h30" stroke="#7f95bf" stroke-width="5" stroke-linecap="round"/><path d="M84 20v60M76 30l8-10 8 10M76 70l8 10 8-10" fill="none" stroke="#10264d" stroke-width="5" stroke-linecap="round"/>'),
 zoom:svg('<circle cx="42" cy="42" r="26" fill="#e3eeff" '+SW+'/><path d="M62 62l24 24" stroke="#10264d" stroke-width="10" stroke-linecap="round"/><path d="M42 30v24M30 42h24" stroke="#2a63c9" stroke-width="6" stroke-linecap="round"/>'),
 stamp:IC.like.replace('viewBox="0 0 32 32"','viewBox="0 0 32 32"'),
 search:svg('<rect x="8" y="22" width="84" height="30" rx="15" fill="#fff" '+SW+'/><circle cx="72" cy="66" r="14" fill="#e3eeff" '+SW+'/><path d="M82 76l10 10" stroke="#10264d" stroke-width="7" stroke-linecap="round"/><path d="M20 37h30" stroke="#7f95bf" stroke-width="5" stroke-linecap="round"/>'),
 fileopen:svg('<path d="M30 12h30l14 14v62H30z" fill="#fff" '+SW+'/><path d="M60 12v14h14" fill="#dfe9fb" '+SW+'/><path d="M38 40h28M38 52h28M38 64h20" stroke="#7f95bf" stroke-width="4" stroke-linecap="round"/><path d="M14 60l20 12-6 4" fill="none" stroke="#e8533a" stroke-width="5" stroke-linecap="round"/>'),
 input:svg('<rect x="14" y="20" width="72" height="60" rx="12" fill="#fff" '+SW+'/><text x="50" y="63" text-anchor="middle" font-size="40" font-weight="700" fill="#10264d">あ</text>'),
 select:svg('<rect x="10" y="30" width="80" height="40" rx="8" fill="#fff" '+SW+'/><rect x="30" y="40" width="34" height="20" fill="#3d8bff"/><path d="M20 50h6M70 50h10" stroke="#7f95bf" stroke-width="5" stroke-linecap="round"/><path d="M64 34v32" stroke="#10264d" stroke-width="3"/>'),
 copy:svg('<rect x="36" y="34" width="44" height="54" rx="6" fill="#fff" '+SW+'/><rect x="18" y="14" width="44" height="54" rx="6" fill="#e3eeff" '+SW+'/><path d="M28 30h24M28 42h24M28 54h16" stroke="#7f95bf" stroke-width="4" stroke-linecap="round"/>'),
 cut:svg('<circle cx="30" cy="74" r="12" fill="#ff6b6b" '+SW+'/><circle cx="70" cy="74" r="12" fill="#ff6b6b" '+SW+'/><path d="M38 64L70 14M62 64L30 14" stroke="#10264d" stroke-width="6" stroke-linecap="round"/>'),
 undo:svg('<path d="M36 58L16 38l20-20" fill="none" stroke="#10264d" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 38h42a22 22 0 0 1 0 44H44" fill="none" stroke="#2a63c9" stroke-width="8" stroke-linecap="round"/>'),
 folder:svg('<g transform="translate(-2 -6) scale(.62)">'+svgFolder(false,'#ff9f43').replace(/<\/?svg[^>]*>/g,'')+'</g><g transform="translate(40 34) scale(.62)">'+svgFolder(false,'#7fc8ff').replace(/<\/?svg[^>]*>/g,'')+'</g>','0 0 96 90'),
 save:svg('<rect x="14" y="14" width="72" height="72" rx="8" fill="#2a63c9" '+SW+'/><rect x="28" y="14" width="44" height="26" fill="#fff" '+SW+'/><rect x="58" y="20" width="8" height="14" fill="#10264d"/><rect x="26" y="54" width="48" height="32" fill="#e3eeff" '+SW+'/>'),
 search2:svg('<rect x="6" y="22" width="88" height="30" rx="15" fill="#fff" '+SW+'/><rect x="16" y="30" width="26" height="14" rx="4" fill="#ffd23f"/><rect x="48" y="30" width="26" height="14" rx="4" fill="#7fc8ff"/><circle cx="74" cy="70" r="12" fill="#e3eeff" '+SW+'/><path d="M83 79l9 9" stroke="#10264d" stroke-width="6" stroke-linecap="round"/>'),
 image:svg('<rect x="12" y="18" width="76" height="62" rx="6" fill="#bfe3ff" '+SW+'/><path d="M12 70l24-24 18 18 12-12 22 22v6H12z" fill="#5aa36a" '+SW+'/><circle cx="68" cy="36" r="7" fill="#ffd23f"/><circle cx="88" cy="80" r="7" fill="#fff" stroke="#3d8bff" stroke-width="4"/>'),
 typing:svg('<rect x="6" y="30" width="88" height="46" rx="8" fill="#e3eeff" '+SW+'/>'+[0,1,2].map(r=>[0,1,2,3,4,5].map(c=>'<rect x="'+(13+c*13+(r%2)*4)+'" y="'+(37+r*12)+'" width="9" height="8" rx="2" fill="#fff" stroke="#10264d" stroke-width="2"/>').join('')).join('')),
 kanji:svg('<rect x="16" y="16" width="68" height="68" rx="12" fill="#fff4c2" '+SW+'/><text x="50" y="67" text-anchor="middle" font-size="44" font-weight="700" fill="#10264d">漢</text>'),
 short:svg('<rect x="8" y="30" width="44" height="40" rx="8" fill="#fff" stroke="#10264d" stroke-width="3.5"/><text x="30" y="56" text-anchor="middle" font-size="15" font-weight="700" fill="#10264d">Ctrl</text><rect x="58" y="30" width="34" height="40" rx="8" fill="#ffd23f" stroke="#10264d" stroke-width="3.5"/><text x="75" y="58" text-anchor="middle" font-size="22" font-weight="700" fill="#10264d">C</text>'),
 replace:svg('<rect x="8" y="16" width="50" height="26" rx="6" fill="#fff" '+SW+'/><rect x="42" y="58" width="50" height="26" rx="6" fill="#ffd23f" '+SW+'/><path d="M66 22h16v24M76 38l6 8 6-8" fill="none" stroke="#10264d" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>'),
 comment:svg('<path d="M12 16h76v52H40L20 86V68h-8z" fill="#fff4c2" '+SW+'/><path d="M26 34h48M26 48h32" stroke="#7f95bf" stroke-width="5" stroke-linecap="round"/>'),
 attach:svg(IC.clip.replace(/<\/?svg[^>]*>/g,''),'0 0 24 24'),
 share:svg('<circle cx="34" cy="34" r="13" fill="#ffd23f" '+SW+'/><path d="M10 82q0-28 24-28t24 28z" fill="#ffd23f" '+SW+'/><circle cx="68" cy="38" r="11" fill="#7fc8ff" '+SW+'/><path d="M48 82q2-24 20-24t22 24z" fill="#7fc8ff" '+SW+'/>'),
 history:svg('<circle cx="50" cy="52" r="34" fill="#fff" '+SW+'/><path d="M50 32v20l14 10" stroke="#10264d" stroke-width="6" stroke-linecap="round"/><path d="M14 30l4 16 14-6" fill="none" stroke="#2a63c9" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>')
};
ICO.dbl=svgFolder(true);ICO.attach='<svg viewBox="0 0 24 24" fill="none" stroke="#10264d" stroke-width="2" stroke-linecap="round"><path d="M20 11l-8 8a5 5 0 0 1-7-7l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7L9.7 16.7a1.7 1.7 0 0 1-2.4-2.4L15 6.6"/></svg>';

/* ぶつかりにくい ランダムな場所 */
function spots(n,w,h,W,H,gap){const r=[];let t=0;while(r.length<n&&t<4000){t++;const x=Math.random()*(W-w),y=Math.random()*(H-h);
 if(r.every(p=>Math.abs(p.x-x)>w+gap||Math.abs(p.y-y)>h+gap))r.push({x,y});}return r;}
function tgtSvg(c){const a=c==='b'?['#3f8cff','#fff','#3f8cff']:['#ff5a6e','#fff','#ff5a6e'];
 return svg('<circle cx="50" cy="50" r="46" fill="'+a[0]+'" stroke="#10264d" stroke-width="6"/><circle cx="50" cy="50" r="30" fill="'+a[1]+'"/><circle cx="50" cy="50" r="15" fill="'+a[2]+'"/>');}

/* =========================================================
   3級（1・2年）
   ========================================================= */
/* 1 ログイン・ログアウト */
STAGES.push({id:'login',g:3,title:'ログイン・ログアウト',icon:ICO.login,desc:'IDとパスワード（数字）でログインし、ログアウトする。パスワードは●で隠れること、人に教えないことを知る。',
 how:{g:'tap1',cap:'クリックして 入力',lines:['ID の らんを クリックして、カードの 数字を うつ','パスワードは ● で かくれるよ。人に おしえない','「ログイン」を クリック。おわったら「ログアウト」']},
 build(a,v){const id=String(1000+(Math.random()*9000|0)),pw=String(1000+(Math.random()*9000|0));
  const card=pos(el('div','sw',null,a.area),30,40,360,300);card.style.background='#fff4c2';
  card.innerHTML='<div style="position:absolute;left:0;top:0;width:100%;height:46px;background:#ffd23f;border-bottom:3px solid #10264d;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700">ログイン カード</div>';
  const cb=pos(el('div','abs',null,card),24,66,310);cb.style.cssText+=';font-size:22px;line-height:2.1';
  cb.innerHTML='なまえ：<b>'+esc(SAVE.name)+'</b><br>ID：<b style="font-size:32px;letter-spacing:4px">'+id+'</b><br>パスワード：<b style="font-size:32px;letter-spacing:4px">'+pw+'</b>';
  const W=sw(a.area,430,4,760,428,'がっこうの パソコン');const B=W.body;B.style.background='#eaf2ff';
  const steps=(v==='p'||v===0)?2:1;let ph=0;a.prog(0,steps);
  const form=()=>{B.innerHTML='';
   const t=pos(el('div','abs',null,B),0,22,752);t.style.cssText+=';text-align:center;font-size:26px;font-weight:700';t.textContent='ログイン';
   pos(el('div','abs lbl','ID',B),90,84);const i1=pos(el('input','inp abs',null,B),250,72,420);i1.setAttribute('autocomplete','off');i1.setAttribute('inputmode','numeric');
   pos(el('div','abs lbl','パスワード',B),90,164);const i2=pos(el('input','inp abs',null,B),250,152,420);i2.type='password';i2.setAttribute('autocomplete','new-password');
   const err=pos(el('div','abs',null,B),250,214,420);err.style.cssText+=';font-size:18px;font-weight:700;color:#d23b3b;height:26px';
   const go2=pos(el('button','btn y abs','ログイン',B),250,252,420,56);
   if(v===1){i1.value=id;i2.value=String((+pw+1111)%10000).padStart(4,'0');err.textContent='パスワードが ちがいます';}
   const tryLogin=()=>{const a1=z2h(i1.value).trim(),a2=z2h(i2.value).trim();
    if(!a1||!a2){a.info('ID と パスワードを 入れよう');return;}
    if(a1!==id||a2!==pw){a.miss('ID か パスワードが ちがうよ。カードを よく 見よう');err.textContent='ID か パスワードが ちがいます';return;}
    ph++;a.prog(ph,steps);se('decide');if(steps===1){desk(false);a.done();}else{desk(true);a.good('ログイン できた！ こんどは ログアウト しよう');a.task('こんどは「ログアウト」を クリックしよう');}};
   a.on(go2,'click',tryLogin);a.on(i2,'keydown',e=>{if(e.key==='Enter'){e.preventDefault();tryLogin();}});a.on(i1,'keydown',e=>{if(e.key==='Enter'){e.preventDefault();i2.focus();}});
   a.on(i2,'focus',()=>a.info('パスワードは ● で かくれるよ。人には おしえないでね'));
   if(v===2){const m=pos(el('div','sw popin',null,B),110,40,540,290);m.style.zIndex='5';m.dataset.ovok='1';
    el('div','swbar','メッセージ',m);const mb=pos(el('div','abs',null,m),24,62,490);mb.style.cssText+=';font-size:22px;line-height:1.6';
    mb.innerHTML='<b>だれか</b>：「きみの パスワード おしえて！<br>かわりに ログイン してあげるよ」';
    const y=pos(el('button','btn abs','おしえる',m),40,176,210,56),n=pos(el('button','btn abs','おしえない',m),282,176,210,56);
    a.on(y,'click',()=>a.miss('パスワードは だれにも おしえないよ'));a.on(n,'click',()=>{m.remove();se('decide');a.good('そうだね。パスワードは ひみつ！');a.task('カードの ID と パスワードで ログインしよう');});}
   if(v===1)a.later(()=>{i2.focus();i2.select();},500);};
  const desk=(lo)=>{B.innerHTML='';B.style.background='linear-gradient(160deg,#2a63c9,#62a9ff)';
   const w=pos(el('div','abs',null,B),0,90,752);w.style.cssText+=';text-align:center;font-size:30px;font-weight:700;color:#fff;-webkit-text-stroke:5px #10264d;paint-order:stroke fill';w.textContent='ようこそ、'+SAVE.name+' さん';
   if(lo){const b=pos(el('button','btn abs','ログアウト',B),556,10,180,52);a.on(b,'click',()=>{se('decide');ph++;a.prog(ph,steps);B.innerHTML='';B.style.background='#10264d';
     const t=pos(el('div','abs',null,B),0,150,752);t.style.cssText+=';text-align:center;font-size:26px;font-weight:700;color:#fff';t.textContent='ログアウト しました';a.done();});}};
  a.task(v===1?'パスワードが ちがっていた！ けして、カードの パスワードを 入れなおそう':v===2?'メッセージが きたよ。よく 考えて えらぼう':(v===0||v==='p')?'カードの ID と パスワードで ログインして、ログアウトまで しよう':'カードの ID と パスワードで ログインしよう');
  form();}});

/* 2 クリック */
STAGES.push({id:'click',g:3,title:'クリック',icon:ICO.click,desc:'1本指でトン（左下をカチッ）。ものを選ぶ・ボタンを押す基本の操作。',
 how:{g:'tap1',cap:'左下を カチッ（または トン）',lines:['パッドの 左下を「カチッ」と おしこむ','または 1本の ゆびで パッドを かるく「トン」','やじるしを まとに あわせてから おそう']},
 build(a,v){const N=5;let n=0;a.prog(0,N);const W=1224,H=436;
  const size=v===0?38:v===1?64:76;
  a.task(v===0?'小さい まとを 5かい クリックしよう':v===1?'うごく まとを 5かい クリックしよう':v===2?'赤い まとだけを 5かい クリックしよう。青い まとは さわらない':'あらわれる まとを クリックしよう');
  let tg=[];const clear=()=>{tg.forEach(t=>t.remove());tg=[];};
  const mk=(c)=>{const t=el('button','tgt',tgtSvg(c),a.area);t.style.width=t.style.height=size+'px';t.setAttribute('aria-label','まと');tg.push(t);return t;};
  const round=()=>{clear();
   if(v===2){const sp=spots(4,size,size,W-40,H-40,30);sp.forEach((p,i)=>{const t=mk(i===0?'r':'b');pos(t,p.x+20,p.y+20);
     a.on(t,'click',()=>{if(i===0)hit();else a.miss('青い まとは さわらないよ');});a.on(t,'contextmenu',()=>a.miss('それは 右クリック。左下を カチッと おそう'));});return;}
   const t=mk('r');const p={x:40+Math.random()*(W-80-size),y:20+Math.random()*(H-40-size)};pos(t,p.x,p.y);
   a.on(t,'click',hit);a.on(t,'contextmenu',()=>a.miss('それは 右クリック。左下を カチッと おそう'));
   if(v===1){let dx=(Math.random()<.5?-1:1)*1.3,dy=(Math.random()<.5?-1:1)*1.0;t._mv=a.every(()=>{p.x+=dx;p.y+=dy;if(p.x<10||p.x>W-size-10)dx=-dx;if(p.y<10||p.y>H-size-10)dy=-dy;pos(t,p.x,p.y);},30);}};
  const hit=()=>{n++;a.prog(n,N);if(n>=N){a.done();return;}a.good('いいね！ つぎの まとへ');round();};
  round();}});

/* 3 ダブルクリック */
STAGES.push({id:'dbl',g:3,title:'ダブルクリック',icon:ICO.dbl,desc:'1本指でトントン。フォルダーやアプリを開く。',
 how:{g:'dbl',cap:'左下を カチカチッ（または トントン）',lines:['パッドの 左下を「カチカチッ」と 2かい つづけて おしこむ','または 1本の ゆびで「トントン」','ゆっくりだと 1かいの クリックに なるよ']},
 build(a,v){const A=a.area;let n=0;
  const single=(d,tm)=>{A.querySelectorAll('.ico').forEach(x=>x.classList.remove('sel'));d.classList.add('sel');};
  const bindIco=(d,onOpen)=>{let tm=null;
   a.on(d,'click',e=>{single(d);if(e.detail===1){clearTimeout(tm);tm=a.later(()=>a.info('いまのは 1かいの クリック。もっと はやく カチカチッ'),600);}});
   a.on(d,'dblclick',()=>{clearTimeout(tm);onOpen();});
   a.on(d,'contextmenu',()=>a.miss('それは 右クリック。左下を カチカチッ'));};
  if(v==='p'){const names=['こくご','さんすう','せいかつ'];a.prog(0,3);a.task('フォルダーを ダブルクリックして ぜんぶ ひらこう');
   names.forEach((nm,i)=>{const d=icoEl(A,250+i*300,140,svgFolder(false),nm);let op=false;
    bindIco(d,()=>{if(op)return;op=true;d.querySelector('svg').outerHTML=svgFolder(true);n++;a.prog(n,3);if(n>=3)a.done();else a.good('ひらいた！');});});}
  if(v===0){const names=shuffle(['こくご','さんすう','せいかつ','おんがく','ずこう']);a.prog(0,1);a.task('「せいかつ」の フォルダーだけを ひらこう');
   names.forEach((nm,i)=>{const d=icoEl(A,110+i*210,150,svgFolder(false),nm);bindIco(d,()=>{if(nm!=='せいかつ'){a.miss('ちがう フォルダーだよ');return;}d.querySelector('svg').outerHTML=svgFolder(true);a.prog(1,1);a.done();});});}
  if(v===1){const names=shuffle(['どうぶつ','しょくぶつ','のりもの','たべもの']);a.prog(0,2);a.task('「どうぶつ」の フォルダーを ひらいて、中の「いぬ」を ひらこう');
   names.forEach((nm,i)=>{const d=icoEl(A,30,10+i*104,svgFolder(false),nm);d.style.height='100px';d.querySelector('svg').style.cssText='width:60px;height:56px';
    bindIco(d,()=>{if(nm!=='どうぶつ'){a.miss('ちがう フォルダーだよ');return;}if(A.querySelector('.sw'))return;a.prog(1,2);a.good('ひらいた！');
     const W=sw(A,260,20,900,400,'どうぶつ');shuffle(['ねこ','いぬ','うさぎ']).forEach((an,j)=>{const f=icoEl(W.body,120+j*240,90,ART[an],an);f.style.width='150px';
      bindIco(f,()=>{if(an!=='いぬ'){a.miss('ちがう ファイルだよ');return;}a.prog(2,2);W.title.textContent='いぬ';W.body.innerHTML=ART.いぬ;W.body.firstChild.style.cssText='width:280px;height:280px;margin:30px 306px';a.done();});});});});}
  if(v===2){const names=shuffle(['カメラ','ペイント','メモちょう','でんたく','ブラウザ']);a.prog(0,1);a.task('デスクトップの アイコンから「カメラ」を ひらこう');
   A.style.background='linear-gradient(160deg,#2a63c9,#62a9ff)';
   names.forEach((nm,i)=>{const d=icoEl(A,30+(i%2)*150,10+Math.floor(i/2)*140,ART[nm],nm);d.querySelector('.in').style.cssText='color:#fff;-webkit-text-stroke:4px #10264d;paint-order:stroke fill';
    bindIco(d,()=>{if(nm!=='カメラ'){a.miss('ちがう アプリだよ');return;}a.prog(1,1);const W=sw(A,400,30,640,380,'カメラ');W.body.style.background='#222';W.body.innerHTML=svg('<circle cx="50" cy="50" r="30" fill="none" stroke="#fff" stroke-width="3"/><circle cx="50" cy="50" r="4" fill="#ff5a6e"/>');W.body.firstChild.style.cssText='width:200px;height:200px;margin:60px 216px';a.done();});});
   a.on(A,'pointerdown',e=>{if(!e.target.closest('.ico'))A.querySelectorAll('.ico').forEach(x=>x.classList.remove('sel'));});}
 }});

/* 4 右クリック */
STAGES.push({id:'rclick',g:3,title:'右クリック',icon:ICO.rclick,desc:'2本指でトン（右下をカチッ）。メニューを出していいね・コピー・さくじょなどを選ぶ。',
 how:{g:'tap2',cap:'右下を カチッ（または 2本ゆびで トン）',lines:['パッドの 右下を「カチッ」と おしこむ','または 2本の ゆびを そろえて「トン」','メニューが 出たら 左クリックで えらぶ']},
 build(a,v){const A=a.area;
  let P=[['たいようの絵','たいようの え'],['やまの絵','やまの え'],['おうちの絵','おうちの え']];
  if(v===1)P=[['たいようの絵','たいようの え']];
  if(v===2)P=shuffle([['らくがき','らくがき'],['やまの絵','やまの え'],['おうちの絵','おうちの え']]);
  if(v===0)P=shuffle(P);
  const need=v==='p'?3:v===0?1:v===1?1:3;let n=0;a.prog(0,need);
  a.task(v==='p'?'絵を 右クリックして、メニューから「いいね」を えらぼう（3まい）':v===0?'「やまの え」だけに いいね しよう':v===1?'絵を 右クリックして「コピー」を えらぼう':'「らくがき」は さくじょ、のこりの 2まいには いいね しよう');
  const W0=v===1?360:300,gap=80,x0=(1224-(P.length*W0+(P.length-1)*gap))/2;
  P.forEach((p,i)=>{const c=pos(el('div','sw',null,A),x0+i*(W0+gap),30,W0,340);c.style.cursor='context-menu';
   const pic=el('div',null,ART[p[0]],c);pic.dataset.clip='1';pic.style.cssText='position:absolute;left:14px;top:14px;right:14px;height:'+(v===1?250:220)+'px;border:3px solid #10264d;border-radius:8px;overflow:hidden';pic.firstChild.style.cssText='width:100%;height:100%';pic.firstChild.setAttribute('preserveAspectRatio','xMidYMid slice');
   const nm=pos(el('div','abs',null,c),0,v===1?276:248,W0-8);nm.style.cssText+=';text-align:center;font-size:21px;font-weight:700';nm.textContent=p[1];
   const lk=pos(el('div','abs',null,c),0,286,W0-8);lk.style.cssText+=';display:flex;justify-content:center';
   let liked=false,gone=false;
   const like=()=>{if(liked){a.info('この 絵には もう いいね したよ');return;}
     if(v===0&&p[0]!=='やまの絵'){a.miss('「やまの え」だけに いいね するよ');return;}
     if(v===2&&p[0]==='らくがき'){a.miss('らくがきは さくじょ するよ');return;}
     if(v===1){a.miss('いまは「コピー」を えらぼう');return;}
     liked=true;se('fav');lk.innerHTML='<span class="rchip mine" style="cursor:default">'+IC.heartR+'いいね</span>';n++;a.prog(n,need);if(n>=need)a.done();else a.good('いいね できた！');};
   const copy=()=>{if(v===1){a.toast('コピー しました',x0+i*(W0+gap)+60,380);n++;a.prog(n,need);a.done();return;}a.miss(v==='p'?'いまは「いいね」を えらぼう':'コピーでは ないよ');};
   const del=()=>{if(v===2&&p[0]==='らくがき'){gone=true;c.style.transition='opacity .3s,transform .3s';c.style.opacity='0';c.style.transform='scale(.7)';a.later(()=>c.remove(),320);n++;a.prog(n,need);if(n>=need)a.done();else a.good('さくじょ できた！');return;}
     a.miss(v==='p'?'けしちゃ だめ。「いいね」を えらぼう':'その 絵は けさないよ');};
   a.on(c,'contextmenu',e=>{e.preventDefault();if(gone)return;a.menu(e,[{t:'コピー',ic:'copy',fn:copy},{t:'いいね',ic:'heartR',fn:like},{t:'さくじょ',ic:'trash',fn:del}]);});
   a.on(c,'click',()=>{if(!a.menuOpen()&&!gone)a.miss('それは 左クリック。右下を カチッと おそう');});});
 }});

/* 5 ドラッグ＆ドロップ */
STAGES.push({id:'drag',g:3,title:'ドラッグ＆ドロップ',icon:ICO.drag,desc:'おしたまま動かしてはなす。ものを動かす・しわける操作。',
 how:{g:'drag',cap:'左下を おしこんだまま なぞる',lines:['うごかしたい ものに やじるしを あわせる','左下を おしこんだまま、べつの ゆびで パッドを なぞる','かごの 上で 左下の ゆびを はなす']},
 build(a,v){const A=a.area;
  const card=(nm,x,y)=>{const d=pos(el('div','card2',null,A),x,y);d.innerHTML=ART[nm]+'<span>'+nm+'</span>';return d;};
  const zone=(x,y,w,h,label)=>{const z=pos(el('div','zone',null,A),x,y,w,h);el('div','zl',label,z);return z;};
  const place=(d,z,k,cols)=>{d.dataset.lock='1';d.dataset.ovok='1';d.style.pointerEvents='none';const cw=124;pos(d,z.offsetLeft+14+(k%cols)*cw,z.offsetTop+44+Math.floor(k/cols)*0);};
  if(v==='p'||v===1){const F=shuffle(['りんご','みかん','ぶどう','バナナ','メロン']);let n=0;a.prog(0,5);
   a.task(v===1?'小さい かごに くだものを 5こ 入れよう':'くだものを ぜんぶ かごに 入れよう');
   const z=v===1?zone(527,250,170,170,'かご'):zone(390,236,444,190,'かご');
   const cnt=pos(el('div','abs',null,z),0,v===1?96:60,v===1?164:438);cnt.style.cssText+=';text-align:center;font-size:30px;font-weight:700;color:#4d6290';cnt.textContent='0こ';
   F.forEach((f,i)=>{const d=card(f,112+i*210,16);
    dragify(a,d,{hover:c=>z.classList.toggle('hot',!!c&&hitEl(c,z)),drop:(c,moved,back)=>{
     if(hitEl(c,z)){d.remove();n++;cnt.textContent=n+'こ';a.prog(n,5);se('cursor');if(n>=5)a.done();else a.good('かごに 入った！');}
     else{back();a.info(moved?'かごの 上で はなそう':'おしたまま うごかそう');}}});});}
  if(v===0){const F=shuffle([['りんご',0],['みかん',0],['ぶどう',0],['にんじん',1],['キャベツ',1],['なす',1]]);let n=0;a.prog(0,6);
   a.task('くだものと やさいを、それぞれの かごに しわけよう');
   const Z=[zone(120,226,440,200,'くだもの'),zone(664,226,440,200,'やさい')];const cn=[0,0];
   F.forEach((f,i)=>{const d=card(f[0],70+i*186,16);
    dragify(a,d,{hover:c=>Z.forEach(z=>z.classList.toggle('hot',!!c&&hitEl(c,z))),drop:(c,moved,back)=>{const k=Z.findIndex(z=>hitEl(c,z));
     if(k<0){back();a.info(moved?'かごの 上で はなそう':'おしたまま うごかそう');return;}
     if(k!==f[1]){back();a.miss('その かごで いいかな？');return;}
     place(d,Z[k],cn[k]++,3);n++;a.prog(n,6);se('cursor');if(n>=6)a.done();else a.good('しわけ できた！');}});});}
  if(v===2){const F=shuffle([['ぞう',0],['いぬ',1],['ねずみ',2]]);let n=0;a.prog(0,3);
   a.task('どうぶつを 大きい じゅんに、1・2・3の マスへ ならべよう');
   const Z=[0,1,2].map(i=>zone(222+i*270,226,240,200,(i+1)+(i===0?'（いちばん 大きい）':i===2?'（いちばん 小さい）':'')));Z.forEach(z=>z.querySelector('.zl').style.fontSize='17px');
   F.forEach((f,i)=>{const d=card(f[0],360+i*200,16);
    dragify(a,d,{hover:c=>Z.forEach(z=>z.classList.toggle('hot',!!c&&hitEl(c,z))),drop:(c,moved,back)=>{const k=Z.findIndex(z=>hitEl(c,z));
     if(k<0){back();a.info(moved?'マスの 上で はなそう':'おしたまま うごかそう');return;}
     if(k!==f[1]){back();a.miss('じゅんばんが ちがうよ');return;}
     d.dataset.lock='1';d.dataset.ovok='1';d.style.pointerEvents='none';pos(d,Z[k].offsetLeft+62,Z[k].offsetTop+60);n++;a.prog(n,3);se('cursor');if(n>=3)a.done();else a.good('ならべられた！');}});});}
 }});

/* 6 スクロール */
const FLOWERS=[['あさがお','#7f8cff'],['ひまわり','#ffd23f'],['チューリップ','#ff6b6b'],['たんぽぽ','#ffe066'],['さくら','#ffb3c7'],['ばら','#e8333a'],['ゆり','#ffffff'],['すみれ','#9b6bff'],['コスモス','#ff8fd0'],['あじさい','#7fb8ff'],['つばき','#e83a5a'],['パンジー','#c38cff'],['なのはな','#f7e04a'],['うめ','#ffa0b4'],['ききょう','#7a6bff'],['カーネーション','#ff7a9a'],['すいせん','#fff6b0'],['ガーベラ','#ff9f43'],['マリーゴールド','#ffb02e'],['ほうせんか','#ff6fae'],['おしろいばな','#ff5fa0'],['シクラメン','#ff4f7b'],['ポピー','#ff5a3a'],['ラベンダー','#a58cff'],['れんげ','#ff9fd0'],['クローバー','#ffffff']];
STAGES.push({id:'scroll',g:3,title:'スクロール',icon:ICO.scroll,desc:'2本指で上下（左右）になぞって、見えないところを出す。',
 how:{g:'scroll',cap:'2本の ゆびで なぞる',lines:['2本の ゆびを そろえて パッドに おく','そのまま 上や 下に なぞる','見えない ところが 出てくるよ']},
 build(a,v){const A=a.area;
  if(v===1){a.prog(0,1);a.task('よこに ながい 絵まきもの。右へ スクロールして「ゴール」を クリックしよう');
   const W=sw(A,62,8,1100,420,'絵まきもの');W.body.dataset.clip='1';W.body.style.overflow='hidden';
   const C=pos(el('div','abs',null,W.body),0,0,3600,330);
   const sc=['たいようの絵','やまの絵','おうちの絵','りんご','いぬ','ぞう','ねこ','うさぎ','バナナ','かぶとむし','メロン'];
   const st=pos(el('div','abs',null,C),20,20,300,290);st.style.cssText+=';display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:700;background:#e0ecff;border:3px solid #10264d;border-radius:16px';st.textContent='スタート →';
   sc.forEach((s2,i)=>{const p=pos(el('div','abs',ART[s2],C),340+i*290,40,250,250);p.style.cssText+=';border:3px solid #b9c8e3;border-radius:16px;background:#fff;padding:20px';p.firstChild.style.cssText='width:100%;height:100%';});
   const g=pos(el('button','btn y abs','ゴール！',C),3600-300,110,260,100);g.style.fontSize='30px';
   const trk=pos(el('div','abs',null,W.body),8,350,1076,14);trk.style.cssText+=';border-radius:7px;background:#e3eaf6';const th=pos(el('div','abs',null,trk),0,0,120,14);th.style.cssText+=';border-radius:7px;background:#8fa3c6';
   let off=0;const max=3600-1092;const upd=()=>{C.style.transform='translateX('+(-off)+'px)';th.style.left=(off/max*(1076-120))+'px';};upd();
   a.on(W.W,'wheel',e=>{e.preventDefault();if(e.ctrlKey)return;const m=e.deltaMode===1?32:1;const d=(Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY)*m;off=Math.max(0,Math.min(max,off+d));upd();},{passive:false});
   a.on(g,'click',()=>{a.prog(1,1);a.done();});return;}
  const W=sw(A,292,8,640,420,v==='p'?'はなの リスト':'はなの リスト（ながい）');const VB=W.body;VB.dataset.clip='1';
  const C=el('div','slist',null,VB);
  let rows;if(v==='p')rows=['スタート'].concat(FLOWERS.slice(0,12).map(f=>f[0]),['ゴール！ ここを クリック','なのはな','うめ']);
  else if(v===0)rows=FLOWERS.slice(0,24).map(f=>f[0]).concat(['ゴール！ ここを クリック','ポピー']);
  else{const L=shuffle(FLOWERS.filter(f=>f[0]!=='ひまわり').slice(0,25).map(f=>f[0]));L.splice(14+(Math.random()*8|0),0,'ひまわり');rows=L;}
  const col=n=>{const f=FLOWERS.find(x=>x[0]===n);return f?f[1]:'#ffd23f';};
  const R=rows.map((nm,i)=>{const r=pos(el('div','srow',null,C),12,i*58);r.style.width='588px';
   if(nm==='スタート'){r.classList.add('start');r.textContent='スタート';}
   else if(nm.startsWith('ゴール')){r.classList.add('goal');r.textContent=nm;}
   else{r.innerHTML=flowerSvg(col(nm))+'<span>'+nm+'</span>';}return r;});
  const total=rows.length*58+12;C.style.height=total+'px';
  const trk=el('div','strk',null,VB),th=el('div','sthm',null,trk);
  const vh=420-8-42;let off=0;const max=total-vh;
  const upd=()=>{C.style.transform='translateY('+(-off)+'px)';th.style.top=(off/max*(vh-8-70))+'px';};upd();
  a.on(W.W,'wheel',e=>{e.preventDefault();if(e.ctrlKey)return;const d=e.deltaY*(e.deltaMode===1?32:1);off=Math.max(0,Math.min(max,off+d));upd();},{passive:false});
  let ph=0;
  if(v==='p'){a.prog(0,2);a.task('下の ほうに ある「ゴール」を さがして クリックしよう');
   R.forEach((r,i)=>a.on(r,'click',()=>{const nm=rows[i];
    if(nm.startsWith('ゴール')){if(ph!==0)return;ph=1;r.textContent='ゴール クリア！';a.prog(1,2);a.good('みつけた！ こんどは 上へ');a.task('こんどは いちばん 上まで もどって「スタート」を クリックしよう');}
    else if(nm==='スタート'){if(ph===0)a.info('2本ゆびで 下へ なぞって ゴールを さがそう');else{a.prog(2,2);a.done();}}
    else a.info(ph===0?'「ゴール」を さがそう':'「スタート」まで もどろう');}));}
  else{a.prog(0,1);a.task(v===0?'ながい リストの 下に ある「ゴール」を クリックしよう':'リストの どこかに ある「ひまわり」を さがして クリックしよう');
   R.forEach((r,i)=>a.on(r,'click',()=>{const nm=rows[i];const ok=v===0?nm.startsWith('ゴール'):nm==='ひまわり';if(ok){a.prog(1,1);a.done();}else a.miss('ちがう ぎょうだよ');}));}
  let pd=null;a.on(W.W,'pointerdown',e=>{pd={y:e.clientY};});a.on(W.W,'pointermove',e=>{if(pd&&e.buttons===1&&Math.abs(e.clientY-pd.y)>30){pd=null;a.info('おして うごかすのでは なく、2本ゆびで なぞろう');}});a.on(W.W,'pointerup',()=>{pd=null;});
 }});

/* 7 ズーム */
STAGES.push({id:'zoom',g:3,title:'ズーム',icon:ICO.zoom,desc:'2本指を広げて大きく、ちぢめて小さく。小さい文字や絵を拡大して見る。',
 how:{g:'pinch',cap:'2本の ゆびを ひろげる・ちぢめる',lines:['見たい ところに やじるしを あわせる','2本の ゆびを ひろげると 大きくなる','ゆびを ちぢめると 小さくなる']},
 build(a,v){const A=a.area;const words=['りんご','みかん','ぶどう','いちご','すいか','バナナ'];const ans=pick(words);
  const VW=760,VH=420;const W=sw(A,16,8,VW,VH,v===1?'まちの 地図':'こうえんの 絵');const V=W.body;V.dataset.clip='1';V.style.overflow='hidden';
  const vw=VW-8,vh=VH-8-42;
  const P=pos(el('div','abs',null,V),0,0,vw,vh);P.style.transformOrigin='0 0';
  if(v===1){P.style.background='#d9f0c8';
   for(let i=0;i<6;i++){const r=pos(el('div','abs',null,P),0,40+i*62,vw,14);r.style.background='#f4f1e6';}
   for(let i=0;i<7;i++){const r=pos(el('div','abs',null,P),50+i*104,0,14,vh);r.style.background='#f4f1e6';}
   for(let i=0;i<34;i++){const h=pos(el('div','abs',null,P),70+(i%7)*104+Math.random()*30,58+Math.floor(i/7)*62+Math.random()*10,20+Math.random()*16,18);h.style.cssText+=';background:'+pick(['#ffb3a0','#ffd88a','#a8d0ff','#cbb8ff'])+';border:1px solid #6b7a99';}
  }else{P.style.background='linear-gradient(#bfe3ff 0,#e8f6ff 55%,#8fd18a 55%)';
   [[60,150,90],[560,140,110],[220,175,70],[420,186,60],[660,200,50],[20,210,40]].forEach(t=>{const d=pos(el('div','abs',null,P),t[0],t[1],t[2],t[2]);d.style.cssText+=';border-radius:50%;background:#4f9a5c';});
   const sun=pos(el('div','abs',null,P),640,30,60,60);sun.style.cssText+=';border-radius:50%;background:#ffd23f';
   for(let i=0;i<5;i++){const f=pos(el('div','abs',null,P),100+i*130,300,10,10);f.style.cssText+=';border-radius:50%;background:'+pick(['#ff6b6b','#ffd23f','#ff8fd0'])+'';}}
  let tgt=null;
  if(v!==1){const spotsL=v==='p'?[[42,296]]:[[30,300],[690,290],[40,226],[700,232],[660,120]];const sp=pick(spotsL);
   const sg=pos(el('div','abs',null,P),sp[0],sp[1],30,18);sg.style.cssText+=';background:#fff;border:1px solid #a0703a;border-radius:2px;text-align:center;line-height:1.05;padding-top:2px;color:#10264d';
   sg.innerHTML='<div style="font-size:2.6px">ひみつの ことば</div><div style="font-size:5px;font-weight:700">'+ans+'</div>';
   const pole=pos(el('div','abs',null,P),sp[0]+14,sp[1]+18,2,10);pole.style.background='#a0703a';}
  else{const an=[['ねこ',1],['いぬ',0],['うさぎ',0],['いぬ',0],['ねずみ',0],['うさぎ',0]];const sp=spots(an.length,14,14,vw-60,vh-60,40);
   an.forEach((x,i)=>{const d=pos(el('div','abs',ART[x[0]],P),sp[i].x+30,sp[i].y+30,10,10);d.firstChild.style.cssText='width:10px;height:10px';d.style.cursor='pointer';
    a.on(d,'click',e=>{e.stopPropagation();if(x[1]){a.prog(1,1);a.done();}else a.miss('それは ねこでは ないよ');});});}
  const sd=pos(el('div','abs',null,A),800,8,410,420);
  const msg=el('div',null,null,sd);msg.style.cssText='font-size:20px;line-height:1.6;font-weight:700;height:100px;word-break:keep-all';
  const zl=el('div',null,null,sd);zl.style.cssText='font-size:18px;color:#4d6290;height:34px';
  const BB=[];let s=1,tx=0,ty=0,ph=0;
  const upd=()=>{P.style.transform='translate('+tx+'px,'+ty+'px) scale('+s+')';zl.textContent='いまの 大きさ：'+s.toFixed(1)+'ばい';
   BB.forEach(b=>{b.disabled=!(s>=4&&ph===0);});};
  const clampT=()=>{tx=Math.min(0,Math.max(vw-vw*s,tx));ty=Math.min(0,Math.max(vh-vh*s,ty));};
  if(v===1){msg.textContent='地図の どこかに 小さな ねこが いるよ。大きくして さがして クリックしよう。';a.prog(0,1);a.task('地図を 大きくして、かくれた「ねこ」を さがして クリックしよう');
   const pic=el('div',null,ART.ねこ,sd);pic.style.cssText='width:120px;height:120px;margin:20px 0 0 140px';pic.firstChild.style.cssText='width:120px;height:120px';}
  else{msg.textContent='大きくして よめたら、こたえを えらぼう';a.prog(0,(v==='p'||v===2)?2:1);
   a.task(v==='p'||v===2?'2本ゆびを ひろげて 大きくし、ひみつの ことばを よもう':'遠くの 小さな かんばんの ことばを よんで えらぼう');
   const ch=shuffle(shuffle(words.filter(w=>w!==ans)).slice(0,2).concat([ans]));
   ch.forEach((w,i)=>{const b=el('button','btn',w,sd);b.style.cssText+=';width:300px;margin:0 0 16px 50px';b.disabled=true;BB.push(b);
    a.on(b,'click',()=>{if(ph!==0)return;if(w===ans){if(v===0){a.prog(1,1);a.done();return;}ph=1;a.prog(1,2);a.good('せいかい！');msg.textContent='せいかい！ こんどは もとの 大きさに もどそう';a.task('2本ゆびを ちぢめて、もとの 大きさに もどそう');upd();}
     else a.miss('ちがうよ。もっと 大きくして よく 見よう');});});}
  a.on(A,'wheel',e=>{e.preventDefault();const r=V.getBoundingClientRect();
   if(!e.ctrlKey){if(s>1.01){tx-=e.deltaX/1;ty-=e.deltaY/1;clampT();upd();}else a.info('2本ゆびを ひろげるように うごかそう');return;}
   let cx=(e.clientX-r.left)/S,cy=(e.clientY-r.top)/S;cx=Math.max(0,Math.min(vw,cx));cy=Math.max(0,Math.min(vh,cy));
   const ns=Math.max(1,Math.min(8,s*Math.exp(-e.deltaY*0.01)));tx=cx-(cx-tx)*ns/s;ty=cy-(cy-ty)*ns/s;s=ns;clampT();upd();
   if(ph===1&&s<=1.05){ph=2;s=1;tx=ty=0;upd();a.prog(2,2);a.done();}},{passive:false});
  a.on(sd,'pointerdown',e=>{const b=e.target.closest('button');if(b&&b.disabled)a.info('もっと 大きく してから えらぼう（4ばい いじょう）');});
  upd();}});

/* 8 スタンプ */
STAGES.push({id:'stamp',g:3,title:'スタンプを おくる',icon:ICO.stamp,desc:'チャットのメッセージにカーソルをのせて、いいね・ハートなどのスタンプを送る。',
 how:{g:'hover',cap:'1本の ゆびで なぞって のせる',lines:['メッセージの 上に やじるしを のせる（おさない）','上に スタンプが 出てくる','おくりたい スタンプを クリック。もういちど おすと けせる']},
 build(a,v){const A=a.area;const W=sw(A,192,4,840,428,'4年1組 チャット');W.body.classList.add('chatw');W.body.style.paddingTop='44px';
  let M=[{n:'せんせい',c:'#e8833a',t:'きょうの 発表、とても よかったです。'},{n:'はると',c:'#36a65b',t:'あしたの 休み時間、いっしょに あそぼう！'}];
  if(v===1)M=shuffle([M[0],M[1],{n:'ゆい',c:'#9b6bff',t:'きょうの きゅうしょく、カレーだったね。'}]);
  if(v===2)M=[{n:'せんせい',c:'#e8833a',t:'あしたは えんそく。おべんとうを わすれずに！'}];
  const K=['like','heartR','smile','wow'];
  let goal;
  if(v==='p')goal=[{m:'せんせい',k:'like'},{m:'はると',k:'heartR'}];
  if(v===0){const k=shuffle(K.slice());goal=[{m:'せんせい',k:k[0]},{m:'はると',k:k[1]}];}
  if(v===1)goal=[{m:'せんせい',k:'like'}];
  if(v===2)goal=[{m:'せんせい',k:'heartR'}];
  a.task(v===2?'まちがえて「びっくり」を おくっちゃった。けして「ハート」に しよう':v===1?'「せんせい」からの メッセージだけに「いいね」を おくろう':goal.map(g=>g.m+'の メッセージに「'+RN[g.k]+'」').join('、')+'を おくろう');
  const st={};M.forEach(m=>st[m.n]=new Set());if(v===2)st['せんせい'].add('wow');
  const total=v===2?2:goal.length;
  const score=()=>{if(v===2)return (st['せんせい'].has('wow')?0:1)+(st['せんせい'].has('heartR')?1:0);return goal.filter(g=>st[g.m].has(g.k)).length;};
  const chipsEl={};
  const draw=(nm)=>{const c=chipsEl[nm];c.innerHTML='';st[nm].forEach(k=>{const ch=el('button','rchip mine',IC[k]+'1',c);ch.setAttribute('aria-label',RN[k]);a.on(ch,'click',()=>toggle(nm,k));});};
  const toggle=(nm,k)=>{const S2=st[nm];
   if(S2.has(k)){S2.delete(k);draw(nm);se('cursor');if(v===2&&k==='wow')a.good('けせた！ こんどは ハート');else if(v!==2)a.info('スタンプを けしたよ');}
   else{const g=goal.find(x=>x.m===nm);
    if(!g){a.miss('メッセージが ちがうよ');return;}
    if(g.k!==k){a.miss('スタンプが ちがうよ。「'+RN[g.k]+'」を さがそう');return;}
    S2.add(k);se('fav');draw(nm);}
   const sc=score();a.prog(sc,total);if(sc>=total&&(v!==2||st['せんせい'].size===1))a.done();else if(!S2.has(k)){}else a.good('おくれた！');};
  M.forEach(m=>{const w=el('div','cm',null,W.body);el('div','cav',m.n[0],w).style.background=m.c;
   const b=el('div','cbub','<div class="nm">'+m.n+'</div><div class="tx">'+m.t+'</div>',w);chipsEl[m.n]=el('div','rchips',null,b);
   const bar=el('div','rbar',null,b);K.forEach(k=>{const bt=el('button',null,IC[k],bar);bt.title=RN[k];bt.setAttribute('aria-label',RN[k]);a.on(bt,'click',()=>toggle(m.n,k));});
   draw(m.n);});
  a.prog(score(),total);}});

/* 9 キーワードで検索 */
function browser(a,x,y,w,h){const W=sw(a.area,x,y,w,h,'ブラウザ');W.W.classList.add('brw');const ad=el('div','addr',null,W.body);
 el('span',null,ICO.search.replace('<svg','<svg width="26" height="26"'),ad);el('div','url','がっこうの けんさく',ad);
 const top=pos(el('div','abs',null,W.body),0,46,w-8,80);top.style.cssText+=';display:flex;align-items:center;gap:12px;padding:0 20px';
 const ip=el('input','inp'+(a.exam?'':' allowctx'),null,top);ip.style.cssText+=';width:440px;height:50px;border-radius:25px';ip.setAttribute('autocomplete','off');ip.setAttribute('aria-label','けんさく');
 const sb=el('button','sbtn2 y',null,top);sb.innerHTML=IC.find.replace('<svg','<svg width="20" height="20" style="vertical-align:-4px"')+' 検索';
 const res=pos(el('div','abs',null,W.body),20,130,w-48,h-42-8-140);
 return{W,ip,sb,res,top};}
function hiraNorm(s){return toHira(nosp(s));}
STAGES.push({id:'search',g:3,title:'キーワードで 検索',icon:ICO.search,desc:'検索らんにローマ字でことばを入れて検索し、結果からあうページを選ぶ。',
 how:{keys:[['Enter','けんさく']],cap:'ローマ字で うって Enter',lines:['検索らんを クリックする','ローマ字で ことばを うつ（「ローマ字ひょう」が 見られるよ）','Enter か「検索」を おして、けっかを クリック']},
 build(a,v){const D={p:{q:['いぬ'],R:[['いぬの しゅるい','いろいろな いぬの なかまを しょうかい',1],['いぬの かいかた','いぬを かうときに たいせつな こと',0],['いぬの まんが','いぬが 出てくる おはなし',0]],t:'「いぬ」を 検索して「いぬの しゅるい」を クリックしよう'},
   0:{q:['さくら'],R:[['さくらごう（でんしゃ）','まちを はしる でんしゃの なまえ',0],['さくらの はな','はるに さく ピンクの 花',1],['さくら こうえん','あそびばの ある こうえん',0],['さくらさん（ひと）','クラスの さくらさんの はっぴょう',0]],t:'「さくら」を 検索して、花の ページを えらぼう'},
   1:{q:['かぶとむし'],R:[['かぶと（むかしの よろい）','むかしの 人が かぶった もの',0],['かぶとむしの ずかん','つのが ある むしの なかま',1],['むしとり あみ','むしを とる どうぐ',0]],t:'左の 絵の むしの なまえを 考えて 検索し、あう ページを えらぼう'},
   2:{q:['あさがお'],R:[['あさがお まつり','なつの おまつりの おしらせ',0],['あさがおの はな','なつの あさに さく 花',1],['あさがおの えほん','としょしつの 本',0]],t:'検索らんの ことばを けして、「あさがお」で 検索しなおそう。花の ページを えらぼう'}}[v];
  a.task(D.t);a.prog(0,2);const x0=v===1?200:120;
  const B=browser(a,x0,4,1224-x0-20-(a.exam&&false?0:0),428);
  const rt=el('button','sbtn2',null,B.top);rt.textContent='ローマ字ひょう';a.on(rt,'click',()=>{se('cursor');romajiTable(()=>B.ip.focus());});
  if(v===1){const c=pos(el('div','sw',null,a.area),16,60,160,200);c.innerHTML=ART.かぶとむし;c.firstChild.style.cssText='width:130px;height:130px;margin:12px';const l=el('div',null,'この むしは？',c);l.style.cssText='text-align:center;font-size:18px;font-weight:700';}
  if(v===2)B.ip.value='いぬ';
  const run=()=>{const q=hiraNorm(B.ip.value);B.res.innerHTML='';if(!q){a.info('ことばを 入れてから 検索しよう');return;}
   if(/[a-z]/i.test(q)){a.info('ローマ字の ままだよ。ひらがなに なるように うとう');}
   if(!D.q.includes(q)){const n=el('div',null,null,B.res);n.style.cssText='font-size:20px;padding:10px';n.textContent='「'+B.ip.value+'」の けっかは 見つかりませんでした';a.info('ことばを たしかめよう');return;}
   a.prog(1,2);se('cursor');const c=el('div',null,null,B.res);c.style.cssText='font-size:15px;color:#4d6290;padding:0 14px 4px';c.textContent='「'+B.ip.value+'」の けっか';
   D.R.forEach(r=>{const b=el('button','res','<div class="rt">'+r[0]+'</div><div class="rd">'+r[1]+'</div>',B.res);
    a.on(b,'click',()=>{if(r[2]){B.res.innerHTML='';const pg=el('div',null,null,B.res);pg.style.cssText='font-size:30px;font-weight:700;padding:20px';pg.textContent=r[0];a.prog(2,2);a.done();}else a.miss('その ページでは ないよ');});});};
  a.on(B.sb,'click',run);a.on(B.ip,'keydown',e=>{if(e.key==='Enter'&&!e.isComposing&&e.keyCode!==229){e.preventDefault();run();}});
  a.start=()=>B.ip.focus();}});

/* 10 ファイルを開く */
STAGES.push({id:'fileopen',g:3,title:'ファイルを 開く',icon:ICO.fileopen,desc:'フォルダーをダブルクリックで開き、中のファイルを開く。',
 how:{g:'dbl',cap:'左下を カチカチッ（または トントン）',lines:['フォルダーを ダブルクリックして ひらく','中の ファイルを ダブルクリックして ひらく','ちがう ファイルを ひらかないよう 名前を よく 見る']},
 build(a,v){const A=a.area;const month=pick(['10がつ','11がつ']);
  const files=v===1?['えにっき 10がつ','えにっき 11がつ','さくぶん']:['えにっき','さくぶん','しゅくだい'];
  const want=v===1?'えにっき '+month:'えにっき';const deep=v===2;
  const steps=deep?3:2;a.prog(0,steps);
  a.task(v===1?'「ドキュメント」を ひらいて、「'+want+'」を 開こう':deep?'「ドキュメント」の 中の「がっこう」フォルダーを ひらいて、「えにっき」を 開こう':'「ドキュメント」を ひらいて、「えにっき」を 開こう');
  const E=sw(A,16,8,560,420,'エクスプローラー');const Bd=E.body;let doc=null;
  const bind=(d,fn)=>{a.on(d,'click',()=>{Bd.querySelectorAll('.ico').forEach(x=>x.classList.remove('sel'));d.classList.add('sel');});a.on(d,'dblclick',fn);a.on(d,'contextmenu',()=>a.miss('それは 右クリック。左下を カチカチッで ひらこう'));};
  const root=()=>{Bd.innerHTML='';E.title.textContent='エクスプローラー';['ドキュメント','ピクチャ','ミュージック'].forEach((nm,i)=>{const d=icoEl(Bd,30+i*170,60,svgFolder(false),nm);
    bind(d,()=>{if(nm!=='ドキュメント'){a.miss('ちがう フォルダーだよ');return;}a.prog(1,steps);se('cursor');a.good('ひらいた！');if(deep)mid();else inside();});});};
  const mid=()=>{Bd.innerHTML='';E.title.textContent='ドキュメント';['がっこう','いえ','あそび'].forEach((nm,i)=>{const d=icoEl(Bd,30+i*170,60,svgFolder(false),nm);
    bind(d,()=>{if(nm!=='がっこう'){a.miss('ちがう フォルダーだよ');return;}a.prog(2,steps);se('cursor');a.good('ひらいた！ つぎは ファイル');inside();});});};
  const inside=()=>{Bd.innerHTML='';E.title.textContent=deep?'ドキュメント ＞ がっこう':'ドキュメント';
   files.forEach((nm,i)=>{const d=icoEl(Bd,16+i*176,60,svgFile('#fff'),nm);d.style.width='164px';
    bind(d,()=>{if(doc)return;if(nm!==want){a.miss('ちがう ファイルだよ');return;}a.prog(steps,steps);se('cursor');
     doc=sw(A,604,40,600,380,want+' - メモちょう');
     const t=el('div','doc',null,doc.body);t.innerHTML=want.includes('10')?'10がつ 3にち<br>きょうは うんどうかいの れんしゅうを しました。':want.includes('11')?'11がつ 8にち<br>きょうは おちばを ひろいました。':'きょうは こうえんで あそびました。<br>すべりだいが たのしかったです。';
     a.done();});});};
  root();}});
