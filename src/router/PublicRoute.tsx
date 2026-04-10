import type { ReactNode } from "react";
import { useAuth } from "@/features/auth/AuthContext";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isReady } = useAuth();

  if (!isReady) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
