import { useMe } from "@/hooks/useMe";

import { createContext, useContext } from "react";

export type User = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
};

export type AuthContextType = {
  user: User | undefined | null;
  isAuthenticated: boolean;
  isReady: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  isAuthenticated: false,
  isReady: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading, isFetched } = useMe();

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isReady: isFetched && !isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
