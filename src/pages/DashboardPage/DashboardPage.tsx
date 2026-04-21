import styles from "./DashboardPage.module.css";
import KpiCard from "@/features/dashboard/KpiCard/KpiCard";
import ChartCard from "@/features/dashboard/ChartCard/ChartCard";
import AisAreaChart, {
  type AISAreaChartData,
} from "@/components/common/Chart/AisAreaChart/AisAreaChart";
import type { ChartData } from "recharts/types/state/chartDataSlice";
import AisBarChart from "@/components/common/Chart/AisBarChart/AisBarChart";
import useDashboardStats from "@/features/dashboard/hooks/useDashboardStats";
import { formatNumber } from "@/lib/helper";

/** Static demo data — replace with API-driven state later */
const HOURLY_AIS: ChartData<AISAreaChartData> = [
  { time: "00:00", value: 320 },
  { time: "04:00", value: 180 },
  { time: "08:00", value: 890 },
  { time: "12:00", value: 1240 },
  { time: "16:00", value: 1100 },
  { time: "20:00", value: 760 },
  { time: "24:00", value: 410 },
];

const VESSEL_MIX = [
  { type: "Cargo", count: 920 },
  { type: "Tanker", count: 410 },
  { type: "Passenger", count: 280 },
  { type: "Fishing", count: 540 },
  { type: "Other", count: 697 },
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
          title="AIS messages (sample day)"
          description="Inbound message volume by time block — static preview."
        >
          <AisAreaChart data={HOURLY_AIS} />
        </ChartCard>

        <ChartCard
          title="Vessels by category"
          description="Snapshot counts — not live."
        >
          <AisBarChart data={VESSEL_MIX} />
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
