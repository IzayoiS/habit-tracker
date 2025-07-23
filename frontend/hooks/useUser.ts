import { useAuth } from "@/store/user";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

const getToken = () => `Bearer ${localStorage.getItem("token")}`;

export const useUser = () => {
  const login = useAuth((state) => state.login);
  const logout = useAuth((state) => state.logout);

  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await api.get("/auth/check", {
        headers: { Authorization: getToken() },
      });
      const user = res.data.data;
      const token = localStorage.getItem("token");
      if (user && token) {
        login(user, token);
      }
      return user;
    },
    enabled: !!localStorage.getItem("token"),
    retry: false,
    meta: {
      onError: () => {
        logout();
      },
    },
  });
};
