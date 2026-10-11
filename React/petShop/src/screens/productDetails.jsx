function ProductDetails({ products, productId, setView }) {
  const product = products.find((product) => product.id === productId);

  return (
    <section className="product-detail-layout">
      <div className="product-detail-image-card">
        <img
          src={product.imagen}
          alt={product.nombre}
          className="product-detail-img"
        />
      </div>

      <div className="product-detail-info-card">
        <h1 className="product-detail-title">{product.nombre}</h1>
        <div className="product-detail-price">${product.precio}</div>
        <div className="product-detail-category">{product.categoria}</div>
        <p className="product-detail-description">{product.descripcion}</p>
        <p className="product-detail-description">
          Más adelante aquí se podrá agregar este producto al carrito y
          completar la compra.
        </p>
        <div className="product-detail-actions">
          <button
            onClick={() => setView("products")}
            className="btn-secondary btn-back-catalog"
          >
            Volver al catálogo
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
