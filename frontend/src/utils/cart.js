export function readStoredCart() {
  try {
    return JSON.parse(localStorage.getItem('mickys_cart')) || [];
  } catch {
    return [];
  }
}

export function upsertCartItem(cart, product, qty) {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    return cart.map((item) => item.id === product.id ? { ...item, qty: item.qty + qty } : item);
  }
  return [...cart, { ...product, qty }];
}
