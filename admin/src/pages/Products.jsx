import { useEffect, useState } from 'react';
import { Package, Plus, Pencil, Trash2, Search } from 'lucide-react';
import { api } from '../api.js';
import { inr, CATEGORIES } from '../lib/format.js';
import { Spinner, ErrorNote, EmptyState, Modal } from '../components/ui.jsx';

const BLANK = {
  name: '', slug: '', tagline: '', price: '', mrp: '', image: '',
  category: 'gravies', description: '', weight: '', serves: '', shelfLife: '',
  stock: 100, label: '', isActive: true, isFeatured: false,
};

const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function Products() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null); // product object or BLANK

  function load() {
    setError('');
    api.get('/admin/products')
      .then((d) => setProducts(d.products))
      .catch((e) => setError(e.message));
  }
  useEffect(load, []);

  async function remove(p) {
    if (!confirm(`Deactivate "${p.name}"? It will be hidden from the storefront.`)) return;
    try {
      await api.del(`/products/${p._id}`);
      load();
    } catch (e) {
      alert(e.message);
    }
  }

  if (error) return <ErrorNote message={error} />;
  if (!products) return <Spinner />;

  const filtered = products.filter((p) =>
    !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.category.includes(query.toLowerCase())
  );

  return (
    <div className="stack">
      <div className="toolbar">
        <div className="search">
          <Search size={16} />
          <input placeholder="Search products" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={() => setEditing(BLANK)}>
          <Plus size={18} /> Add product
        </button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Package} title="No products" sub="Add your first product to get started." />
      ) : (
        <div className="card no-pad">
          <table className="table">
            <thead>
              <tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Sold</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p._id}>
                  <td>
                    <div className="prod-cell">
                      {p.image && <img src={p.image} alt="" onError={(e) => { e.target.style.visibility = 'hidden'; }} />}
                      <div>
                        <strong>{p.name}</strong>
                        <small className="muted block">{p.weight || '—'}</small>
                      </div>
                    </div>
                  </td>
                  <td className="cap">{p.category}</td>
                  <td>{inr(p.price)} <small className="muted strike">{inr(p.mrp)}</small></td>
                  <td><span className={`stock-pill ${p.stock === 0 ? 'out' : p.stock <= 10 ? 'low' : 'ok'}`}>{p.stock}</span></td>
                  <td>{p.sold || 0}</td>
                  <td>{p.isActive ? <span className="badge badge-green">active</span> : <span className="badge badge-gray">inactive</span>}</td>
                  <td className="actions">
                    <button className="icon-btn" onClick={() => setEditing(p)} aria-label="Edit"><Pencil size={16} /></button>
                    <button className="icon-btn danger" onClick={() => remove(p)} aria-label="Delete"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <ProductForm
          initial={editing}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); load(); }}
        />
      )}
    </div>
  );
}

function ProductForm({ initial, onClose, onSaved }) {
  const isNew = !initial._id;
  const [form, setForm] = useState({ ...BLANK, ...initial });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  function set(key, value) {
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === 'name' && isNew) next.slug = slugify(value);
      return next;
    });
  }

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const payload = {
      ...form,
      price: Number(form.price),
      mrp: Number(form.mrp),
      stock: Number(form.stock),
      slug: form.slug || slugify(form.name),
    };
    try {
      if (isNew) await api.post('/products', payload);
      else await api.put(`/products/${form._id}`, payload);
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal title={isNew ? 'Add product' : `Edit ${initial.name}`} onClose={onClose} wide>
      <form onSubmit={submit} className="form-grid">
        <ErrorNote message={error} />

        <label className="field span2">
          <span>Name</span>
          <input value={form.name} onChange={(e) => set('name', e.target.value)} required />
        </label>
        <label className="field">
          <span>Slug</span>
          <input value={form.slug} onChange={(e) => set('slug', e.target.value)} required />
        </label>
        <label className="field">
          <span>Category</span>
          <select value={form.category} onChange={(e) => set('category', e.target.value)}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>

        <label className="field span2">
          <span>Tagline</span>
          <input value={form.tagline} onChange={(e) => set('tagline', e.target.value)} />
        </label>
        <label className="field">
          <span>Label (badge)</span>
          <input value={form.label} onChange={(e) => set('label', e.target.value)} placeholder="Bestseller" />
        </label>

        <label className="field">
          <span>Price (₹)</span>
          <input type="number" min="0" value={form.price} onChange={(e) => set('price', e.target.value)} required />
        </label>
        <label className="field">
          <span>MRP (₹)</span>
          <input type="number" min="0" value={form.mrp} onChange={(e) => set('mrp', e.target.value)} required />
        </label>
        <label className="field">
          <span>Stock</span>
          <input type="number" min="0" value={form.stock} onChange={(e) => set('stock', e.target.value)} />
        </label>

        <label className="field">
          <span>Weight</span>
          <input value={form.weight} onChange={(e) => set('weight', e.target.value)} placeholder="1kg" />
        </label>
        <label className="field">
          <span>Serves</span>
          <input value={form.serves} onChange={(e) => set('serves', e.target.value)} placeholder="Serves 4" />
        </label>
        <label className="field">
          <span>Shelf life</span>
          <input value={form.shelfLife} onChange={(e) => set('shelfLife', e.target.value)} placeholder="12 months" />
        </label>

        <label className="field span3">
          <span>Image URL</span>
          <input value={form.image} onChange={(e) => set('image', e.target.value)} placeholder="https://…" required />
        </label>

        <label className="field span3">
          <span>Description</span>
          <textarea rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} />
        </label>

        <div className="checks span3">
          <label className="check"><input type="checkbox" checked={form.isActive} onChange={(e) => set('isActive', e.target.checked)} /> Active</label>
          <label className="check"><input type="checkbox" checked={form.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)} /> Featured</label>
        </div>

        <div className="modal-actions span3">
          <button type="button" className="btn" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {busy ? 'Saving…' : isNew ? 'Create product' : 'Save changes'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
