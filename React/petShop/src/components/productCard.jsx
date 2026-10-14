function ProductCard({ product, setProductId, setView }) {
  return (
    <article className="product-card" key={product.id}>
      <img
        src={product.imagen}
        alt={product.nombre}
        className="product-image"
      />
      <div className="product-info">
        <h3 className="product-title">{product.nombre}</h3>
        <div className="product-price">${product.precio}</div>
        <div className="product-category">{product.categoria}</div>
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
