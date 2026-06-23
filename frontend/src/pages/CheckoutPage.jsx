import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { CheckoutBlock } from '../components/ui';

export function CheckoutPage({ cart, subtotal, shipping, total, clearCart, onBack }) {
  const [payment, setPayment] = useState('online');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [placedOrder, setPlacedOrder] = useState(null);
  const finalTotal = Math.max(0, total - discount);

  function applyCoupon() {
    const code = coupon.trim().toUpperCase();
    if (code === 'MICKYS10') setDiscount(Math.round(subtotal * 0.1));
    if (code === 'WELCOME50') setDiscount(50);
    if (code === 'FREESHIP') setDiscount(shipping);
  }

  function placeOrder(event) {
    event.preventDefault();
    if (!cart.length) return;
    const orderId = `MKY${Date.now().toString().slice(-8)}`;
    setPlacedOrder(orderId);
    clearCart();
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
            <input required placeholder="Full Name" aria-label="Full name" />
            <div className="formRow">
              <input required type="email" placeholder="Email" aria-label="Email address" />
              <input required type="tel" placeholder="Phone" aria-label="Phone number" />
            </div>
          </CheckoutBlock>
          <CheckoutBlock title="Shipping Address">
            <input required placeholder="Address Line 1" aria-label="Address line 1" />
            <input placeholder="Address Line 2" aria-label="Address line 2" />
            <div className="formRow thirds">
              <input required placeholder="City" aria-label="City" />
              <select required defaultValue="" aria-label="State">
                <option value="" disabled>State</option>
                <option>Maharashtra</option>
                <option>Delhi</option>
                <option>Karnataka</option>
                <option>Tamil Nadu</option>
                <option>Gujarat</option>
              </select>
              <input required placeholder="PIN Code" maxLength={6} aria-label="PIN code" />
            </div>
          </CheckoutBlock>
          <CheckoutBlock title="Payment Method">
            <div className="paymentGrid">
              <label className={payment === 'online' ? 'selected' : ''}>
                <input type="radio" name="payment" value="online" checked={payment === 'online'} onChange={() => setPayment('online')} />
                <span>Pay Online<small>UPI, cards and net banking</small></span>
              </label>
              <label className={payment === 'cod' ? 'selected' : ''}>
                <input type="radio" name="payment" value="cod" checked={payment === 'cod'} onChange={() => setPayment('cod')} />
                <span>Cash on Delivery<small>Pay when your order arrives</small></span>
              </label>
            </div>
          </CheckoutBlock>
          <button className="placeOrderButton" type="submit" disabled={!cart.length}>
            Place Order <span>₹{finalTotal.toLocaleString('en-IN')}</span>
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
