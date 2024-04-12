import React from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  CardActions,
} from "@mui/material";
import Stepper from "./Stepper";

export default function QuestionCard({
  question,
  index,
  setIndex,
  length,
  setAnswers,
  handleSubmit,
  answers,
}) {
  return (
    <Card
      sx={{
        borderRadius: 5,
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: {
          md: "80vh",
          sm: "90vh",
        },
        width: {
          md: "60vw",
          sm: "80vw",
        },
      }}
    >
      <CardActions>
        <Typography
          variant="h6"
          color={"#fff"}
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 500,
            letterSpacing: "0.1rem",
            mt: {
              md: 2,
              sm: 5,
            },
          }}
        >
          {index + 1}/{length}
        </Typography>
      </CardActions>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          textAlign: "center",
          color: "#fff",
          width: "100%",
          px: {
            md: 10,
          },
        }}
      >
        <Stepper
          activeStep={index}
          length={length}
          setActiveStep={setIndex}
          handleSubmit={handleSubmit}
        />
        <Typography
          variant="h5"
          component="h2"
          color={"#fff"}
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 700,
            letterSpacing: "0.05rem",
            mb: 7,
            mt: 2,
          }}
        >
          {question.question}
        </Typography>

        <Grid container>
          {question.options.map((option, n) => (
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Button
                key={n}
                variant="contained"
                color="primary"
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  letterSpacing: "0.1rem",
                  m: 1,
                  width: "100%",
                  height: "100%",
                  py: "10px",
                  px: "10px",
                }}
                onClick={() => {
                  setAnswers((prev) => {
                    return {
                      ...prev,
                      ...option.value,
                    };
                  });
                  if (index === length - 1) {
                    handleSubmit({
                      ...answers,
                      ...option.value,
                    });
                  } else {
                    setIndex(index + 1);
                  }
                }}
              >
                {option.key}
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
