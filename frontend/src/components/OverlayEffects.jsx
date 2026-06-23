import { useEffect } from 'react';
import mickysLogo from '../assets/mickys-logo-brand.png';

export function Loader({ onDone }) {
  useEffect(() => {
    const timeout = window.setTimeout(onDone, 1500);
    return () => window.clearTimeout(timeout);
  }, [onDone]);

  return (
    <div className="loader" role="status" aria-label="Loading Micky's website">
      <div className="loaderInner">
        <img className="loaderLogo" src={mickysLogo} alt="Micky's by CP Food" />
        <div className="loaderBar" aria-hidden="true">
          <span />
        </div>
        <p>Rasoi Ki Taiyaari, Micky's Ki Zimmedari</p>
      </div>
    </div>
  );
}

export function CustomCursor() {
  useEffect(() => {
    const cursor = document.querySelector('.cursor');
    const ring = document.querySelector('.cursorRing');
    if (!cursor || !ring || window.matchMedia('(pointer: coarse)').matches) return undefined;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let frame = 0;
    const interactive = 'a, button, .productCard, .homeProductCard, .recipeCard, .featureCard';

    /* Use transform (GPU-composited) instead of left/top so pointer moves
       never trigger a layout reflow. The dot tracks the cursor instantly;
       the ring is lerped on the rAF loop below. */
    function move(event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }

    function animate() {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      frame = window.requestAnimationFrame(animate);
    }

    function over(event) {
      if (!event.target.closest(interactive)) return;
      cursor.classList.add('hover');
      ring.classList.add('hover');
    }

    function out(event) {
      if (!event.target.closest(interactive)) return;
      cursor.classList.remove('hover');
      ring.classList.remove('hover');
    }

    document.addEventListener('pointermove', move);
    document.addEventListener('pointerover', over);
    document.addEventListener('pointerout', out);
    animate();

    return () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.removeEventListener('pointerout', out);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="cursor" aria-hidden="true" />
      <div className="cursorRing" aria-hidden="true" />
    </>
  );
}
