import { useState, useEffect } from 'react';
import './planb.css';

const LPG_PER_MIN = 0.0075;

const DISHES = [
  { id: 1,  name: 'Dal Makhani',       trad: 180, mk: 5 },
  { id: 2,  name: 'Boiled Chole',      trad: 80,  mk: 5 },
  { id: 3,  name: 'Boiled Chana',      trad: 60,  mk: 5 },
  { id: 4,  name: 'Kidney Beans',      trad: 70,  mk: 5 },
  { id: 5,  name: 'Toor Dal',          trad: 20,  mk: 5 },
  { id: 6,  name: 'Dal Tadka',         trad: 30,  mk: 5 },
  { id: 7,  name: 'Makhani Gravy',     trad: 60,  mk: 8 },
  { id: 8,  name: 'OT Masala',         trad: 40,  mk: 4 },
  { id: 9,  name: 'Kadhai Gravy',      trad: 40,  mk: 4 },
  { id: 10, name: 'Malabar Curry',     trad: 30,  mk: 5 },
  { id: 11, name: 'Noorani Gravy',     trad: 30,  mk: 5 },
  { id: 12, name: 'Cashew Paste',      trad: 30,  mk: 5 },
  { id: 13, name: 'Tomato Concasse',   trad: 30,  mk: 4 },
  { id: 14, name: 'Tangy Malai',       trad: 30,  mk: 5 },
  { id: 15, name: 'GG Paste',          trad: 15,  mk: 4 },
  { id: 16, name: 'Pizza Pasta Sauce', trad: 30,  mk: 4 },
];

const TICKER_ITEMS = [
  'LPG = ₹2,300 / 19KG', 'DAL MAKHANI = ₹163 GAS / BATCH', 'CHOLE = ₹72 GAS / KG',
  '97% LESS GAS', 'SAME AUTHENTIC TASTE', 'MICKY\'S RETORT TECHNOLOGY', 'THERE IS A PLAN B',
];

