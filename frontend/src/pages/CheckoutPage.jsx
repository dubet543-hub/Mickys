import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ShieldCheck, Lock, Truck } from 'lucide-react';
import { CheckoutBlock } from '../components/ui';
import { api, loadRazorpayScript } from '../utils/api';

const CHECKOUT_DETAILS_KEY = 'mickys_checkout_details';

function readStoredDetails() {
  try {
    const saved = JSON.parse(localStorage.getItem(CHECKOUT_DETAILS_KEY) || 'null');
    if (saved && typeof saved === 'object') {
      return { name: '', email: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: '', ...saved };
    }
  } catch { /* ignore malformed data */ }
  return { name: '', email: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: '' };
}

export function CheckoutPage({ cart, subtotal, shipping, total, clearCart, onBack }) {
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState(readStoredDetails);
  const [pincodeLookup, setPincodeLookup] = useState('idle'); // idle | loading | done | error
  const finalTotal = Math.max(0, total - discount);
  const lastLookedUp = useRef('');

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  useEffect(() => {
    localStorage.setItem(CHECKOUT_DETAILS_KEY, JSON.stringify(form));
  }, [form]);

  // India Post's public pincode lookup — no API key required.
  useEffect(() => {
    const pincode = form.pincode.trim();
    if (pincode.length !== 6 || !/^\d{6}$/.test(pincode) || pincode === lastLookedUp.current) return;

    let cancelled = false;
    setPincodeLookup('loading');
    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const office = data?.[0]?.PostOffice?.[0];
        if (data?.[0]?.Status === 'Success' && office) {
          lastLookedUp.current = pincode;
          setForm((f) => ({ ...f, city: office.District, state: office.State }));
          setPincodeLookup('done');
        } else {
          setPincodeLookup('error');
        }
      })
      .catch(() => {
        if (!cancelled) setPincodeLookup('error');
      });

    return () => { cancelled = true; };
  }, [form.pincode]);

  function applyCoupon() {
    const code = coupon.trim().toUpperCase();
    if (code === 'MICKYS10') setDiscount(Math.round(subtotal * 0.1));
    if (code === 'WELCOME50') setDiscount(50);
    if (code === 'FREESHIP') setDiscount(shipping);
  }

  async function placeOrder(event) {
    event.preventDefault();
    if (!cart.length || submitting) return;
    setError('');
    setSubmitting(true);

    const orderPayload = {
      user: { name: form.name, email: form.email, phone: form.phone },
      items: cart.map((item) => ({
        productId: item.id, name: item.name, price: item.price, qty: item.qty, image: item.image,
      })),
      shipping: {
        line1: form.line1, line2: form.line2, city: form.city, state: form.state, pincode: form.pincode,
      },
      subtotal,
      discount,
      couponCode: coupon || undefined,
      shippingCost: shipping,
      total: finalTotal,
      paymentMethod: 'online',
    };

    try {
      const { order } = await api.post('/orders', orderPayload);

      await loadRazorpayScript();
      const { order: razorpayOrder, key } = await api.post('/payment/create-order', {
        amount: finalTotal,
        receipt: order.orderId,
      });

      const rzp = new window.Razorpay({
        key,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        order_id: razorpayOrder.id,
        name: "Micky's Foods",
        description: `Order ${order.orderId}`,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        handler: async (response) => {
          try {
            await api.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: order._id,
            });
            setPlacedOrder(order.orderId);
            clearCart();
            localStorage.removeItem(CHECKOUT_DETAILS_KEY);
          } catch (err) {
            setError(err.message || 'Payment verification failed. Contact support with your order ID.');
          } finally {
            setSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => setSubmitting(false),
        },
        theme: { color: '#c1272d' },
      });
      rzp.on('payment.failed', () => {
        setError('Payment failed. Please try again.');
        setSubmitting(false);
      });
      rzp.open();
      return;
    } catch (err) {
      setError(err.message || 'Something went wrong placing your order.');
    }
    setSubmitting(false);
  }

  if (placedOrder) {
    return (
      <main className="pageSurface">
        <section className="successPanel">
          <div className="successIcon">✓</div>
          <h1>Order Placed!</h1>
          <p>Thank you. Your order ID is <strong>{placedOrder}</strong>.</p>
          <button className="primaryButton solid" type="button" onClick={onBack}>Continue Shopping</button>
        </section>
      </main>
    );
  }

  return (
    <main className="checkoutPage">
      <button className="backButton" type="button" onClick={onBack}>
        <ArrowLeft size={18} /> Continue Shopping
      </button>
      <form className="checkoutGrid" onSubmit={placeOrder}>
        <section className="checkoutForm">
          <CheckoutBlock title="Contact Information" step={1}>
            <input required placeholder="Full Name" aria-label="Full name" autoComplete="name" value={form.name} onChange={(e) => updateField('name', e.target.value)} />
            <div className="formRow">
              <input required type="email" placeholder="Email" aria-label="Email address" autoComplete="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} />
              <input required type="tel" placeholder="Phone" aria-label="Phone number" autoComplete="tel" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} />
            </div>
          </CheckoutBlock>
          <CheckoutBlock title="Delivery Address" step={2}>
            <input required placeholder="Address Line 1" aria-label="Address line 1" autoComplete="address-line1" value={form.line1} onChange={(e) => updateField('line1', e.target.value)} />
            <input placeholder="Address Line 2" aria-label="Address line 2" autoComplete="address-line2" value={form.line2} onChange={(e) => updateField('line2', e.target.value)} />
            <div className="formRow thirds">
              <input
                required
                placeholder="PIN Code"
                maxLength={6}
                aria-label="PIN code"
                autoComplete="postal-code"
                inputMode="numeric"
                value={form.pincode}
                onChange={(e) => updateField('pincode', e.target.value.replace(/\D/g, ''))}
              />
              <input required placeholder="City" aria-label="City" autoComplete="address-level2" value={form.city} onChange={(e) => updateField('city', e.target.value)} />
              <input required placeholder="State" aria-label="State" autoComplete="address-level1" value={form.state} onChange={(e) => updateField('state', e.target.value)} />
            </div>
            {pincodeLookup === 'loading' && <small className="pincodeHint">Looking up city/state…</small>}
            {pincodeLookup === 'error' && <small className="pincodeHint">Couldn't auto-fill from that PIN — enter city/state manually.</small>}
          </CheckoutBlock>
          <CheckoutBlock title="Payment" step={3}>
            <div className="paymentGrid">
              <label className="selected">
                <input type="radio" name="payment" value="online" checked readOnly />
                <span>Pay Online<small>UPI, cards, net banking &amp; wallets</small></span>
              </label>
            </div>
            <div className="razorpayBadge">
              <Lock size={14} />
              <span>100% secure payments powered by <strong>Razorpay</strong></span>
            </div>
          </CheckoutBlock>
          {error && <p className="formError" role="alert">{error}</p>}
          <button className="placeOrderButton" type="submit" disabled={!cart.length || submitting}>
            {submitting ? 'Processing…' : <><Lock size={16} /> Pay Securely</>} <span>₹{finalTotal.toLocaleString('en-IN')}</span>
          </button>
          <div className="trustRow">
            <span><ShieldCheck size={15} /> Safe &amp; Secure</span>
            <span><Truck size={15} /> Fast Dispatch</span>
            <span><Lock size={15} /> Razorpay Encrypted</span>
          </div>
        </section>
        <aside className="orderSummary">
          <h2>Order Summary</h2>
          {cart.length === 0 ? (
            <p className="emptyCart">Your cart is empty.</p>
          ) : cart.map((item) => (
            <div className="summaryItem" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <strong>{item.name}</strong>
                <span>Qty: {item.qty}</span>
              </div>
              <b>₹{(item.price * item.qty).toLocaleString('en-IN')}</b>
            </div>
          ))}
          <div className="couponRow">
            <input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Coupon code" aria-label="Coupon code" />
            <button type="button" onClick={applyCoupon}>Apply</button>
          </div>
          <div className="summaryTotals">
            <div><span>Subtotal</span><strong>₹{subtotal.toLocaleString('en-IN')}</strong></div>
            {discount > 0 && <div className="discount"><span>Discount</span><strong>-₹{discount.toLocaleString('en-IN')}</strong></div>}
            <div><span>Shipping</span><strong>{shipping === 0 ? 'Free' : `₹${shipping}`}</strong></div>
            <div className="grand"><span>Total</span><strong>₹{finalTotal.toLocaleString('en-IN')}</strong></div>
          </div>
        </aside>
      </form>
    </main>
  );
}
