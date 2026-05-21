import { getMe } from "@/shared/api/sessionApi";
import { useQuery } from "@tanstack/react-query";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(),
    retry: false,
    refetchInterval: 60 * 61 * 1000, // 61 minutes
  });
};
