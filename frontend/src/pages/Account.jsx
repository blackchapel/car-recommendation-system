import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../components/layouts/common/ResponsiveAppBar";
import { getUser, deleteUser } from "../apis/user";
import { Card, Typography } from "@mui/material";
import { CardContent } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Icon from "@mui/material/Icon";

const Account = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/auth/login");
      return;
    }

    const getUserData = async () => {
      try {
        const data = await getUser(user.access_token);
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  if (isLoading)
    return (
      <div>
        <ResponsiveAppBar />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "auto",
          }}
        >
          <img src={"/assets/car-loading.gif"} alt="Loading..." />
        </div>
      </div>
    );
  return (
    <div>
      <ResponsiveAppBar />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
          backgroundColor: "black",
        }}
      >
        <Avatar
          alt={user.username}
          src={"/assets/engine.png"}
          sx={{
            width: 130,
            height: 130,
            marginTop: 15,
            backgroundColor: "#121212",
            padding: 1,
          }}
        />
        <Card
          style={{
            width: "80%",
            marginTop: 20,
            backgroundColor: "#121212",
            color: "white",
            borderRadius: 10,
            padding: 8,
          }}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={5} md={5}>
                <Typography
                  variant="h6"
                  color="red"
                  sx={{
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    letterSpacing: "0.1rem",
                  }}
                >
                  Name
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
                  {user.name}
                </Typography>
                <Typography
                  variant="h6"
                  color="red"
                  marginTop="10px"
                  sx={{
                    fontFamily: "Montserrat",
                    fontWeight: 500,
                    letterSpacing: "0.1rem",
                  }}
                >
                  Email
                </Typography>
                <Typography
                  variant="h6"
                  color="#f4f4f4"
                  marginTop="6px"
                  sx={{
                    fontFamily: "Montserrat",
                    fontWeight: 500,
                    letterSpacing: "0.1rem",
                  }}
                >
                  {user.email}
                </Typography>
              </Grid>
              <Grid item xs={12} lg={7} md={7} sx={{ borderLeft: "20  red" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    color="red"
                    sx={{
                      fontFamily: "Montserrat",
                      fontWeight: 600,
                      letterSpacing: "0.1rem",
                    }}
                  >
                    Car Name
                  </Typography>
                  <Typography
                    variant="h6"
                    color="red"
                    sx={{
                      fontFamily: "Montserrat",
                      fontWeight: 600,
                      letterSpacing: "0.1rem",
                    }}
                  >
                    Rating
                  </Typography>
                </div>
                <div style={{ marginTop: 15, padding: 3 }}>
                  {user.ratings.map((rating, index) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 8,
                      }}
                    >
                      <Typography
                        key={index}
                        variant="h6"
                        color="#f4f4f4"
                        sx={{
                          fontFamily: "Montserrat",
                          fontWeight: 500,
                          letterSpacing: "0.1rem",
                        }}
                      >
                        {rating.make_model}
                      </Typography>
                      <Typography
                        key={index}
                        variant="h6"
                        color="#f4f4f4"
                        sx={{
                          fontFamily: "Montserrat",
                          fontWeight: 500,
                          letterSpacing: "0.1rem",
                          marginLeft: -100,
                        }}
                      >
                        <Icon color="red">
                          <AutoAwesomeIcon color="red" />
                        </Icon>{" "}
                        {rating.rating}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <button
                onClick={async () => {
                  await deleteUser(user.access_token);
                  localStorage.removeItem("user");
                  navigate("/auth/login");
                }}
                style={{
                  backgroundColor: "#FF474C",
                  color: "white",
                  padding: 10,
                  borderRadius: 5,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Delete Account
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Account;
