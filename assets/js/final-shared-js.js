/* ===== osuz-final-shared-js ===== */
(function(){
 'use strict';
 const FLAGS={ru:'ru',uz:'uz',en:'en'};
 const TEXT={
  ru:{catalog:'Каталог',search:'Поиск товаров...',find:'Найти',hint:'Подкатегории',hover:'Наведите на категорию слева',contact:'Связаться с нами',address:'Ташкент, Узбекистан',home:'Главная',cart:'Корзина',orders:'Заказы',profile:'Профиль'},
  uz:{catalog:'Katalog',search:'Mahsulotlarni qidirish...',find:'Topish',hint:'Ichki kategoriyalar',hover:'Chapdagi kategoriyani tanlang',contact:'Biz bilan bog‘lanish',address:'Toshkent, O‘zbekiston',home:'Bosh sahifa',cart:'Savat',orders:'Buyurtmalar',profile:'Profil'},
  en:{catalog:'Catalog',search:'Search products...',find:'Search',hint:'Subcategories',hover:'Hover a category on the left',contact:'Contact us',address:'Tashkent, Uzbekistan',home:'Home',cart:'Cart',orders:'Orders',profile:'Profile'}
 };
 function lang(){try{const x=localStorage.getItem('osuzLang');return ['ru','uz','en'].includes(x)?x:'ru'}catch(e){return 'ru'}}
 function theme(){try{return localStorage.getItem('osuzTheme')==='dark'?'dark':'light'}catch(e){return 'light'}}
 function syncThemeRoot(){const t=document.body?.classList.contains('dark-mode')?'dark':theme();document.documentElement.setAttribute('data-osuz-theme',t);document.documentElement.classList.toggle('osuz-pre-dark',t==='dark')}
 function syncFlags(){const l=lang();document.querySelectorAll('[data-osuz-lang-label]').forEach(el=>{el.dataset.lang=l;if(el.dataset.code!=='false')el.textContent=l.toUpperCase()});document.querySelectorAll('[data-osuz-select-flag]').forEach(el=>el.dataset.lang=l);document.querySelectorAll('[data-osuz-select-code]').forEach(el=>el.textContent=l.toUpperCase())}
 function syncTexts(){const l=lang(),t=TEXT[l]||TEXT.ru;document.querySelectorAll('[data-osuz-catalog-text]').forEach(x=>x.textContent=t.catalog);document.querySelectorAll('[data-osuz-search-text]').forEach(x=>x.textContent=t.find);document.querySelectorAll('[data-osuz-search-input]').forEach(x=>x.placeholder=t.search);document.querySelectorAll('[data-osuz-catalog-hint]').forEach(x=>x.textContent=t.hint);document.querySelectorAll('[data-osuz-contact-open-text]').forEach(x=>x.textContent=t.contact);const ct=document.getElementById('osuzContactTitle');if(ct)ct.textContent=t.contact;document.querySelectorAll('[data-osuz-contact-address]').forEach(x=>x.textContent=t.address);document.querySelectorAll('[data-mobile-final-label]').forEach(x=>{const k=x.dataset.mobileFinalLabel;x.textContent=t[k]||t.catalog})}
 function syncMobileActive(){const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();let k=(page.startsWith('category')||location.pathname.startsWith('/catalog/'))?'catalog':page.startsWith('cart')?'cart':page.startsWith('orders')?'orders':page.startsWith('auth')?'profile':'home';document.querySelectorAll('[data-mobile-final]').forEach(a=>a.classList.toggle('active',a.dataset.mobileFinal===k))}
 function syncMobileCart(){let n=0;document.querySelectorAll('[data-cart-count],#headerCartCount,.osuz-cart-count').forEach(el=>{const v=parseInt((el.textContent||'0').replace(/\D/g,''),10);if(Number.isFinite(v))n=Math.max(n,v)});document.querySelectorAll('[data-mobile-cart-count]').forEach(el=>{el.textContent=String(n);el.style.display=n>0?'inline-flex':'none'})}
 function initSearchForms(){document.querySelectorAll('form.osuz-header-search').forEach(form=>{if(form.dataset.bound)return;form.dataset.bound='1';form.addEventListener('submit',e=>{e.preventDefault();const input=form.querySelector('input');const q=(input?.value||'').trim();location.href=OSUZRoutes.search(q)})})}
 let catalogLoaded=false,allCats=[];
 function parseNames(c){
   if(!c||typeof c!=='object')return {};
   let names=c.names;
   if(typeof names==='string'){
     try{names=JSON.parse(names)}catch(_){names={}}
   }
   if(!names||typeof names!=='object'||Array.isArray(names))names={};
   const clean=v=>v===null||v===undefined?'':String(v).trim();
   const ru=clean(names.ru)||clean(c.name_ru)||clean(c.title_ru);
   const uz=clean(names.uz)||clean(c.name_uz)||clean(c.title_uz);
   const en=clean(names.en)||clean(c.name_en)||clean(c.title_en);
   return {ru,uz,en};
 }
 function normalizeParentId(value){
   if(value===null||value===undefined||value===''||value==='null')return null;
   const n=Number(value);return Number.isFinite(n)?n:null;
 }
 function normalizeCats(payload){
   const list=Array.isArray(payload)?payload:
     Array.isArray(payload?.categories)?payload.categories:
     Array.isArray(payload?.data)?payload.data:
     Array.isArray(payload?.items)?payload.items:[];
   return list.filter(x=>x&&typeof x==='object').map(c=>{
     const id=Number(c.id);
     return {...c,id:Number.isFinite(id)?id:c.id,parent_id:normalizeParentId(c.parent_id),names:parseNames(c)};
   }).filter(c=>c.id!==undefined&&c.id!==null&&Object.values(c.names).some(Boolean));
 }
 function cname(c){
   const names=parseNames(c),l=lang();
   return names[l]||names.ru||names.en||names.uz||'';
 }
 function pageCategoryCache(){
   try{
     if(Array.isArray(window.__OSUZ_CATEGORY_CACHE__)&&window.__OSUZ_CATEGORY_CACHE__.length)return normalizeCats(window.__OSUZ_CATEGORY_CACHE__);
   }catch(_){ }
   try{
     if(typeof allCategories!=='undefined'&&Array.isArray(allCategories)&&allCategories.length)return normalizeCats(allCategories);
   }catch(_){ }
   return [];
 }
 async function getCatalogCategories(){
   // Единственный источник для mega-menu: публичный backend API из документации OSUZ.
   // Не используем старые кеши/макеты, чтобы меню не могло подхватить заглушки.
   const endpoint='https://osuz.uz/api/catalog/categories';
   const controller=new AbortController();
   const tm=setTimeout(()=>controller.abort(),12000);
   try{
     const res=await fetch(endpoint,{signal:controller.signal,cache:'no-store',headers:{Accept:'application/json'}});
     if(!res.ok)throw new Error('HTTP '+res.status+' '+endpoint);
     const payload=await res.json();
     const cats=normalizeCats(payload);
     if(!cats.length)throw new Error('API returned no named categories');
     return cats;
   }finally{clearTimeout(tm)}
 }
 function showSubs(root,button){
   document.querySelectorAll('.osuz-catalog-cat').forEach(x=>x.classList.remove('active'));
   button?.classList.add('active');
   const right=document.getElementById('osuzCatalogRight');if(!right)return;
   const rootId=Number(root.id);
   const subs=allCats.filter(x=>Number(x.parent_id)===rootId);
   right.innerHTML='';
   if(!subs.length){
     const a=document.createElement('a');a.className='osuz-catalog-sub';a.href=OSUZRoutes.category(root);a.textContent=cname(root);right.appendChild(a);return;
   }
   subs.slice(0,80).forEach(x=>{
     const name=cname(x);if(!name)return;
     const a=document.createElement('a');a.className='osuz-catalog-sub';a.href=OSUZRoutes.category(x);a.textContent=name;right.appendChild(a)
   });
 }
 async function loadCatalog(){
   if(catalogLoaded)return;catalogLoaded=true;
   const left=document.getElementById('osuzCatalogLeft'),right=document.getElementById('osuzCatalogRight');
   try{
     allCats=await getCatalogCategories();
     console.info('[OSUZ catalog v4] categories', allCats.map(c=>({id:c.id,parent_id:c.parent_id,names:c.names})));
     const roots=allCats.filter(x=>x.parent_id===null && cname(x));
     if(!roots.length)throw new Error('No top-level categories');
     left.innerHTML='';
     roots.slice(0,60).forEach((root,i)=>{
       const name=cname(root);if(!name)return;
       const b=document.createElement('button');b.type='button';b.className='osuz-catalog-cat';b.innerHTML='<span></span><i data-lucide="chevron-right"></i>';b.querySelector('span').textContent=name;
       b.addEventListener('mouseenter',()=>showSubs(root,b));b.addEventListener('focus',()=>showSubs(root,b));
       b.addEventListener('click',()=>{location.href=OSUZRoutes.category(root)});
       left.appendChild(b);if(i===0)showSubs(root,b)
     });
     if(!left.children.length)throw new Error('No named top-level categories');
     if(window.lucide)lucide.createIcons();
   }catch(err){
     catalogLoaded=false;
     console.error('[OSUZ catalog menu]',err);
     left.innerHTML='<div class="px-3 py-4 text-sm text-gray-500">'+(lang()==='en'?'Could not load categories.':lang()==='uz'?'Kategoriyalar yuklanmadi.':'Категории не загрузились.')+'</div>';
     right.innerHTML='<a class="osuz-catalog-sub" href="/index.html#products">'+(TEXT[lang()]||TEXT.ru).catalog+' →</a>';
   }
 }
 function panelTop(){const header=document.querySelector('.site-header,.auth-site-header,header.fixed,header');if(!header)return 82;const r=header.getBoundingClientRect();return Math.max(0,r.bottom)}
 function openCatalog(force){const p=document.getElementById('osuzCatalogPanel');if(!p)return;const should=force===undefined?!p.classList.contains('open'):force;p.classList.toggle('open',should);p.setAttribute('aria-hidden',String(!should));document.querySelectorAll('[data-osuz-catalog-toggle]').forEach(b=>b.setAttribute('aria-expanded',String(should)));if(should){p.style.top=panelTop()+'px';loadCatalog()}}
 function initCatalog(){document.querySelectorAll('[data-osuz-catalog-toggle]').forEach(btn=>{btn.addEventListener('click',e=>{e.preventDefault();openCatalog()});btn.addEventListener('mouseenter',()=>{if(innerWidth>=768)openCatalog(true)})});const p=document.getElementById('osuzCatalogPanel');p?.addEventListener('mouseleave',()=>{if(innerWidth>=768)setTimeout(()=>{if(!document.querySelector('[data-osuz-catalog-toggle]:hover'))openCatalog(false)},100)});document.addEventListener('click',e=>{if(!e.target.closest('[data-osuz-catalog-toggle]')&&!e.target.closest('#osuzCatalogPanel'))openCatalog(false)});document.addEventListener('keydown',e=>{if(e.key==='Escape')openCatalog(false)});window.addEventListener('resize',()=>{if(p?.classList.contains('open'))p.style.top=panelTop()+'px'})}
 function initContact(){const back=document.getElementById('osuzContactBackdrop'),close=document.getElementById('osuzContactClose');const open=()=>{back?.classList.add('open');back?.setAttribute('aria-hidden','false')};const shut=()=>{back?.classList.remove('open');back?.setAttribute('aria-hidden','true')};document.querySelectorAll('[data-osuz-contact-open]').forEach(x=>x.addEventListener('click',e=>{e.preventDefault();open()}));close?.addEventListener('click',shut);back?.addEventListener('click',e=>{if(e.target===back)shut()});document.addEventListener('keydown',e=>{if(e.key==='Escape')shut()})}
 function initCatalogOpeners(){document.querySelectorAll('[data-osuz-catalog-open]').forEach(el=>{if(el.dataset.osuzCatalogOpenBound==='1')return;el.dataset.osuzCatalogOpenBound='1';el.addEventListener('click',e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});setTimeout(()=>openCatalog(true),180)})})}
 function init(){syncThemeRoot();syncFlags();syncTexts();syncMobileActive();initSearchForms();initCatalog();initCatalogOpeners();initContact();syncMobileCart();setTimeout(syncMobileCart,900);if(window.lucide)lucide.createIcons()}
 document.addEventListener('DOMContentLoaded',init);
 document.addEventListener('click',e=>{if(e.target.closest('[data-language],.language-option,.product-language-option,.category-language-option'))setTimeout(()=>{syncFlags();syncTexts()},0);if(e.target.closest('#themeToggle,#mobileThemeToggle,#categoryThemeToggle'))setTimeout(syncThemeRoot,0)},true);
 document.addEventListener('change',e=>{if(e.target.matches('#languageSelect'))setTimeout(()=>{syncFlags();syncTexts()},0)},true);
 window.addEventListener('storage',e=>{if(e.key==='osuzLang'){syncFlags();syncTexts()}if(e.key==='osuzTheme')syncThemeRoot()});
 window.addEventListener('load',()=>{syncThemeRoot();syncFlags();syncTexts();syncMobileCart()});
})();

