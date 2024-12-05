import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import App from "../App";
import AboutPage from "../pages/AboutPage";
import MenuPage from "../pages/MenuPage";

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
    ],
  },
]);
