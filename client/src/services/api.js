import axios from "axios";

const API = axios.create({
  baseURL: "https://car-rental-system-3cv5.onrender.com/api",
  withCredentials: true,
});

// Attach JWT token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
