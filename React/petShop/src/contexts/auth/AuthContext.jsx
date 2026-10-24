import { createContext, useState } from "react";
import apiServices from "../../api/apiServices";

export const AuthContext = createContext({
  isLoadingAuth: !!localStorage.getItem("user"),
  isLoggedIn: false,
  userName: null,
  role: null,
  login: () => {},
  logout: () => {},
  isLogged: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoadingAuth, setIsLoadingAuth] = useState(
    !!localStorage.getItem("user"),
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [role, setRole] = useState(null);

  const login = (payload) => {
    setUserName(payload.userName);
    setRole(payload.role);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName(null);
    setRole(null);
    localStorage.clear();
  };

  const isLogged = async () => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        const { user: userApi } = await apiServices.getMe();
        const { role, userName } = userApi;
        setIsLoggedIn(true);
        setRole(role);
        setUserName(userName);
      }
    } catch (error) {
      console.error("Error al validar sesión:", error);
      localStorage.clear();
      setIsLoggedIn(false);
      setRole(null);
      setUserName(null);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoadingAuth,
        isLoggedIn,
        userName,
        role,
        login,
        logout,
        isLogged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
