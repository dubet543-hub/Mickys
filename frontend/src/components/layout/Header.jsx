import { useEffect, useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import mickysLogo from '../../assets/mickys-logo-brand.png';

export function Header({ solid, cartCount, menuOpen, onCart, onHome, onMenu, onNavigate }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    function handleScroll() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setScrollProgress(Math.min(window.scrollY / 180, 1));
      });
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navStyle = {
    '--nav-progress': scrollProgress.toFixed(3),
  };

  return (
    <header className={`siteNav${solid ? ' siteNav--solid' : ''}`} style={navStyle}>
      <button className="brandButton" type="button" onClick={onHome} aria-label="Micky's home">
        <img src={mickysLogo} alt="Micky's by CP Food" />
      </button>
      <nav className="navLinks" aria-label="Main navigation">
        <button type="button" onClick={() => onNavigate({ name: 'products' })}>Products</button>
        <button type="button" onClick={() => onNavigate({ name: 'rushhour' })}>Rush Hour Ka Right Hand</button>
        <button type="button" onClick={() => onNavigate({ name: 'planb' })}>LPG Saver</button>
        <button type="button" onClick={() => onNavigate({ name: 'about' })}>About</button>
        <button type="button" onClick={() => onNavigate({ name: 'recipes' })}>Recipes</button>
        <button type="button" onClick={() => onNavigate({ name: 'contact' })}>Contact</button>
      </nav>
      <div className="navActions">
        <button className="iconButton" type="button" onClick={onCart} aria-label="Open cart">
          <ShoppingBag size={20} />
          {cartCount > 0 && <span className="cartBadge">{cartCount}</span>}
        </button>
        <button className="shopButton" type="button" onClick={() => onNavigate({ name: 'products' })}>
          Shop Now
        </button>
        <button
          className="iconButton menuButton"
          type="button"
          onClick={onMenu}
          aria-label="Toggle navigation menu"
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

export function MobileMenu({ onNavigate }) {
  return (
    <nav className="mobileMenu" id="mobile-menu" aria-label="Mobile navigation">
      <button type="button" onClick={() => onNavigate({ name: 'products' })}>Products</button>
      <button type="button" onClick={() => onNavigate({ name: 'rushhour' })}>Rush Hour Ka Right Hand</button>
      <button type="button" onClick={() => onNavigate({ name: 'planb' })}>LPG Saver</button>
      <button type="button" onClick={() => onNavigate({ name: 'about' })}>About</button>
      <button type="button" onClick={() => onNavigate({ name: 'recipes' })}>Recipes</button>
      <button type="button" onClick={() => onNavigate({ name: 'contact' })}>Contact</button>
    </nav>
  );
}
