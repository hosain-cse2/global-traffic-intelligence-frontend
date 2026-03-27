import { apiClient } from "@/lib/apiClient";
import type { LoginCredentials, LoginResponse } from "@/types/auth";

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  return apiClient.post<LoginResponse>("/auth/login", credentials);
}

/** Clears session cookies on the server. */
export async function logout(): Promise<void> {
  await apiClient.post<void>("/auth/logout", undefined);
}

/**
 * Rotates / extends the session using cookies (e.g. refresh cookie).
 * No request body; the browser sends cookies automatically.
 */
export async function refreshToken(): Promise<void> {
  await apiClient.post<void>("/auth/refresh", undefined);
}
