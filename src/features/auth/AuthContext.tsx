import { apiClient } from "@/lib/apiClient";
import { logout as logoutRequest } from "@/services/authApi";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type User = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  getMe: () => Promise<void>;
  setSession: (sessionUser: User) => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  getMe: () => Promise.resolve(),
  setSession: () => {},
  signOut: () => Promise.resolve(),
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  /** Must start true: first paint runs before useEffect/getMe — avoids treating “not checked yet” as logged out. */
  const [isLoading, setIsLoading] = useState(true);

  const setSession = useCallback((sessionUser: User) => {
    setUser(sessionUser);
    setIsAuthenticated(true);
  }, []);

  const signOut = useCallback(async () => {
    try {
      await logoutRequest();
    } catch {
      /* still clear client session */
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const getMe = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get<User>("/api/session/me");
      setUser(response);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void getMe();
  }, [getMe]);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, getMe, setSession, signOut }}
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
