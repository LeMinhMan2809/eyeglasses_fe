import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import router from "./routers/router.jsx";
import App from "./App.jsx";
import "./index.css";
import StoreContextProvider from "./context/StoreContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoreContextProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </StoreContextProvider>
  </StrictMode>
);
