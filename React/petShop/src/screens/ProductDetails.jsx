import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useApi } from "../hooks/useApi";
import apiServices from "../api/apiServices";
import Loading from "../components/Loading";

function ProductDetails() {
  const { id } = useParams();
  const {
    data: product,
    loading,
    error,
  } = useApi(() => apiServices.getProductById(id), [id]);

  if (loading) return <Loading />;

  if (!product) {
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
        <h3>No se encontró el producto.</h3>
      </section>
    );
  }

  return (
    <section className="product-detail-layout">
      <div className="product-detail-image-card">
        <img
          src={product.imagen}
          alt={product.name}
          className="product-detail-img"
        />
      </div>

      <div className="product-detail-info-card">
        <h1 className="product-detail-title">{product.name}</h1>
        <div className="product-detail-price">${product.price}</div>
        <div className="product-detail-category">{product.category}</div>
        <p className="product-detail-description">{product.description}</p>
        <p className="product-detail-description">
          Más adelante aquí se podrá agregar este producto al carrito y
          completar la compra.
        </p>
        <div className="product-detail-actions">
          <Link to="/productos" className="btn-secondary btn-back-catalog">
            Volver al catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
