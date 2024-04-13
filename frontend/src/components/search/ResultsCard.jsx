import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import Typography from "@mui/material/Typography";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
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
        <ElectricBoltIcon sx={{ color: "ev.main" }} />
      </IconButton>
    );
  } else {
    return (
      <IconButton aria-label={type}>
        <EnergySavingsLeafIcon sx={{ color: "hybrid.main" }} />
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
        height: "75vh",
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
            fontWeight: 600,
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "20px 0 0 0",
          }}
        >
          <Tooltip title={"Vehicle Type"} placement="top">
            {Icon(atv_type)}
          </Tooltip>
          <Typography color="#f4f4f4">{atv_type}</Typography>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Tooltip title={"Vehicle Drive"} placement="top">
            <IconButton aria-label={drive}>
              <DirectionsCarIcon sx={{ color: "primary.main" }} />
            </IconButton>
          </Tooltip>
          <Typography color="#f4f4f4">{drive}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsCard;
