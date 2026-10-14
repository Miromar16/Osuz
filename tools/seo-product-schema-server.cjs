'use strict';

/**
 * OPTIONAL BACKEND HELPER (not automatically used by the static frontend).
 * Integrate into backend_osuz/routes/seo.js using actual API/database values.
 * Never synthesize inventory, brand, barcode, shipping costs or return terms.
 */
function sku(value) {
  if (typeof value !== 'string' && typeof value !== 'number') return '';
  const text = String(value);
  return text && text.length <= 200 && !/[\p{White_Space}\p{Cc}\p{Cf}]/u.test(text) ? text : '';
}
function brand(value) {
  const text = (typeof value === 'string' ? value : value?.name || '').trim();
  if (!text || /^(без бренда|no brand|unbranded|без марки|brandsiz)$/iu.test(text)) return '';
  return text;
}
function gtin(value) {
  const raw = String(value ?? '').trim();
  if (!/^[0-9\s-]+$/.test(raw)) return '';
  const code = raw.replace(/[\s-]/g, '');
  if (![8, 12, 13, 14].includes(code.length)) return '';
  let sum = 0;
  const body = code.slice(0, -1);
  for (let i = body.length - 1, weight = 3; i >= 0; --i, weight = weight === 3 ? 1 : 3) {
    sum += Number(body[i]) * weight;
  }
  return ((10 - (sum % 10)) % 10 === Number(code.at(-1))) ? code : '';
}
function listingAvailability(listing) {
  const tracking = Number(listing?.require_stock_for_cart ?? listing?.requireStockForCart) === 1;
  if (!tracking) return null; // seller confirmation needed
  const count = Number(listing?.total_stock);
  if (!Number.isFinite(count)) return null;
  return count > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock';
}
function buildProductSchema({ product, listings, url, images = [], description = '' }) {
  if (!product || !url || !Array.isArray(listings)) return null;
  const usable = listings.map(l => ({
    price: Number(l?.price),
    availability: listingAvailability(l),
    seller: String(l?.tenant_name || '').trim()
  })).filter(l => Number.isFinite(l.price) && l.price > 0);
  if (!usable.length) return null;
  const offer = usable.length === 1 ? {
    '@type': 'Offer',
    url,
    priceCurrency: 'UZS',
    price: usable[0].price
  } : {
    '@type': 'AggregateOffer',
    url,
    priceCurrency: 'UZS',
    lowPrice: Math.min(...usable.map(l=>l.price)),
    highPrice: Math.max(...usable.map(l=>l.price)),
    offerCount: usable.length
  };
  if (usable.length === 1) {
    if (usable[0].availability) offer.availability = usable[0].availability;
    if (usable[0].seller) offer.seller = { '@type':'Organization', name: usable[0].seller };
  } else if (usable.some(l => l.availability === 'https://schema.org/InStock')) {
    offer.availability = 'https://schema.org/InStock';
  } else if (usable.every(l => l.availability === 'https://schema.org/OutOfStock')) {
    offer.availability = 'https://schema.org/OutOfStock';
  }
  const name = [product.name_ru, product.name_uz, product.name_en, product.name, product.title_ru, product.title].find(x => typeof x === 'string' && x.trim());
  if (!name) return null;
  const schema = { '@context':'https://schema.org', '@type':'Product', name, url, offers:offer };
  if (description) schema.description = String(description);
  if (Array.isArray(images) && images.length) schema.image = images.filter(x => typeof x === 'string' && /^https:\/\//.test(x));
  const realBrand = brand(product.brand || product.brand_name);
  if (realBrand) schema.brand = { '@type':'Brand', name:realBrand };
  const realSku = sku(product.sku ?? product.order_code);
  if (realSku) schema.sku = realSku;
  const realMpn = sku(product.mpn);
  if (realMpn) schema.mpn = realMpn;
  const realGtin = gtin(product.gtin || product.barcode);
  if (realGtin) schema['gtin'+realGtin.length] = realGtin;
  return schema;
}
module.exports = { buildProductSchema, sku, brand, gtin, listingAvailability };
