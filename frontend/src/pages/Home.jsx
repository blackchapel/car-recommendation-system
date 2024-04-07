import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
const Home = () => {
  const theme = useTheme();
  return (
    <Box
      style={{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url("/assets/car7.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `100vh`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    ></Box>
  );
};

export default Home;
