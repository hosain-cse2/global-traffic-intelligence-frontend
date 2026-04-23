import { getDashboardStats } from "@/services/dashboardApi";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import type { DashboardStats } from "../types/dashboardType";

const useDashboardStats = (): UseQueryResult<DashboardStats, Error> => {
  return useQuery<DashboardStats, Error>({
    queryKey: ["dashboardStats"],
    queryFn: () => getDashboardStats(),
    retry: false,
  });
};

export default useDashboardStats;
