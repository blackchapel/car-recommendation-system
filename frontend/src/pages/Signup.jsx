import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import { signupPost } from "../apis/auth";

const Signup = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = React.useState("");
  const [values, setValues] = React.useState({
    name: "",
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      setError("");
      const data = new FormData(event.currentTarget);
      if (
        data.get("username") < 1 ||
        data.get("password") < 1 ||
        data.get("name") < 1
      ) {
        setError("Please enter details!");
      } else {
        const response = await signupPost({
          name: data.get("name"),
          email: data.get("username"),
          password: data.get("password"),
        });
        localStorage.setItem("user", JSON.stringify(response));
        navigate("/", { replace: true });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response) {
        setError(error?.response?.data.detail);
      } else {
        setError("Something went wrong");
      }
      console.error(error);
    }
  };

  return (
    <Box>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CssBaseline />
        <Grid
          item
          sm={12}
          md={4}
          elevation={5}
          square
          sx={{ borderRadius: "20px" }}
        >
          <Box
            sx={{
              my: 6,
              mx: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon color="secondary" />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{
                fontFamily: "Montserrat",
                color: "secondary.main",
                fontWeight: 700,
              }}
            >
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                color="secondary"
                onChange={(e) =>
                  setValues((prev) => {
                    return { ...prev, name: e.target.value };
                  })
                }
                error={
                  values.name.length < 1 && error == "Please enter details!"
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                color="secondary"
                onChange={(e) =>
                  setValues((prev) => {
                    return { ...prev, username: e.target.value };
                  })
                }
                error={
                  values.username.length < 1 && error == "Please enter details!"
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                color="secondary"
                onChange={(e) =>
                  setValues((prev) => {
                    return { ...prev, password: e.target.value };
                  })
                }
                error={
                  values.password.length < 1 && error == "Please enter details!"
                }
              />

              <Typography
                color="error"
                type="subtitle1"
                align="center"
                fontWeight="bold"
              >
                {error}
              </Typography>

              {isLoading ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  <CircularProgress
                    sx={{
                      color: "#fff",
                    }}
                    size={30}
                    thickness={4}
                  />
                </Button>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign up
                </Button>
              )}

              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/auth/login" variant="body2" color="secondary">
                    {"Already have an account? Log in"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signup;
