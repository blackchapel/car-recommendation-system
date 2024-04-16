import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import { loginPost } from "../apis/auth";

const Login = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [values, setValues] = React.useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    try {
      setIsLoading(true);
      setError("");
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      if (data.get("username") < 1 || data.get("password") < 1) {
        setError("Please enter credentials!");
      } else {
        const response = await loginPost({
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
        <Grid
          item
          sm={12}
          md={4}
          elevation={5}
          square
          sx={{ borderRadius: "20px" }}
        >
          <CssBaseline />
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
              <LockOutlinedIcon sx={{ color: "#f4f4f4" }} />
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
              Log In
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
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                color="secondary"
                autoFocus
                onChange={(e) =>
                  setValues((prev) => {
                    return { ...prev, username: e.target.value };
                  })
                }
                error={
                  values.username.length < 1 &&
                  error == "Please enter credentials!"
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
                color="secondary"
                autoComplete="current-password"
                onChange={(e) =>
                  setValues((prev) => {
                    return { ...prev, password: e.target.value };
                  })
                }
                error={
                  values.password.length < 1 &&
                  error == "Please enter credentials!"
                }
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
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
                  sx={{ mt: 2, mb: 2 }}
                >
                  Log in
                </Button>
              )}

              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/auth/signup" variant="body2" color="secondary">
                    {"Don't have an account? Sign up"}
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

export default Login;
