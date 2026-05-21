import type { User } from "@/features/auth/AuthContext";

/** Align field names with your Node API (e.g. `username` instead of `email`). */
export type LoginCredentials = {
  email: string;
  password: string;
};

/**
 * Typical login JSON body when the session is established via httpOnly cookies
 * (no access/refresh tokens in the response body).
 */
export type LoginResponse = {
  user: User;
};
