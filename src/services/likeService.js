import axios from "axios";
import { API_BASE_URL } from "../config";
import { getToken } from "./authService";

// Like/Unlike Toggle করার function
export const toggleLike = async (postId) => {
  const token = getToken();
  const response = await axios.post(
    `${API_BASE_URL}/api/Likes/${postId}/toggle`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};