function fmt(n) {
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

export function PlanBPage() {
  const [selected, setSelected] = useState(new Set([1, 7, 8, 9]));
  const [batchKg, setBatchKg] = useState(10);
  const [lpgPrice, setLpgPrice] = useState(2300);

  const rate = lpgPrice / 19;
  const cost = (min) => LPG_PER_MIN * min * rate;

  let tradTotal = 0, mkTotal = 0;
  DISHES.forEach((d) => {
    if (!selected.has(d.id)) return;
    tradTotal += cost(d.trad) * batchKg;
    mkTotal += cost(d.mk) * batchKg;
  });
  const saving = tradTotal - mkTotal;
  const pct = tradTotal > 0 ? Math.round((saving / tradTotal) * 100) : 0;

  const toggle = (id) => setSelected((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  useEffect(() => {
    const reveals = document.querySelectorAll('.mickys-lp .mlp-reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('vis'); }),
      { threshold: 0.08 }
    );
    reveals.forEach((r) => obs.observe(r));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mickys-lp">

      {/* ── HERO ── */}
      <div className="mlp-hero mlp-section">
        <div className="mlp-hero-inner">
          <div className="mlp-eyebrow">Micky's · Plan B Kitchens · B2B Campaign 2026</div>
          <h1>
            KYA AAPKE<br />KITCHEN ME<br />
            <span className="g">PAISA</span> <span className="out">JALTA</span><br />HAI?
          </h1>
          <div className="mlp-rule" />
          <p className="mlp-sub">Gas just crossed ₹2,300. The kitchen you're running today is burning far more than food — and most owners don't even know it.</p>

          <div className="mlp-hero-stats">
            <div className="mlp-hstat"><div className="n">97%</div><div className="l">LPG Saved</div></div>
            <div className="mlp-hstat"><div className="n">5 MIN</div><div className="l">Per Batch</div></div>
            <div className="mlp-hstat"><div className="n">₹47K+</div><div className="l">Monthly Saving</div></div>
            <div className="mlp-hstat"><div className="n">16+</div><div className="l">Products</div></div>
          </div>

          <div className="mlp-btn-row">
            <button className="mlp-btn-p" type="button" onClick={() => scrollTo('mlp-calculator')}>Calculate My Savings</button>
            <button className="mlp-btn-g" type="button" onClick={() => scrollTo('mlp-contact')}>Bulk Order →</button>
          </div>
        </div>
      </div>

      {/* ── TICKER ── */}
      <div className="mlp-ticker">
        <div className="mlp-ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
            <span key={i} className="mlp-ticker-item">{t}</span>
          ))}
        </div>
      </div>

      {/* ── SITUATION ── */}
      <div className="mlp-section mlp-situation mlp-reveal" id="mlp-crisis">
        <div className="mlp-label">01 · The Situation</div>
        <h2 className="mlp-heading">GAS CRISIS KITCHENS<br />KO <span className="g">NICHOD RAHI HAI.</span></h2>
        <p className="mlp-copy">Commercial LPG in India just crossed ₹2,300 per 19kg cylinder. Restaurants, cloud kitchens, and hotels are absorbing cost increases that simply can't be passed to customers — not in today's market.</p>

        <div className="mlp-crisis-card">
          <div>
            <h3>Dal Makhani alone costs ₹163 in gas. Per kilogram. Every single day.</h3>
            <p>Three hours of flame. 1.35 kg of LPG. For one dish. Now multiply that across your full menu, across every service, across 30 days — and you're looking at a number that should terrify any hospitality operator.<br /><br />Most kitchens have no visibility into their per-dish gas cost. That blind spot is costing lakhs of rupees every year.</p>
          </div>
          <div className="mlp-stat-grid">
            <div className="mlp-sg"><span className="bv">₹2,300</span><div className="bl">Per 19kg cylinder</div></div>
            <div className="mlp-sg"><span className="bv">₹163</span><div className="bl">Gas · Dal Makhani /kg</div></div>
            <div className="mlp-sg"><span className="bv">180 MIN</span><div className="bl">Dal Makhani cook time</div></div>
            <div className="mlp-sg"><span className="bv">13.5 KG</span><div className="bl">LPG · 10kg Dal / day</div></div>
          </div>
        </div>
      </div>

      {/* ── INSIGHT ── */}
      <div className="mlp-section mlp-insight mlp-reveal">
        <div className="mlp-label">02 · The Insight</div>
        <h2 className="mlp-heading">SABKUCH KHUD<br />PAKANA ZARURI NAHI HAI.</h2>
        <p className="mlp-copy">The best professional kitchens in the world don't start from zero. They start smart. Micky's retort technology means your chef's skill goes into finishing and flavour — not into watching a pot for three hours.</p>
        <div className="mlp-insight-grid">
          <div className="mlp-ic"><span className="in">16+</span><p>Ready-to-use bases, gravies, pastes, and concentrates — pre-cooked using Micky's retort technology. Spanning North Indian, continental, and fusion menus.</p></div>
          <div className="mlp-ic"><span className="in">97%</span><p>Average LPG saved across the entire product range. The same authentic taste your customers know — none of the gas bill your accountant dreads.</p></div>
          <div className="mlp-ic"><span className="in">ZERO</span><p>Changes to your menu, kitchen identity, or guest experience. Micky's is invisible to diners — visible only on your monthly P&amp;L.</p></div>
        </div>
      </div>

      {/* ── TASK ── */}
      <div className="mlp-section mlp-dark mlp-reveal">
        <div className="mlp-label">03 · The Task at Hand</div>
        <h2 className="mlp-heading">KITCHENS KO CHAHIYE<br />EK <span className="g">PLAN B.</span></h2>
        <div className="mlp-task-grid">
          <div className="mlp-tbox bad">
            <h3>What's Happening Now</h3>
            {[
              'Traditional cooking burns hours of gas on high-volume base items every service',
              'No visibility into per-dish fuel cost on the P&L',
              'Menu prices can\'t be raised without losing customers',
              'Staff time wasted on prep that doesn\'t need skilled hands',
              'Invisible monthly losses in the lakhs — with no one noticing',
            ].map((t) => (
              <div key={t} className="mlp-titem"><span className="mlp-tick">✗</span>{t}</div>
            ))}
          </div>
          <div className="mlp-tbox good">
            <h3>What Smart Kitchens Do</h3>
            {[
              'Switch high-burn, low-variation base items to Micky\'s retort concentrates',
              'Keep artisanal technique reserved for finishing and plating',
              'Reheat and temper in under 5 minutes per batch',
              'Reduce gas consumption by up to 97% per dish',
              'Free your best cooks for actual cooking',
            ].map((t) => (
              <div key={t} className="mlp-titem"><span className="mlp-tick">✓</span>{t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SOLUTION ── */}
      <div className="mlp-section mlp-solution mlp-reveal">
        <div className="mlp-label">04 · Micky's as the Solution</div>
        <h2 className="mlp-heading">180 MINUTE SE<br /><span className="g">SEEDHA 5.</span></h2>
        <div className="mlp-sol-grid">
          <div>
            <p className="mlp-sol-p">Micky's retort-cooked bases are India's first commercially viable ready-to-cook concentrates designed for professional kitchens. No compromise on taste. A dramatic drop in your gas bill.</p>
            {[
              { n: 1, h: 'Open & Reheat',    p: "Micky's retort-sealed base arrives pre-cooked. Steam or reheat on low flame — 5 minutes flat." },
              { n: 2, h: 'Temper & Finish',  p: 'Your chef adds fresh tadka, cream, regional spicing. The artistry is yours. The base is ours.' },
              { n: 3, h: 'Plate & Serve',    p: 'Same dish. Same taste. Restaurant-grade quality your customers recognise and return for.' },
              { n: 4, h: 'Watch Costs Fall', p: 'Per-dish gas cost drops from ₹163 to ₹4.54. Multiply that by your daily volume. Every single day.' },
            ].map(({ n, h, p }) => (
              <div key={n} className="mlp-step">
                <div className="mlp-snum">{n}</div>
                <div className="mlp-scont"><h4>{h}</h4><p>{p}</p></div>
              </div>
            ))}
          </div>

          <div className="mlp-vs-card">
            <div className="mlp-vs-hdr">
              <span style={{ fontSize: '22px' }}>🍛</span>
              <span>Dal Makhani · 1 kg batch comparison</span>
            </div>
            <div className="mlp-vs-body">
              <div className="mlp-vs-row">
                <div className="mlp-vbox trad">
                  <div className="vv">180</div><div className="vl">Minutes</div>
                  <div className="vc">₹163</div><div className="vt">Gas cost/batch</div>
                  <div style={{ marginTop: 10, fontSize: 9, color: 'var(--muted)', letterSpacing: 1 }}>TRADITIONAL</div>
                </div>
                <div className="mlp-vs-lbl">vs</div>
                <div className="mlp-vbox mky">
                  <div className="vv">5</div><div className="vl">Minutes</div>
                  <div className="vc">₹4.54</div><div className="vt">Gas cost/batch</div>
                  <div style={{ marginTop: 10, fontSize: 9, color: 'var(--gold)', letterSpacing: 1 }}>WITH MICKY'S</div>
                </div>
              </div>
              <div className="mlp-save-big"><div className="sn">₹158 SAVED</div><div className="sl">Per batch · 97% less gas</div></div>
              <div className="mlp-monthly-box">
                <div className="mn">₹47,664</div>
                <div className="ml">Monthly saving · 10kg/day</div>
                <div className="ms">Just one item. Every single month.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CALCULATOR ── */}
      <div className="mlp-section mlp-calc mlp-reveal" id="mlp-calculator">
        <div className="mlp-label">05 · LPG Savings Calculator</div>
        <h2 className="mlp-heading">APNA PAISA<br /><span className="g">CALCULATE KARO.</span></h2>
        <p className="mlp-copy">Select the dishes you cook. Set your daily batch volume. See exactly what you're burning — and what you'd save with Micky's.</p>

        <div className="mlp-calc-wrap">
          <div className="mlp-ci-row">
            <div className="mlp-ci">
              <label htmlFor="pb-batchKg">Daily Volume Per Dish (kg)</label>
              <input
                id="pb-batchKg"
                type="number"
                value={batchKg}
                min="1"
                onChange={(e) => setBatchKg(Math.max(1, parseFloat(e.target.value) || 1))}
              />
              <small>Kg per dish per day</small>
            </div>
            <div className="mlp-ci">
              <label htmlFor="pb-lpgPx">LPG Cylinder Price (₹)</label>
              <input
                id="pb-lpgPx"
                type="number"
                value={lpgPrice}
                min="900"
                onChange={(e) => setLpgPrice(Math.max(900, parseFloat(e.target.value) || 900))}
              />
              <small>Per 19 kg commercial cylinder</small>
            </div>
          </div>

          <div className="mlp-d-label">Select Your Dishes — tap to toggle</div>
          <div className="mlp-d-grid">
            {DISHES.map((d) => {
              const tc = cost(d.trad);
              const mc = cost(d.mk);
              const sav = tc - mc;
              const dpct = Math.round((sav / tc) * 100);
              return (
                <div
                  key={d.id}
                  className={`mlp-dtog${selected.has(d.id) ? ' on' : ''}`}
                  onClick={() => toggle(d.id)}
                >
                  <span className="dn">{d.name}</span>
                  <div className="ds">₹{sav.toFixed(0)} saved</div>
                  <div className="dl">per batch · {dpct}% ↓</div>
                  <div className="cmp">
                    <div className="mini trad">
                      <div className="mv">{d.trad}</div>
                      <div className="mlb">Minutes</div>
                      <div className="mc">₹{tc.toFixed(0)}</div>
                      <div className="msc">Traditional</div>
                    </div>
                    <div className="vs">vs</div>
                    <div className="mini mky">
                      <div className="mv">{d.mk}</div>
                      <div className="mlb">Minutes</div>
                      <div className="mc">₹{mc.toFixed(2)}</div>
                      <div className="msc">With Micky's</div>
                    </div>
                  </div>
                  <div className="mlp-sbar"><div className="mlp-sbar-f" style={{ width: `${dpct}%` }} /></div>
                </div>
              );
            })}
          </div>

          <div className="mlp-calc-result">
            <div className="mlp-rb">
              <div className="rl">Daily Gas Cost (Traditional)</div>
              <div className="rn">{fmt(tradTotal)}</div>
              <div className="rs">All selected dishes</div>
            </div>
            <div className="mlp-rb hi">
              <div className="rl">Monthly Savings with Micky's</div>
              <div className="rn">{fmt(saving * 30)}</div>
              <div className="rs">Over 30 days</div>
            </div>
            <div className="mlp-rb">
              <div className="rl">Avg LPG Reduction</div>
              <div className="rn">{pct}%</div>
              <div className="rs">Across selected dishes</div>
            </div>
          </div>

          <div className="mlp-center" style={{ marginTop: 28 }}>
            <button className="mlp-btn-p" type="button" onClick={() => scrollTo('mlp-contact')}>Bulk Order →</button>
          </div>
        </div>
      </div>

      {/* ── TESTIMONIAL ── */}
      <div className="mlp-section mlp-testi mlp-reveal">
        <div className="mlp-testi-card">
          <span className="mlp-qm">"</span>
          <p className="mlp-qt">Over the past three months, we have been preparing dishes using ready-to-cook gravies and sausages from our in-house brand. This approach has significantly reduced our LPG consumption, as most dishes are prepared through steam boiling.</p>
          <div className="mlp-qa">
            <div className="mlp-qav">AA</div>
            <div>
              <div className="mlp-qn">Angadh Arora</div>
              <div className="mlp-qtt">Hospitality Group Head · Industry Veteran</div>
            </div>
          </div>
          <p className="mlp-q2">"Following the recent crisis, many hotel and restaurant owners have expressed serious interest in adopting this efficient and sustainable method."</p>
        </div>
      </div>

      {/* ── INSTAGRAM MOCK ── */}
      <div className="mlp-section mlp-insta mlp-reveal">
        <div className="mlp-label">06 · @mickys.ki.zimmedari</div>
        <h2 className="mlp-heading">FOLLOW THE<br /><span className="g">MOVEMENT.</span></h2>
        <div className="mlp-insta-handle">📸 @mickys.ki.zimmedari</div>
        <p className="mlp-copy">Real numbers. Real kitchens. Real savings. Follow the LPG crisis conversation on our Instagram page.</p>

        <div className="mlp-insta-grid">
          <div className="mlp-ipost fp-dal">
            <div className="mlp-food-visual">
              <div className="mlp-food-glow" />
              <div style={{ position: 'relative' }}>
                <div className="mlp-food-steam"><div className="mlp-sl" /><div className="mlp-sl" /><div className="mlp-sl" /></div>
                <div className="mlp-plate" style={{ background: 'radial-gradient(circle at 38% 32%,#E87020,#7B2200 60%,#3A0800)' }}>🍛</div>
              </div>
            </div>
            <div className="mlp-ipost-cap">
              <span className="mlp-ict">#LPGCrisis · Dal Makhani</span>
              <div className="mlp-ich">Dal Makhani = ₹163 in gas. Per kg. Every single day.</div>
              <div className="mlp-icm"><div className="mlp-icl">❤️ 1.2k &nbsp; 💬 84</div><div className="mlp-ics">97% SAVE ↓</div></div>
            </div>
          </div>

          <div className="mlp-ipost fp-makhani">
            <div className="mlp-food-visual">
              <div className="mlp-food-glow" style={{ background: 'radial-gradient(ellipse,rgba(255,150,60,.14),transparent 70%)' }} />
              <div style={{ position: 'relative' }}>
                <div className="mlp-food-steam"><div className="mlp-sl" /><div className="mlp-sl" /><div className="mlp-sl" /></div>
                <div className="mlp-plate" style={{ background: 'radial-gradient(circle at 38% 32%,#F07030,#A03200 60%,#501000)' }}>🧆</div>
              </div>
            </div>
            <div className="mlp-ipost-cap">
              <span className="mlp-ict">#PlanBKitchens · Makhani</span>
              <div className="mlp-ich">Makhani Gravy: 60 min down to 8. ₹54 in gas to just ₹7.</div>
              <div className="mlp-icm"><div className="mlp-icl">❤️ 980 &nbsp; 💬 61</div><div className="mlp-ics">87% SAVE ↓</div></div>
            </div>
          </div>

          <div className="mlp-ipost fp-chole">
            <div className="mlp-food-visual">
              <div className="mlp-food-glow" style={{ background: 'radial-gradient(ellipse,rgba(220,180,80,.15),transparent 70%)' }} />
              <div style={{ position: 'relative' }}>
                <div className="mlp-food-steam"><div className="mlp-sl" /><div className="mlp-sl" /><div className="mlp-sl" /></div>
                <div className="mlp-plate" style={{ background: 'radial-gradient(circle at 38% 32%,#C89020,#8B5200 60%,#4A2800)' }}>🫘</div>
              </div>
            </div>
            <div className="mlp-ipost-cap">
              <span className="mlp-ict">#MickysKitchen · Chole</span>
              <div className="mlp-ich">Chole: 80 minutes of gas, down to 5. Same authentic taste.</div>
              <div className="mlp-icm"><div className="mlp-icl">❤️ 745 &nbsp; 💬 52</div><div className="mlp-ics">94% SAVE ↓</div></div>
            </div>
          </div>

          <div className="mlp-ipost fp-stat">
            <div className="mlp-food-visual" style={{ flexDirection: 'column', gap: 10, background: 'none', padding: 28 }}>
              <div style={{ fontSize: 9, letterSpacing: 3, color: 'var(--gold)', textTransform: 'uppercase' }}>Monthly · 10kg/day · Dal Makhani</div>
              <div style={{ fontFamily: '\'Bebas Neue\',sans-serif', fontSize: 70, color: 'var(--gold)', lineHeight: 1 }}>₹47K</div>
              <div style={{ width: 48, height: 2, background: 'var(--gold)', borderRadius: 1 }} />
              <div style={{ fontSize: 13, color: 'var(--cream)', opacity: .75, textAlign: 'center', lineHeight: 1.5 }}>Saved every month.<br />From one single dish.</div>
            </div>
            <div className="mlp-ipost-cap">
              <span className="mlp-ict">#AapkiRasoi · Monthly Saving</span>
              <div className="mlp-ich">₹47,664 saved — from Dal Makhani alone. Every month.</div>
              <div className="mlp-icm"><div className="mlp-icl">❤️ 2.1k &nbsp; 💬 143</div><div className="mlp-ics">TOP POST 🔥</div></div>
            </div>
          </div>
        </div>

        <div className="mlp-center" style={{ marginTop: 28 }}>
          <a href="https://instagram.com/mickys.ki.zimmedari" target="_blank" rel="noopener noreferrer" className="mlp-btn-g">
            View All Posts @mickys.ki.zimmedari ↗
          </a>
        </div>
      </div>

      {/* ── FINAL CTA ── */}
      <div className="mlp-section mlp-final mlp-reveal" id="mlp-contact">
        <div className="mlp-label">Ready? Let's Talk.</div>
        <h2 className="mlp-heading">APNA PAISA<br />BACHANA SHURU KARO.</h2>
        <p className="mlp-sub2">Get a Bulk Order and see the savings in your own kitchen. No commitment required. Just results.</p>
        <div className="mlp-cta-row">
          <a href="tel:+919271973474" className="mlp-btn-dark">📞 Call Our Team</a>
          <a href="https://wa.me/919271973474" className="mlp-btn-dark">💬 WhatsApp Us</a>
          <a href="mailto:sales1.cpfoods@cpgh.in" className="mlp-btn-outline">✉ Email Enquiry</a>
        </div>
        <p style={{ marginTop: 22, fontSize: 12, opacity: .8, color: '#FFFFFF' }}>
          India's First Convenient Cooking Brand · By CP Food · Nagpur · B2B Enquiries Welcome
        </p>
      </div>

      {/* ── FOOTER ── */}
      <div className="mlp-footer">
        <div className="mlp-logo">MICKY'S<small>India's First Convenient Cooking Brand</small></div>
        <p>Plan B Kitchens · LPG Crisis Campaign · 2026</p>
        <p>© CP Food · Micky's by CP Food</p>
      </div>

    </div>
  );
}
