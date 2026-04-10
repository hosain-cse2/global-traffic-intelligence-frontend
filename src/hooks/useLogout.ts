import type { User } from "@/features/auth/AuthContext";
import { logout } from "@/services/sessionApi";
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";

export default function useLogout(): UseMutationResult<void, Error, void> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData<User | null>(["me"], null);
    },
  });
}
