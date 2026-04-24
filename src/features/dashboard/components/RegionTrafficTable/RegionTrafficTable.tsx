import { formatNumber } from "@/lib/helper";
import styles from "./RegionTrafficTable.module.css";

type RegionTraffic = {
  region: string;
  count: number;
};

type RegionTrafficTableProps = {
  data: RegionTraffic[];
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
            <th>Region</th>
            <th>Ships (count)</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(({ region, count }) => (
            <tr key={region}>
              <td className={styles.mono}>{region}</td>
              <td>{formatNumber(count || 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegionTrafficTable;
