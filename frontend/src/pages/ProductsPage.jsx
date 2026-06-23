import { ArrowRight, Check, Eye, Leaf, ShieldCheck, Truck } from 'lucide-react';
import { BUNDLES } from '../data/siteData';
import { Reveal, useTilt, motion } from '../components/ui/motion3d';
import './products-cinematic.css';

/* Cinematic bundle card */
function BundleCard3D({ bundle, index, addToCart, onProduct }) {
  const tilt = useTilt({ max: 6 });
  const savePct = Math.round(((bundle.mrp - bundle.price) / bundle.mrp) * 100);
  return (
    <motion.article
      className="pl-bundle"
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      whileHover={tilt.whileHover}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onProduct?.(bundle.id)}
      style={{ ...tilt.style, cursor: 'pointer' }}
    >
      <div className="pl-bundle-media" style={{ transform: 'translateZ(30px)' }}>
        <span className="pl-bundle-tag">{bundle.tag}</span>
        {savePct > 0 && <span className="pl-bundle-save">Save {savePct}%</span>}
        <img src={bundle.image} alt={bundle.name} loading="lazy" />
      </div>
      <div className="pl-bundle-body">
        <p className="pl-bundle-cat">{bundle.category}</p>
        <h3>{bundle.name}</h3>
        <p>{bundle.description}</p>
        <ul className="pl-bundle-items">
          {bundle.items.map((item) => <li key={item}><Check size={15} /> {item}</li>)}
        </ul>
        <div className="pl-bundle-foot">
          <div className="pl-bundle-price">
            <strong>₹{bundle.price.toLocaleString('en-IN')}</strong>
            <span>₹{bundle.mrp.toLocaleString('en-IN')}</span>
          </div>
          <div className="pl-bundle-btns">
            <button
              className="pl-iconbtn ghost"
              type="button"
              aria-label={`View ${bundle.name}`}
              onClick={(e) => { e.stopPropagation(); onProduct?.(bundle.id); }}
            >
              <Eye size={17} />
            </button>
            <button
              className="pl-bundle-btn"
              type="button"
              onClick={(e) => { e.stopPropagation(); addToCart(bundle, 1); }}
            >
              Add to Cart <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ProductsPage({ addToCart, onProduct }) {
  return (
    <main className="pl">
      {/* ── Hero ── */}
      <header className="pl-hero">
        <span className="pl-hero-ghost">RANGE</span>
        <Reveal className="pl-hero-inner">
          <p className="pl-kicker">Our Range</p>
          <h1>Chef-crafted <em>bundle packs</em></h1>
          <p>
            Curated packs of four — gravies, pastes &amp; sauces and wholesome grains.
            Real ingredients, retort-sealed freshness and restaurant-style flavour in minutes.
          </p>
          <ul className="pl-badges">
            <li><Leaf size={16} /> 100% Natural</li>
            <li><ShieldCheck size={16} /> No Preservatives</li>
            <li><Truck size={16} /> Fast Delivery</li>
          </ul>
        </Reveal>
      </header>

      {/* ── Bundles ── */}
      <section className="pl-section">
        <Reveal className="pl-head">
          <span className="pl-kicker">Best Value</span>
          <h2>Curated <em>bundle packs</em></h2>
          <p>Four-pouch packs built around a theme — save more and keep the kitchen stocked.</p>
        </Reveal>
        <div className="pl-bundle-grid">
          {BUNDLES.map((bundle, i) => (
            <BundleCard3D key={bundle.id} bundle={bundle} index={i} addToCart={addToCart} onProduct={onProduct} />
          ))}
        </div>
      </section>
    </main>
  );
}
