import { useProductsStore } from "../store/productsStore";
import ProductCard from "../components/productCard";

function Products({ setView, setProductId }) {
  const { products } = useProductsStore();
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
    <>
      <h2 className="catalog-title">Catálogo de productos</h2>
      <section className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            setProductId={setProductId}
            setView={setView}
          />
        ))}
      </section>
    </>
  );
}

export default Products;
