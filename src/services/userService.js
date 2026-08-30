import axios from "axios";
import { API_BASE_URL } from "../config";
import { getToken } from "./authService";

// একজন user এর profile তথ্য আনা
export const getUserProfile = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/api/Users/${userId}`);
  return response.data;
};

// একজন user এর সব Post আনা
export const getUserPosts = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/api/Users/${userId}/posts`);
  return response.data;
};

// নিজের profile update করা
export const updateMyProfile = async (bio, profilePictureUrl) => {
  const token = getToken();
  const response = await axios.put(
    `${API_BASE_URL}/api/Users/me`,
    { bio, profilePictureUrl },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};