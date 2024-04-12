import axios from "axios";

import { API_URL, USER } from "../utils/constants";

export const getUser = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/${USER}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (token) => {
  try {
    const response = await axios.delete(`${API_URL}/${USER}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const giveRating = async (index, make_model, rating, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/${USER}/rating`,
      {
        index,
        make_model,
        rating,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
