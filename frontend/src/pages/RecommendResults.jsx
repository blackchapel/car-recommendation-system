import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import ResultsCard from "../components/search/ResultsCard.jsx";

const RecommendResults = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedCars, setRecommendedCars] = useState([]);

  const fetchCars = () => {
    setIsLoading(true);
    setRecommendedCars(JSON.parse(localStorage.getItem("recommended_cars")));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <>
      {isLoading ? (
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
            paddingTop: "50px",
            backgroundColor: "black",
            paddingBottom: "50px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "white",
              mt: 5,
              fontFamily: "Montserrat",
              fontWeight: 700,
            }}
          >
            Recommended Cars
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
            {recommendedCars.map((car, index) => (
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
      )}
    </>
  );
};

export default RecommendResults;
