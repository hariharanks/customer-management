import axios from 'axios';
const baseURL = "http://127.0.0.1:3000";

// Function to get token from localStorage
export const getToken = () => localStorage.getItem("token") || "";

// Function to get Authorization header
export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

// Create axios instance with baseURL and Authorization header
export const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: getAuthorizationHeader() },
});
