import type { User } from "@/features/auth/AuthContext";
import { apiClient } from "@/lib/apiClient";

/** Clears session cookies on the server. */
export async function logout(): Promise<void> {
  await apiClient.post<void>("/api/session/logout");
}

export async function getMe(): Promise<User> {
  return await apiClient.get<User>("/api/session/me");
}
