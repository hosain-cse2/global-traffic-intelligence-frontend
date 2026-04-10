import { getMe } from "@/services/sessionApi";
import { useQuery } from "@tanstack/react-query";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(),
    retry: false,
  });
};
