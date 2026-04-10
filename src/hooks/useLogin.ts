import { login } from "@/services/authApi";
import type { LoginResponse } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (response: LoginResponse) => {
      queryClient.setQueryData(["me"], () => response.user);
    },
  });
};

export default useLogin;
