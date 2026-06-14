import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout/AppLayout";
import MapPage from "../pages/MapPage/MapPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import PublicLayout from "@/app/layouts/PublicLayout/PublicLayout";
import LoginPage from "@/app/pages/LoginPage/LoginPage";
import { PublicRoute } from "./PublicRoute";
import { ProtectedRoute } from "./ProtectedRoute";
import RouteErrorPage from "./RouteErrorPage";

export const router = createBrowserRouter([
  {
    errorElement: <RouteErrorPage />,
    children: [
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
    ],
  },
]);
