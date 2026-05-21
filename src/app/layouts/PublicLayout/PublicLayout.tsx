import { Outlet } from "react-router-dom";
import styles from "./PublicLayout.module.css";

export default function PublicLayout() {
  return (
    <div className={styles.root}>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
