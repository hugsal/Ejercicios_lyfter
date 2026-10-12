function Header({ view, setView }) {
  return (
    <header className="header">
      <button type="button" className="logo" onClick={() => setView("home")}>
        PawStore
      </button>
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
        </ul>
      </nav>
    </header>
  );
}

export default Header;
