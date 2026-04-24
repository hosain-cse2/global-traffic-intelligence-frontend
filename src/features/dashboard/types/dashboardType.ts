import type { RegionalTraffic } from "../components/RegionTrafficTable/RegionTrafficTable";

export type DashboardStats = {
  totalShips: number;
  highSpeedShips: number;
  topRegions: { name: string; count: number } | null;
  shipCountByType: { type: string; count: number }[];
  regionalTrafficList: RegionalTraffic[];
  movementState: { state: string; count: number }[];
};
