/* ── Checkout Page Logic ── */

const FREE_SHIPPING = 499;
const COUPONS = {
  'MICKYS10': { type: 'percent', value: 10, label: '10% off' },
  'WELCOME50': { type: 'fixed',   value: 50, label: '₹50 off' },
  'FREESHIP':  { type: 'shipping', value: 0, label: 'Free Shipping' },
};

let appliedCoupon = null;

/* ── Render Order Summary ── */
function renderSummary() {
  const cart  = getCart();
  const list  = document.getElementById('coSummaryItems');
  if (!list) return;

  if (cart.length === 0) {
    list.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;text-align:center;padding:1rem 0">Your cart is empty. <a href="index.html">Go back</a></p>';
  } else {
    list.innerHTML = cart.map(item => `
      <div class="co-summary-item">
        <img class="co-item-img" src="${item.image}" alt="${item.name}">
        <div class="co-item-info">
          <div class="co-item-name">${item.name}</div>
          <div class="co-item-qty">Qty: ${item.qty}</div>
        </div>
        <div class="co-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
      </div>`).join('');
  }
  updateSummaryTotals();
}

function updateSummaryTotals() {
  const cart     = getCart();
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  let discount   = 0;
  let shipping   = subtotal >= FREE_SHIPPING ? 0 : 49;

  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent')   discount = Math.round(subtotal * appliedCoupon.value / 100);
    if (appliedCoupon.type === 'fixed')     discount = appliedCoupon.value;
    if (appliedCoupon.type === 'shipping')  shipping = 0;
  }

  const grand = Math.max(0, subtotal - discount + shipping);

  document.getElementById('coSubtotal').textContent   = `₹${subtotal.toLocaleString('en-IN')}`;
  document.getElementById('coShipping').textContent   = shipping === 0 ? 'Free' : `₹${shipping}`;
  document.getElementById('coGrandTotal').textContent = `₹${grand.toLocaleString('en-IN')}`;
  document.getElementById('orderTotalDisplay').textContent = `₹${grand.toLocaleString('en-IN')}`;

  const discRow = document.getElementById('coDiscountRow');
  if (discount > 0) {
    discRow.style.display = 'flex';
    document.getElementById('coDiscount').textContent = `-₹${discount.toLocaleString('en-IN')}`;
  } else {
    discRow.style.display = 'none';
  }
}

/* ── Coupon ── */
document.getElementById('applyCoupon')?.addEventListener('click', () => {
  const code = document.getElementById('couponInput').value.trim().toUpperCase();
  const msg  = document.getElementById('couponMsg');
  if (COUPONS[code]) {
    appliedCoupon = COUPONS[code];
    msg.className  = 'coupon-msg';
    msg.textContent = `✓ Coupon applied — ${COUPONS[code].label}`;
    document.getElementById('couponInput').disabled = true;
    document.getElementById('applyCoupon').textContent = 'Applied ✓';
    document.getElementById('applyCoupon').style.background = '#27ae60';
  } else {
    msg.className  = 'coupon-msg error';
    msg.textContent = code ? 'Invalid coupon code.' : 'Enter a coupon code first.';
  }
  updateSummaryTotals();
});

/* ── Payment option toggle ── */
document.querySelectorAll('.payment-option').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    opt.querySelector('input').checked = true;
    const isOnline = opt.querySelector('input').value === 'online';
    document.getElementById('razorpayNote').style.display = isOnline ? 'flex' : 'none';
  });
});

/* ── Form Validation ── */
function validateForm() {
  const fields = ['coName','coEmail','coPhone','coAddr1','coCity','coState','coPIN'];
  let valid = true;
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (!el.value.trim()) {
      el.style.borderColor = 'var(--primary)';
      valid = false;
    } else {
      el.style.borderColor = '';
    }
  });
  if (!valid) {
    const first = fields.find(id => !document.getElementById(id)?.value.trim());
    document.getElementById(first)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.getElementById(first)?.focus();
  }
  return valid;
}

/* ── Place Order ── */
document.getElementById('placeOrderBtn')?.addEventListener('click', async () => {
  if (!validateForm()) return;
  const cart = getCart();
  if (cart.length === 0) { alert('Your cart is empty!'); return; }

  const btn    = document.getElementById('placeOrderBtn');
  const method = document.querySelector('input[name="payment"]:checked')?.value;

  btn.disabled = true;
  document.getElementById('placeOrderText').textContent = 'Processing...';

  if (method === 'cod') {
    /* COD — direct confirmation */
    placeOrderSuccess();
  } else {
    /* Razorpay online payment */
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    let discount   = 0;
    let shipping   = subtotal >= FREE_SHIPPING ? 0 : 49;
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percent')  discount = Math.round(subtotal * appliedCoupon.value / 100);
      if (appliedCoupon.type === 'fixed')    discount = appliedCoupon.value;
      if (appliedCoupon.type === 'shipping') shipping = 0;
    }
    const grand = Math.max(0, subtotal - discount + shipping);

    /* REPLACE 'YOUR_RAZORPAY_KEY' with your actual Razorpay key_id */
    if (typeof Razorpay === 'undefined') {
      /* Razorpay SDK not loaded — show instructions */
      alert('To enable online payments:\n1. Sign up at razorpay.com\n2. Add your key in checkout.js\n3. Add the Razorpay script tag\n\nFor now, switching to COD confirmation.');
      placeOrderSuccess();
      return;
    }

    const options = {
      key:          'YOUR_RAZORPAY_KEY',
      amount:       grand * 100, // paise
      currency:     'INR',
      name:         "Micky's Foods",
      description:  'Order Payment',
      prefill: {
        name:    document.getElementById('coName').value,
        email:   document.getElementById('coEmail').value,
        contact: document.getElementById('coPhone').value,
      },
      theme: { color: '#6f0e13' },
      handler: () => placeOrderSuccess(),
    };
    const rzp = new Razorpay(options);
    rzp.on('payment.failed', () => {
      btn.disabled = false;
      document.getElementById('placeOrderText').textContent = 'Place Order';
    });
    rzp.open();
  }
});

function placeOrderSuccess() {
  /* Clear cart */
  localStorage.removeItem('mickys_cart');

  /* Show success */
  const orderId = 'MKY' + Date.now().toString().slice(-8);
  document.getElementById('successEmail').textContent  = document.getElementById('coEmail')?.value || '';
  document.getElementById('successOrderId').textContent = orderId;
  document.getElementById('successOverlay').classList.add('show');
}

/* ── Init ── */
renderSummary();
