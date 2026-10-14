import { Outlet, Navigate } from "react-router-dom";
import { useLoginStore } from "../store/loginStore";

function PublicRouter() {
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);

  return !isLoggedIn ? <Outlet /> : <Navigate to="/productos" />;
}

export default PublicRouter;
