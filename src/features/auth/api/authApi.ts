import { apiClient } from "@/shared/utils/fetchApiClient";
import type {
  LoginCredentials,
  LoginResponse,
} from "@/features/auth/types/auth";

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  return apiClient.post<LoginResponse>("/api/auth/login", credentials);
}
