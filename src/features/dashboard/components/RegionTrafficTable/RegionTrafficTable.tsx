import { formatNumber } from "@/lib/helper";
import styles from "./RegionTrafficTable.module.css";

export type RegionalTraffic = {
  region: string;
  totalShips: number;
  movingShips: number;
  stationaryShips: number;
};

type RegionTrafficTableProps = {
  data: RegionalTraffic[];
};

const RegionTrafficTable: React.FC<RegionTrafficTableProps> = ({
  data,
}): React.ReactNode => {
  return (
    <div className={styles.tablePanel}>
      <div className={styles.tableHead}>
        <h2 className={styles.tableTitle}>Region traffic</h2>
        <p className={styles.tableDesc}>Total number of ships by region.</p>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.textHeader}>Region</th>
            <th className={styles.countHeader}>Ships (count)</th>
            <th className={styles.countHeader}>Moving Ships</th>
            <th className={styles.countHeader}>Stationary Ships</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(({ region, totalShips, movingShips, stationaryShips }) => (
            <tr key={region}>
              <td>{region}</td>
              <td className={styles.count}>{formatNumber(totalShips)}</td>
              <td className={styles.count}>{formatNumber(movingShips)}</td>
              <td className={styles.count}>{formatNumber(stationaryShips)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegionTrafficTable;
