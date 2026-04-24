import styles from "./DashboardPage.module.css";
import KpiCard from "@/features/dashboard/components/KpiCard/KpiCard";
import ChartCard from "@/features/dashboard/components/ChartCard/ChartCard";
import AisBarChart from "@/components/common/Chart/AisBarChart/AisBarChart";
import AisPieChart from "@/components/common/Chart/AisPieChart/AisPieChart";
import useDashboardStats from "@/features/dashboard/hooks/useDashboardStats";
import { formatNumber } from "@/lib/helper";
import RegionTrafficTable from "@/features/dashboard/components/RegionTrafficTable/RegionTrafficTable";

export default function DashboardPage() {
  const { data: dashboardStats } = useDashboardStats();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Traffic intelligence</h1>
        <p className={styles.subtitle}>
          Overview of AIS traffic, corridors, and alerts — demo with static
          figures.
        </p>
      </header>

      <section className={styles.kpiGrid} aria-label="Key metrics">
        <KpiCard
          key={"Vessels tracked"}
          label={"Vessels tracked"}
          value={formatNumber(dashboardStats?.totalShips)}
          hint={"Live snapshot"}
          positive={true}
        />
        <KpiCard
          key={"High speed ships"}
          label={"High speed ships"}
          value={formatNumber(dashboardStats?.highSpeedShips)}
          hint={"Speed > 20 knots"}
          positive={
            dashboardStats?.highSpeedShips
              ? dashboardStats.highSpeedShips > 0
                ? true
                : false
              : false
          }
        />
        <KpiCard
          key={"Top regions"}
          label={"Top regions"}
          value={dashboardStats?.topRegions?.name || "N/A"}
          hint={`Total number of ships ${formatNumber(dashboardStats?.topRegions?.count) || "0"}`}
          positive={
            dashboardStats?.topRegions
              ? dashboardStats.topRegions.count > 0
                ? true
                : false
              : false
          }
        />
      </section>

      <div className={styles.chartsRow}>
        <ChartCard
          title="Traffic by movement state"
          description="Count of tracked vessels by AIS-derived speed band."
        >
          <AisBarChart
            series="movement"
            data={(dashboardStats?.movementState || []).map(
              ({ state, count }) => ({
                category: state,
                count,
              }),
            )}
          />
        </ChartCard>
        <ChartCard
          title="Vessels by category"
          description="Share of tracked vessels by vessel type."
        >
          <AisPieChart
            distribution="vesselType"
            data={(dashboardStats?.shipCountByType || []).map(
              ({ type, count }) => ({
                state: type,
                count,
              }),
            )}
          />
        </ChartCard>
      </div>

      <RegionTrafficTable data={dashboardStats?.regionalTrafficList || []} />
    </div>
  );
}
