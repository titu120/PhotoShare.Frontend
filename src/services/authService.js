import axios from "axios";
import { API_BASE_URL } from "../config";

export const registerUser = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/register`, {
    email: email,
    password: password,
  });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/login`, {
    email: email,
    password: password,
  });

  // Login সফল হলে, response এর accessToken টা localStorage এ save করা হচ্ছে
  localStorage.setItem("token", response.data.accessToken);

  return response.data;
};

// Token localStorage থেকে বের করার function (ভবিষ্যতে বার বার লাগবে)
export const getToken = () => {
  return localStorage.getItem("token");
};

// Logout করার function — Token মুছে ফেলা
export const logoutUser = () => {
  localStorage.removeItem("token");
};