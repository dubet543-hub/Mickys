import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronDown, Lock, Minus, Plus, Sparkles, Truck } from 'lucide-react';
import { PRODUCTS, BUNDLES } from '../data/siteData';
import { Reveal, useTilt, motion } from '../components/ui/motion3d';
import './product-cinematic.css';

/* Dark accordion row */
function AccRow({ title, open, onToggle, children }) {
  return (
    <div className={`pd-acc ${open ? 'open' : ''}`}>
      <button type="button" onClick={onToggle} aria-expanded={open}>
        {title} <ChevronDown size={20} />
      </button>
      {open && <p>{children}</p>}
    </div>
  );
}

/* Cinematic related-product card with 3D tilt */
function RelatedCard({ item, addToCart, onProduct }) {
  const tilt = useTilt({ max: 8 });
  return (
    <motion.article
      className="pd-rel-card"
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      whileHover={tilt.whileHover}
      style={tilt.style}
      onClick={() => onProduct?.(item.id)}
    >
      <div className="pd-rel-media" style={{ transform: 'translateZ(36px)' }}>
        <img src={item.image} alt={item.name} loading="lazy" />
      </div>
      <p className="pd-rel-cat">{item.category}</p>
      <h3 className="pd-rel-name">{item.name}</h3>
      <div className="pd-rel-foot">
        <span className="pd-rel-price">₹{item.price.toLocaleString('en-IN')}</span>
        <button
          type="button"
          className="pd-rel-add"
          aria-label={`Add ${item.name} to cart`}
          onClick={(e) => { e.stopPropagation(); addToCart(item, 1); }}
        >
          <Plus size={18} />
        </button>
      </div>
    </motion.article>
  );
}

export function ProductPage({ product, addToCart, onBack, onCheckout, onProduct }) {
  const isBundle = Array.isArray(product.items);
  const [qty, setQty] = useState(1);
  const [openPanel, setOpenPanel] = useState(isBundle ? 'inside' : 'ingredients');
  /* Bundles suggest other bundles; singles suggest other singles. */
  const related = isBundle
    ? BUNDLES.filter((item) => item.id !== product.id).slice(0, 4)
    : PRODUCTS.filter((item) => item.id !== product.id && item.label !== 'Bundle').slice(0, 4);
  const tilt = useTilt({ max: 10 });
  const ghost = product.name.split(' ')[0];
  const label = product.label || (isBundle ? product.tag : null);

  return (
    <main className="pd">
      <button className="pd-back" type="button" onClick={onBack}>
        <ArrowLeft size={18} /> Back to products
      </button>

      <div className="pd-wrap">
        {/* ── Media ── */}
        <div className="pd-media">
          <motion.div
            className="pd-stage"
            ref={tilt.ref}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            style={tilt.style}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.2, 1, 0.3, 1] }}
          >
            <span className="pd-ghost">{ghost}</span>
            <span className="pd-disc" />
            <img className="pd-img" src={product.image} alt={product.name} />
            {label && <span className="pd-label">{label}</span>}
            <div className="pd-floatbadge">
              <strong>100% Natural</strong>
              <small>no preservatives</small>
            </div>
          </motion.div>
        </div>

        {/* ── Copy ── */}
        <Reveal className="pd-copy" delay={0.1}>
          <p className="pd-cat">{product.category}</p>
          <h1 className="pd-name">{product.name}</h1>
          <p className="pd-tagline">{product.tagline || product.tag}</p>

          <div className="pd-price">
            <strong>₹{product.price.toLocaleString('en-IN')}</strong>
            {product.mrp > product.price && <span>₹{product.mrp.toLocaleString('en-IN')}</span>}
            {product.mrp > product.price && <em>Save ₹{(product.mrp - product.price).toLocaleString('en-IN')}</em>}
          </div>

          <div className="pd-meta">
            {isBundle && <span>{product.items.length} products</span>}
            {product.weight && <span>{product.weight}</span>}
            {product.shelfLife && <span>Shelf life: {product.shelfLife}</span>}
          </div>

          <p className="pd-desc">{product.description}</p>

          <div className="pd-actions">
            <div className="pd-qty" aria-label="Product quantity">
              <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity"><Minus size={16} /></button>
              <span aria-live="polite">{qty}</span>
              <button type="button" onClick={() => setQty(Math.min(10, qty + 1))} aria-label="Increase quantity"><Plus size={16} /></button>
            </div>
            <button className="pd-btn pd-btn-gold" type="button" onClick={() => addToCart(product, qty)}>
              Add to Cart
            </button>
          </div>
          <button
            className="pd-btn pd-btn-buy"
            type="button"
            onClick={() => { addToCart(product, qty); onCheckout(); }}
          >
            Buy Now <ArrowRight size={18} />
          </button>

          <div className="pd-trust">
            <span><Lock size={16} /> Secure Checkout</span>
            <span><Truck size={16} /> Fast Delivery</span>
            <span><Check size={16} /> No Preservatives</span>
          </div>

          {isBundle ? (
            <AccRow title="What's Inside" open={openPanel === 'inside'} onToggle={() => setOpenPanel(openPanel === 'inside' ? '' : 'inside')}>
              This pack includes: {product.items.join(', ')}.
            </AccRow>
          ) : (
            <AccRow title="Ingredients" open={openPanel === 'ingredients'} onToggle={() => setOpenPanel(openPanel === 'ingredients' ? '' : 'ingredients')}>
              {product.ingredients}
            </AccRow>
          )}
          <AccRow title="How to Use" open={openPanel === 'how'} onToggle={() => setOpenPanel(openPanel === 'how' ? '' : 'how')}>
            Open the pouch, add your protein or vegetables, cook on medium heat for 8–10 minutes, and serve hot.
          </AccRow>
          <AccRow title="Why Micky's?" open={openPanel === 'why'} onToggle={() => setOpenPanel(openPanel === 'why' ? '' : 'why')}>
            Natural ingredients, no preservatives, dependable shelf life and restaurant-style flavour in every pouch.
          </AccRow>
        </Reveal>
      </div>

      {/* ── Related ── */}
      <section className="pd-related">
        <Reveal className="pd-related-head">
          <span className="pd-kicker"><Sparkles size={14} /> More from the range</span>
          <h2>You may also <em>like</em></h2>
        </Reveal>
        <div className="pd-rel-grid">
          {related.map((item) => (
            <RelatedCard key={item.id} item={item} addToCart={addToCart} onProduct={onProduct} />
          ))}
        </div>
      </section>
    </main>
  );
}
