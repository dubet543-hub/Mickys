import { STATUS_TONE } from '../lib/format.js';

export function StatusBadge({ value }) {
  const tone = STATUS_TONE[value] || 'gray';
  return <span className={`badge badge-${tone}`}>{value}</span>;
}

export function Spinner({ label = 'Loading…' }) {
  return (
    <div className="spinner-wrap">
      <span className="spinner" />
      <span>{label}</span>
    </div>
  );
}

export function EmptyState({ icon: Icon, title, sub }) {
  return (
    <div className="empty">
      {Icon && <Icon size={34} />}
      <h3>{title}</h3>
      {sub && <p>{sub}</p>}
    </div>
  );
}

export function ErrorNote({ message }) {
  if (!message) return null;
  return <div className="error-note">{message}</div>;
}

export function Modal({ title, onClose, children, wide }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className={`modal ${wide ? 'modal-wide' : ''}`}
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-head">
          <h2>{title}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
