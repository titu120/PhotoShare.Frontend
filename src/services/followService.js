import axios from "axios";
import { API_BASE_URL } from "../config";
import { getToken } from "./authService";

// Follow করা
export const followUser = async (userId) => {
  const token = getToken();
  const response = await axios.post(
    `${API_BASE_URL}/api/Follow/${userId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Unfollow করা
export const unfollowUser = async (userId) => {
  const token = getToken();
  const response = await axios.delete(`${API_BASE_URL}/api/Follow/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Followers list আনা
export const getFollowers = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/api/Users/${userId}/followers`);
  return response.data;
};

// Following list আনা
export const getFollowing = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/api/Users/${userId}/following`);
  return response.data;
};

// আগের সব function এর নিচে যোগ করুন

export const getSuggestedUsers = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/api/Follow/${userId}/suggested`);
  return response.data;
};