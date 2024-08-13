import { createBrowserRouter } from "react-router-dom";
import { AppPage } from "../AppPage";
import { CatalogPage } from "../pages/catalog/CatalogPage";
import { AboutPage } from "../pages/about/AboutPage";
import { LoginPage } from "../pages/login/LoginPage";
import { RegisterPage } from "../pages/register/RegisterPage";
import { ContactPage } from "../pages/contact/ContactPage";
import { HomePage } from "../pages/home/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "catalog",
        element: <CatalogPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);
