import styles from "./DashboardPage.module.css";
import KpiCard from "@/features/dashboard/KpiCard/KpiCard";
import ChartCard from "@/features/dashboard/ChartCard/ChartCard";
import AisBarChart from "@/components/common/Chart/AisBarChart/AisBarChart";
import AisPieChart from "@/components/common/Chart/AisPieChart/AisPieChart";
import useDashboardStats from "@/features/dashboard/hooks/useDashboardStats";
import { formatNumber } from "@/lib/helper";
import { useMemo } from "react";

/** Static share by region — pie chart */
const REGION_SHARE = [
  { name: "Asia Pacific", value: 42 },
  { name: "Europe", value: 28 },
  { name: "Americas", value: 18 },
  { name: "Middle East", value: 12 },
];

const RECENT_EVENTS = [
  {
    id: "1",
    time: "14:32 UTC",
    vessel: "MV Nordic Star",
    event: "Entered Singapore Strait TSS",
    zone: "IMO East",
    severity: "info" as const,
  },
  {
    id: "2",
    time: "14:28 UTC",
    vessel: "Cape Horizon",
    event: "Speed anomaly (>25 kn)",
    zone: "Malacca",
    severity: "warn" as const,
  },
  {
    id: "3",
    time: "14:15 UTC",
    vessel: "Seabird Express",
    event: "AIS gap closed",
    zone: "North Sea",
    severity: "ok" as const,
  },
  {
    id: "4",
    time: "14:02 UTC",
    vessel: "Pacific Link",
    event: "Course change >90°",
    zone: "Pacific NE",
    severity: "warn" as const,
  },
  {
    id: "5",
    time: "13:55 UTC",
    vessel: "Arctic Runner",
    event: "ETA update broadcast",
    zone: "Arctic route",
    severity: "info" as const,
  },
];

export default function DashboardPage() {
  const { data: dashboardStats } = useDashboardStats();

  /**
   ** TODO: item.count > 200 not proper way to do this.
   ** Also dependency is not correct. we need to proper dependency and logic.
   */
  const shipCountByRegion = useMemo(
    () => dashboardStats?.shipCountByRegion.filter((item) => item.count > 200),
    [dashboardStats],
  );

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
        <ChartCard title="Vessels by category" description="Snapshot counts.">
          <AisBarChart data={dashboardStats?.shipCountByType || []} />
        </ChartCard>
        <ChartCard
          title="Traffic share by region"
          description="Approximate distribution of tracked AIS traffic."
        >
          <AisPieChart data={shipCountByRegion || []} />
        </ChartCard>
      </div>

      <div className={styles.tablePanel}>
        <div className={styles.tableHead}>
          <h2 className={styles.tableTitle}>Recent events</h2>
          <p className={styles.tableDesc}>
            Latest flagged movements and notices (static rows).
          </p>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Time</th>
              <th>Vessel</th>
              <th>Event</th>
              <th>Zone</th>
              <th>Severity</th>
            </tr>
          </thead>
          <tbody>
            {RECENT_EVENTS.map((row) => (
              <tr key={row.id}>
                <td className={styles.mono}>{row.time}</td>
                <td>{row.vessel}</td>
                <td>{row.event}</td>
                <td className={styles.mono}>{row.zone}</td>
                <td>
                  {row.severity === "ok" && (
                    <span className={`${styles.badge} ${styles.badgeOk}`}>
                      Normal
                    </span>
                  )}
                  {row.severity === "warn" && (
                    <span className={`${styles.badge} ${styles.badgeWarn}`}>
                      Review
                    </span>
                  )}
                  {row.severity === "info" && (
                    <span className={`${styles.badge} ${styles.badgeInfo}`}>
                      Info
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
