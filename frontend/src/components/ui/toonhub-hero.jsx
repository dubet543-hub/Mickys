import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { ArrowRight } from 'lucide-react';

/* 3D depth layer — lazy so three.js never blocks first paint */
const HeroScene3D = lazy(() => import('./HeroScene3D'));

import kadhaiGravy        from '../../assets/products/kadhai-gravy-pouch.png';
import makhaniGravy       from '../../assets/products/makhani-gravy-pouch.png';
import malabariGravy      from '../../assets/products/malabari-gravy-pouch.png';
import yellowGravy        from '../../assets/products/yellow-gravy-pouch.png';
import gingerGarlicPaste  from '../../assets/products/ginger-garlic-paste-pouch.png';
import onionTomatoMasala  from '../../assets/products/onion-tomato-masala-pouch.png';
import pizzaPastaSauce    from '../../assets/products/pizza-pasta-sauce-pouch.png';
import tomatoConcasse     from '../../assets/products/tomato-concasse-pouch.png';


const IMAGES = [
  { src: kadhaiGravy,       label: 'Kadhai Gravy'        },
  { src: makhaniGravy,      label: 'Makhani Gravy'       },
  { src: malabariGravy,     label: 'Malabari Gravy'      },
  { src: yellowGravy,       label: 'Yellow Gravy'        },
  { src: gingerGarlicPaste, label: 'Ginger Garlic Paste' },
  { src: onionTomatoMasala, label: 'Onion Tomato Masala' },
  { src: pizzaPastaSauce,   label: 'Pizza Pasta Sauce'   },
  { src: tomatoConcasse,    label: 'Tomato Concassé'     },
];

/* ── Smooth easing — only GPU-composited properties animate ── */
const EASE    = 'cubic-bezier(0.4, 0, 0.2, 1)';
const DUR     = '700ms';
const TRANSIT = `transform ${DUR} ${EASE}, filter ${DUR} ${EASE}, opacity ${DUR} ${EASE}`;

