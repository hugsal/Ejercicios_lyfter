import { NavLink } from "react-router-dom";
import Loading from "../components/Loading";
import apiServices from "../api/apiServices";
import { useCart } from "../contexts/cart/useCart";

function Cart() {
  const { fetchActiveCart, cart, loadingCart } = useCart();

  if (loadingCart) return <Loading />;

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <section className="empty-state">
        <svg
          className="empty-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
          <line
            x1="16"
            y1="13"
            x2="20"
            y2="17"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="20"
            y1="13"
            x2="16"
            y2="17"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <h2>Tu carrito está vacío</h2>
        <p>Agrega productos desde el catálogo.</p>
        <NavLink to="/productos" className="btn-secondary">
          Ver productos
        </NavLink>
      </section>
    );
  }

  const handleUpdateItemCart = async (productId, quantity) => {
    try {
      await apiServices.updateItemCart(productId, quantity);
      alert("Producto actualizado en el carrito");
      fetchActiveCart();
    } catch (error) {
      console.log(error);
      alert("Error al actualizar el producto en el carrito");
    }
  };

  const handleDeleteItemCart = async (productId) => {
    try {
      await apiServices.deleteItemCart(productId);
      alert("Producto eliminado del carrito");
      fetchActiveCart();
    } catch (error) {
      console.log(error);
      alert("Error al eliminar el producto del carrito");
    }
  };

  return (
    <>
      <h1 className="catalog-title">Carrito de compras</h1>

      <div className="cart-layout" id="cartContent">
        <section className="cart-items-list">
          {cart.items.map((item) => (
            <article className="cart-item" key={item.id}>
              <img
                src={item.product?.image}
                alt={item.product?.name ?? "Producto"}
                className="cart-item-img"
              />

              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.product?.name ?? ""}</h3>
              </div>

              <div className="cart-qty-control">
                <button
                  className="btn-qty"
                  aria-label="Disminuir cantidad"
                  onClick={() =>
                    handleUpdateItemCart(item.product.id, item.quantity - 1)
                  }
                >
                  -
                </button>
                <div className="qty-box" id={`qty-box-${item.id}`}>
                  {item.quantity}
                </div>
                <button
                  className="btn-qty"
                  aria-label="Aumentar cantidad"
                  onClick={() =>
                    handleUpdateItemCart(item.product.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>

              <div className="cart-item-prices">
                <span className="price-unit">Precio: ${item.unitPrice}</span>
                <span className="price-subtotal">
                  Subtotal: <strong>${item.subtotal}</strong>
                </span>
                <button
                  onClick={() => handleDeleteItemCart(Number(item.product.id))}
                  className="btn-remove"
                  id={`btn-remove-${item.product?.id}`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </section>
        <aside className="cart-summary">
          <div className="cart-summary-row">
            <span className="cart-summary-label">Total:</span>
            <span className="cart-summary-total" id="totalCart">
              ${cart.totalAmount}
            </span>
          </div>
          <NavLink to="/checkout" className="btn-primary">
            Continuar al checkout
          </NavLink>
        </aside>
      </div>
    </>
  );
}

export default Cart;
