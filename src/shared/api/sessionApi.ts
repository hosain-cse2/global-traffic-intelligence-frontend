import type { User } from "@/features/auth/types/auth";
import { apiClient } from "@/shared/utils/fetchApiClient";

/** Clears session cookies on the server. */
export async function logout(): Promise<void> {
  await apiClient.post<void>("/api/session/logout");
}

export async function getMe(): Promise<User> {
  return await apiClient.get<User>("/api/session/me");
}
