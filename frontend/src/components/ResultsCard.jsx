import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import IconButton from "@mui/material/IconButton";

const Icon = (type) => {
  if (type == "ICE") {
    return (
      <IconButton aria-label={type}>
        <LocalFireDepartmentIcon sx={{ color: "primary.main" }} />
      </IconButton>
    );
  } else if (type == "Electric") {
    return (
      <IconButton aria-label={type}>
        <ElectricBoltIcon sx={{ color: "primary.main" }} />
      </IconButton>
    );
  } else if (type == "Hybrid") {
    return (
      <>
        <IconButton aria-label={type}>
          <LocalFireDepartmentIcon sx={{ color: "primary.main" }} />
          <ElectricBoltIcon sx={{ color: "primary.main" }} />
        </IconButton>
      </>
    );
  }
};

function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function ResultsCard({
  make,
  model,
  car_type,
  drive_train,
  price,
  image,
}) {
  return (
    <Card
      sx={{
        borderRadius: 5,
        color: "#fff",
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          color: "#fff",
          boxShadow: 5,
          backgroundColor: "#000",
          cursor: "pointer",
          transform: "scale(1.01)",
        },
      }}
    >
      <CardMedia sx={{ height: 250 }} image={image} title={make} />
      <CardContent sx={{ px: "20px" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 700,
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
      </CardContent>
      <CardActions>
        {Icon(car_type)}
        <Typography variant="subtitle2" color="#f4f4f4">
          {capitalizeWords(drive_train)}
        </Typography>
      </CardActions>
    </Card>
  );
}
