import { apiClient } from "@/lib/apiClient";
import type { LoginCredentials, LoginResponse } from "@/types/auth";

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  return apiClient.post<LoginResponse>("/api/auth/login", credentials);
}

/** Clears session cookies on the server. */
export async function logout(): Promise<void> {
  await apiClient.post<void>("/api/session/logout");
}
