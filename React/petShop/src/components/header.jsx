function Header({ setView }) {
  return (
    <header className="header">
      <a className="logo" onClick={() => setView("home")}>
        Hug's Store
      </a>
      <nav>
        <ul className="nav-links">
          <li>
            <a
              onClick={() => {
                setView("home");
              }}
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setView("products");
              }}
            >
              Productos
            </a>
          </li>
          <li>
            <a href="#">Contacto</a>
          </li>
          {/* <button type="button" className="btn-login" id="log-out-btn">
            Cerrar sesión
          </button> */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
