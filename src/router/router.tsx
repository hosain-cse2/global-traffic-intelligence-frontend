import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout/AppLayout";
import MapPage from "../pages/MapPage";
import DashboardPage from "../pages/DashboardPage";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import LoginPage from "@/pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: "auth",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <MapPage />,
      },
      {
        path: "map",
        element: <MapPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);
