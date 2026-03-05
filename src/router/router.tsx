import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import MapPage from "../pages/MapPage";
import DashboardPage from "../pages/DashboardPage";

export const router = createBrowserRouter([
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
