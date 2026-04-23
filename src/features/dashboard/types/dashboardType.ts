export type DashboardStats = {
  totalShips: number;
  highSpeedShips: number;
  topRegions: { name: string; count: number } | null;
  shipCountByType: { type: string; count: number }[];
  shipCountByRegion: { region: string; count: number }[];
};
