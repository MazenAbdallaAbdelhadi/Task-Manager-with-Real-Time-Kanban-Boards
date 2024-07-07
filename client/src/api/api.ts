import axios from "axios";

const BASE_URL = "http://localhost:3500/api";

export const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    const parsedToken = JSON.parse(token);
    config.headers.Authorization = `Bearer ${parsedToken}`;
  }

  return config;
});
