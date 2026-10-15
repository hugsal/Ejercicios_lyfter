import { Outlet, Navigate } from "react-router-dom";
import { useLoginStore } from "../store/loginStore";

function PrivateRouter() {
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRouter;
