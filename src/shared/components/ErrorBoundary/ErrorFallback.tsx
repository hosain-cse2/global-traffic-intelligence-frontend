import styles from "@/shared/styles/statusPage.module.css";

type Props = {
  error?: Error | null;
  onReload?: () => void;
};

export default function ErrorFallback({ error, onReload }: Props) {
  const handleReload = onReload ?? (() => window.location.reload());

  return (
    <div className={styles.page} role="alert">
      <p className={styles.code}>500</p>
      <h1 className={styles.title}>Something went wrong</h1>
      <p className={styles.message}>
        An unexpected error occurred. Try reloading the page or go back to the
        dashboard.
      </p>
      {import.meta.env.DEV && error && (
        <div className={styles.errorDetail}>
          <span className={styles.errorDetailLabel}>DETAILS</span>
          <p className={styles.errorDetailText}>{error.message}</p>
        </div>
      )}
      <div className={styles.actions}>
        <button type="button" className={styles.button} onClick={handleReload}>
          Reload page
        </button>
        <button
          type="button"
          className={styles.buttonSecondary}
          onClick={() => {
            window.location.href = "/dashboard";
          }}
        >
          Go to dashboard
        </button>
      </div>
    </div>
  );
}
