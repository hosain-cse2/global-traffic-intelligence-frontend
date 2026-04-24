import { ResponsiveContainer } from "recharts";
import styles from "./ChartCard.module.css";

type ChartCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const ChartCard = ({ title, description, children }: ChartCardProps) => {
  return (
    <div className={styles.panel}>
      <h2 className={styles.panelTitle}>{title}</h2>
      <p className={styles.panelDesc}>{description}</p>
      <div className={styles.chartBox}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartCard;
