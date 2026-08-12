(function(){
  var KEY='sela_a11y';
  var state={zoom:0,contrast:false,grayscale:false,links:false,readable:false,cursor:false,nomotion:false};
  try{var s=JSON.parse(localStorage.getItem(KEY));if(s)state=Object.assign(state,s);}catch(e){}

  var css=''
  +'#a11y-btn{position:fixed;bottom:22px;left:22px;z-index:9998;width:56px;height:56px;border-radius:50%;background:#243670;color:#fff;border:2px solid #a3d9fb;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,.35);transition:transform .2s;}'
  +'#a11y-btn:hover{transform:scale(1.06);}'
  +'#a11y-btn:focus-visible{outline:3px solid #fff;outline-offset:2px;}'
  +'#a11y-panel{position:fixed;bottom:88px;left:22px;z-index:9999;width:300px;max-width:calc(100vw - 44px);background:#0e1c33;border:1px solid rgba(163,217,251,.3);border-radius:10px;padding:16px;box-shadow:0 10px 40px rgba(0,0,0,.5);direction:rtl;font-family:Assistant,Arial,sans-serif;display:none;}'
  +'#a11y-panel.open{display:block;}'
  +'#a11y-panel h2{color:#eef3fb;font-size:17px;font-weight:600;margin:0 0 4px;}'
  +'#a11y-panel .sub{color:#9aa8c0;font-size:12px;margin:0 0 12px;}'
  +'#a11y-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}'
  +'.a11y-tile{background:#13233f;border:1px solid rgba(163,217,251,.18);border-radius:8px;color:#cdd7ea;font-family:inherit;font-size:13px;font-weight:500;padding:12px 6px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px;transition:border-color .2s,background .2s;}'
  +'.a11y-tile:hover{border-color:#a3d9fb;}'
  +'.a11y-tile:focus-visible{outline:2px solid #a3d9fb;outline-offset:1px;}'
  +'.a11y-tile[aria-pressed="true"]{background:#a3d9fb;color:#0a1424;border-color:#a3d9fb;}'
  +'.a11y-tile svg{width:22px;height:22px;}'
  +'.a11y-font-row{grid-column:1 / -1;display:flex;align-items:center;justify-content:space-between;background:#13233f;border:1px solid rgba(163,217,251,.18);border-radius:8px;padding:8px 12px;}'
  +'.a11y-font-row span{color:#cdd7ea;font-size:13px;font-weight:500;}'
  +'.a11y-font-row .btns{display:flex;gap:8px;}'
  +'.a11y-font-row button{width:34px;height:34px;border-radius:6px;background:#0e1c33;border:1px solid rgba(163,217,251,.3);color:#eef3fb;font-size:17px;font-weight:700;cursor:pointer;}'
  +'.a11y-font-row button:hover{border-color:#a3d9fb;}'
  +'#a11y-reset{grid-column:1 / -1;margin-top:2px;background:transparent;border:1px solid rgba(163,217,251,.3);color:#a3d9fb;border-radius:8px;padding:10px;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;}'
  +'#a11y-reset:hover{background:rgba(163,217,251,.1);}'
  +'#a11y-panel .stmt{display:block;text-align:center;margin-top:10px;color:#9aa8c0;font-size:12px;text-decoration:underline;}'
  // feature styles
  +'html.a11y-grayscale body{filter:grayscale(100%) !important;}'
  +'html.a11y-readable *{font-family:Arial,Helvetica,sans-serif !important;letter-spacing:normal !important;}'
  +'html.a11y-links a{text-decoration:underline !important;outline:2px solid #a3d9fb !important;outline-offset:1px;}'
  +'html.a11y-nomotion *{animation:none !important;transition:none !important;scroll-behavior:auto !important;}'
  +'html.a11y-cursor,html.a11y-cursor *{cursor:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'48\' height=\'48\' viewBox=\'0 0 24 24\'%3E%3Cpath d=\'M5 3l13 7-5.5 1.2L15.5 18l-2 1-3-5.8L6 17z\' fill=\'%23000\' stroke=\'%23fff\' stroke-width=\'1.2\'/%3E%3C/svg%3E") 6 4,auto !important;}'
  +'html.a11y-contrast body{background:#000 !important;}'
  +'html.a11y-contrast .hero-bg,html.a11y-contrast .hero-bg::after{background:#000 !important;}'
  +'html.a11y-contrast *:not(#a11y-btn):not(#a11y-btn *):not(.a11y-tile):not(.a11y-tile *){background-color:transparent !important;color:#fff !important;border-color:#fff !important;}'
  +'html.a11y-contrast section,html.a11y-contrast nav,html.a11y-contrast footer,html.a11y-contrast .card,html.a11y-contrast .tcard,html.a11y-contrast .tcard-head,html.a11y-contrast .ccard,html.a11y-contrast .form-wrap,html.a11y-contrast .funds-disclaimer,html.a11y-contrast .funds-table th{background:#000 !important;}'
  +'html.a11y-contrast a{color:#ff0 !important;}'
  +'html.a11y-contrast .card,html.a11y-contrast .tcard,html.a11y-contrast .ccard,html.a11y-contrast .form-wrap,html.a11y-contrast input,html.a11y-contrast textarea,html.a11y-contrast .funds-table td,html.a11y-contrast .funds-table th{border:1px solid #fff !important;}';

  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  function icon(p){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>';}
  var ICONS={
    contrast:icon('<circle cx="12" cy="12" r="9"/><path d="M12 3v18" fill="currentColor"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"/>'),
    gray:icon('<circle cx="12" cy="12" r="9"/>'),
    links:icon('<path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/>'),
    readable:icon('<path d="M4 7V5h16v2M9 5v14M7 19h4"/>'),
    cursor:icon('<path d="M5 3l13 7-5.5 1.2L15.5 18l-2 1-3-5.8L6 17z" fill="currentColor" stroke="none"/>'),
    motion:icon('<circle cx="12" cy="12" r="9"/><path d="M9 9h2v6H9zM13 9h2v6h-2z" fill="currentColor" stroke="none"/>')
  };

  var btn=document.createElement('button');
  btn.id='a11y-btn';btn.setAttribute('aria-label','תפריט נגישות');btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-controls','a11y-panel');
  btn.innerHTML='<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="3.6" r="1.7" fill="currentColor" stroke="none"/><path d="M4.5 8.5h15M12 8.5v6M12 14.5l-3 6M12 14.5l3 6"/></svg>';
  document.body.appendChild(btn);

  var panel=document.createElement('div');
  panel.id='a11y-panel';panel.setAttribute('role','dialog');panel.setAttribute('aria-label','אפשרויות נגישות');
  panel.innerHTML=''
    +'<h2>נגישות</h2><p class="sub">התאמת האתר לצרכים שלך</p>'
    +'<div id="a11y-grid">'
    +'<div class="a11y-font-row"><span>גודל טקסט</span><div class="btns"><button type="button" data-font="-" aria-label="הקטנת טקסט">A−</button><button type="button" data-font="+" aria-label="הגדלת טקסט">A+</button></div></div>'
    +'<button class="a11y-tile" data-t="contrast" aria-pressed="false">'+ICONS.contrast+'ניגודיות גבוהה</button>'
    +'<button class="a11y-tile" data-t="grayscale" aria-pressed="false">'+ICONS.gray+'גווני אפור</button>'
    +'<button class="a11y-tile" data-t="links" aria-pressed="false">'+ICONS.links+'הדגשת קישורים</button>'
    +'<button class="a11y-tile" data-t="readable" aria-pressed="false">'+ICONS.readable+'פונט קריא</button>'
    +'<button class="a11y-tile" data-t="cursor" aria-pressed="false">'+ICONS.cursor+'סמן גדול</button>'
    +'<button class="a11y-tile" data-t="nomotion" aria-pressed="false">'+ICONS.motion+'עצירת אנימציות</button>'
    +'<button id="a11y-reset" type="button">איפוס הגדרות נגישות</button>'
    +'</div>'
    +'<a class="stmt" href="accessibility.html">הצהרת נגישות</a>';
  document.body.appendChild(panel);

  function apply(){
    var h=document.documentElement;
    h.classList.toggle('a11y-contrast',state.contrast);
    h.classList.toggle('a11y-grayscale',state.grayscale);
    h.classList.toggle('a11y-links',state.links);
    h.classList.toggle('a11y-readable',state.readable);
    h.classList.toggle('a11y-cursor',state.cursor);
    h.classList.toggle('a11y-nomotion',state.nomotion);
    var z=[1,1.12,1.25,1.4,1.6][state.zoom]||1;
    h.style.zoom=z;
    panel.querySelectorAll('.a11y-tile').forEach(function(t){t.setAttribute('aria-pressed',String(!!state[t.getAttribute('data-t')]));});
    try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}
  }

  function openPanel(o){panel.classList.toggle('open',o);btn.setAttribute('aria-expanded',String(o));}
  btn.addEventListener('click',function(){openPanel(!panel.classList.contains('open'));});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){openPanel(false);}});
  document.addEventListener('click',function(e){if(!panel.contains(e.target)&&e.target!==btn&&!btn.contains(e.target))openPanel(false);});
  panel.querySelectorAll('.a11y-tile').forEach(function(t){t.addEventListener('click',function(){var k=t.getAttribute('data-t');state[k]=!state[k];apply();});});
  panel.querySelectorAll('[data-font]').forEach(function(b){b.addEventListener('click',function(){state.zoom=Math.max(0,Math.min(4,state.zoom+(b.getAttribute('data-font')==='+'?1:-1)));apply();});});
  document.getElementById('a11y-reset').addEventListener('click',function(){state={zoom:0,contrast:false,grayscale:false,links:false,readable:false,cursor:false,nomotion:false};apply();});

  apply();
})();
