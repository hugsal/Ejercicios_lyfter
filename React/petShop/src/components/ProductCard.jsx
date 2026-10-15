import { Link } from "react-router";

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-price">${product.price}</div>
        <div className="product-category">{product.category}</div>
        <Link to={`/productos/${product.id}`} className="btn-card">
          Ver detalles
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
