import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header/Header";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
