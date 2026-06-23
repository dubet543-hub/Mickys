import { useState, useEffect } from 'react';
import 'lenis/dist/lenis.css';
import { PRODUCTS, BUNDLES } from './data/siteData';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useLenis } from './hooks/useLenis';
import { readStoredCart, upsertCartItem } from './utils/cart';
import { Loader } from './components/OverlayEffects';
import { Header, MobileMenu } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/AboutPage';
import { RushHourPage } from './pages/RushHourPage';
import { RecipesPage } from './pages/RecipesPage';
import { ContactPage } from './pages/ContactPage';
import { ProductPage } from './pages/ProductPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ShippingPolicyPage } from './pages/ShippingPolicyPage';
import { ReturnsPage } from './pages/ReturnsPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { CookiesPage } from './pages/CookiesPage';
import { PlanBPage } from './pages/PlanBPage';

export default function App() {
  useScrollReveal();
  useLenis();

  const [view, setView] = useState({ name: 'home' });
  const [cart, setCart] = useState(() => readStoredCart());
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 0 && subtotal < 499 ? 49 : 0;
  const total = subtotal + shipping;

  function navigate(nextView) {
    setView(nextView);
    setMenuOpen(false);
    // record the page in browser history so Back/Forward buttons work
    window.history.pushState({ view: nextView }, '');
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0, behavior: 'auto' });
  }

  // Keep the view in sync with the browser Back/Forward buttons.
  useEffect(() => {
    // seed the first history entry with the current view
    window.history.replaceState({ view }, '');

    function handlePopState(e) {
      const nextView = (e.state && e.state.view) || { name: 'home' };
      setView(nextView);
      setMenuOpen(false);
      if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
      else window.scrollTo({ top: 0, behavior: 'auto' });
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function saveCart(nextCart) {
    setCart(nextCart);
    localStorage.setItem('mickys_cart', JSON.stringify(nextCart));
  }

  function addToCart(product, qty = 1) {
    const nextCart = upsertCartItem(cart, product, qty);
    saveCart(nextCart);
    setCartOpen(true);
  }

  function updateQty(id, delta) {
    const nextCart = cart
      .map((item) => (item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item))
      .filter((item) => item.qty > 0);
    saveCart(nextCart);
  }

  function clearCart() {
    saveCart([]);
  }

  const selectedProduct = view.name === 'product'
    ? [...BUNDLES, ...PRODUCTS].find((product) => product.id === view.productId) || PRODUCTS[0]
    : null;

  return (
    <>
      {!loaderDone && <Loader onDone={() => setLoaderDone(true)} />}

      <Header
        solid={view.name !== 'home'}
        cartCount={cartCount}
        menuOpen={menuOpen}
        onCart={() => setCartOpen(true)}
        onHome={() => navigate({ name: 'home' })}
        onMenu={() => setMenuOpen((open) => !open)}
        onNavigate={navigate}
      />

      {menuOpen && <MobileMenu onNavigate={navigate} />}

      <ErrorBoundary>
      {view.name === 'home' && (
        <HomePage
          onNavigate={navigate}
        />
      )}

      {view.name === 'products' && (
        <ProductsPage
          addToCart={addToCart}
          onProduct={(productId) => navigate({ name: 'product', productId })}
        />
      )}

      {view.name === 'about' && <AboutPage />}

      {view.name === 'rushhour' && (
        <RushHourPage onNavigate={navigate} addToCart={addToCart} />
      )}

      {view.name === 'recipes' && <RecipesPage />}

      {view.name === 'shipping' && <ShippingPolicyPage />}

      {view.name === 'returns' && <ReturnsPage />}

      {view.name === 'terms' && <TermsPage />}

      {view.name === 'privacy' && <PrivacyPage />}

      {view.name === 'cookies' && <CookiesPage />}

      {view.name === 'planb' && <PlanBPage />}

      {view.name === 'contact' && <ContactPage />}

      {view.name === 'product' && selectedProduct && (
        <ProductPage
          product={selectedProduct}
          addToCart={addToCart}
          onBack={() => navigate({ name: 'home' })}
          onCheckout={() => navigate({ name: 'checkout' })}
          onProduct={(productId) => navigate({ name: 'product', productId })}
        />
      )}

      {view.name === 'checkout' && (
        <CheckoutPage
          cart={cart}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          clearCart={clearCart}
          onBack={() => navigate({ name: 'home' })}
        />
      )}
      </ErrorBoundary>

      <Footer onNavigate={navigate} />

      <CartDrawer
        cart={cart}
        open={cartOpen}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        updateQty={updateQty}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false);
          navigate({ name: 'checkout' });
        }}
      />
    </>
  );
}
