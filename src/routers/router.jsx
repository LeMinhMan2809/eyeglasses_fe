import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ListingProduct from "../pages/ListingProduct";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Profile from "../pages/Profile";

import PrivateRoute from "../components/PrivateRoute";
import Order from "../pages/Order";
import Payment from "../pages/Payment";
import Thanks from "../pages/Thanks";
import OrderDetail from "../pages/OrderDetail";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import WishList from "../pages/WishList";
import Blog from "../pages/Blog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <PrivateRoute>
            <WishList />
          </PrivateRoute>
        ),
      },

      {
        path: "category/:categoryID",
        element: <ListingProduct />,
      },

      {
        path: "search",
        element: <ListingProduct />,
      },

      {
        path: "product/:id",
        element: <ProductDetail />,
      },

      {
        path: "cart",
        element: <Cart />,
      },

      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "order/:orderID",
        element: (
          <PrivateRoute>
            <OrderDetail />
          </PrivateRoute>
        ),
      },
      {
        path: "/blog",
        element: <Blog />,
      },
    ],
  },
  {
    path: "/forgotpw",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:id/:token",
    element: <ResetPassword />,
  },
  {
    path: "/thanks",
    element: (
      <PrivateRoute>
        <Thanks />
      </PrivateRoute>
    ),
  },
]);

export default router;
