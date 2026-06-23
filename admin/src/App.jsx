import { useState } from 'react';
import {
  LayoutDashboard, ShoppingCart, Package, Users, LogOut, Menu, X,
} from 'lucide-react';
import { useAuth } from './context/AuthContext.jsx';
import { Spinner } from './components/ui.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Orders } from './pages/Orders.jsx';
import { Products } from './pages/Products.jsx';
import { Customers } from './pages/Customers.jsx';

const NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, Comp: Dashboard },
  { key: 'orders', label: 'Orders', icon: ShoppingCart, Comp: Orders },
  { key: 'products', label: 'Products', icon: Package, Comp: Products },
  { key: 'customers', label: 'Customers', icon: Users, Comp: Customers },
];

export default function App() {
  const { user, loading, logout } = useAuth();
  const [view, setView] = useState('dashboard');
  const [navOpen, setNavOpen] = useState(false);

  if (loading) {
    return <div className="boot"><Spinner label="Starting admin…" /></div>;
  }

  if (!user) return <LoginPage />;

  const active = NAV.find((n) => n.key === view) || NAV[0];
  const ActiveComp = active.Comp;

  return (
    <div className="shell">
      <aside className={`sidebar ${navOpen ? 'open' : ''}`}>
        <div className="brand">
          <span className="brand-mark">M</span>
          <div>
            <strong>Micky's</strong>
            <small>Admin</small>
          </div>
        </div>

        <nav className="nav">
          {NAV.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className={`nav-link ${key === view ? 'active' : ''}`}
              onClick={() => { setView(key); setNavOpen(false); }}
            >
              <Icon size={18} /> {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-foot">
          <div className="who">
            <span className="avatar">{user.name?.[0]?.toUpperCase() || 'A'}</span>
            <div>
              <strong>{user.name}</strong>
              <small>{user.email}</small>
            </div>
          </div>
          <button className="nav-link logout" onClick={logout}>
            <LogOut size={18} /> Sign out
          </button>
        </div>
      </aside>

      {navOpen && <div className="scrim" onClick={() => setNavOpen(false)} />}

      <main className="content">
        <header className="topbar">
          <button className="icon-btn mobile-only" onClick={() => setNavOpen((o) => !o)} aria-label="Menu">
            {navOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1>{active.label}</h1>
        </header>
        <div className="page">
          <ActiveComp onNavigate={setView} />
        </div>
      </main>
    </div>
  );
}
