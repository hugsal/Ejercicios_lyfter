import { useEffect } from "react";
import { useLoginStore } from "../store/loginStore";

function Home({ setView }) {
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const isLoadingAuth = useLoginStore((state) => state.isLoadingAuth);
  const isLogged = useLoginStore((state) => state.isLogged);

  useEffect(() => {
    isLogged();
  }, []);

  if (isLoadingAuth) {
    return <div>Cargando...</div>;
  }

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
        <button
          className="btn-primary"
          onClick={() => setView(isLoggedIn ? "products" : "login")}
        >
          {isLoggedIn ? "Ver productos" : "Iniciar sesión"}
        </button>
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
