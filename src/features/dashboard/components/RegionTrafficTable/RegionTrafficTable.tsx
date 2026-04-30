import { formatNumber } from "@/lib/helper";
import styles from "./RegionTrafficTable.module.css";

type TrafficLevel = "low" | "medium" | "high" | "not traffic";

export type RegionalTraffic = {
  region: string;
  totalShips: number;
  movingShips: number;
  stationaryShips: number;
  trafficLevel: TrafficLevel;
};

type RegionTrafficTableProps = {
  data: RegionalTraffic[];
  isLoading?: boolean;
};

const TrafficLevelBadge = ({
  trafficLevel,
}: {
  trafficLevel: TrafficLevel;
}) => {
  return (
    <span
      title={trafficLevel}
      className={`${styles.badge} ${styles[trafficLevel]}`}
    />
  );
};

const RegionTrafficTable: React.FC<RegionTrafficTableProps> = ({
  data,
  isLoading = false,
}): React.ReactNode => {
  const skeletonRows = Array.from({ length: 7 }, (_, index) => index);

  return (
    <div className={styles.tablePanel} aria-busy={isLoading || undefined}>
      <div className={styles.tableHead}>
        <h2 className={styles.tableTitle}>Region traffic</h2>
        <p className={styles.tableDesc}>Total number of ships by region.</p>
      </div>
      <table className={styles.table}>
        <colgroup>
          <col className={styles.regionColumn} />
          <col className={styles.countColumn} />
          <col className={styles.countColumn} />
          <col className={styles.countColumn} />
          <col className={styles.levelColumn} />
        </colgroup>
        <thead>
          <tr>
            <th className={styles.leftHeader}>Region</th>
            <th className={styles.rightHeader}>Ships (count)</th>
            <th className={styles.rightHeader}>Moving Ships</th>
            <th className={styles.rightHeader}>Stationary Ships</th>
            <th className={styles.centerHeader}>Traffic Level</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? skeletonRows.map((row) => (
                <tr key={`loading-region-${row}`}>
                  <td>
                    <span
                      className={`${styles.skeleton} ${styles.skeletonRegion}`}
                    />
                  </td>
                  <td>
                    <span
                      className={`${styles.skeleton} ${styles.skeletonCount}`}
                    />
                  </td>
                  <td>
                    <span
                      className={`${styles.skeleton} ${styles.skeletonCount}`}
                    />
                  </td>
                  <td>
                    <span
                      className={`${styles.skeleton} ${styles.skeletonCount}`}
                    />
                  </td>
                  <td className={styles.trafficLevelCell}>
                    <span className={styles.skeletonBadge} />
                  </td>
                </tr>
              ))
            : data?.map(
                ({
                  region,
                  totalShips,
                  movingShips,
                  stationaryShips,
                  trafficLevel,
                }) => (
                  <tr key={region}>
                    <td>{region}</td>
                    <td className={styles.count}>{formatNumber(totalShips)}</td>
                    <td className={styles.count}>
                      {formatNumber(movingShips)}
                    </td>
                    <td className={styles.count}>
                      {formatNumber(stationaryShips)}
                    </td>
                    <td className={styles.trafficLevelCell}>
                      <TrafficLevelBadge trafficLevel={trafficLevel} />
                    </td>
                  </tr>
                ),
              )}
        </tbody>
      </table>
    </div>
  );
};

export default RegionTrafficTable;
