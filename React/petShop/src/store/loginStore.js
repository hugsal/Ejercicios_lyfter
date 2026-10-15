import { create } from "zustand";
import apiServices from "../api/apiServices";

export const useLoginStore = create((set) => ({
  isLoadingAuth: !!localStorage.getItem("user"),
  isLoggedIn: false,
  userName: "",
  role: "",
  login: (payload) => set({ isLoggedIn: true, ...payload }),
  logout: () => set({ isLoggedIn: false, userName: "", role: "" }),
  isLogged: async () => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        const { user: userApi } = await apiServices.getMe();
        const { role, userName } = userApi;
        set({ isLoggedIn: true, role, userName });
      }
    } catch (error) {
      console.error("Error al validar sesión:", error);
      localStorage.clear();
      set({ isLoggedIn: false, role: "", userName: "" });
    } finally {
      set({ isLoadingAuth: false });
    }
  },
}));
