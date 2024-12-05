import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import App from "../App";
import AboutPage from "../pages/AboutPage";
import MenuPage from "../pages/MenuPage";
import Register from "../pages/Register";
import Login from "../pages/Login";

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
        path: "Register",
        element: <Register />,
      },
      {
        path: "Login",
        element: <Login />,
      },
    ],
  },
]);
