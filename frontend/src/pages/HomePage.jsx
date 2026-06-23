import { useRef, useState } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { PRODUCTS, RECIPES } from '../data/siteData';
import { Reveal, useTilt } from '../components/ui/motion3d';
import './home-cinematic.css';
import heroBanner from '../assets/header-products-banner.png';
import processFlow from '../assets/process-kitchen-to-yours.webp';

/* products that have a real pouch asset (exclude bundles + Unsplash placeholders) */
const SINGLES = PRODUCTS.filter((p) => p.label !== 'Bundle' && !/^https?:/.test(p.image));
const HERO = SINGLES[0];
/* three product pouches that float around the hero centerpiece (4 images total) */
const HERO_ORBIT = SINGLES.slice(1, 4);
const TICKER = ['100% Natural', 'Ready in 10', 'No Preservatives', 'Retort Sealed', 'Chef Crafted', 'Since 2022'];

const EASE = [0.2, 1, 0.3, 1];
const HERO_STAGGER = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } };
const FADE_UP = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const WORD_RISE = { hidden: { y: '115%' }, show: { y: 0, transition: { duration: 0.85, ease: EASE } } };

/* One layer of the pinned walkthrough — opacity/scale scrubbed by scroll. */
function ShowcaseSlide({ product, i, total, progress }) {
  const seg = 1 / total;
  const center = i * seg + seg / 2;
  /* keep the first slide visible on entry and the last on exit so the
     dark stage never shows through as an empty black band */
  const isFirst = i === 0;
  const isLast = i === total - 1;
  const opacity = useTransform(
    progress,
    [center - seg * 0.62, center - seg * 0.28, center + seg * 0.28, center + seg * 0.62],
    [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0]
  );
  const scale = useTransform(progress, [center - seg * 0.6, center, center + seg * 0.6], [0.86, 1, 0.86]);
  const imgY = useTransform(progress, [center - seg * 0.6, center + seg * 0.6], [60, -60]);
  const copyX = useTransform(progress, [center - seg * 0.5, center, center + seg * 0.5], [-40, 0, 40]);

  return (
    <motion.div className="cn-slide" style={{ opacity }}>
      <motion.div className="cn-slide-media" style={{ scale }}>
        <span className="cn-slide-disc" />
        <motion.img src={product.image} alt={product.name} style={{ y: imgY }} loading="lazy" decoding="async" />
      </motion.div>
      <motion.div className="cn-slide-copy" style={{ x: copyX }}>
        <p className="cn-slide-cat">{product.category}</p>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <div className="cn-slide-meta">
          {product.weight && <span>{product.weight}</span>}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Showcase({ onNavigate }) {
  const ref = useRef(null);
  const total = SINGLES.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(total - 1, Math.max(0, Math.floor(v * total))));
  });

  return (
    <section className="cn-showcase" ref={ref} style={{ height: `${total * 75}vh` }}>
      <div className="cn-stage">
        <div className="cn-grain" />
        <span className="cn-stage-ghost">{SINGLES[active].name.split(' ')[0]}</span>
        {SINGLES.map((p, i) => (
          <ShowcaseSlide key={p.id} product={p} i={i} total={total} progress={scrollYProgress} />
        ))}
        <div className="cn-stage-rail">
          {SINGLES.map((p, i) => <i key={p.id} className={i === active ? 'on' : ''} />)}
        </div>
        <div className="cn-stage-counter"><b>{String(active + 1).padStart(2, '0')}</b> / {String(total).padStart(2, '0')}</div>
      </div>
    </section>
  );
}

/* Parallax background for the story band. */
function StoryBand() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-14%', '14%']);

  return (
    <section className="cn-story" ref={ref}>
      <motion.div className="cn-story-bg" style={{ y }}>
        <img src={heroBanner} alt="Micky's product range" />
      </motion.div>
      <Reveal className="cn-story-inner">
        <p className="cn-eyebrow">Since 2022 · CP Foods</p>
        <h2>Made the right way. <em>Every time.</em></h2>
        <p>
          Chef-developed ready-to-cook bases from real hospitality kitchens — retort-sealed for
          dependable shelf life, with no artificial colours, flavours or additives. We simplify the
          hard prep and leave the final flavour in your hands.
        </p>
      </Reveal>
    </section>
  );
}

