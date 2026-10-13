function ProductCard({ product, setProductId, setView }) {
  return (
    <article className="product-card" key={product.id}>
      <img src={product.imagen} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-price">${product.price}</div>
        <div className="product-category">{product.category}</div>
        <button
          onClick={() => {
            setProductId(product.id);
            setView("productDetails");
          }}
          className="btn-card"
        >
          Ver detalles
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
