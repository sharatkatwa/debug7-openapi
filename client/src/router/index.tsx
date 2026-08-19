import { createBrowserRouter } from "react-router-dom";
import { AppLayout, ProtectedRoute } from "../components";
import { DashboardPage, InventoryPage, OrdersPage, SecurityPage } from "../pages";

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
        element: (
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "security",
        element: <SecurityPage />,
      },
    ],
  },
]);
