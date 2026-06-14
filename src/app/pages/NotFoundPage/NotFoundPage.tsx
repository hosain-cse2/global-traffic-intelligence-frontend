import { Link } from "react-router-dom";
import styles from "@/shared/styles/statusPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={styles.pageInset}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.message}>
        This route doesn&apos;t exist. Check the URL or go back to the dashboard.
      </p>
      <Link to="/dashboard" className={styles.button}>
        Go to dashboard
      </Link>
    </div>
  );
}
