import axios from "axios";
import toast from "react-hot-toast";
import CONFIG from "./config";

export const api = axios.create({
    baseURL: CONFIG.API_URL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.message || error.message || "Something went wrong";
        if (typeof window !== "undefined") {
            const status = error.response?.status;
            if (status && status >= 500) toast.error("Server error. Try again.");
            else toast.error(message);
        }
        return Promise.reject(error);
    },
);
