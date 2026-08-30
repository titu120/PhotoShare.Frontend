import axios from "axios";
import { API_BASE_URL } from "../config";
import { getToken } from "./authService";

export const getFeed = async (page = 1, pageSize = 10) => {
  const token = getToken();
  const response = await axios.get(
    `${API_BASE_URL}/api/Posts/feed?page=${page}&pageSize=${pageSize}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const getExploreFeed = async () => {
  const token = getToken();
  const response = await axios.get(`${API_BASE_URL}/api/Posts/explore`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// একটা নির্দিষ্ট Post এর বিস্তারিত তথ্য আনা
export const getPostById = async (postId) => {
  const response = await axios.get(`${API_BASE_URL}/api/Posts/${postId}`);
  return response.data;
};