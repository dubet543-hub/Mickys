/* ═══════════════════════════════════════════
   MICKY'S — script.js
═══════════════════════════════════════════ */

/* ═══════════════════════════════════════════
   PRODUCTS DATA
═══════════════════════════════════════════ */
const PRODUCTS = [
  {
    id: 'makhani-gravy', name: 'Makhani Gravy', tagline: 'Rich, buttery & velvety smooth',
    price: 199, mrp: 249, label: 'Bestseller', category: 'gravies', weight: '200g', serves: '4',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
    description: 'The ultimate base for Butter Chicken, Paneer Makhani and more. Made from slow-roasted tomatoes, cashews and aromatic spices — restaurant flavour in minutes.',
    ingredients: 'Tomatoes, Cashews, Onions, Butter, Spices, Salt', shelfLife: '12 months',
  },
  {
    id: 'kadhai-gravy', name: 'Kadhai Gravy', tagline: 'Bold, spiced & deeply aromatic',
    price: 199, mrp: 249, label: null, category: 'gravies', weight: '200g', serves: '4',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80',
    description: 'Bring the bold flavours of a traditional kadhai dish to your kitchen. Crushed spices, peppers and a smoky tomato base.',
    ingredients: 'Tomatoes, Onions, Capsicum, Whole Spices, Oil, Salt', shelfLife: '12 months',
  },
  {
    id: 'malabari-gravy', name: 'Malabari Gravy', tagline: 'Coconut-kissed coastal flavours',
    price: 199, mrp: 249, label: null, category: 'gravies', weight: '200g', serves: '4',
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80',
    description: 'From the coast of Kerala — a rich, coconut-based gravy with curry leaves, mustard and coastal spices.',
    ingredients: 'Coconut Milk, Tomatoes, Curry Leaves, Mustard, Turmeric, Salt', shelfLife: '12 months',
  },
  {
    id: 'onion-tomato-masala', name: 'Onion Tomato Masala', tagline: 'The foundation of every great curry',
    price: 149, mrp: 199, label: null, category: 'pastes', weight: '200g', serves: '4',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80',
    description: 'Slow-cooked onions and tomatoes with whole spices — the base used in every great Indian curry.',
    ingredients: 'Onions, Tomatoes, Ginger, Garlic, Whole Spices, Oil, Salt', shelfLife: '12 months',
  },
  {
    id: 'yellow-gravy', name: 'Yellow Gravy', tagline: 'Mild, creamy & universally loved',
    price: 199, mrp: 249, label: 'New', category: 'gravies', weight: '200g', serves: '4',
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&q=80',
    description: 'A versatile, mild yellow gravy — cashew-based, gently spiced and beautifully creamy.',
    ingredients: 'Cashews, Onions, Tomatoes, Turmeric, Cardamom, Salt', shelfLife: '12 months',
  },
  {
    id: 'ginger-garlic-paste', name: 'Ginger-Garlic Paste', tagline: 'Fresh, punchy & always ready',
    price: 89, mrp: 120, label: null, category: 'pastes', weight: '100g', serves: '8',
    image: 'https://images.unsplash.com/photo-1627662168223-7df99068099a?w=800&q=80',
    description: 'Stone-ground fresh ginger and garlic — no preservatives, no fillers.',
    ingredients: 'Ginger, Garlic, Salt', shelfLife: '6 months',
  },
];

/* ═══════════════════════════════════════════
   CART SYSTEM
═══════════════════════════════════════════ */
const FREE_SHIPPING_THRESHOLD = 499;

function getCart() {
  try { return JSON.parse(localStorage.getItem('mickys_cart')) || []; } catch { return []; }
}
function saveCart(cart) { localStorage.setItem('mickys_cart', JSON.stringify(cart)); }

function addToCart(id, name, price, image) {
  const cart = getCart();
  const idx  = cart.findIndex(i => i.id === id);
  if (idx > -1) cart[idx].qty += 1;
  else cart.push({ id, name, price: Number(price), image, qty: 1 });
  saveCart(cart);
  updateCartUI();
  openCart();
  animateCartBadge();
}

function removeFromCart(id) { saveCart(getCart().filter(i => i.id !== id)); updateCartUI(); }

function updateQty(id, delta) {
  const cart = getCart();
  const idx  = cart.findIndex(i => i.id === id);
  if (idx === -1) return;
  cart[idx].qty = Math.max(1, cart[idx].qty + delta);
  saveCart(cart); updateCartUI();
}

