import axios from "axios";
import { API_BASE_URL } from "../config";
import { getToken } from "./authService";

// একটা Post এর সব Comment আনা
export const getPostComments = async (postId) => {
  const response = await axios.get(`${API_BASE_URL}/api/Comments/${postId}`);
  return response.data;
};

// নতুন Comment যোগ করা
export const createComment = async (postId, content) => {
  const token = getToken();
  const response = await axios.post(
    `${API_BASE_URL}/api/Comments/${postId}`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Comment মোছা
export const deleteComment = async (commentId) => {
  const token = getToken();
  const response = await axios.delete(
    `${API_BASE_URL}/api/Comments/${commentId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};