import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import Typography from "@mui/material/Typography";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const Icon = (type) => {
  if (type === "Petrol" || type === "Diesel") {
    return (
      <IconButton aria-label={type}>
        <LocalFireDepartmentIcon sx={{ color: "primary.main" }} />
      </IconButton>
    );
  } else if (type === "EV") {
    return (
      <IconButton aria-label={type}>
        <ElectricBoltIcon sx={{ color: "primary.main" }} />
      </IconButton>
    );
  } else {
    return (
      <IconButton aria-label={type}>
        <EnergySavingsLeafIcon sx={{ color: "primary.main" }} />
      </IconButton>
    );
  }
};

const ResultsCard = ({
  make,
  model,
  atv_type,
  drive,
  price,
  image,
  onClick,
}) => {
  const [imgUrl, setImgUrl] = useState(image);

  return (
    <Card
      sx={{
        borderRadius: 5,
        color: "#fff",
        boxShadow: 3,
        transition: "0.3s",
        height: "60vh",
        "&:hover": {
          color: "#fff",
          boxShadow: 5,
          backgroundColor: "#000",
          cursor: "pointer",
          transform: "scale(1.01)",
        },
      }}
      onClick={() => onClick()}
    >
      <CardMedia
        component={"img"}
        sx={{ height: "60%" }}
        image={imgUrl}
        title={make}
        onError={() =>
          setImgUrl(
            `/assets/backup-cars/car${Math.floor(Math.random() * 5)}.jpg`
          )
        }
      />
      <CardContent sx={{ px: "20px", height: "28%" }}>
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
      </CardContent>
      <CardActions>
        <Tooltip title={atv_type} placement="top">
          {Icon(atv_type)}
        </Tooltip>
        <Typography variant="subtitle2" color="#f4f4f4">
          {drive}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default ResultsCard;
