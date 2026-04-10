import { apiClient } from "@/lib/apiClient";
import type { LoginCredentials, LoginResponse } from "@/types/auth";

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  return apiClient.post<LoginResponse>("/api/auth/login", credentials);
}
