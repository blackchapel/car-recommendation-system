import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import SearchContext from "../context/SearchContext";
import ResultsCard from "../components/search/ResultsCard.jsx";
import { getCarsInUserRatings, getCarsMatrixFactorization } from "../apis/car";
import { getUser } from "../apis/user.js";

const Ratings = () => {
  const navigate = useNavigate();

  const { selectedCar, setSelectedCar } = useContext(SearchContext);

  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [recommendedCars, setRecommendedCars] = useState([]);

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);

      if (localStorage.getItem("user") == null) {
        navigate("/auth/login");
      } else {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.access_token;
        const newUser = await getUser(token);
        localStorage.setItem("user", JSON.stringify(newUser));

        if (JSON.parse(localStorage.getItem("user"))?.ratings.length !== 0) {
          const carsRes = await getCarsInUserRatings(
            JSON.parse(localStorage.getItem("user"))?.access_token
          );
          const recommendedCarsRes = await getCarsMatrixFactorization(
            JSON.parse(localStorage.getItem("user"))?.access_token
          );
          console.log(carsRes);
          setCars(carsRes);
          setRecommendedCars(recommendedCarsRes);
        }
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    isLoggedIn();
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
      ) : JSON.parse(localStorage.getItem("user"))?.ratings.length == 0 ? (
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
            No Ratings
          </Typography>
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
            My Ratings
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
            {cars.map((car, index) => (
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

          <Typography
            variant="h4"
            sx={{
              color: "white",
              mt: 5,
              fontFamily: "Montserrat",
              fontWeight: 700,
            }}
          >
            Similiar Cars
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
      )}
    </>
  );
};

export default Ratings;
