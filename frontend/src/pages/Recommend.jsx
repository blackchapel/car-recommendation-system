import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

import QuestionCard from "../components/recommend/QuestionCard";
import { questions } from "../data/questions";
import { getRecommendedCars } from "../apis/car";

export default function Recommend() {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({
    vehicle_size_class: "",
    price: "",
    year: "",
    city_mpg_for_fuel_type1: "",
    co2_fuel_type1: "",
    atv_type: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (ans) => {
    try {
      setIsLoading(true);
      const response = await getRecommendedCars(ans);
      localStorage.setItem("recommended_cars", JSON.stringify(response));
      setIsLoading(false);
      navigate("/recommend/results");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

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
      )}
    </>
  );
}
