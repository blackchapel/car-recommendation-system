import React from "react";
import { Outlet } from "react-router-dom";

import ResponsiveAppBar from "./common/ResponsiveAppBarHome";

const LayoutHome = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
    </>
  );
};

export default LayoutHome;
