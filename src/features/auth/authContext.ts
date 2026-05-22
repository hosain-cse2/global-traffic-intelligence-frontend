import { createContext } from "react";
import type { User } from "./types/auth";

export type AuthContextType = {
  user: User | undefined | null;
  isAuthenticated: boolean;
  isReady: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  isAuthenticated: false,
  isReady: false,
});
