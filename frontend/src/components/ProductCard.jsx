export function ProductCard({ product, addToCart, onProduct }) {
  return (
    <article className="productCard">
      <button className="productImage" type="button" onClick={() => onProduct(product.id)} aria-label={`View ${product.name} details`}>
        <img src={product.image} alt={product.name} />
        <span>{product.label}</span>
      </button>
      <div className="productInfo">
        <h3>
          <button type="button" onClick={() => onProduct(product.id)}>{product.name}</button>
        </h3>
        <p>{product.tagline}</p>
        <div className="productFooter">
          <div>
            <strong>₹{product.price}</strong>
            <span>₹{product.mrp}</span>
          </div>
          <button type="button" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to cart`}>Add</button>
        </div>
      </div>
    </article>
  );
}
