import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header";

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
