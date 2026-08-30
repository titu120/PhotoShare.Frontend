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

export const getPostById = async (postId) => {
  const response = await axios.get(`${API_BASE_URL}/api/Posts/${postId}`);
  return response.data;
};

// নতুন Post তৈরি করা
export const createPost = async (caption, imageUrl) => {
  const token = getToken();
  const response = await axios.post(
    `${API_BASE_URL}/api/Posts`,
    { caption, imageUrl },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Post এর Caption Update করা
export const updatePost = async (postId, caption) => {
  const token = getToken();
  const response = await axios.put(
    `${API_BASE_URL}/api/Posts/${postId}`,
    { caption },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Post Delete করা
export const deletePost = async (postId) => {
  const token = getToken();
  const response = await axios.delete(`${API_BASE_URL}/api/Posts/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Caption দিয়ে Post খোঁজা
export const searchPosts = async (keyword) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/Posts/search?keyword=${encodeURIComponent(keyword)}`
  );
  return response.data;
};