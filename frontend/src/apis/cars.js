import axios from "axios";

export const getCars = async () => {
  const options = {
    method: "GET",
    url: "https://all-cars-names-image-and-variants-info.p.rapidapi.com/motororchestrator/api/v1/mmv",
    params: {
      vehicle_type: "car",
    },
    headers: {
      "X-RapidAPI-Key": "66c4ff4adamsh9cf53b0229605acp18efbejsn93ac86eb28c9",
      "X-RapidAPI-Host":
        "all-cars-names-image-and-variants-info.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const API_URL = "https://jtp-recommendation-system.onrender.com/api";

export const getAutocomplete = async (searchValue) => {
  try {
    const response = await axios.get(
      `${API_URL}/cars/autocomplete?name=${searchValue}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
