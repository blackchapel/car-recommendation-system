import axios from "axios";

import {
  API_URL,
  CAR_AUTOCOMPLETE,
  CAR_RATING,
  CAR_RECOMMEND_KMEANS,
  CAR_RECOMMEND_MATRIX_FACTORIZATION,
  CAR_RECOMMEND_WE,
} from "../utils/constants";

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

export const getCarsWordEmbeddings = async (index) => {
  try {
    const response = await axios.get(`${API_URL}/${CAR_RECOMMEND_WE}${index}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCarsKMeans = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/${CAR_RECOMMEND_KMEANS}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCarsMatrixFactorization = async (token) => {
  try {
    const response = await axios.get(
      `${API_URL}/${CAR_RECOMMEND_MATRIX_FACTORIZATION}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCarsInUserRatings = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/${CAR_RATING}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
