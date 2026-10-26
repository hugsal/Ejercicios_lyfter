import { Link, useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import apiServices from "../api/apiServices";
import Loading from "../components/Loading";
import { useCart } from "../contexts/cart/useCart";

function ProductDetails() {
  const { id } = useParams();
  const { setCartData } = useCart();
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

  const handleAddProduct = async () => {
    if (product.stock < 1) {
      alert("No hay stock");
      return;
    }

    try {
      await apiServices.addToCart(Number(id));
      const cart = await apiServices.getActiveCart();
      if (cart) {
        setCartData(cart);
      }
    } catch (error) {
      alert("No se pudo agregar el producto al carrito");
    }
  };

  return (
    <section className="product-detail-layout">
      <div className="product-detail-image-card">
        <img
          src={product.image}
          alt={product.name}
          className="product-detail-img"
        />
      </div>

      <div className="product-detail-info-card">
        <h1 className="product-detail-title">{product.name}</h1>
        <div className="product-detail-price">${product.price}</div>
        <div className="product-detail-category">{product.category}</div>
        <p className="product-detail-description">{product.description}</p>
        <div className="product-detail-actions">
          <button
            type="button"
            className="btn-secondary btn-back-catalog"
            onClick={handleAddProduct}
          >
            Agregar al carrito
          </button>
          <Link to="/productos" className="btn-secondary btn-back-catalog">
            Volver al catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
