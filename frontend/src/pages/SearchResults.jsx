import React, { useEffect, useContext, useState } from "react";
import { useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useParams, useNavigate } from "react-router-dom";

import CustomSearchBar from "../components/search/CustomSearchBar.jsx";
import SearchContext from "../context/SearchContext";
import ResultsCard from "../components/search/ResultsCard.jsx";
import { getSimilarCars } from "../apis/car";
import CarDetails from "../components/search/CarDetails.jsx";

const SearchResults = () => {
  const navigate = useNavigate();
  const searchQuery = useParams();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [similarCars, setSimilarCars] = useState([]);
  const { selectedCar, setSelectedCar } = useContext(SearchContext);

  useEffect(() => {
    const getSimilarCarsFn = async () => {
      setSimilarCars([]);
      const response = await getSimilarCars(parseInt(searchQuery.searchQuery));
      response?.length > 1 && setSimilarCars(response);
    };
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
      <CarDetails />
      <Divider sx={{ width: "80vw", mt: 5 }} />
      <Typography
        variant="h4"
        sx={{
          color: "white",
          mt: 5,
          fontFamily: "Montserrat",
          fontWeight: 700,
        }}
      >
        Similar Cars
      </Typography>
      <Divider
        sx={{
          width: "8vw",
          bgcolor: "primary.main",
          borderBottomWidth: "3px",
          mt: 1,
        }}
      />
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {similarCars.map((car, index) => (
          <Grid item xs={12} md={4} lg={4}>
            <ResultsCard
              onClick={() => {
                setSelectedCar(car);
                navigate(`/search/${car.index}`);
              }}
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
