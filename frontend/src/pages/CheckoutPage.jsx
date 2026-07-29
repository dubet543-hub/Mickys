import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { CheckoutBlock } from '../components/ui';
import { api, loadRazorpayScript } from '../utils/api';

export function CheckoutPage({ cart, subtotal, shipping, total, clearCart, onBack }) {
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    line1: '', line2: '', city: '', state: '', pincode: '',
  });
  const finalTotal = Math.max(0, total - discount);

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

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
          <CheckoutBlock title="Contact Information">
            <input required placeholder="Full Name" aria-label="Full name" value={form.name} onChange={(e) => updateField('name', e.target.value)} />
            <div className="formRow">
              <input required type="email" placeholder="Email" aria-label="Email address" value={form.email} onChange={(e) => updateField('email', e.target.value)} />
              <input required type="tel" placeholder="Phone" aria-label="Phone number" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} />
            </div>
          </CheckoutBlock>
          <CheckoutBlock title="Shipping Address">
            <input required placeholder="Address Line 1" aria-label="Address line 1" value={form.line1} onChange={(e) => updateField('line1', e.target.value)} />
            <input placeholder="Address Line 2" aria-label="Address line 2" value={form.line2} onChange={(e) => updateField('line2', e.target.value)} />
            <div className="formRow thirds">
              <input required placeholder="City" aria-label="City" value={form.city} onChange={(e) => updateField('city', e.target.value)} />
              <select required value={form.state} onChange={(e) => updateField('state', e.target.value)} aria-label="State">
                <option value="" disabled>State</option>
                <option>Maharashtra</option>
                <option>Delhi</option>
                <option>Karnataka</option>
                <option>Tamil Nadu</option>
                <option>Gujarat</option>
              </select>
              <input required placeholder="PIN Code" maxLength={6} aria-label="PIN code" value={form.pincode} onChange={(e) => updateField('pincode', e.target.value)} />
            </div>
          </CheckoutBlock>
          <CheckoutBlock title="Payment Method">
            <div className="paymentGrid">
              <label className="selected">
                <input type="radio" name="payment" value="online" checked readOnly />
                <span>Pay Online<small>UPI, cards and net banking</small></span>
              </label>
            </div>
          </CheckoutBlock>
          {error && <p className="formError" role="alert">{error}</p>}
          <button className="placeOrderButton" type="submit" disabled={!cart.length || submitting}>
            {submitting ? 'Processing…' : 'Place Order'} <span>₹{finalTotal.toLocaleString('en-IN')}</span>
          </button>
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
