import styles from "./KpiCard.module.css";

type KpiCardProps = {
  label: string;
  value: string;
  hint: string;
  positive: boolean;
};

const KpiCard = ({ label, value, hint, positive }: KpiCardProps) => {
  return (
    <article key={label} className={styles.kpiCard}>
      <span className={styles.kpiLabel}>{label}</span>
      <span className={styles.kpiValue}>{value}</span>
      <span className={positive ? styles.kpiHint : styles.kpiHintMuted}>
        {hint}
      </span>
    </article>
  );
};

export default KpiCard;
