# OSUZ — Language dropdown / mobile catalog fix (2026-11-12)

Fixed a UI stacking bug where the RU/UZ/EN language menu stayed visible above the fullscreen mobile catalog.

- Both catalog opening handlers (legacy and current V34) now dismiss the language dropdown.
- All known language menu variations are supported (home, product, category, account).
- While the fullscreen mobile catalog is open, a scoped CSS rule prevents the language dropdown from covering the catalog even if another script tries to reopen it.
- The dropdown works normally again after closing the catalog.

Files changed: `index.html`, `category.html`, `product.html`, `terms.html`, `privacy.html`, `assets/js/v34-catalog-routing-fix-js.js`.

Regression testing: Chromium smoke tests with the actual project catalog scripts and a synthetic page at 390px. All six catalog implementations passed. Live API/browser integration was not tested.
