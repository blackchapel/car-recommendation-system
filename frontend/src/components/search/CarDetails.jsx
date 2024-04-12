import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import SearchContext from "../../context/SearchContext";
import Features from "./Features";
import { giveRating } from "../../apis/user";

export default function CarDetails() {
  const { selectedCar, setSelectedCar } = useContext(SearchContext);

  const {
    index,
    make,
    model,
    make_model,
    city_mpg_for_fuel_type1,
    co2_fuel_type1,
    cylinders,
    drive,
    annual_fuel_cost_for_fuel_type1,
    fuel_type,
    id,
    transmission,
    vehicle_size_class,
    year,
    atv_type,
    electric_motor,
    base_model,
    image,
    price,
  } = selectedCar;
  const [rating, setRating] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertProperties, setAlertProperties] = useState({
    message: "",
    severity: "success",
    actions: "",
  });

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <>
      <Card sx={{ width: "80vw", mt: 4 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} lg={7} md={5}>
            <CardMedia
              sx={{ height: "100%" }}
              component="img"
              image={image}
              title={make_model}
              onError={(e) => {
                e.target.src = `/assets/backup-cars/car${Math.floor(
                  Math.random() * 5
                )}.jpg`;
              }}
            />
          </Grid>
          <Grid item xs={12} lg={5} md={7}>
            <CardContent
              sx={{
                pt: 3,
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                  letterSpacing: "0.05rem",
                }}
              >
                {make} {model}
              </Typography>
              <Typography
                variant="h6"
                color="#f4f4f4"
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  letterSpacing: "0.1rem",
                }}
              >
                {price}
              </Typography>
              <Grid
                container
                sx={{
                  mt: 2,
                }}
              >
                <Grid item>
                  <Typography
                    variant="subtitle2"
                    color="#f4f4f4"
                    sx={{ mt: 0.3 }}
                  >
                    {`Rate: `} &nbsp;
                  </Typography>
                </Grid>
                <Grid item>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={async (event, newValue) => {
                      setRating(newValue);
                      if (localStorage.getItem("user") == null) {
                        setAlertProperties({
                          message: "Please login to rate the car",
                          severity: "error",
                          actions: (
                            <Button
                              color="inherit"
                              href="/auth/login"
                              size="small"
                            >
                              Login
                            </Button>
                          ),
                        });
                        setOpenAlert(true);
                        return;
                      } else {
                        const res = await giveRating(
                          index,
                          make_model,
                          newValue,
                          JSON.parse(localStorage.getItem("user")).access_token
                        );
                        console.log(res);
                        setAlertProperties({
                          message: "Thank you for rating the car",
                          severity: "success",
                        });
                        setOpenAlert(true);
                      }
                    }}
                  />
                </Grid>
              </Grid>

              <Features />
            </CardContent>
          </Grid>
        </Grid>
      </Card>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
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
}