const GRAIN_URI = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`;

const bpOf = (w) => w < 640 ? 'mobile' : w < 1280 ? 'laptop' : 'desktop';

/*
  All items sit at left:50%, top:52%.
  Position is driven entirely by translateX / translateY — no left/height transitions,
  so the browser compositor handles everything without layout reflow.
*/
function roleStyle(role, breakpt) {
  const HEIGHTS = {
    mobile:  { center: '52%', side: '26%', back: '18%' },
    laptop:  { center: '66%', side: '33%', back: '22%' },
    desktop: { center: '72%', side: '38%', back: '26%' },
  };

  /* Horizontal offset for left/right items (vw keeps it proportional) */
  const OFFSET = { mobile: '30vw', laptop: '28vw', desktop: '26vw' };

  const h  = HEIGHTS[breakpt];
  const ox = OFFSET[breakpt];

  const base = {
    position:    'absolute',
    left:        '50%',
    top:         '52%',
    width:       'auto',          /* width follows the image's natural ratio… */
    transition:  TRANSIT,
    willChange:  'transform, filter, opacity',
  };

  switch (role) {
    case 'center': return {
      ...base,
      height:    h.center,
      transform: 'translate(-50%, -50%)',
      filter:    'none',
      opacity:   1,
      zIndex:    20,
    };
    case 'left': return {
      ...base,
      height:    h.side,
      transform: `translate(calc(-50% - ${ox}), -50%)`,
      filter:    'blur(3px)',
      opacity:   0.75,
      zIndex:    10,
    };
    case 'right': return {
      ...base,
      height:    h.side,
      transform: `translate(calc(-50% + ${ox}), -50%)`,
      filter:    'blur(3px)',
      opacity:   0.75,
      zIndex:    10,
    };
    case 'back': return {
      ...base,
      height:    h.back,
      transform: 'translate(-50%, -50%)',
      filter:    'blur(6px)',
      opacity:   0.5,
      zIndex:    5,
    };
    default: return base;
  }
}

export default function ToonhubHero({ onDiscover }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [breakpoint,  setBreakpoint]  = useState(() => bpOf(window.innerWidth));

  const goTo = useCallback((i) => {
    if (isAnimating || i === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(i);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating, activeIndex]);

  /* Preload images */
  useEffect(() => {
    IMAGES.forEach(({ src }) => { const img = new Image(); img.src = src; });
  }, []);

  /* Responsive breakpoint */
  useEffect(() => {
    const onResize = () => setBreakpoint(bpOf(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const navigate = useCallback((direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    const total = IMAGES.length;
    setActiveIndex(prev =>
      direction === 'next' ? (prev + 1) % total : (prev + total - 1) % total
    );
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating]);

  /* Auto-advance every 3.5 s */
  useEffect(() => {
    const id = setInterval(() => navigate('next'), 3500);
    return () => clearInterval(id);
  }, [navigate]);

  const total   = IMAGES.length;
  const getRole = (i) => {
    if (i === activeIndex)                   return 'center';
    if (i === (activeIndex + total - 1) % total) return 'left';
    if (i === (activeIndex + 1) % total)         return 'right';
    return 'back';
  };

  const isMobile = breakpoint === 'mobile';

  return (
    <div
      style={{
        backgroundColor: '#6F0E13',
        transition:      `background-color ${DUR} ${EASE}`,
        fontFamily:      'Inter, sans-serif',
      }}
      className="relative w-full overflow-hidden"
    >
      <div
        className="relative w-full"
        style={{ height: '100vh', overflow: 'hidden', paddingTop: isMobile ? '60px' : '74px' }}
      >
        {/* 3D motes — atmospheric depth behind everything */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <Suspense fallback={null}>
            <HeroScene3D />
          </Suspense>
        </div>

        {/* Center radial glow — depth behind the hero product */}
        <div
          className="absolute left-1/2 top-1/2 pointer-events-none"
          style={{
            zIndex: 2,
            width: '72vmin',
            height: '72vmin',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(243,187,22,0.20), rgba(243,187,22,0.06) 45%, transparent 65%)',
            filter: 'blur(16px)',
          }}
        />

        {/* Bottom vignette — grounds the product row */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{ zIndex: 2, height: '42%', background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}
        />

        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 50, backgroundImage: GRAIN_URI, backgroundSize: '200px 200px', backgroundRepeat: 'repeat', opacity: 0.35 }}
        />

        {/* Main headline — top-centered on mobile, left-positioned on desktop */}
        <div
          className={`absolute pointer-events-none select-none flex flex-col ${isMobile ? 'items-center text-center' : 'items-start text-left'}`}
          style={{
            zIndex:    4,
            left:      isMobile ? '50%' : '48px',
            top:       isMobile ? '78px' : '50%',
            transform: isMobile ? 'translateX(-50%)' : 'translateY(-50%)',
            width:     isMobile ? '92vw' : 'auto',
            maxWidth:  isMobile ? '92vw' : '42vw',
          }}
        >
          <span style={{
            fontFamily:    'var(--font-body)',
            fontWeight:    600,
            color:         '#ffffff',
            fontSize:      isMobile ? 'clamp(15px, 4.5vw, 22px)' : 'clamp(20px, 1.9vw, 30px)',
            lineHeight:    1.15,
            letterSpacing: '0.01em',
            marginBottom:  isMobile ? '2px' : '6px',
          }}>India&rsquo;s First</span>
          <span style={{
            fontFamily:    'var(--font-body)',
            fontWeight:    800,
            color:         '#ffffff',
            fontSize:      isMobile ? 'clamp(30px, 9vw, 46px)' : 'clamp(46px, 5.4vw, 82px)',
            lineHeight:    1.05,
            letterSpacing: '-0.01em',
          }}>Convenient Cooking Brand</span>

          <button
            type="button"
            onClick={() => onDiscover?.()}
            style={{
              pointerEvents:  'auto',
              marginTop:      isMobile ? '16px' : '26px',
              background:     'var(--gold)',
              color:          'var(--wine)',
              fontFamily:     'var(--font-body)',
              fontWeight:     800,
              fontSize:       isMobile ? '13px' : '15px',
              letterSpacing:  '0.04em',
              textTransform:  'uppercase',
              border:         'none',
              borderRadius:   '999px',
              padding:        isMobile ? '12px 26px' : '14px 34px',
              cursor:         'pointer',
              boxShadow:      '0 14px 30px rgba(0,0,0,0.30)',
              transition:     'transform 160ms ease, background 160ms ease, box-shadow 160ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = '#ffd24a'; e.currentTarget.style.boxShadow = '0 20px 38px rgba(0,0,0,0.38)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.boxShadow = '0 14px 30px rgba(0,0,0,0.30)'; }}
          >
            Shop Now
          </button>
        </div>

        {/* Carousel — all items at left:50%, positioned purely via transform */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((image, i) => (
            <div key={i} style={roleStyle(getRole(i), breakpoint)}>
              <img
                src={image.src}
                alt={image.label}
                style={{ height: '100%', width: 'auto', objectFit: 'contain', objectPosition: 'center bottom', display: 'block' }}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Active product label + progress dots — bottom center */}
        <div
          className="absolute left-1/2 flex flex-col items-center gap-3"
          style={{ zIndex: 60, bottom: isMobile ? '92px' : '38px', transform: 'translateX(-50%)' }}
        >
          <span
            key={activeIndex}
            style={{
              fontFamily:    'var(--font-body)',
              fontWeight:    700,
              color:         'var(--gold)',
              fontSize:      isMobile ? '13px' : '17px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              whiteSpace:    'nowrap',
              animation:     'heroLabelFade 480ms ease',
            }}
          >
            {IMAGES[activeIndex].label}
          </span>
          <div className="flex items-center" style={{ gap: '8px' }}>
            {IMAGES.map((img, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Show ${img.label}`}
                style={{
                  height:       '6px',
                  width:        i === activeIndex ? '26px' : '6px',
                  padding:      0,
                  border:       'none',
                  borderRadius: '999px',
                  cursor:       'pointer',
                  background:   i === activeIndex ? 'var(--gold)' : 'rgba(255,255,255,0.35)',
                  transition:   'width 320ms ease, background 320ms ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom-right DISCOVER IT */}
        <div
          className="absolute bottom-6 right-4 sm:bottom-10 sm:right-10 lg:bottom-14 lg:right-12"
          style={{ zIndex: 60 }}
        >
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onDiscover?.(); }}
            className="flex items-center gap-2"
            style={{
              fontFamily:    "'Anton', sans-serif",
              fontSize:      isMobile ? '20px' : breakpoint === 'laptop' ? 'clamp(22px, 2.8vw, 38px)' : 'clamp(26px, 3vw, 48px)',
              fontWeight:    400,
              color:         'white',
              opacity:       0.95,
              letterSpacing: '-0.02em',
              lineHeight:    1,
              textTransform: 'uppercase',
              textDecoration:'none',
              transition:    'opacity 200ms',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.95'; }}
          >
            DISCOVER IT
            <ArrowRight strokeWidth={2.25} style={{ width: isMobile ? '18px' : '26px', height: isMobile ? '18px' : '26px' }} />
          </a>
        </div>

      </div>
    </div>
  );
}
