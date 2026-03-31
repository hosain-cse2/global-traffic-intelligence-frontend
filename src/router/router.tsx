import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout/AppLayout";
import MapPage from "../pages/MapPage";
import DashboardPage from "../pages/DashboardPage";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import LoginPage from "@/pages/LoginPage/LoginPage";
import { PublicRoute } from "./PublicRoute";
import { ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "auth",
    element: (
      <PublicRoute>
        <PublicLayout />
      </PublicRoute>
    ),
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
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
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
