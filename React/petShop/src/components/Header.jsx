import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/useAuth";
import { useCart } from "../contexts/cart/useCart";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, role, logout, userName } = useAuth();
  const { cartItemsCount, cart } = useCart();
  const isAdmin = role === "admin";

  return (
    <header className="header">
      <button
        type="button"
        className="logo"
        onClick={() => navigate(isLoggedIn ? "/productos" : "/")}
      >
        PawStore
      </button>
      {isLoggedIn && (
        <p className="user-info">
          Sesión iniciada como: <strong>{userName}</strong>
        </p>
      )}

      <nav>
        <ul className="nav-links">
          {!isLoggedIn && (
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                })}
              >
                Inicio
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/productos"
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              Productos
            </NavLink>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <NavLink
                  to="/carrito" // O la ruta que utilices, por ejemplo "/checkout"
                  className="cart-nav-link"
                  style={({ isActive }) => ({
                    fontWeight: isActive ? "bold" : "normal",
                  })}
                >
                  <div className="cart-icon-wrapper">
                    <span>Carrito</span>
                    <span className="cart-badge">{cartItemsCount}</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/checkout"
                  style={({ isActive }) => ({
                    fontWeight: isActive ? "bold" : "normal",
                  })}
                >
                  Checkout
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink
              to="/contacto"
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              Contacto
            </NavLink>
          </li>
          {isAdmin && (
            <li>
              <NavLink
                to="/admin"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                })}
              >
                Administración
              </NavLink>
            </li>
          )}
          <li>
            <button
              type="button"
              className="btn-login"
              onClick={() => {
                if (isLoggedIn) {
                  logout();
                  navigate("/");
                } else {
                  navigate("/login");
                }
              }}
            >
              {isLoggedIn ? "Cerrar sesión" : "Iniciar sesión"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
