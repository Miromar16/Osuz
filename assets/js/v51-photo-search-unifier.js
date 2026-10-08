/* ===== osuz-v51-photo-search-unifier ===== */
(() => {
  function addCameraControl(container) {
    if (!container || container.querySelector('.osuz-photo-search-control')) return;

    const existingHero = container.querySelector('#heroPhotoBtn');
    if (existingHero) {
      existingHero.classList.add('osuz-photo-search-control');
      existingHero.dataset.osuzPhotoSearch = '1';
      return;
    }

    const submit = container.querySelector('button[type="submit"], #categoryHeaderSearchButton, .mobile-top-search-btn, .mobile-menu-search-button');
    const input = container.querySelector('input[type="search"], input[type="text"]');
    if (!input) return;

    const label = document.createElement('label');
    label.className = 'osuz-photo-search-control';
    label.dataset.osuzPhotoSearch = '1';
    label.title = 'Поиск по фото';
    label.setAttribute('aria-label', 'Поиск по фото');
    label.innerHTML = '<i data-lucide="camera" aria-hidden="true"></i><input type="file" accept="image/*" tabindex="-1" aria-hidden="true">';

    const file = label.querySelector('input[type="file"]');
    file.addEventListener('change', () => {
      if (!file.files || !file.files.length) return;
      label.classList.add('is-selected');
      window.setTimeout(() => label.classList.remove('is-selected'), 900);
      /* На главной остаётся полноценный существующий поиск по фото; на остальных страницах
         кнопка унифицирована визуально и открывает системный выбор изображения. */
    });

    if (submit) container.insertBefore(label, submit);
    else container.appendChild(label);
  }

  function initPhotoSearchControls() {
    document.querySelectorAll([
      '.header-search-bar',
      '.category-header-search',
      'form.osuz-header-search',
      '.mobile-top-search-shell',
      '.mobile-menu-search-shell'
    ].join(',')).forEach(addCameraControl);

    const hero = document.getElementById('heroPhotoBtn');
    if (hero) hero.classList.add('osuz-photo-search-control');
    if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPhotoSearchControls, { once:true });
  else initPhotoSearchControls();
})();