export function HomePage({ onNavigate }) {
  const { scrollYProgress } = useScroll();
  const heroTilt = useTilt({ max: 9 });
  const reduce = useReducedMotion();
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], [0, reduce ? 0 : -90]);
  const heroFade = useTransform(heroProgress, [0, 0.85], [1, reduce ? 1 : 0]);

  return (
    <main className="cn">
      <motion.div className="cn-progress" style={{ scaleX: scrollYProgress }} />

      {/* ── HERO (asymmetric split, cinematic) ── */}
      <section className="cn-hero" ref={heroRef}>
        <div className="cn-hero-beam" aria-hidden="true" />
        <div className="cn-grain" />
        <div className="cn-hero-vignette" aria-hidden="true" />
        <span className="cn-hero-side">Micky's · CP Foods · Est. 2022</span>

        <motion.div className="cn-hero-inner" style={{ y: heroY, opacity: heroFade }}>
          <motion.div className="cn-hero-left" variants={HERO_STAGGER} initial="hidden" animate="show">
            <motion.p className="cn-eyebrow" variants={FADE_UP}>Micky's · CP Foods · Est. 2022</motion.p>
            <h1>
              <span className="cn-word-mask"><motion.span className="cn-word" variants={WORD_RISE}>India's First</motion.span></span>
              <span className="cn-word-mask"><motion.span className="cn-word cn-stroke" variants={WORD_RISE}>Convenient</motion.span></span>
              <span className="cn-word-mask"><motion.span className="cn-word cn-shimmer" variants={WORD_RISE}>Cooking Brand.</motion.span></span>
            </h1>
            <motion.p className="cn-hero-lead" variants={FADE_UP}>
              Open a pouch and plate restaurant-quality in under ten minutes. Real ingredients,
              retort-sealed freshness, zero shortcuts.
            </motion.p>
            <motion.div className="cn-hero-actions" style={{ justifyContent: 'flex-start' }} variants={FADE_UP}>
              <button className="cn-btn cn-btn-gold" type="button" onClick={() => onNavigate({ name: 'products' })}>
                Shop the range <ArrowRight size={18} />
              </button>
              <button className="cn-btn cn-btn-ghost" type="button" onClick={() => onNavigate({ name: 'about' })}>
                Our story
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            className="cn-hero-product"
            ref={heroTilt.ref}
            onMouseMove={heroTilt.onMouseMove}
            onMouseLeave={heroTilt.onMouseLeave}
            style={heroTilt.style}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.2, 1, 0.3, 1] }}
          >
            <span className="cn-hero-disc" />
            <motion.img
              className="cn-hero-main"
              src={HERO.image}
              alt={HERO.name}
              animate={reduce ? {} : { y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            {HERO_ORBIT.map((p, i) => (
              <motion.img
                key={p.id ?? i}
                className={`cn-hero-orbit cn-orbit-${i + 1}`}
                src={p.image}
                alt={p.name}
                animate={reduce ? {} : { y: [0, i % 2 === 0 ? -14 : 12, 0] }}
                transition={{ duration: 4.5 + i, repeat: Infinity, ease: 'easeInOut', delay: 0.3 * i }}
              />
            ))}
            <span className="cn-hero-shadow" aria-hidden="true" />
          </motion.div>
        </motion.div>

        <div className="cn-hero-stats">
          <div className="cn-stat"><strong>40+</strong><span>Years in kitchens</span></div>
          <div className="cn-stat"><strong>8</strong><span>Signature bases</span></div>
          <div className="cn-stat"><strong>10m</strong><span>Prep to plate</span></div>
        </div>

        <span className="cn-scrollcue">Scroll <span /></span>
      </section>

      {/* ── LEADERSHIP ── */}
      <section className="cn-section cn-leaders">
        <Reveal>
          <span className="cn-kicker">Our Leadership</span>
          <h2 className="cn-h2">Founders of <em>Micky’s</em></h2>
          <p className="cn-leaders-lead">
            Micky’s is built on four decades of running live hotel kitchens. Named after our
            Managing Director — fondly known as Mickey Sir — the brand stands for discipline,
            authenticity and innovation rooted in tradition.
          </p>
        </Reveal>
        <div className="cn-leaders-grid">
          <Reveal className="cn-leader" as="figure">
            <img src="/team/founder-1.jpg" alt="Angadh Arora" loading="lazy" />
            <figcaption>
              <strong>Angadh Arora</strong>
              <span>Director · Centre Point Food Pvt Ltd</span>
            </figcaption>
          </Reveal>
          <Reveal className="cn-leader" as="figure" delay={0.1}>
            <img src="/team/founder-2.jpg" alt="Arjun Arora" loading="lazy" />
            <figcaption>
              <strong>Arjun Arora</strong>
              <span>Director · Centre Point Food Pvt Ltd</span>
            </figcaption>
          </Reveal>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="cn-ticker" aria-hidden="true">
        <div className="cn-ticker-track">{[...TICKER, ...TICKER].map((t, i) => <span key={i}>{t}</span>)}</div>
      </div>

      {/* ── PINNED PRODUCT WALKTHROUGH ── */}
      <Showcase onNavigate={onNavigate} />

      {/* ── PARALLAX STORY ── */}
      <StoryBand />

      {/* ── PROCESS ── */}
      <section className="cn-section cn-process">
        <Reveal>
          <span className="cn-kicker">How it works</span>
        </Reveal>
        <Reveal className="cn-process-art">
          <img src={processFlow} alt="From professional kitchen to yours, in minutes — chef-crafted base, retort-sealed quality, fast final execution" loading="lazy" decoding="async" />
        </Reveal>
      </section>

      {/* ── RECIPES ── */}
      <section className="cn-section">
        <Reveal>
          <span className="cn-kicker">Tonight's menu</span>
          <h2 className="cn-h2">Cook something <em>amazing</em></h2>
        </Reveal>
        <div className="cn-recipes">
          {RECIPES.map((r, i) => (
            <Reveal key={r.title} className="cn-recipe" delay={i * 0.1} onClick={() => onNavigate({ name: 'recipes' })}>
              <img src={r.image} alt={r.title} loading="lazy" decoding="async" />
              <div className="cn-recipe-body">
                <span className="cn-recipe-time"><Clock size={13} style={{ verticalAlign: '-2px' }} /> {r.time}</span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cn-section cn-cta">
        <Reveal>
          <h2>Bring the <em>kitchen</em> home</h2>
          <p>Chef recipes, restock reminders and members-only offers — no spam, just smarter cooking.</p>
          <form className="cn-cta-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" aria-label="Email address" required />
            <button className="cn-btn cn-btn-gold" type="submit">Join <ArrowRight size={18} /></button>
          </form>
        </Reveal>
      </section>
    </main>
  );
}
