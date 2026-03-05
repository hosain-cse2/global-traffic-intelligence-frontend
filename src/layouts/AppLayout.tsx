import { Link, Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="h-screen flex flex-col">
      <header className="h-14 border-b flex items-center px-6 gap-6">
        <h1 className="font-semibold">Global Traffic Intelligence</h1>

        <nav className="flex gap-4">
          <Link to="/map">Map</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
      </header>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
