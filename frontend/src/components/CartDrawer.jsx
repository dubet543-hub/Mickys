import { Minus, Plus, X } from 'lucide-react';

export function CartDrawer({ cart, open, subtotal, shipping, total, updateQty, onClose, onCheckout }) {
  return (
    <>
      {open && <button className="cartOverlay" type="button" onClick={onClose} aria-label="Close cart" />}
      <aside
        className={`cartDrawer ${open ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        tabIndex={-1}
      >
        <div className="cartHeader">
          <div>
            <h2 id="cart-title">Your Cart</h2>
            <p>{cart.reduce((sum, item) => sum + item.qty, 0)} items</p>
          </div>
          <button className="iconButton dark" type="button" onClick={onClose} aria-label="Close cart">
            <X size={22} />
          </button>
        </div>
        <div className="freeShipping">
          {subtotal >= 499 ? 'You unlocked free shipping!' : `Add ₹${Math.max(0, 499 - subtotal)} more for free shipping.`}
          <div
            role="progressbar"
            aria-label="Free shipping progress"
            aria-valuemin={0}
            aria-valuemax={499}
            aria-valuenow={Math.min(499, subtotal)}
          >
            <span style={{ width: `${Math.min(100, (subtotal / 499) * 100)}%` }} />
          </div>
        </div>
        <div className="cartItems">
          {cart.length === 0 ? (
            <p className="emptyCart">Your cart is empty.</p>
          ) : cart.map((item) => (
            <div className="cartItem" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <strong>{item.name}</strong>
                <p>₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                <div className="qtyControl small">
                  <button type="button" onClick={() => updateQty(item.id, -1)} aria-label={`Decrease ${item.name} quantity`}><Minus size={14} /></button>
                  <span>{item.qty}</span>
                  <button type="button" onClick={() => updateQty(item.id, 1)} aria-label={`Increase ${item.name} quantity`}><Plus size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cartTotals">
          <div><span>Subtotal</span><strong>₹{subtotal.toLocaleString('en-IN')}</strong></div>
          <div><span>Shipping</span><strong>{shipping === 0 ? 'Free' : `₹${shipping}`}</strong></div>
          <div className="grand"><span>Total</span><strong>₹{total.toLocaleString('en-IN')}</strong></div>
          <button type="button" onClick={onCheckout} disabled={!cart.length}>Proceed to Checkout</button>
        </div>
      </aside>
    </>
  );
}
