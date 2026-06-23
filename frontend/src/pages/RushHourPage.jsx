import { useRef } from 'react';
import {
  ArrowRight, Phone, Download,
  ShieldCheck, Factory, BadgeCheck, Soup, ChefHat,
} from 'lucide-react';
import { GaugeIcon, PotIcon, ChefHatIcon, BarsIcon } from '../components/ui/rush-icons';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { PRODUCTS, TESTIMONIALS } from '../data/siteData';
import { Reveal } from '../components/ui/motion3d';
import heroBanner from '../assets/header-products-banner.png';
import processFlow from '../assets/process-kitchen-to-yours.webp';
import logoBarbeque from '../assets/logos/barbeque-nation.svg';
import logoHaldirams from '../assets/logos/haldirams.png';
import logoReliance from '../assets/logos/reliance.png';
import logoSodexo from '../assets/logos/sodexo.svg';
import logoTaj from '../assets/logos/taj-hotels.svg';
import logoZomato from '../assets/logos/zomato.svg';
import './rushhour.css';

/* single products with a real local pouch asset (no bundles, no placeholder images) */
const SHOWCASE = PRODUCTS
  .filter((p) => p.label !== 'Bundle' && !/^https?:/.test(p.image))
  .slice(0, 4);

const TRUSTED_BY = [
  { name: 'Barbeque Nation', logo: logoBarbeque },
  { name: 'Haldiram’s', logo: logoHaldirams },
  { name: 'Reliance', logo: logoReliance },
  { name: 'Sodexo', logo: logoSodexo },
  { name: 'Taj Hotels', logo: logoTaj },
  { name: 'Zomato', logo: logoZomato },
];

const PAINS = [
  { icon: GaugeIcon,   title: 'Rush-hour pressure', desc: 'Orders pile up faster than your line can prep. Micky’s keeps service moving.' },
  { icon: PotIcon,     title: 'Prep & flame delays', desc: 'Hours of slow-cooking already done. Open, heat and plate in minutes.' },
  { icon: ChefHatIcon, title: 'Labour dependency',   desc: 'Consistent results without leaning on a single star chef or extra hands.' },
  { icon: BarsIcon,    title: 'Wastage & cost',     desc: 'Portion-controlled, retort-sealed bases mean less spoilage and tighter food cost.' },
];

const SCALE_POINTS = [
  'State-of-the-art manufacturing facilities',
  'Strict quality & food-safety protocols',
  'Consistent supply, pan-India distribution',
  'Developed for high-volume professional kitchens',
];

function Hero({ onNavigate }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);

  return (
    <section className="rh-hero" ref={ref}>
      <motion.div className="rh-hero-media" style={{ scale: imgScale }} aria-hidden="true">
        <img src={heroBanner} alt="" loading="eager" />
        <div className="rh-hero-scrim" />
      </motion.div>

      <motion.div className="rh-hero-inner" style={{ y }}>
        <span className="rh-eyebrow">Rush Hour Ka Right Hand</span>
        <h1>
          Built for<br />kitchens under<br /><em>pressure.</em>
        </h1>
        <p className="rh-hero-lead">
          Micky’s helps restaurants, caterers, cloud kitchens and institutional kitchens
          serve faster — with zero compromise on taste.
        </p>
        <div className="rh-hero-actions">
          <button className="rh-btn rh-btn-gold" type="button" onClick={() => onNavigate({ name: 'contact' })}>
            <Phone size={18} /> Talk to Sales
          </button>
          <button className="rh-btn rh-btn-ghost" type="button" onClick={() => onNavigate({ name: 'contact' })}>
            <Download size={18} /> Download Catalogue
          </button>
        </div>
      </motion.div>
    </section>
  );
}

export function RushHourPage({ onNavigate, addToCart }) {
  return (
    <main className="rh">
      <Hero onNavigate={onNavigate} />

      {/* ── Trust strip ─────────────────────────────── */}
      <section className="rh-trust">
        <p className="rh-trust-label">Trusted by 2000+ kitchens across India</p>
        <div className="rh-trust-logos">
          {TRUSTED_BY.map(({ name, logo }) => (
            <img key={name} className="rh-trust-logo" src={logo} alt={name} loading="lazy" />
          ))}
        </div>
      </section>

      {/* ── Pain-first value props ──────────────────── */}
      <section className="rh-pains">
        <Reveal className="rh-section-head">
          <span className="rh-kicker">The reality of professional kitchens</span>
          <h2>Rush hour ka <em>right hand.</em></h2>
          <p>Every Micky’s base is built around the things that slow a kitchen down — so your team moves faster when it matters most.</p>
        </Reveal>
        <div className="rh-pain-grid">
          {PAINS.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} className="rh-pain-card" delay={i * 0.08} as="article">
              <span className="rh-pain-ic"><Icon /></span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Social proof ────────────────────────────── */}
      <section className="rh-proof">
        <Reveal className="rh-section-head">
          <span className="rh-kicker">Trusted by kitchens that deliver every day</span>
          <h2>Consistency they <em>count on.</em></h2>
        </Reveal>
        <div className="rh-proof-grid">
          {TESTIMONIALS.slice(0, 3).map(([name, city, quote]) => (
            <Reveal key={name} className="rh-quote" as="article">
              <div className="rh-stars">★★★★★</div>
              <p>“{quote}”</p>
              <strong>{name}</strong>
              <span>{city}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Built with scale ────────────────────────── */}
      <section className="rh-scale">
        <Reveal className="rh-scale-copy">
          <span className="rh-kicker">Built with scale. Backed by experience.</span>
          <h2>An operational partner, <em>not just a food brand.</em></h2>
          <ul className="rh-scale-list">
            {SCALE_POINTS.map((point) => (
              <li key={point}><BadgeCheck size={20} /> {point}</li>
            ))}
          </ul>
          <div className="rh-scale-stats">
            <div><b>2000+</b><span>Kitchens served</span></div>
            <div><b>10 min</b><span>To plate</span></div>
            <div><b>100%</b><span>Natural recipes</span></div>
          </div>
        </Reveal>
        <Reveal className="rh-scale-media" delay={0.1}>
          <img src={processFlow} alt="Micky's manufacturing and kitchen process" loading="lazy" />
        </Reveal>
      </section>

      {/* ── Final CTA ───────────────────────────────── */}
      <section className="rh-cta">
        <Reveal className="rh-cta-inner">
          <ChefHat size={34} className="rh-cta-ic" />
          <h2>Rush hour is tough.<br /><em>Your kitchen deserves a better partner.</em></h2>
          <div className="rh-hero-actions center">
            <button className="rh-btn rh-btn-gold" type="button" onClick={() => onNavigate({ name: 'contact' })}>
              <Phone size={18} /> Talk to Sales
            </button>
            <button className="rh-btn rh-btn-ghost light" type="button" onClick={() => onNavigate({ name: 'contact' })}>
              <Download size={18} /> Download Catalogue
            </button>
          </div>
          <div className="rh-cta-assure">
            <span><ShieldCheck size={15} /> Quick response</span>
            <span><Soup size={15} /> Expert guidance</span>
            <span><Factory size={15} /> Tailored solutions</span>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
