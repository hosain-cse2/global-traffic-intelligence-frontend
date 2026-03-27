import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header/Header";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
