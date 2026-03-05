import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header/Header";
import "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
