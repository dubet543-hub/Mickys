import { useEffect, useState } from 'react';
import {
  TrendingUp, ShoppingCart, Package, Users, AlertTriangle, IndianRupee,
} from 'lucide-react';
import { api } from '../api.js';
import { inr, date, STATUS_TONE } from '../lib/format.js';
import { Spinner, ErrorNote, StatusBadge } from '../components/ui.jsx';

function StatCard({ icon: Icon, label, value, tone }) {
  return (
    <div className="stat-card">
      <span className={`stat-ic tone-${tone}`}><Icon size={20} /></span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

/* Lightweight bar chart for 7-day revenue — no chart library needed. */
function RevenueChart({ data }) {
  const max = Math.max(1, ...data.map((d) => d.total));
  return (
    <div className="card">
      <h2 className="card-title">Revenue · last 7 days</h2>
      <div className="bars">
        {data.map((d) => (
          <div className="bar-col" key={d.date}>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{ height: `${(d.total / max) * 100}%` }}
                title={inr(d.total)}
              />
            </div>
            <small>{new Date(d.date).toLocaleDateString('en-IN', { weekday: 'short' })}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Dashboard({ onNavigate }) {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/admin/stats')
      .then((d) => setStats(d.stats))
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <ErrorNote message={error} />;
  if (!stats) return <Spinner />;

  return (
    <div className="stack">
      <div className="stat-grid">
        <StatCard icon={IndianRupee} tone="green" label="Revenue (paid)" value={inr(stats.revenue)} />
        <StatCard icon={ShoppingCart} tone="blue" label="Total orders" value={stats.totalOrders} />
        <StatCard icon={Package} tone="violet" label="Products" value={stats.totalProducts} />
        <StatCard icon={Users} tone="amber" label="Customers" value={stats.totalCustomers} />
      </div>

      <div className="two-col">
        <RevenueChart data={stats.revenueByDay} />

        <div className="card">
          <h2 className="card-title">Orders by status</h2>
          <ul className="status-list">
            {Object.entries(stats.statusCounts).length === 0 && <li className="muted">No orders yet.</li>}
            {Object.entries(stats.statusCounts).map(([status, count]) => (
              <li key={status}>
                <StatusBadge value={status} />
                <span>{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-head">
            <h2 className="card-title">Recent orders</h2>
            <button className="link-btn" onClick={() => onNavigate('orders')}>View all</button>
          </div>
          {stats.recentOrders.length === 0 ? (
            <p className="muted">No orders yet.</p>
          ) : (
            <table className="table compact">
              <thead>
                <tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((o) => (
                  <tr key={o._id}>
                    <td className="mono">{o.orderId}</td>
                    <td>{o.user?.name}</td>
                    <td>{inr(o.total)}</td>
                    <td><StatusBadge value={o.orderStatus} /></td>
                    <td className="muted">{date(o.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="card">
          <h2 className="card-title"><AlertTriangle size={16} /> Low stock</h2>
          {stats.lowStock.length === 0 ? (
            <p className="muted">All products well stocked.</p>
          ) : (
            <ul className="lowstock-list">
              {stats.lowStock.map((p) => (
                <li key={p._id}>
                  <span>{p.name}</span>
                  <span className={`stock-pill ${p.stock === 0 ? 'out' : 'low'}`}>
                    {p.stock === 0 ? 'Out of stock' : `${p.stock} left`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
