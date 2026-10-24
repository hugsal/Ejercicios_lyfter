import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/useAuth";

function PublicRouter() {
  const { isLoggedIn } = useAuth();

  return !isLoggedIn ? <Outlet /> : <Navigate to="/productos" />;
}

export default PublicRouter;
