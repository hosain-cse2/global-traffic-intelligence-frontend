import type { DashboardStats } from "@/features/dashboard/types/dashboardType";
import { apiClient } from "@/shared/utils/fetchApiClient";

export async function getDashboardStats(): Promise<DashboardStats> {
  return await apiClient.get<DashboardStats>("/api/aisstream/dashboard/stats");
}
