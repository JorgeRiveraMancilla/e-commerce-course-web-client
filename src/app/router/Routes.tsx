import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppPage } from "../AppPage";
import { CatalogPage } from "../pages/catalog/CatalogPage";
import { AboutPage } from "../pages/about/AboutPage";
import { LoginPage } from "../pages/login/LoginPage";
import { RegisterPage } from "../pages/register/RegisterPage";
import { ContactPage } from "../pages/contact/ContactPage";
import { HomePage } from "../pages/home/HomePage";
import { ServerErrorPage } from "../pages/server-error/ServerErrorPage";
import { NotFoundPage } from "../pages/not-found/NotFoundPage";
import { ProfilePage } from "../pages/profile/ProfilePage";
import { ProductDetailsPage } from "../pages/catalog/pages/product-details/ProductDetailsPage";
import { CheckoutPage } from "../pages/checkout/CheckoutPage";
import { RequireAuth } from "./RequireAuth";
import { BasketPage } from "../pages/basket/BasketPage";
import { OrderPage } from "../pages/order/OrderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppPage />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "/checkout", element: <CheckoutPage /> },
          { path: "/order", element: <OrderPage /> },
        ],
      },
      { path: "/", element: <HomePage /> },
      { path: "/catalog", element: <CatalogPage /> },
      { path: "/catalog/:id", element: <ProductDetailsPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/basket", element: <BasketPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/server-error", element: <ServerErrorPage /> },
      { path: "/not-found", element: <NotFoundPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
