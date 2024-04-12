import React from "react";
import QuestionCard from "../components/recommend/QuestionCard";
import Box from "@mui/material/Box";
import { questions } from "../data/questions";

export default function Recommend() {
  const [index, setIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState({
    vehicle_size_class: "",
    price: "",
    year: "",
    city_mpg_for_fuel_type1: "",
    co2_fuel_type1: "",
    atv_type: "",
  });

  const handleSubmit = (ans) => {
    console.log(ans);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
          padding: "20px",
          paddingTop: "70px",
          backgroundColor: "black",
        }}
      >
        <QuestionCard
          key={index}
          question={questions[index]}
          index={index}
          setIndex={setIndex}
          length={questions.length}
          setAnswers={setAnswers}
          handleSubmit={handleSubmit}
          answers={answers}
        />
      </Box>
    </>
  );
}
