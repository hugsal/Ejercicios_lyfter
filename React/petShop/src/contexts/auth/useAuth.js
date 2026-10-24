import { useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth === undefined) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return auth;
};
