import axios from "axios";

import { API_URL, CAR_AUTOCOMPLETE, CAR_SIMILAR } from "../utils/constants";

export const getAutocomplete = async (searchValue) => {
  try {
    const response = await axios.get(
      `${API_URL}/${CAR_AUTOCOMPLETE}${searchValue}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSimilarCars = async (index) => {
  try {
    const response = await axios.get(`${API_URL}/${CAR_SIMILAR}${index}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