function cartTotal(cart) { return cart.reduce((s, i) => s + i.price * i.qty, 0); }
function cartCount(cart) { return cart.reduce((s, i) => s + i.qty, 0); }

function updateCartUI() {
  const cart  = getCart();
  const count = cartCount(cart);
  const total = cartTotal(cart);
  const shippingCost = (total > 0 && total < FREE_SHIPPING_THRESHOLD) ? 49 : 0;

  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = count;

  const dc = document.getElementById('cartDrawerCount');
  if (dc) dc.textContent = `${count} item${count !== 1 ? 's' : ''}`;

  const fill    = document.getElementById('shippingFill');
  const msg     = document.getElementById('freeShippingMsg');
  const bar     = document.getElementById('freeShippingBar');
  if (fill && msg && bar) {
    const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
    fill.style.width = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100) + '%';
    if (remaining > 0) {
      bar.classList.remove('achieved');
      msg.innerHTML = `Add <strong>₹${remaining}</strong> more for free shipping!`;
    } else {
      bar.classList.add('achieved');
      msg.innerHTML = '🎉 You\'ve unlocked <strong>free shipping!</strong>';
    }
  }

  const shipping = document.getElementById('cartShipping');
  if (shipping) {
    shipping.textContent = total === 0 ? '—' : total >= FREE_SHIPPING_THRESHOLD ? 'Free' : '₹49';
    shipping.className = total >= FREE_SHIPPING_THRESHOLD ? 'green' : '';
  }

  const sub = document.getElementById('cartSubtotal');
  const tot = document.getElementById('cartTotal');
  if (sub) sub.textContent = `₹${total.toLocaleString('en-IN')}`;
  if (tot) tot.textContent = `₹${(total + shippingCost).toLocaleString('en-IN')}`;

  const empty  = document.getElementById('cartEmpty');
  const list   = document.getElementById('cartItemsList');
  const footer = document.getElementById('cartDrawerFooter');
  const shpBar = document.getElementById('freeShippingBar');

  if (cart.length === 0) {
    if (empty)  empty.style.display  = 'flex';
    if (list)   { list.style.display = 'none'; list.innerHTML = ''; }
    if (footer) footer.style.display = 'none';
    if (shpBar) shpBar.style.display = 'none';
  } else {
    if (empty)  empty.style.display  = 'none';
    if (list)   { list.style.display = 'block'; renderCartItems(cart); }
    if (footer) footer.style.display = 'block';
    if (shpBar) shpBar.style.display = 'block';
  }
}

