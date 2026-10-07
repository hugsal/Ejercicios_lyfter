import { products } from "../assets/productsMock";

// const products = [];
function Products({ setView, setProductId }) {
  if (products.length === 0) {
    return (
      <section className="empty-state">
        <svg
          className="empty-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="12" cy="12" r="10" />
          <path
            strokeLinecap="round"
            d="M9 10h.01M15 10h.01M16 16c-.8-1.2-2.1-2-4-2s-3.2.8-4 2"
          />
        </svg>
        <h3>No hay productos disponibles por el momento.</h3>
      </section>
    );
  }

  return (
    <section className="products-grid">
      {products.map((product, index) => (
        <article className="product-card" key={index}>
          <img
            src={product.imagen}
            alt={product.nombre}
            className="product-image"
          />
          <div className="product-info">
            <h3 className="product-title">{product.name}</h3>
            <div className="product-price">{product.precio}</div>
            <div className="product-stock">Stock: {product.stock}</div>
            {/* <button type="button" className="btn-cart" data-product-id="5">
              Agregar al carrito
            </button> */}
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
      ))}
    </section>
  );
}

export default Products;
