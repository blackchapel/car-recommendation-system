import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
// import Home from "./pages/Home";
import LayoutAuth from "./components/LayoutAuth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Layout />,
  //     errorElement: <ErrorPage />,
  //     children: [{ index: true, element: <Home /> }],
  //   },
  {
    path: "/auth",
    element: <LayoutAuth />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/signup", element: <Signup /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
