/* ===== osuz-v34-catalog-routing-fix-js ===== */
(function(){
'use strict';
const API='https://osuz.uz/api/catalog/categories';
const mobile=()=>window.matchMedia('(max-width:767px)').matches;
const lang=()=>{try{const v=localStorage.getItem('osuzLang');return ['ru','uz','en'].includes(v)?v:'ru'}catch(_){return'ru'}};
const TXT={
  ru:{catalog:'Каталог',all:'Все товары категории',sub:'Подкатегории',loading:'Загрузка категорий…',error:'Не удалось загрузить категории',close:'Закрыть',back:'Назад'},
  uz:{catalog:'Katalog',all:'Kategoriyadagi barcha mahsulotlar',sub:'Ichki kategoriyalar',loading:'Kategoriyalar yuklanmoqda…',error:'Kategoriyalarni yuklab bo‘lmadi',close:'Yopish',back:'Orqaga'},
  en:{catalog:'Catalog',all:'All products in category',sub:'Subcategories',loading:'Loading categories…',error:'Could not load categories',close:'Close',back:'Back'}
};
const tr=k=>TXT[lang()]?.[k]||TXT.ru[k]||k;
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
let cats=[],loadPromise=null,stack=[],panel=null,desktopCurrent=null,pushedHash=false;

function parsedNames(v){
  if(v&&typeof v==='object'&&!Array.isArray(v)) return v;
  if(typeof v==='string'){try{const j=JSON.parse(v);if(j&&typeof j==='object')return j}catch(_){} return {ru:v};}
  return {};
}
function catName(c){
  const n=parsedNames(c?.names),l=lang();
  return String(n[l]||n.ru||n.uz||n.en||c?.name_ru||c?.name_uz||c?.name_en||c?.title||c?.name||'').trim();
}
function numberOrNull(v){if(v===null||v===undefined||v===''||v==='null')return null;const n=Number(v);return Number.isFinite(n)?n:null}
function normalizePayload(raw){
  const top=Array.isArray(raw)?raw:Array.isArray(raw?.categories)?raw.categories:Array.isArray(raw?.items)?raw.items:Array.isArray(raw?.data)?raw.data:[];
  const out=[],seen=new Set();
  function walk(node,inferredParent=null){
    if(!node||typeof node!=='object')return;
    const id=Number(node.id ?? node.category_id ?? node.pk);
    if(!Number.isFinite(id))return;
    const explicitParent=node.parent_id ?? node.parentId ?? (node.parent&&typeof node.parent==='object'?node.parent.id:node.parent);
    const parent=explicitParent===undefined?inferredParent:numberOrNull(explicitParent);
    if(!seen.has(id)){
      seen.add(id);
      out.push({...node,id,parent_id:parent,names:parsedNames(node.names)});
    }
    const nested=[];
    ['children','subcategories','child_categories','items'].forEach(k=>{if(Array.isArray(node[k]))nested.push(...node[k])});
    nested.forEach(ch=>walk(ch,id));
  }
  top.forEach(n=>walk(n,null));
  return out.filter(c=>catName(c));
}
function children(parent){
  return cats.filter(c=>parent==null?c.parent_id==null:Number(c.parent_id)===Number(parent));
}
function goCategory(id){
  const n=Number(id);if(!Number.isFinite(n))return;
  closeCatalogUI();
  const entity=cats.find(c=>Number(c.id)===n)||{id:n};
  location.assign(OSUZRoutes.category(entity));
}
function ensureBottomCatalog(){
  const nav=document.querySelector('.osuz-mobile-bottom-final');if(!nav)return;
  nav.querySelectorAll('[data-mobile-final="catalog"],[data-v16-mobile-catalog-open],[data-v17-mobile-catalog-open]').forEach(el=>el.remove());
  const home=nav.querySelector('[data-mobile-final="home"]');
  const btn=document.createElement('button');
  btn.type='button';btn.dataset.mobileFinal='catalog';btn.dataset.v34MobileCatalog='1';
  btn.innerHTML='<i data-lucide="layout-grid"></i><span>'+esc(tr('catalog'))+'</span>';
  if(home)home.insertAdjacentElement('afterend',btn);else nav.prepend(btn);
  window.lucide?.createIcons();
}
function measureTop(){
  const header=document.querySelector('.site-header,.auth-site-header,header.fixed');
  const b=header?Math.ceil(header.getBoundingClientRect().bottom):110;
  const top=mobile()?b+10:b;
  document.documentElement.style.setProperty('--osuz-v34-catalog-top',top+'px');
  if(panel)panel.style.top=top+'px';
  return top;
}
function buildPanel(){
  document.getElementById('osuzV34Catalog')?.remove();
  panel=document.createElement('section');panel.id='osuzV34Catalog';panel.setAttribute('aria-hidden','true');
  panel.innerHTML=`
    <div class="v34-mobile-only v34-cat-head">
      <button type="button" class="v34-cat-back" id="v34CatBack" aria-label="${esc(tr('back'))}" hidden><i data-lucide="chevron-left"></i></button>
      <div class="v34-cat-title" id="v34CatTitle">${esc(tr('catalog'))}</div>
      <button type="button" class="v34-cat-close" id="v34CatClose" aria-label="${esc(tr('close'))}"><i data-lucide="x"></i></button>
    </div>
    <div class="v34-mobile-only v34-cat-list" id="v34CatMobileList"></div>
    <div class="v34-desktop-roots" id="v34CatRoots"></div>
    <div class="v34-desktop-subs"><div class="v34-desktop-heading" id="v34CatHeading">${esc(tr('sub'))}</div><div id="v34CatSubs"></div></div>`;
  document.body.appendChild(panel);
  ensureMobileListVisible();
  panel.addEventListener('click',e=>e.stopPropagation());
  document.getElementById('v34CatClose')?.addEventListener('click',closeCatalog);
  document.getElementById('v34CatBack')?.addEventListener('click',()=>{stack.pop();renderMobileLevel()});
  window.lucide?.createIcons();
}
function renderState(text){
  ensureMobileListVisible();
  const m=document.getElementById('v34CatMobileList'),r=document.getElementById('v34CatRoots'),s=document.getElementById('v34CatSubs');
  if(m)m.innerHTML='<div class="v34-cat-state">'+esc(text)+'</div>';
  if(r)r.innerHTML='<div class="v34-cat-state">'+esc(text)+'</div>';
  if(s)s.innerHTML='';
}
function renderMobileLevel(){
  ensureMobileListVisible();
  const list=document.getElementById('v34CatMobileList'),title=document.getElementById('v34CatTitle'),back=document.getElementById('v34CatBack');
  if(!list||!title||!back)return;
  const pid=stack.length?stack[stack.length-1]:null;
  const parent=pid==null?null:cats.find(c=>c.id===Number(pid));
  title.textContent=parent?catName(parent):tr('catalog');back.hidden=!parent;
  const rows=[];
  if(parent) rows.push(`<button type="button" class="v34-cat-row v34-cat-row-all" data-v34-go="${parent.id}"><span>${esc(tr('all'))}</span><i data-lucide="arrow-right"></i></button>`);
  for(const c of children(pid)){
    const has=children(c.id).length>0;
    rows.push(`<button type="button" class="v34-cat-row" data-v34-cat="${c.id}"><span>${esc(catName(c))}</span><i data-lucide="${has?'chevron-right':'arrow-right'}"></i></button>`);
  }
  list.innerHTML=rows.join('')||'<div class="v34-cat-state">'+esc(tr('error'))+'</div>';
  list.querySelectorAll('[data-v34-cat]').forEach(btn=>btn.addEventListener('click',e=>{
    e.preventDefault();e.stopPropagation();
    // Main category click always opens that category page.
    // Its child categories are then shown in the category page itself.
    goCategory(btn.dataset.v34Cat);
  }));
  list.querySelectorAll('[data-v34-go]').forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();goCategory(btn.dataset.v34Go)}));
  list.scrollTop=0;window.lucide?.createIcons();
}
function renderDesktopSubs(root){
  const box=document.getElementById('v34CatSubs');if(!box)return;desktopCurrent=root.id;
  const rows=[`<button type="button" class="v34-desktop-sub" data-v34-go="${root.id}"><span>${esc(tr('all'))}</span><i data-lucide="arrow-right"></i></button>`];
  for(const c of children(root.id))rows.push(`<button type="button" class="v34-desktop-sub" data-v34-go="${c.id}"><span>${esc(catName(c))}</span><i data-lucide="chevron-right"></i></button>`);
  box.innerHTML=rows.join('');
  box.querySelectorAll('[data-v34-go]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();goCategory(b.dataset.v34Go)}));
  document.querySelectorAll('.v34-desktop-root').forEach(b=>b.classList.toggle('active',Number(b.dataset.v34Root)===Number(root.id)));
  window.lucide?.createIcons();
}
function renderDesktop(){
  const rootBox=document.getElementById('v34CatRoots');if(!rootBox)return;
  const roots=children(null);
  rootBox.innerHTML=roots.map((c,i)=>`<button type="button" class="v34-desktop-root${i===0?' active':''}" data-v34-root="${c.id}"><span>${esc(catName(c))}</span><i data-lucide="chevron-right"></i></button>`).join('');
  rootBox.querySelectorAll('[data-v34-root]').forEach(b=>{
    const getRoot=()=>cats.find(x=>x.id===Number(b.dataset.v34Root));
    b.addEventListener('mouseenter',()=>{const c=getRoot();if(c)renderDesktopSubs(c)});
    b.addEventListener('focus',()=>{const c=getRoot();if(c)renderDesktopSubs(c)});
    b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const c=getRoot();if(c)goCategory(c.id)});
  });
  if(roots[0])renderDesktopSubs(roots[0]);window.lucide?.createIcons();
}
async function loadCategories(){
  if(cats.length)return cats;if(loadPromise)return loadPromise;
  loadPromise=(async()=>{
    try{
      const cache=Array.isArray(window.__OSUZ_CATEGORY_CACHE__)?window.__OSUZ_CATEGORY_CACHE__:[];
      if(cache.length)cats=normalizePayload(cache);
      if(!cats.length){
        const controller=new AbortController();
        const timeout=setTimeout(()=>controller.abort(),9000);
        try {
          const res=await fetch(API,{headers:{Accept:'application/json'},cache:'no-store',signal:controller.signal});
          if(!res.ok)throw new Error('HTTP '+res.status);
          cats=normalizePayload(await res.json());
        } finally { clearTimeout(timeout); }
      }
      if(!cats.length)throw new Error('No categories');
      renderMobileLevel();renderDesktop();
    }catch(err){console.error('[OSUZ V34 catalog]',err);renderState(tr('error'));const list=document.getElementById('v34CatMobileList');if(list){const a=document.createElement('a');a.href='/index.html#products';a.className='v34-cat-row';a.textContent=tr('all');list.appendChild(a)}}
    finally{loadPromise=null}
    return cats;
  })();
  return loadPromise;
}
function setCatalogActive(open){
  const path=location.pathname.toLowerCase();
  const page=path.split('/').pop()||'index.html';
  const pageKey=path.startsWith('/catalog/')||page==='category.html'||path.startsWith('/product/')||page==='product.html'?'catalog':page==='cart.html'?'cart':page==='orders.html'?'orders':page==='auth.html'?'profile':'home';
  document.querySelectorAll('.osuz-mobile-bottom-final [data-mobile-final]').forEach(el=>{
    el.classList.toggle('active',open?el.dataset.mobileFinal==='catalog':el.dataset.mobileFinal===pageKey);
    if(el.dataset.mobileFinal==='catalog')el.setAttribute('aria-pressed',String(!!open));
  });
}
function ensureMobileListVisible(){
  const list=document.getElementById('v34CatMobileList');
  if(!list)return;
  list.classList.add('v34-mobile-only');
  // Different generations of the mobile CSS used competing display rules.
  if(mobile()){
    list.style.setProperty('display','block','important');
    list.style.setProperty('flex','1 1 auto','important');
    list.style.setProperty('min-height','0','important');
    list.style.setProperty('overflow-y','auto','important');
    list.style.setProperty('visibility','visible','important');
  }
}
function openCatalog(fromHistory){
  if(!panel)buildPanel();measureTop();panel.classList.add('open');
  if(mobile()&&!fromHistory&&location.hash!=='#catalog'){try{history.pushState({osuzCatalog:1},'',location.pathname+location.search+'#catalog');pushedHash=true}catch(_){}}panel.setAttribute('aria-hidden','false');
  if(mobile())document.body.classList.add('osuz-v34-catalog-open');
  document.querySelectorAll('[data-osuz-catalog-toggle]').forEach(b=>b.setAttribute('aria-expanded','true'));
  stack=[];setCatalogActive(true);ensureMobileListVisible();
  if(cats.length){renderMobileLevel();renderDesktop()}else{renderState(tr('loading'));void loadCategories()}
}
function closeCatalog(){
  if(mobile()&&location.hash==='#catalog'){
    if(pushedHash){pushedHash=false;history.back();return}
    try{history.replaceState(null,'',location.pathname+location.search)}catch(_){}
  }
  closeCatalogUI();
}
function closeCatalogUI(){
  if(!panel)return;panel.classList.remove('open');panel.setAttribute('aria-hidden','true');document.body.classList.remove('osuz-v34-catalog-open');
  document.querySelectorAll('[data-osuz-catalog-toggle]').forEach(b=>b.setAttribute('aria-expanded','false'));setCatalogActive(false);
}
function toggleCatalog(){panel?.classList.contains('open')?closeCatalog():openCatalog()}
function bindSearchSafety(){
  /* category search was previously hidden by a legacy mobile override; keep it functional. */
  const categoryBtn=document.getElementById('categoryHeaderSearchButton'),categoryInput=document.getElementById('searchInput');
  if(categoryBtn&&categoryInput&&!categoryBtn.dataset.v34Search){categoryBtn.dataset.v34Search='1';categoryBtn.addEventListener('click',()=>{const q=categoryInput.value.trim();location.assign(OSUZRoutes.search(q))})}
}
function init(){
  ensureBottomCatalog();buildPanel();measureTop();bindSearchSafety();setCatalogActive(false);
  document.addEventListener('click',e=>{
    const bottom=e.target.closest('[data-v34-mobile-catalog]');
    const top=e.target.closest('[data-osuz-catalog-toggle]');
    if(bottom||(top&&!mobile())){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();toggleCatalog()}
  },true);
  document.addEventListener('click',e=>{if(!mobile()&&panel?.classList.contains('open')&&!e.target.closest('#osuzV34Catalog')&&!e.target.closest('[data-v34-mobile-catalog]')&&!e.target.closest('[data-osuz-catalog-toggle]'))closeCatalog()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCatalog()});
  window.addEventListener('resize',()=>{measureTop();if(!mobile())document.body.classList.remove('osuz-v34-catalog-open')},{passive:true});
  window.addEventListener('orientationchange',()=>setTimeout(measureTop,80),{passive:true});
  window.addEventListener('load',measureTop,{once:true});
  window.addEventListener('storage',e=>{if(e.key==='osuzLang'){ensureBottomCatalog();if(panel?.classList.contains('open')){buildPanel();openCatalog()}}});
  const syncHash=()=>{const want=mobile()&&location.hash==='#catalog',open=!!panel?.classList.contains('open');if(want&&!open)openCatalog(true);else if(!want&&open&&mobile())closeCatalogUI()};
  window.addEventListener('popstate',syncHash);window.addEventListener('hashchange',syncHash);
  syncHash();
  window.lucide?.createIcons();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

