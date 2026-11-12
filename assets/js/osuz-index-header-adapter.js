/* Index header behavior on FAQ, Returns, Delivery, Tariffs and Sellers pages.
   Header markup is copied from index.html; business page content stays unchanged. */
(() => {
  'use strict';
  const root = document.getElementById('osuz-shared-index-header');
  if (!root) return;
  const language = () => {
    try { const raw=localStorage.getItem('osuzLang'); return ['ru','uz','en'].includes(raw) ? raw : 'ru'; }
    catch (_) { return 'ru'; }
  };
  const texts = {
    ru: { search:'Поиск товаров...', find:'Найти', catalog:'Каталог', login:'Войти', orders:'Заказы', cart:'Корзина', photo:'Поиск по фото доступен на главной странице' },
    uz: { search:'Mahsulotlarni qidirish...', find:'Topish', catalog:'Katalog', login:'Kirish', orders:'Buyurtmalar', cart:'Savat', photo:'Rasm orqali qidirish bosh sahifada mavjud' },
    en: { search:'Search products...', find:'Search', catalog:'Catalog', login:'Sign in', orders:'Orders', cart:'Cart', photo:'Image search is available on the home page' }
  };
  const byId = id => root.querySelector('#'+id);
  const urlForSearch = q => 'category.html' + (q ? '?q='+encodeURIComponent(q) : '');
  const openSearch = input => { window.location.href=urlForSearch((input?.value||'').trim()); };
  byId('heroSearchBtn')?.addEventListener('click',() => openSearch(byId('heroSearchInput')));
  byId('heroSearchInput')?.addEventListener('keydown',e => { if (e.key==='Enter'){e.preventDefault();openSearch(e.currentTarget);} });
  byId('mobileTopSearchForm')?.addEventListener('submit',e => {e.preventDefault();openSearch(byId('mobileTopSearchInput'));});
  byId('heroPhotoBtn')?.addEventListener('click', e => {e.preventDefault();byId('heroPhotoInput')?.click();});
  byId('mobileTopPhotoBtn')?.addEventListener('click',()=> byId('heroPhotoInput')?.click());
  byId('heroPhotoInput')?.addEventListener('change',e => {
    const f=e.currentTarget.files?.[0]; if (!f) return;
    // Actual photo similarity search is implemented by index.html; avoid a fake result here.
    const note=texts[language()].photo;
    if(window.confirm(note+' — '+(language()==='ru'?'Перейти?':language()==='uz'?'O‘tish?':'Go there?'))) window.location.href='index.html';
    e.currentTarget.value='';
  });
  byId('mobileMenuBtn')?.addEventListener('click',()=>window.location.href='category.html');
  function update() {
    const t=texts[language()];
    const langLabel=byId('languageLabel'); if(langLabel){langLabel.dataset.lang=language();langLabel.textContent=language().toUpperCase();}
    root.querySelectorAll('[data-osuz-catalog-text]').forEach(el=>el.textContent=t.catalog);
    for(const id of ['heroSearchInput','mobileTopSearchInput']){const el=byId(id);if(el)el.placeholder=t.search;}
    root.querySelectorAll('#heroSearchBtn span,#mobileTopSearchButton span').forEach(el=>el.textContent=t.find);
    const account=root.querySelector('[data-customer-account-text]');if(account)account.textContent=t.login;
    root.querySelectorAll('a[href="orders.html"] span').forEach(el=>el.textContent=t.orders);
    root.querySelectorAll('a[href="cart.html"] span:not([data-cart-count])').forEach(el=>el.textContent=t.cart);
    root.querySelectorAll('#languageMenu [data-language]').forEach(el=>el.setAttribute('aria-checked',String(el.dataset.language===language())));
  }
  root.querySelectorAll('#languageMenu [data-language]').forEach(el=>el.addEventListener('click',()=>queueMicrotask(update)));
  window.addEventListener('storage',e=>{if(e.key==='osuzLang')update()});
  document.documentElement.setAttribute('data-osuz-theme',document.body.classList.contains('dark-mode')?'dark':'light');
  update();
  if(window.lucide?.createIcons)window.lucide.createIcons();
})();
