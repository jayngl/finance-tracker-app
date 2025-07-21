import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import TransactionsPage from "./Pages/TransactionsPage";
import RecurringBillsPage from "./Pages/RecurringBillsPage";
import PotsPage from "./Pages/PotsPage";
import BudgetsPage from "./Pages/BudgetsPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/transactions", element: <TransactionsPage /> },
        { path: "/recurring-bills", element: <RecurringBillsPage /> },
        { path: "/pots", element: <PotsPage /> },
        { path: "/budgets", element: <BudgetsPage /> },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
