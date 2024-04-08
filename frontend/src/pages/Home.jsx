import React, { useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";
import carList from "../data/carList.json";
import CustomSearchBar from "../components/CustomSearchBar";
import SearchContext from "../context/SearchContext";

// const CARS = allCars.vehicles;

const Home = () => {
  const theme = useTheme();
  const { carNames, setCarNames, searchValue, setSearchValue } =
    useContext(SearchContext);
  useEffect(() => {
    const cars = JSON.parse(carList);
    const uniqueNames = [...new Set(cars)];
    setCarNames(uniqueNames);
  }, []);

  return (
    <Box
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url("/assets/car8.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `100vh`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CustomSearchBar width="75%" />
    </Box>
  );
};

export default Home;
