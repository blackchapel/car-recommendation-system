import React from "react";
import { Outlet } from "react-router-dom";

import ResponsiveAppBar from "./common/ResponsiveAppBarHome";
import Footer from "./common/Footer";

const LayoutHome = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
    </>
  );
};

export default LayoutHome;
