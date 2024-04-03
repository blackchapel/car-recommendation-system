import axios from "axios";

import { API_URL, LOGIN, SIGNUP } from "../utils/constants";

export const loginPost = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/${LOGIN}`, loginData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signupPost = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/${SIGNUP}`, loginData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
