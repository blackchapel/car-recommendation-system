import React, { useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { data } from "../data/sample-data.js";
import ResultsCard from "../components/ResultsCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CustomSearchBar from "../components/CustomSearchBar.jsx";
import { useParams } from "react-router-dom";
const cars = data;
const SearchResults = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const searchQuery = useParams();

  console.log(searchQuery);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px",
        paddingTop: isSmallScreen ? "60px" : "10px",
        backgroundColor: "black",
      }}
    >
      <CustomSearchBar width={isSmallScreen ? "90%" : "50%"} />
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {cars.map((car, index) => (
          <Grid item xs={12} md={4} lg={3}>
            <ResultsCard
              key={index}
              make={car.make}
              model={car.model}
              atv_type={car.atv_type}
              drive={car.drive}
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
