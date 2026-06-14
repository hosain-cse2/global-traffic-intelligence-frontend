import logo from "@/assets/logo.png";
import styles from "./ErrorBoundary.module.css";

type Props = {
  error?: Error | null;
  onReload?: () => void;
};

export default function ErrorFallback({ error, onReload }: Props) {
  const handleReload = onReload ?? (() => window.location.reload());
  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className={styles.root}>
      <aside className={styles.visual} aria-hidden="true">
        <div className={styles.visualGlow} />
        <div className={styles.visualGrid} />
        <span className={styles.visualCode}>500</span>
        <svg
          className={styles.visualWave}
          viewBox="0 0 400 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 80 C80 40, 160 100, 240 60 C320 20, 360 50, 400 40 L400 120 L0 120 Z"
            fill="rgba(255,255,255,0.06)"
          />
          <path
            d="M0 95 C100 55, 180 110, 280 70 C340 45, 380 65, 400 58 L400 120 L0 120 Z"
            fill="rgba(255,255,255,0.04)"
          />
        </svg>
      </aside>

      <main className={styles.main} role="alert">
        <header className={styles.header}>
          <img src={logo} alt="" className={styles.logo} />
          <span className={styles.badge}>Application error</span>
        </header>

        <div className={styles.body}>
          <h1 className={styles.title}>
            We couldn&apos;t load
            <br />
            this page
          </h1>
          <p className={styles.message}>
            Something unexpected happened on our end. A quick reload usually
            fixes it — otherwise head back to the map.
          </p>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={handleReload}
            >
              <svg
                className={styles.buttonIcon}
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M16.667 10A6.667 6.667 0 1 1 10 3.333V1.667M10 3.333 12.5 5.833M10 3.333 7.5 5.833"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Reload page
            </button>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={handleGoHome}
            >
              Go to map
            </button>
          </div>
        </div>

        {import.meta.env.DEV && error && (
          <div className={styles.terminal}>
            <div className={styles.terminalBar}>
              <span className={styles.terminalDot} data-tone="red" />
              <span className={styles.terminalDot} data-tone="yellow" />
              <span className={styles.terminalDot} data-tone="green" />
              <span className={styles.terminalLabel}>dev / error.log</span>
            </div>
            <pre className={styles.terminalBody}>{error.message}</pre>
          </div>
        )}
      </main>
    </div>
  );
}
