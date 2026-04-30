import styles from "./KpiCard.module.css";

type KpiCardProps = {
  label: string;
  value: string;
  hint: string;
  positive: boolean;
  isLoading?: boolean;
};

const KpiCard = ({
  label,
  value,
  hint,
  positive,
  isLoading = false,
}: KpiCardProps) => {
  return (
    <article className={styles.kpiCard} aria-busy={isLoading || undefined}>
      <span className={styles.kpiLabel}>{label}</span>
      {isLoading ? (
        <>
          <span className={`${styles.skeleton} ${styles.skeletonValue}`} />
          <span className={`${styles.skeleton} ${styles.skeletonHint}`} />
        </>
      ) : (
        <>
          <span className={styles.kpiValue}>{value}</span>
          <span className={positive ? styles.kpiHint : styles.kpiHintMuted}>
            {hint}
          </span>
        </>
      )}
    </article>
  );
};

export default KpiCard;
