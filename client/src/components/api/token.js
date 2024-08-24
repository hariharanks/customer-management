import axios from 'axios';

const baseURL = "http://127.0.0.1:3000";

// Function to get token from localStorage
export const getToken = () => localStorage.getItem("token") || "";

// Create axios instance with baseURL
export const axiosInstance = axios.create({
  baseURL,
});

// Interceptor to add Authorization header before each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken(); // Get the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
