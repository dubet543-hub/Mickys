import { useEffect, useMemo, useState } from 'react';
import { ShoppingCart, Search } from 'lucide-react';
import { api } from '../api.js';
import { inr, date, ORDER_STATUSES } from '../lib/format.js';
import { Spinner, ErrorNote, StatusBadge, EmptyState, Modal } from '../components/ui.jsx';

export function Orders() {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  function load() {
    setError('');
    api.get('/orders')
      .then((d) => setOrders(d.orders))
      .catch((e) => setError(e.message));
  }
  useEffect(load, []);

  const filtered = useMemo(() => {
    if (!orders) return [];
    return orders.filter((o) => {
      if (filter !== 'all' && o.orderStatus !== filter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        o.orderId?.toLowerCase().includes(q) ||
        o.user?.name?.toLowerCase().includes(q) ||
        o.user?.email?.toLowerCase().includes(q)
      );
    });
  }, [orders, query, filter]);

  if (error) return <ErrorNote message={error} />;
  if (!orders) return <Spinner />;

  return (
    <div className="stack">
      <div className="toolbar">
        <div className="search">
          <Search size={16} />
          <input placeholder="Search order ID, name or email" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All statuses</option>
          {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={ShoppingCart} title="No orders found" sub="Orders placed on the storefront appear here." />
      ) : (
        <div className="card no-pad">
          <table className="table">
            <thead>
              <tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th>Date</th></tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o._id} className="row-click" onClick={() => setSelected(o)}>
                  <td className="mono">{o.orderId}</td>
                  <td>
                    <strong>{o.user?.name}</strong>
                    <small className="muted block">{o.user?.email}</small>
                  </td>
                  <td>{o.items?.length || 0}</td>
                  <td>{inr(o.total)}</td>
                  <td><StatusBadge value={o.paymentStatus} /></td>
                  <td><StatusBadge value={o.orderStatus} /></td>
                  <td className="muted">{date(o.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <OrderModal
          order={selected}
          onClose={() => setSelected(null)}
          onUpdated={(updated) => {
            setOrders((list) => list.map((o) => (o._id === updated._id ? updated : o)));
            setSelected(updated);
          }}
        />
      )}
    </div>
  );
}

function OrderModal({ order, onClose, onUpdated }) {
  const [status, setStatus] = useState(order.orderStatus);
  const [tracking, setTracking] = useState(order.trackingNumber || '');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function save() {
    setBusy(true);
    setError('');
    try {
      const { order: updated } = await api.put(`/orders/${order._id}/status`, {
        orderStatus: status,
        trackingNumber: tracking,
        note,
      });
      onUpdated(updated);
      setNote('');
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal title={`Order ${order.orderId}`} onClose={onClose} wide>
      <div className="order-grid">
        <section>
          <h3 className="sub">Items</h3>
          <ul className="item-list">
            {order.items?.map((it, i) => (
              <li key={i}>
                <span>{it.name} <small className="muted">× {it.qty}</small></span>
                <span>{inr(it.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="totals">
            <div><span>Subtotal</span><span>{inr(order.subtotal)}</span></div>
            {order.discount > 0 && <div><span>Discount</span><span>−{inr(order.discount)}</span></div>}
            <div><span>Shipping</span><span>{inr(order.shippingCost)}</span></div>
            <div className="grand"><span>Total</span><span>{inr(order.total)}</span></div>
          </div>
        </section>

        <section>
          <h3 className="sub">Customer</h3>
          <p className="kv"><b>{order.user?.name}</b></p>
          <p className="kv muted">{order.user?.email}</p>
          {order.user?.phone && <p className="kv muted">{order.user.phone}</p>}

          <h3 className="sub mt">Shipping</h3>
          {order.shipping ? (
            <p className="kv muted">
              {order.shipping.line1}{order.shipping.line2 ? `, ${order.shipping.line2}` : ''}<br />
              {order.shipping.city}, {order.shipping.state} {order.shipping.pincode}
            </p>
          ) : <p className="kv muted">—</p>}

          <h3 className="sub mt">Payment</h3>
          <p className="kv">
            {order.paymentMethod?.toUpperCase()} · <StatusBadge value={order.paymentStatus} />
          </p>
        </section>
      </div>

      <div className="divider" />

      <h3 className="sub">Update status</h3>
      <ErrorNote message={error} />
      <div className="update-row">
        <label className="field">
          <span>Order status</span>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label className="field">
          <span>Tracking number</span>
          <input value={tracking} onChange={(e) => setTracking(e.target.value)} placeholder="Optional" />
        </label>
      </div>
      <label className="field">
        <span>Note (sent in status email)</span>
        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional note" />
      </label>

      {order.statusHistory?.length > 0 && (
        <>
          <h3 className="sub mt">History</h3>
          <ul className="history">
            {order.statusHistory.map((h, i) => (
              <li key={i}>
                <StatusBadge value={h.status} />
                {h.note && <span className="muted"> — {h.note}</span>}
                <span className="muted block">{date(h.updatedAt)}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="modal-actions">
        <button className="btn" onClick={onClose}>Close</button>
        <button className="btn btn-primary" onClick={save} disabled={busy}>
          {busy ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </Modal>
  );
}
