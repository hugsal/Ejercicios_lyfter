import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/useAuth";

function NotFound() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <section className="not-found-screen" aria-labelledby="not-found-title">
      <svg
        className="not-found-icon"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="22" cy="27" r="16.5" />
        <path d="m34 15 7-7 4 4-7 7" />
        <path d="m38 8 3-3 4 4-3 3" />
      </svg>

      <h1 id="not-found-title">Página no encontrada</h1>
      <p>La ruta solicitada no existe o ha sido movida.</p>
      <button
        className="not-found-button"
        type="button"
        onClick={() => navigate(isLoggedIn ? "/productos" : "/")}
      >
        Volver al inicio
      </button>
    </section>
  );
}

export default NotFound;
