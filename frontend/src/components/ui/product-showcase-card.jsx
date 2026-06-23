// components/ui/product-showcase-card.jsx
// Premium animated product card for Micky's by CP Food.
// Framer-motion: staggered entrance, hover lift, gold glow, floating pouch,
// diagonal shine sweep, and an animated CTA. Brand palette + Gilroy/headline fonts.

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const WINE = '#6f0e13';
const GOLD = '#f3bb16';

const EASE = [0.16, 1, 0.3, 1];

export function ProductShowcaseCard({ product, index = 0, onView }) {
  const hasMrp = product.mrp && product.mrp > product.price;
  const saving = hasMrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  return (
    <motion.article
      className="group relative flex flex-col overflow-hidden rounded-[22px]"
      style={{
        background: '#ffffff',
        border: '1px solid rgba(111,14,19,0.10)',
      }}
      initial={{ opacity: 0, y: 46 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.09, ease: EASE }}
      whileHover="hover"
      variants={{
        hover: {
          y: -10,
          boxShadow: '0 28px 64px rgba(111,14,19,0.22)',
          borderColor: 'rgba(243,187,22,0.55)',
        },
      }}
      animate={{ boxShadow: '0 6px 26px rgba(111,14,19,0.08)' }}
    >
      {/* Top accent line that grows on hover */}
      <motion.div
        className="absolute left-0 right-0 top-0 z-20 h-[3px] origin-left"
        style={{ background: `linear-gradient(90deg, ${GOLD}, ${WINE})` }}
        initial={{ scaleX: 0 }}
        variants={{ hover: { scaleX: 1 } }}
        transition={{ duration: 0.5, ease: EASE }}
      />

      {/* ── Image panel ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #fff8e8 0%, #fbe7b8 100%)' }}
      >
        {/* Radial gold glow (hover) */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(circle at 50% 48%, rgba(243,187,22,0.6), transparent 62%)' }}
          initial={{ opacity: 0 }}
          variants={{ hover: { opacity: 1 } }}
          transition={{ duration: 0.4 }}
        />

        {/* Category badge */}
        <span
          className="absolute left-3.5 top-3.5 z-20 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em]"
          style={{ background: GOLD, color: WINE }}
        >
          {product.category}
        </span>

        {/* Saving badge */}
        {saving > 0 && (
          <span
            className="absolute right-3.5 top-3.5 z-20 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide"
            style={{ background: WINE, color: '#fff' }}
          >
            -{saving}%
          </span>
        )}

        {/* Floating pouch */}
        <motion.div
          className="relative z-10 flex h-[230px] items-center justify-center px-6 pt-7 pb-2"
          variants={{ hover: { scale: 1.07 } }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <motion.img
            src={product.image}
            alt={product.name}
            className="h-full w-auto object-contain"
            style={{ filter: 'drop-shadow(0 20px 24px rgba(111,14,19,0.30))' }}
            draggable={false}
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 4 + (index % 4) * 0.3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Diagonal shine sweep (hover) */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20"
          style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.55) 50%, transparent 65%)' }}
          initial={{ x: '-130%' }}
          variants={{ hover: { x: '130%' } }}
          transition={{ duration: 0.85, ease: 'easeInOut' }}
        />
      </div>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col p-5">
        {/* In stock */}
        <div className="mb-2 flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: '#2a7a2a' }}>
            In Stock
          </span>
        </div>

        <h3
          className="mb-1.5 text-[1.2rem] leading-tight"
          style={{ fontFamily: 'var(--font-headline)', color: WINE, fontWeight: 700 }}
        >
          {product.name}
        </h3>

        <p
          className="line-clamp-2 text-[0.86rem] leading-relaxed"
          style={{ color: '#8a5a5e' }}
        >
          {product.description}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-4">
          <div
            className="mb-3 flex items-end gap-2 border-t pt-3"
            style={{ borderColor: 'rgba(111,14,19,0.10)' }}
          >
            <div className="flex flex-col leading-none">
              <span className="mb-1 text-[0.68rem] font-semibold uppercase tracking-wide" style={{ color: '#a8787c' }}>
                From
              </span>
              <span className="text-[1.35rem] font-black" style={{ color: WINE, lineHeight: 1 }}>
                Rs. {product.price.toLocaleString('en-IN')}
              </span>
            </div>
            {hasMrp && (
              <span className="mb-0.5 text-[0.82rem] line-through" style={{ color: '#bda0a3' }}>
                Rs. {product.mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onView}
            className="flex w-full items-center justify-center gap-2 rounded-full py-3 text-[0.78rem] font-extrabold uppercase tracking-[0.06em] text-white transition-colors duration-200"
            style={{ background: WINE }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#530a0e'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = WINE; }}
          >
            View Details
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default ProductShowcaseCard;
