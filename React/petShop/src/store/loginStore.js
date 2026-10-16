import { create } from "zustand";

export const useLoginStore = create((set) => ({
  isLoggedIn: false,
  userName: "",
  role: "",
  login: (payload) => set({ isLoggedIn: true, ...payload }),
  logout: () => set({ isLoggedIn: false, userName: "", role: "" }),
}));
