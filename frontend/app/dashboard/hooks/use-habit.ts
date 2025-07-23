import api from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const getToken = () => `Bearer ${localStorage.getItem("token")}`;

export const useHabits = () => {
  return useQuery({
    queryKey: ["habits"],
    queryFn: async () => {
      const res = await api.get("/habits", {
        headers: { Authorization: getToken() },
      });
      return res.data.data;
    },
  });
};

export const useAddHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newHabit: { name: string; description: string }) => {
      const res = await api.post("/habits", newHabit, {
        headers: { Authorization: getToken() },
      });
      return res.data;
    },
    onSuccess: (res) => {
      toast(res.message);
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });
};

export const useUpdateHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: { name?: string; description?: string };
    }) => {
      await api.put(`/habits/${id}`, data, {
        headers: { Authorization: getToken() },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });
};

export const useDeleteHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.delete(`/habits/${id}`, {
        headers: { Authorization: getToken() },
      });
      return res.data;
    },
    onSuccess: (res) => {
      toast(res.message);
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });
};

export const useCheckInHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.post(
        `/habits/${id}/checkin`,
        {},
        {
          headers: { Authorization: getToken() },
        }
      );
      return res.data;
    },
    onSuccess: (data) => {
      toast(data.message);
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });
};
