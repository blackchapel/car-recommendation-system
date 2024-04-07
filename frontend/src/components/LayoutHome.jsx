import React from "react";
import { Outlet } from "react-router-dom";

import ResponsiveAppBar from "./ResponsiveAppBarHome";
import Footer from "./Footer";

const LayoutHome = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
    </>
  );
};

export default LayoutHome;
