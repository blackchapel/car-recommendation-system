import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Layout from "./components/layouts/Layout";
import LayoutAuth from "./components/layouts/LayoutAuth";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LayoutHome from "./components/layouts/LayoutHome";
import SearchResults from "./pages/SearchResults";
import SearchContext from "./context/SearchContext";
import Account from "./pages/Account";
import Recommend from "./pages/Recommend";
import RecommendResults from "./pages/RecommendResults";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutHome />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "/recommend",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <Recommend /> }],
  },
  {
    path: "/search/:searchQuery",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <SearchResults /> }],
  },
  {
    path: "/recommend/results",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <RecommendResults /> }],
  },
  {
    path: "/user",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [{ path: "/user/me", element: <Account /> }],
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
    mode: "dark",
    primary: {
      main: "#c80815",
    },
    secondary: {
      main: "#c85b08",
    },
    background: {
      default: "#000",
    },
    ev: {
      main: "#59CBE8",
    },
    hybrid: {
      main: "#3BFF4B",
    },
  },
});

function App() {
  const [carNames, setCarNames] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedCar, setSelectedCar] = React.useState({});

  return (
    <ThemeProvider theme={theme}>
      <SearchContext.Provider
        value={{
          carNames,
          setCarNames,
          searchValue,
          setSearchValue,
          selectedCar,
          setSelectedCar,
        }}
      >
        <RouterProvider router={router} />;
      </SearchContext.Provider>
    </ThemeProvider>
  );
}

export default App;
