import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth/useAuth";

function ProductCard({ product }) {
  const { isLoggedIn } = useAuth();
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-price">${product.price}</div>
        <div className="product-category">{product.category}</div>
        {isLoggedIn ? (
          <Link to={`/productos/${product.id}`} className="btn-card">
            Ver detalles
          </Link>
        ) : (
          <p>Debes iniciar sesión para ver los detalles del producto</p>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
