import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import App from "../App";
import AboutPage from "../pages/AboutPage";
import MenuPage from "../pages/MenuPage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import CheckoutPage from "../pages/CheckoutPage";
import ProtectedRoute from "./ProtectedRoute";
import Admin from "../pages/Admin";
import Dashboard from "../components/Admin/Dashboard";
import ManageMenu from "../components/Admin/ManageMenu";
import ManageOrders from "../components/Admin/ManageOrders";
// import Orders from "../pages/Orders";
// import Products from "../pages/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "Menu",
        element: <MenuPage />,
      },
      {
        path: "About",
        element: <AboutPage />,
      },
      {
        path: "Admin",
        element: <Admin />,
        children: [
          {
            path: "Dashboard",
            element: <Dashboard />,
          },
          {
            path: "ManageMenu",
            element: <ManageMenu />,
          },
          {
            path: "ManageOrders",
            element: <ManageOrders />,
          },
        ],
      },
      {
        path: "Register",
        element: <Register />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "Checkout",
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
