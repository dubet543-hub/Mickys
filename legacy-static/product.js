/* ── Product Detail Page Logic ── */

/* Read product ID from URL */
const params = new URLSearchParams(window.location.search);
const productId = params.get('id') || PRODUCTS[0].id;
const product   = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

let qty = 1;

/* ── Populate Page ── */
function populatePage() {
  document.title = `${product.name} — Micky's`;

  document.getElementById('breadcrumbName').textContent = product.name;
  document.getElementById('pdTitle').textContent        = product.name;
  document.getElementById('pdTagline').textContent      = product.tagline;
  document.getElementById('pdCategory').textContent     = product.category.charAt(0).toUpperCase() + product.category.slice(1);
  document.getElementById('pdDescription').textContent  = product.description;
  document.getElementById('pdIngredients').textContent  = product.ingredients;

  const img = document.getElementById('pdMainImg');
  if (img) img.src = product.image;

  const badge = document.getElementById('pdBadge');
  if (badge && product.label) {
    badge.textContent = product.label;
    badge.style.display = 'block';
  }

  document.getElementById('pdPrice').textContent   = `₹${product.price}`;
  document.getElementById('pdMrp').textContent     = `₹${product.mrp}`;
  const saved = product.mrp - product.price;
  document.getElementById('pdSavings').textContent = `Save ₹${saved}`;

  document.getElementById('pdWeight').textContent = product.weight;
  document.getElementById('pdServes').textContent = `Serves ${product.serves}`;
  document.getElementById('pdShelf').textContent  = `Shelf life: ${product.shelfLife}`;

  renderRelated();
}

/* ── Qty Controls ── */
document.getElementById('pdQtyMinus')?.addEventListener('click', () => {
  qty = Math.max(1, qty - 1);
  document.getElementById('pdQtyVal').textContent = qty;
});
document.getElementById('pdQtyPlus')?.addEventListener('click', () => {
  qty = Math.min(10, qty + 1);
  document.getElementById('pdQtyVal').textContent = qty;
});

/* ── Add to Cart ── */
document.getElementById('pdATCBtn')?.addEventListener('click', () => {
  for (let i = 0; i < qty; i++) {
    const cart = getCart();
    const idx  = cart.findIndex(c => c.id === product.id);
    if (i === 0 && idx > -1) {
      cart[idx].qty += qty;
      saveCart(cart);
      break;
    } else if (i === 0) {
      addToCart(product.id, product.name, product.price, product.image);
      if (qty > 1) {
        const c2 = getCart();
        const i2 = c2.findIndex(c => c.id === product.id);
        if (i2 > -1) { c2[i2].qty = qty; saveCart(c2); updateCartUI(); }
      }
      break;
    }
  }

  const btn = document.getElementById('pdATCBtn');
  btn.textContent = 'Added ✓';
  btn.style.background = '#27ae60';
  flyBubble(document.getElementById('pdMainImg'));
  openCart();
  animateCartBadge();
  setTimeout(() => { btn.textContent = 'Add to Cart'; btn.style.background = ''; }, 2000);
});

/* ── Buy Now ── */
document.getElementById('pdBuyBtn')?.addEventListener('click', () => {
  const cart = getCart();
  const idx  = cart.findIndex(c => c.id === product.id);
  if (idx > -1) cart[idx].qty = qty;
  else cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty });
  saveCart(cart);
  updateCartUI();
  window.location.href = 'checkout.html';
});

/* ── Accordion ── */
document.querySelectorAll('.acc-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.acc-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.acc-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

/* ── Related Products ── */
function renderRelated() {
  const related = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);
  const grid    = document.getElementById('pdRelated');
  if (!grid) return;
  grid.innerHTML = related.map(p => `
    <div class="product-card"
      data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-image="${p.image}">
      <div class="product-img-wrap">
        <img src="${p.image}" alt="${p.name}">
        <div class="product-overlay">
          <button class="product-add-btn atc-btn">Add to Cart</button>
        </div>
        ${p.label ? `<span class="product-label">${p.label}</span>` : ''}
      </div>
      <div class="product-info">
        <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
        <p>${p.tagline}</p>
        <div class="product-footer">
          <div class="price-wrap">
            <span class="price">₹${p.price}</span>
            <span class="mrp">₹${p.mrp}</span>
          </div>
          <a href="product.html?id=${p.id}" class="product-link">View →</a>
        </div>
      </div>
    </div>`).join('');

  wireATCButtons();
}

/* ── Wire cart drawer events (same as index.html) ── */
document.getElementById('cartBtn')?.addEventListener('click', openCart);
document.getElementById('cartClose')?.addEventListener('click', closeCart);
document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
document.getElementById('cartContinueShopping')?.addEventListener('click', closeCart);
document.getElementById('cartEmptyShop')?.addEventListener('click', () => {
  closeCart();
  window.location.href = 'index.html#products';
});

/* ── Init ── */
populatePage();
updateCartUI();
