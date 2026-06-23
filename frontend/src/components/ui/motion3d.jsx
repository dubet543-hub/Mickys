import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

/*
  motion3d — shared scroll + 3D-tilt primitives used across the Home page.
  Everything degrades to a static render when the user prefers reduced motion.
*/

const EASE = [0.22, 1, 0.36, 1];

/* Scroll-reveal wrapper: fades + rises (with a subtle 3D lift) as it enters view. */
export function Reveal({
  children,
  className,
  as = 'div',
  y = 36,
  delay = 0,
  duration = 0.7,
  style,
  ...rest
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;

  return (
    <Tag
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Stagger container — children fade up one after another. */
export function RevealGroup({ children, className, stagger = 0.1, style }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-70px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, y = 30, style, ...rest }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: reduce ? {} : { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/*
  useEntrance — scroll-in entrance props for any motion element. Combine with
  useTilt on the same element (entrance animates opacity/y, tilt animates rotate).
*/
export function useEntrance(delay = 0, y = 30) {
  const reduce = useReducedMotion();
  return {
    initial: reduce ? false : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.6, delay, ease: EASE },
  };
}

/*
  useTilt — pointer-driven 3D tilt for a single card. Returns props to spread
  onto a `motion.*` element. Call once per card component (not inside a loop).
*/
export function useTilt({ max = 9, scale = 1.02 } = {}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 160, damping: 18 });
  const sy = useSpring(py, { stiffness: 160, damping: 18 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);

  const onMouseMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onMouseLeave = () => {
    px.set(0);
    py.set(0);
  };

  return {
    ref,
    onMouseMove,
    onMouseLeave,
    whileHover: reduce ? undefined : { scale },
    style: {
      rotateX: reduce ? 0 : rotateX,
      rotateY: reduce ? 0 : rotateY,
      transformStyle: 'preserve-3d',
      transformPerspective: 900,
    },
  };
}

export { motion };
