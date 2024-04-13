import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";

import SearchContext from "../context/SearchContext";
import ResultsCard from "../components/search/ResultsCard.jsx";
import { getCarsInUserRatings, getCarsMatrixFactorization } from "../apis/car";

const Ratings = () => {
  const navigate = useNavigate();

  const { selectedCar, setSelectedCar } = useContext(SearchContext);

  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [recommendedCars, setRecommendedCars] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertProperties, setAlertProperties] = useState({
    message: "",
    severity: "success",
    actions: "",
  });

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      if (localStorage.getItem("user") == null) {
        setAlertProperties({
          message: "Please login to view ratings",
          severity: "error",
          actions: (
            <Button color="inherit" href="/auth/login" size="small">
              Login
            </Button>
          ),
        });
        setOpenAlert(true);
      }

      if (JSON.parse(localStorage.getItem("user"))?.ratings.length == 0) {
        setAlertProperties({
          message: "You have zero ratings",
          severity: "error",
          actions: (
            <Button color="inherit" href="/" size="small">
              Home
            </Button>
          ),
        });
        setOpenAlert(true);
      } else {
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
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
    navigate("/");
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
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertProperties.severity}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          variant="filled"
          action={alertProperties.actions}
          sx={{ width: "100%", color: "#fff" }}
        >
          {alertProperties.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Ratings;
