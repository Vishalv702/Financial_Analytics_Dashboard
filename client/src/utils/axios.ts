// src/utils/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Send cookies with every request
});

// Optional: Add interceptor for global error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('Axios Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
