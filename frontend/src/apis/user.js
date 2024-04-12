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
