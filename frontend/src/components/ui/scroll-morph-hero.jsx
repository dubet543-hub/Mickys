// components/ui/scroll-morph-hero.jsx
// Adapted for Micky's by CP Food — JSX (no TypeScript required)

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

/* ─── FlipCard ─── */
function FlipCard({ src, index, target, cardW, cardH }) {
  return (
    <motion.div
      animate={{
        x:       target.x,
        y:       target.y,
        rotate:  target.rotation,
        scale:   target.scale,
        opacity: target.opacity,
      }}
      transition={{ type: "spring", stiffness: 40, damping: 15 }}
      style={{
        position:       "absolute",
        width:          cardW,
        height:         cardH,
        transformStyle: "preserve-3d",
        perspective:    "1000px",
      }}
      className="cursor-pointer group"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        {/* Front face — product photo */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg"
          style={{ backfaceVisibility: "hidden", background: "#f3bb16" }}
        >
          <img
            src={src}
            alt={`micky-product-${index}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
          <div
            className="absolute bottom-0 left-0 right-0 px-1 py-0.5 text-center"
            style={{ background: "rgba(111,14,19,0.82)" }}
          >
            <p className="text-[6px] font-bold tracking-widest" style={{ color: "#f3bb16" }}>
              MICKY'S
            </p>
          </div>
        </div>

        {/* Back face — brand info */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg flex flex-col items-center justify-center p-2"
          style={{
            backfaceVisibility: "hidden",
            transform:          "rotateY(180deg)",
            background:         "#6f0e13",
            border:             "1.5px solid #f3bb16",
          }}
        >
          <p className="text-[7px] font-bold uppercase tracking-widest mb-1" style={{ color: "#f3bb16" }}>
            Micky's
          </p>
          <p className="text-[9px] font-medium text-white text-center leading-tight">
            Ready to Cook
          </p>
          <div className="mt-1 w-4 border-t" style={{ borderColor: "#f3bb16", opacity: 0.5 }} />
          <p className="text-[7px] mt-1" style={{ color: "#f3bb16", opacity: 0.8 }}>
            Explore →
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Constants ─── */
const TOTAL_IMAGES = 20;
const MAX_SCROLL   = 3000;

const RAW_PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&q=80",
  "https://images.unsplash.com/photo-1574484284002-952d92456975?w=300&q=80",
  "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=300&q=80",
  "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&q=80",
  "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=300&q=80",
  "https://images.unsplash.com/photo-1627662168223-7df99068099a?w=300&q=80",
  "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=300&q=80",
  "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=300&q=80",
  "https://images.unsplash.com/photo-1597850688756-1b057b1b971e?w=300&q=80",
  "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300&q=80",
  "https://images.unsplash.com/photo-1555244162-803834f70033?w=300&q=80",
  "https://images.unsplash.com/photo-1604908177522-040e1ba5a691?w=300&q=80",
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&q=80",
  "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&q=80",
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&q=80",
  "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&q=80",
  "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=300&q=80",
  "https://images.unsplash.com/photo-1509358271058-acd22cc93c2b?w=300&q=80",
  "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=300&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&q=80",
];

const IMAGES = RAW_PRODUCT_IMAGES.slice(0, TOTAL_IMAGES);

const lerp = (a, b, t) => a * (1 - t) + b * t;

/* ─── Responsive breakpoints ─── */
function getBreakpoint(width) {
  if (width < 640)  return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

/* ─── Main component ─── */
export default function ScrollMorphHero({ onExplore }) {
  const [introPhase,    setIntroPhase]    = useState("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setContainerSize({ width, height });
    });
    ro.observe(el);
    setContainerSize({ width: el.offsetWidth, height: el.offsetHeight });
    return () => ro.disconnect();
  }, []);

  /* Virtual scroll (wheel + touch — trapped inside the hero) */
  const virtualScroll = useMotionValue(0);
  const scrollRef     = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      e.preventDefault();
      const next = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
      scrollRef.current = next;
      virtualScroll.set(next);
    };

    let touchY = 0;
    const onTouchStart = (e) => { touchY = e.touches[0].clientY; };
    const onTouchMove  = (e) => {
      const delta = touchY - e.touches[0].clientY;
      touchY = e.touches[0].clientY;
      const next = Math.min(Math.max(scrollRef.current + delta, 0), MAX_SCROLL);
      scrollRef.current = next;
      virtualScroll.set(next);
    };

    el.addEventListener("wheel",      onWheel,      { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove",  onTouchMove,  { passive: false });
    return () => {
      el.removeEventListener("wheel",      onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove",  onTouchMove);
    };
  }, [virtualScroll]);

  /* Morph: circle → bottom arc (scroll 0–600) */
  const morphProgress = useTransform(virtualScroll, [0, 600],   [0, 1]);
  const smoothMorph   = useSpring(morphProgress,    { stiffness: 40, damping: 20 });

  /* Shuffle: arc rotation (scroll 600–3000) */
  const scrollRotate  = useTransform(virtualScroll, [600, 3000], [0, 360]);
  const smoothRotate  = useSpring(scrollRotate,     { stiffness: 40, damping: 20 });

  /* Mouse parallax */
  const mouseX      = useMotionValue(0);
  const smoothMouse = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const norm = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseX.set(norm * 100);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mouseX]);

  /* Intro sequence: scatter → line → circle */
  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase("line"),   500);
    const t2 = setTimeout(() => setIntroPhase("circle"), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const scatterPos = useMemo(() =>
    IMAGES.map(() => ({
      x:        (Math.random() - 0.5) * 1500,
      y:        (Math.random() - 0.5) * 1000,
      rotation: (Math.random() - 0.5) * 180,
      scale:    0.6,
      opacity:  0,
    })),
  []);

  const [morphVal,    setMorphVal]    = useState(0);
  const [rotateVal,   setRotateVal]   = useState(0);
  const [parallaxVal, setParallaxVal] = useState(0);

  useEffect(() => {
    const u1 = smoothMorph.on("change",  setMorphVal);
    const u2 = smoothRotate.on("change", setRotateVal);
    const u3 = smoothMouse.on("change",  setParallaxVal);
    return () => { u1(); u2(); u3(); };
  }, [smoothMorph, smoothRotate, smoothMouse]);

  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
  const contentY       = useTransform(smoothMorph, [0.8, 1], [20, 0]);

  /* ─── Responsive config derived from container width ─── */
  const bp = getBreakpoint(containerSize.width);

  const cardW = bp === "mobile" ? 42 : bp === "tablet" ? 52 : 58;
  const cardH = bp === "mobile" ? 60 : bp === "tablet" ? 74 : 82;

  const heroTextW   = bp === "mobile" ? "80vw" : bp === "tablet" ? "340px" : "320px";
  const heroTextTop = bp === "mobile" ? "44%" : bp === "desktop" ? "53%" : "50%";

  /* Arc content top — pushed lower on desktop so it clears the circle */
  const arcContentTop = bp === "mobile" ? "6%" : bp === "tablet" ? "5%" : "4%";

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{ background: "#6f0e13", paddingTop: bp === "desktop" ? "74px" : "60px" }}
    >
      <div
        className="flex h-full w-full flex-col items-center justify-center"
        style={{ perspective: "1000px" }}
      >

        {/* ── Initial hero text ── */}
        <div
          className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none -translate-y-1/2"
          style={{ width: heroTextW, top: heroTextTop }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={
              introPhase === "circle" && morphVal < 0.5
                ? { opacity: 1 - morphVal * 2, y: 0, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(10px)" }
            }
            transition={{ duration: 1 }}
            style={{
              color:      "#ffffff",
              fontFamily: "Georgia, serif",
              fontSize:   bp === "mobile" ? "clamp(1.4rem, 6vw, 1.9rem)" : bp === "tablet" ? "clamp(1.8rem, 4vw, 2.4rem)" : "clamp(1.6rem, 2.2vw, 2.2rem)",
              fontWeight: 600,
              lineHeight: 1.25,
            }}
          >
            India's First Convenient Cooking Brand.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={
              introPhase === "circle" && morphVal < 0.5
                ? { opacity: 0.7 - morphVal }
                : { opacity: 0 }
            }
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              marginTop:     "1rem",
              fontSize:      "0.7rem",
              fontWeight:    700,
              letterSpacing: "0.2em",
              color:         "#f3bb16",
            }}
          >
            SCROLL TO EXPLORE
          </motion.p>
        </div>

        {/* ── Arc content (revealed after morph) ── */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY, top: arcContentTop }}
          className="absolute z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4 w-full"
        >
          <p
            style={{
              fontSize:      "0.7rem",
              fontWeight:    700,
              letterSpacing: "0.18em",
              marginBottom:  "0.5rem",
              textTransform: "uppercase",
              color:         "#f3bb16",
            }}
          >
            Our Range
          </p>
          <h2
            style={{
              color:      "#ffffff",
              fontFamily: "Georgia, serif",
              fontSize:   bp === "mobile" ? "clamp(1.4rem, 6vw, 1.9rem)" : bp === "tablet" ? "clamp(1.8rem, 3.5vw, 2.6rem)" : "clamp(1.8rem, 2.8vw, 3rem)",
              fontWeight: 600,
              marginBottom: "0.5rem",
              lineHeight:  1.2,
            }}
          >
            Explore Our Products
          </h2>
          {bp !== "mobile" && (
            <p
              style={{
                color:      "rgba(255,255,255,0.8)",
                fontSize:   bp === "tablet" ? "0.85rem" : "0.95rem",
                lineHeight: 1.6,
                maxWidth:   bp === "tablet" ? "360px" : "480px",
              }}
            >
              Authentic gravies, pastes &amp; pulses — crafted with real ingredients,
              ready in minutes for homes and professional kitchens.
            </p>
          )}

          {onExplore && (
            <motion.button
              style={{
                opacity:       contentOpacity,
                pointerEvents: "auto",
                background:    "#f3bb16",
                color:         "#6f0e13",
                border:        "1.5px solid #f3bb16",
                marginTop:     bp === "mobile" ? "0.75rem" : "1.25rem",
                padding:       bp === "mobile" ? "10px 24px" : "12px 32px",
                borderRadius:  "999px",
                fontSize:      bp === "mobile" ? "0.78rem" : "0.875rem",
                fontWeight:    700,
                letterSpacing: "0.05em",
                cursor:        "pointer",
              }}
              onClick={onExplore}
              whileHover={{ scale: 1.05, background: "#fcd34f" }}
              whileTap={{ scale: 0.97 }}
            >
              Shop Now →
            </motion.button>
          )}
        </motion.div>

        {/* ── Flip cards ── */}
        <div className="relative flex items-center justify-center w-full h-full">
          {IMAGES.map((src, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (introPhase === "scatter") {
              target = scatterPos[i];

            } else if (introPhase === "line") {
              const spacing = bp === "mobile" ? 52 : bp === "tablet" ? 60 : 70;
              const totalW  = TOTAL_IMAGES * spacing;
              target = { x: i * spacing - totalW / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };

            } else {
              const minDim = Math.min(containerSize.width, containerSize.height);

              /* Circle radius — based on effective height so cards never crowd the nav */
              const circleR = bp === "mobile"
                ? Math.min(minDim * 0.28, 130)
                : bp === "tablet"
                  ? Math.min(minDim * 0.30, 210)
                  : Math.min(containerSize.height * 0.36, 280);

              /* Shift circle down on desktop so top cards have breathing room from nav */
              const circleOffsetY = bp === "desktop" ? containerSize.height * 0.05 : 0;

              const cAngle  = (i / TOTAL_IMAGES) * 360;
              const cRad    = (cAngle * Math.PI) / 180;
              const circlePos = {
                x:        Math.cos(cRad) * circleR,
                y:        Math.sin(cRad) * circleR + circleOffsetY,
                rotation: cAngle + 90,
              };

              /* Arc radius */
              const baseR      = Math.min(containerSize.width, containerSize.height * 1.5);
              const arcRFactor = bp === "mobile" ? 1.2 : bp === "tablet" ? 1.15 : 1.1;
              const arcR       = baseR * arcRFactor;

              /* Arc apex — lower on mobile so it clears the text block */
              const apexFactor = bp === "mobile" ? 0.42 : bp === "tablet" ? 0.32 : 0.25;
              const arcApexY   = containerSize.height * apexFactor;
              const arcCenterY = arcApexY + arcR;

              /* Spread angle */
              const spread     = bp === "mobile" ? 85 : bp === "tablet" ? 110 : 130;
              const startAngle = -90 - spread / 2;
              const step       = spread / (TOTAL_IMAGES - 1);

              const scrollProg = Math.min(Math.max(rotateVal / 360, 0), 1);
              const boundedRot = -scrollProg * spread * 0.8;
              const curAngle   = startAngle + i * step + boundedRot;
              const aRad       = (curAngle * Math.PI) / 180;

              /* Card scale in arc */
              const arcScale = bp === "mobile" ? 1.1 : bp === "tablet" ? 1.4 : 1.8;

              const arcPos = {
                x:        Math.cos(aRad) * arcR + (bp === "mobile" ? 0 : parallaxVal),
                y:        Math.sin(aRad) * arcR + arcCenterY,
                rotation: curAngle + 90,
                scale:    arcScale,
              };

              target = {
                x:        lerp(circlePos.x,        arcPos.x,        morphVal),
                y:        lerp(circlePos.y,        arcPos.y,        morphVal),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphVal),
                scale:    lerp(1,                  arcPos.scale,    morphVal),
                opacity:  1,
              };
            }

            return (
              <FlipCard
                key={i}
                src={src}
                index={i}
                target={target}
                cardW={cardW}
                cardH={cardH}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
}
