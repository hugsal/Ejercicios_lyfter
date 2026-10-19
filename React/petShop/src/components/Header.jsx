import { useLoginStore } from "../store/loginStore";

function Header({ view, setView }) {
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const role = useLoginStore((state) => state.role);
  const logout = useLoginStore((state) => state.logout);
  const userName = useLoginStore((state) => state.userName);
  const isAdmin = role === "admin";

  return (
    <header className="header">
      <button type="button" className="logo" onClick={() => setView("home")}>
        PawStore
      </button>
      {isLoggedIn && (
        <p className="user-info">
          Sesión iniciada como: <strong>{userName}</strong>
        </p>
      )}

      <nav>
        <ul className="nav-links">
          <li>
            <button
              type="button"
              className={view === "home" ? "active" : ""}
              aria-current={view === "home" ? "page" : undefined}
              onClick={() => setView("home")}
            >
              Inicio
            </button>
          </li>
          <li>
            <button
              type="button"
              className={
                view === "products" || view === "productDetails" ? "active" : ""
              }
              aria-current={
                view === "products" || view === "productDetails"
                  ? "page"
                  : undefined
              }
              onClick={() => setView("products")}
            >
              Productos
            </button>
          </li>
          <li>
            <a href="#">Contacto</a>
          </li>
          {isAdmin && (
            <li>
              <button
                type="button"
                className={
                  view === "administration" || view === "editProduct"
                    ? "active"
                    : ""
                }
                aria-current={
                  view === "administration" || view === "editProduct"
                    ? "page"
                    : undefined
                }
                onClick={() => {
                  setView("administration");
                }}
              >
                Administración
              </button>
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
                  setView("home");
                } else {
                  setView("login");
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
