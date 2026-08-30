import axios from "axios";
import { API_BASE_URL } from "../config";
import { getToken } from "./authService";

// Feed আনার function — logged-in user যাদের follow করে তাদের Post
export const getFeed = async (page = 1, pageSize = 10) => {
  const token = getToken();
  const response = await axios.get(
    `${API_BASE_URL}/api/Posts/feed?page=${page}&pageSize=${pageSize}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// Explore feed আনার function — জনপ্রিয় Post, যাদের follow করা হয়নি
export const getExploreFeed = async () => {
  const token = getToken();
  const response = await axios.get(`${API_BASE_URL}/api/Posts/explore`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};