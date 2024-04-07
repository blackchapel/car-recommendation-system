import React from "react";
import { useMediaQuery } from "@mui/material";
import { data } from "../data/sample-data.js";
import ResultsCard from "../components/ResultsCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CustomSearchBar from "../components/CustomSearchBar.jsx";
const cars = data;
const SearchResults = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px",
        // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url("/assets/car8.jpg")`,
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        backgroundColor: "black",
      }}
    >
      <CustomSearchBar width="50%" />
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {cars.map((car, index) => (
          <Grid item xs={12} md={4} lg={3}>
            <ResultsCard
              key={index}
              make={car.make}
              model={car.model}
              car_type={car.car_type}
              drive_train={car.drive_train}
              price={car.price}
              image={car.image}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchResults;
