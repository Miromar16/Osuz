/* ===== osuz-v44-header-dom-order-hardfix ===== */
(() => {
  'use strict';
  function normalizeHeaderOrder() {
    document.querySelectorAll('.site-header-top > div, .auth-site-header > div').forEach(container => {
      const children = Array.from(container.children);
      const catalog = children.find(el => el.classList?.contains('osuz-desktop-catalog-button'));
      const search = children.find(el => el.classList?.contains('osuz-desktop-search-slot'));
      if (!catalog || !search) return;
      if (catalog.nextElementSibling !== search) container.insertBefore(catalog, search);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', normalizeHeaderOrder, { once: true });
  } else {
    normalizeHeaderOrder();
  }
  window.addEventListener('load', normalizeHeaderOrder, { once: true });
  setTimeout(normalizeHeaderOrder, 0);
  setTimeout(normalizeHeaderOrder, 250);
})();

/* ===== osuz-v45-header-order-inline-hardlock ===== */
(() => {
  'use strict';
  function enforceHeaderOrder(){
    if (!window.matchMedia('(min-width:768px)').matches) return;
    document.querySelectorAll('.site-header-top > div, .auth-site-header > div').forEach(row => {
      const kids = Array.from(row.children);
      const catalog = kids.find(el => el.classList?.contains('osuz-desktop-catalog-button'));
      const search = kids.find(el => el.classList?.contains('osuz-desktop-search-slot'));
      const actions = kids.find(el => el.classList?.contains('header-actions') || el.classList?.contains('osuz-mobile-header-actions'));
      const brand = kids.find(el => el !== catalog && el !== search && el !== actions) || kids[0];
      if (!catalog || !search || !actions || !brand) return;

      // Physical DOM order: brand -> catalog -> search -> actions.
      if (brand.nextElementSibling !== catalog) row.insertBefore(catalog, brand.nextElementSibling);
      if (catalog.nextElementSibling !== search) row.insertBefore(search, catalog.nextElementSibling);
      if (search.nextElementSibling !== actions) row.insertBefore(actions, search.nextElementSibling);

      // Inline !important beats all legacy V26/V43 order rules.
      brand.style.setProperty('order','0','important');
      brand.style.setProperty('margin-right','0','important');
      catalog.style.setProperty('order','1','important');
      catalog.style.setProperty('display','inline-flex','important');
      catalog.style.setProperty('margin-left', window.matchMedia('(max-width:1100px)').matches ? '18px' : '38px','important');
      catalog.style.setProperty('margin-right','0','important');
      search.style.setProperty('order','2','important');
      search.style.setProperty('margin-top','0','important');
      search.style.setProperty('margin-bottom','0','important');
      search.style.setProperty('margin-left','12px','important');
      search.style.setProperty('margin-right','18px','important');
      actions.style.setProperty('order','3','important');
      actions.style.setProperty('margin-left','auto','important');
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enforceHeaderOrder, {once:true});
  else enforceHeaderOrder();
  window.addEventListener('load', enforceHeaderOrder, {once:true});
  window.addEventListener('resize', enforceHeaderOrder, {passive:true});
  setTimeout(enforceHeaderOrder, 0);
  setTimeout(enforceHeaderOrder, 100);
  setTimeout(enforceHeaderOrder, 500);
})();

