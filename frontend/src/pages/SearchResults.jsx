import React, { useEffect, useContext, useState } from "react";
import { useMediaQuery } from "@mui/material";
import ResultsCard from "../components/ResultsCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CustomSearchBar from "../components/CustomSearchBar.jsx";
import SearchContext from "../context/SearchContext";
import { useParams } from "react-router-dom";
import { getSimilarCars } from "../apis/cars";

const SearchResults = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const searchQuery = useParams();

  const [similarCars, setSimilarCars] = useState([]);

  const { selectedCar, setSelectedCar } = useContext(SearchContext);
  useEffect(() => {
    async function getSimilarCarsFn() {
      const response = await getSimilarCars(selectedCar?.index);

      response?.length > 1 && setSimilarCars(response);
    }
    getSimilarCarsFn();
  }, [selectedCar]);

  return similarCars && similarCars.length === 0 ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "black",
        height: "100vh",
      }}
    >
      <img src="/assets/car-loading.gif" alt="loading" />
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px",
        paddingTop: "70px",
        backgroundColor: "black",
      }}
    >
      <CustomSearchBar width={isSmallScreen ? "90%" : "60%"} />
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {similarCars.map((car, index) => (
          <Grid item xs={12} md={4} lg={4}>
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
