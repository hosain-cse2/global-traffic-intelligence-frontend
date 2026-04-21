import { apiClient } from "@/lib/apiClient";

export type DashboardStats = {
  totalShips: number;
  highSpeedShips: number;
  topRegions: { name: string; count: number } | null;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  return await apiClient.get<DashboardStats>("/api/aisstream/dashboard/stats");
}
