import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/useAuth";

function PrivateRouter() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRouter;
