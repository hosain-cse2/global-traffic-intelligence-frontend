import type { ReactNode } from "react";
import { useAuth } from "@/features/auth/AuthContext";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};
