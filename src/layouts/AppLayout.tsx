import { Link, Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <header>
        <h1>Global Traffic Intelligence</h1>

        <nav>
          <Link to="/map">Map</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
