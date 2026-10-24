import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth/useAuth";

function Home() {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <section className="hero">
        <h1>Bienvenido a PawStore</h1>
        <p>
          Somos una tienda dedicada a ofrecer productos de calidad para tus
          mascotas.
        </p>
        <p>
          Explora nuestro catálogo para encontrar camas, juguetes, accesorios y
          más.
        </p>
        {isLoggedIn ? (
          <Link to="/productos" className="btn-primary">
            Ver productos
          </Link>
        ) : (
          <Link to="/login" className="btn-primary">
            Iniciar Sesion
          </Link>
        )}
      </section>

      <section className="info-section">
        <article className="info-card">
          <p>
            Esta es la página principal de la aplicación. Más adelante aquí se
            podrán mostrar productos destacados.
          </p>
        </article>
      </section>
    </>
  );
}

export default Home;
