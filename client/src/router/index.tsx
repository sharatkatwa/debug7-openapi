import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { DashboardPage } from "../pages/DashboardPage";
import { InventoryPage } from "../pages/InventoryPage";
import { OrdersPage } from "../pages/OrdersPage";
import { SecurityPage } from "../pages/SecurityPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "inventory",
        element: <InventoryPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "security",
        element: <SecurityPage />,
      },
    ],
  },
]);
