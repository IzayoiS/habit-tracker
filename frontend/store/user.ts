import { create } from "zustand";
import Cookies from "js-cookie";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  initialize: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: null,

  initialize: () => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    if (token && userString) {
      const user: User = JSON.parse(userString);
      set({ token, user });
    }
  },

  login: (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    Cookies.set("token", token, { path: "/", sameSite: "Lax" });
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Cookies.remove("token");
    set({ user: null, token: null });
  },

  setUser: (user) => set({ user }),
}));
