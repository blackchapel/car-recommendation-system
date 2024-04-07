import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

import Layout from "./components/Layout";
import LayoutAuth from "./components/LayoutAuth";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <Home /> }],
  },
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

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#c80815",
    },
    secondary: {
      main: "#c85b08",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
}

export default App;
