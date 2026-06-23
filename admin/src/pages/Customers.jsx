import { useEffect, useState } from 'react';
import { Users, Search } from 'lucide-react';
import { api } from '../api.js';
import { date } from '../lib/format.js';
import { Spinner, ErrorNote, EmptyState } from '../components/ui.jsx';

export function Customers() {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  function load() {
    setError('');
    api.get('/admin/users')
      .then((d) => setUsers(d.users))
      .catch((e) => setError(e.message));
  }
  useEffect(load, []);

  async function toggleActive(u) {
    try {
      const { user } = await api.put(`/admin/users/${u._id}`, { isActive: !u.isActive });
      setUsers((list) => list.map((x) => (x._id === user._id ? user : x)));
    } catch (e) {
      alert(e.message);
    }
  }

  if (error) return <ErrorNote message={error} />;
  if (!users) return <Spinner />;

  const filtered = users.filter((u) =>
    !query || u.name?.toLowerCase().includes(query.toLowerCase()) || u.email?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="stack">
      <div className="toolbar">
        <div className="search">
          <Search size={16} />
          <input placeholder="Search customers" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Users} title="No customers" sub="Registered users appear here." />
      ) : (
        <div className="card no-pad">
          <table className="table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Joined</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u._id}>
                  <td><strong>{u.name}</strong></td>
                  <td>{u.email}</td>
                  <td className="muted">{u.phone || '—'}</td>
                  <td>
                    {u.role === 'admin'
                      ? <span className="badge badge-violet">admin</span>
                      : <span className="badge badge-gray">customer</span>}
                  </td>
                  <td className="muted">{date(u.createdAt)}</td>
                  <td>{u.isActive ? <span className="badge badge-green">active</span> : <span className="badge badge-red">blocked</span>}</td>
                  <td className="actions">
                    {u.role !== 'admin' && (
                      <button className="btn btn-sm" onClick={() => toggleActive(u)}>
                        {u.isActive ? 'Block' : 'Unblock'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
