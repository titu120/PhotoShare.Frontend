import axios from "axios";
import { API_BASE_URL } from "../config";

// Register করার function
// email আর password নিয়ে, Backend এর POST /register এ পাঠায়
export const registerUser = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/register`, {
    email: email,
    password: password,
  });
  return response.data;
};

// Login করার function
// email আর password নিয়ে, Backend এর POST /login এ পাঠায়
// সফল হলে response এ accessToken পাওয়া যাবে
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/login`, {
    email: email,
    password: password,
  });
  return response.data;
};