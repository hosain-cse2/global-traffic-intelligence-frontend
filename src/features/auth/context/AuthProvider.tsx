import { useMe } from "@/features/auth/hooks/useMe";
import { ApiError } from "@/shared/utils/fetchApiClient";

import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading, isFetched, isError, error } = useMe();

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated:
          !!user &&
          !(isError && error instanceof ApiError && error.status === 401),
        isReady: isFetched && !isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
