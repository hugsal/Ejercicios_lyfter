import { NavLink, useNavigate } from "react-router-dom";
import { useLoginStore } from "../store/loginStore";

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const role = useLoginStore((state) => state.role);
  const logout = useLoginStore((state) => state.logout);
  const userName = useLoginStore((state) => state.userName);
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
          {isLoggedIn && (
            <>
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
                  localStorage.clear();
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