function renderCartItems(cart) {
  const list = document.getElementById('cartItemsList');
  if (!list) return;
  list.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img class="cart-item-img" src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
        <div class="cart-item-controls">
          <div class="qty-controls">
            <button class="qty-btn qty-minus" data-id="${item.id}">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn qty-plus" data-id="${item.id}">+</button>
          </div>
          <button class="cart-item-remove" data-id="${item.id}">Remove</button>
        </div>
      </div>
    </div>`).join('');

  list.querySelectorAll('.qty-minus').forEach(b => b.addEventListener('click', () => updateQty(b.dataset.id, -1)));
  list.querySelectorAll('.qty-plus').forEach(b => b.addEventListener('click', () => updateQty(b.dataset.id, +1)));
  list.querySelectorAll('.cart-item-remove').forEach(b => b.addEventListener('click', () => removeFromCart(b.dataset.id)));
}

function openCart() {
  document.getElementById('cartDrawer')?.classList.add('open');
  document.getElementById('cartOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}
function animateCartBadge() {
  const b = document.getElementById('cartBadge');
  if (!b) return;
  b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
  setTimeout(() => b.classList.remove('bump'), 300);
}
function flyBubble(fromEl) {
  const to = document.getElementById('cartBtn');
  const bubble = document.getElementById('cartBubble');
  if (!to || !fromEl || !bubble) return;
  const fr = fromEl.getBoundingClientRect();
  const tr = to.getBoundingClientRect();
  bubble.style.left = (fr.left + fr.width / 2) + 'px';
  bubble.style.top  = (fr.top  + fr.height / 2) + 'px';
  bubble.animate([
    { transform: 'translate(0,0) scale(1)', opacity: 1 },
    { transform: `translate(${tr.left - fr.left}px,${tr.top - fr.top}px) scale(0.3)`, opacity: 0 },
  ], { duration: 580, easing: 'cubic-bezier(0.76,0,0.24,1)', fill: 'forwards' });
}

function wireATCButtons() {
  document.querySelectorAll('.atc-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('[data-id]');
      if (!card) return;
      const { id, name, price, image } = card.dataset;
      flyBubble(card.querySelector('img'));
      addToCart(id, name, price, image);
      btn.textContent = 'Added ✓';
      btn.style.background = '#27ae60';
      setTimeout(() => { btn.textContent = 'Add to Cart'; btn.style.background = ''; }, 1800);
    });
  });
}

document.getElementById('cartBtn')?.addEventListener('click', openCart);
document.getElementById('cartClose')?.addEventListener('click', closeCart);
document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
document.getElementById('cartContinueShopping')?.addEventListener('click', closeCart);
document.getElementById('cartEmptyShop')?.addEventListener('click', () => {
  closeCart();
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', () => { updateCartUI(); wireATCButtons(); });

/* ── Loader ── */
const loader     = document.getElementById('loader');
const loaderFill = document.getElementById('loaderFill');

window.addEventListener('load', () => {
  // Animate progress bar
  setTimeout(() => { loaderFill.style.width = '100%'; }, 80);

  // Hide loader after bar completes
  setTimeout(() => {
    loader.classList.add('hidden');
    initHeroReveal();
  }, 1900);
});

/* ── Hero Reveal (triggers after loader) ── */
function initHeroReveal() {
  // Badge
  const badge = document.getElementById('heroBadge');
  if (badge) badge.classList.add('show');

  // Title lines — staggered
  const lines = [
    document.getElementById('line1'),
    document.getElementById('line2'),
    document.getElementById('line3'),
  ];
  lines.forEach((line, i) => {
    if (!line) return;
    setTimeout(() => line.classList.add('show'), 200 + i * 180);
  });

  // Sub + buttons
  setTimeout(() => {
    const sub = document.getElementById('heroSub');
    if (sub) sub.classList.add('show');
  }, 820);

  setTimeout(() => {
    const btns = document.getElementById('heroButtons');
    if (btns) btns.classList.add('show');
  }, 1000);

  // Hero visual slides in
  setTimeout(() => {
    const visual = document.getElementById('heroVisual');
    if (visual) visual.classList.add('show');
  }, 400);

  // Scroll hint fades in
  setTimeout(() => {
    const hint = document.querySelector('.hero-scroll-hint');
    if (hint) hint.classList.add('show');
  }, 1300);
}

/* ── Custom Cursor ── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

if (cursor && cursorRing) {
  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  // Ring follows with smooth lag
  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  // Hover states
  document.querySelectorAll('a, button, .product-card, .recipe-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      cursorRing.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      cursorRing.classList.remove('hover');
    });
  });
}

/* ── Navigation Scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Hamburger / Mobile Menu ── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

/* ── Smooth Scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── Scroll Reveal (IntersectionObserver) ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('revealed');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right')
  .forEach(el => revealObserver.observe(el));

/* ── Counter Animation ── */
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start    = performance.now();

  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3); // ease-out-cubic
    el.textContent = Math.floor(eased * target).toLocaleString('en-IN');
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString('en-IN');
  };

  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    animateCounter(entry.target);
    counterObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

/* ── Parallax Hero ── */
const heroBg      = document.getElementById('heroBg');
const heroContent = document.getElementById('heroContent');

window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  if (heroBg)      heroBg.style.transform       = `translateY(${sy * 0.35}px)`;
  if (heroContent) {
    heroContent.style.transform = `translateY(${sy * 0.18}px)`;
    heroContent.style.opacity   = Math.max(0, 1 - sy / 650);
  }
}, { passive: true });

/* ── Marquee duplicate (guarantees seamless loop) ── */
const marqueeInner = document.querySelector('.marquee-inner');
if (marqueeInner) {
  const clone = marqueeInner.cloneNode(true);
  marqueeInner.parentElement.appendChild(clone);
}

/* ── Newsletter Submit ── */
document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const inp = e.target.querySelector('input');
  btn.textContent = 'Subscribed ✓';
  btn.style.background = '#2a7a2a';
  inp.value = '';
  setTimeout(() => {
    btn.textContent = 'Subscribe';
    btn.style.background = '';
  }, 3500);
});

/* ── Product card — cursor override for mobile ── */
if (window.innerWidth <= 768) {
  document.querySelectorAll('.recipe-overlay').forEach(ov => {
    ov.style.opacity = '1';
  });
}

/* ═══════════════════════════════════════════
   3D EFFECTS
═══════════════════════════════════════════ */

/* ── Bottle / Product 3D Effect (auto-rotate + mouse override) ── */
(function () {
  if (window.innerWidth <= 768) return;

  const hero      = document.getElementById('hero');
  const product3D = document.getElementById('product3D');
  const glow      = document.getElementById('productGlow');
  const badges    = document.querySelectorAll('.float-badge');
  const heroTitle = document.querySelector('.hero-title');

  // Lerp state
  let tx = 0, ty = 0;   // mouse target
  let cx = 0, cy = 0;   // current lerped value
  let floatY = 0;        // vertical float offset (combined)
  let isHover = false;
  let clock = 0;          // time counter for auto-rotation

  /* Mouse listeners */
  hero?.addEventListener('mouseenter', () => { isHover = true; });
  hero?.addEventListener('mouseleave', () => { isHover = false; tx = 0; ty = 0; });
  hero?.addEventListener('mousemove', (e) => {
    const r = hero.getBoundingClientRect();
    tx = (e.clientX - r.left) / r.width  - 0.5;  // -0.5 → 0.5
    ty = (e.clientY - r.top)  / r.height - 0.5;
  });

  function loop() {
    clock += 0.012;

    /* ── Decide target rotation ── */
    let finalX, finalY;

    if (isHover) {
      // Mouse mode — lerp toward cursor position (fast)
      cx += (tx - cx) * 0.09;
      cy += (ty - cy) * 0.09;
      finalX = cx;
      finalY = cy;
    } else {
      // Auto mode — pendulum oscillation (slow, beautiful)
      const autoX = Math.sin(clock)        * 0.28;
      const autoY = Math.sin(clock * 0.6)  * 0.12;
      cx += (autoX - cx) * 0.025;
      cy += (autoY - cy) * 0.025;
      finalX = cx;
      finalY = cy;
    }

    /* ── Floating up/down (independent of rotation) ── */
    const floatOffset = Math.sin(clock * 0.8) * 12; // ±12px

    /* ── Apply to product ── */
    if (product3D) {
      product3D.style.transform = `
        translateY(${floatOffset}px)
        perspective(1000px)
        rotateY(${finalX * 24}deg)
        rotateX(${-finalY * 16}deg)
      `;
    }

    /* ── Ground shadow scales + shifts with rotation ── */
    if (glow) {
      const scaleX = 1 - Math.abs(finalX) * 0.4;
      const shadowDrift = finalX * 20;
      glow.style.transform = `translateX(calc(-50% + ${shadowDrift}px)) scaleX(${scaleX})`;
      glow.style.opacity = 0.6 + Math.abs(finalX) * 0.4;
    }

    /* ── Floating badges move more — "closer to camera" ── */
    if (badges[0]) badges[0].style.transform =
      `translate(${finalX * 45}px, ${finalY * 30 + floatOffset * 0.5}px)`;
    if (badges[1]) badges[1].style.transform =
      `translate(${finalX * 35}px, ${finalY * 24 + floatOffset * 0.3}px)`;

    /* ── Hero title drifts subtly opposite — "far behind" ── */
    if (heroTitle) {
      heroTitle.style.transform =
        `translate(${finalX * -12}px, ${finalY * -8}px)`;
    }

    requestAnimationFrame(loop);
  }

  loop();
})();

/* ── Product Cards 3D Tilt + Glare ── */
(function () {
  if (window.innerWidth <= 768) return;

  document.querySelectorAll('.product-card').forEach(card => {
    // Inject glare div
    const glare = document.createElement('div');
    glare.className = 'glare';
    card.appendChild(glare);

    let tx = 0, ty = 0;
    let cx = 0, cy = 0;
    let inside = false;

    card.addEventListener('mouseenter', () => { inside = true; });

    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width  - 0.5; // -0.5 → 0.5
      ty = (e.clientY - r.top)  / r.height - 0.5;

      // Glare follows cursor position (percentage for radial-gradient)
      const gx = ((e.clientX - r.left) / r.width)  * 100;
      const gy = ((e.clientY - r.top)  / r.height) * 100;
      glare.style.background =
        `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.18) 0%, transparent 65%)`;
      glare.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      inside = false;
      tx = 0; ty = 0;
      glare.style.opacity = '0';
    });

    function cardLoop() {
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;

      card.style.transform =
        `perspective(700px) rotateY(${cx * 16}deg) rotateX(${-cy * 11}deg) translateZ(${inside ? 12 : 0}px)`;

      requestAnimationFrame(cardLoop);
    }
    cardLoop();
  });
})();
