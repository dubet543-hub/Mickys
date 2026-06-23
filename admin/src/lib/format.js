export const inr = (n) =>
  '₹' + Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });

export const date = (d) =>
  d ? new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';

export const dateShort = (d) =>
  d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : '—';

/* colour key for order/payment status pills */
export const STATUS_TONE = {
  placed: 'blue', confirmed: 'blue', processing: 'amber', shipped: 'violet',
  delivered: 'green', cancelled: 'red',
  pending: 'amber', paid: 'green', failed: 'red', refunded: 'violet',
};

export const ORDER_STATUSES = ['placed', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
export const CATEGORIES = ['gravies', 'pastes', 'pulses', 'bundles'];
