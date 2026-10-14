import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:4000",
  timeout: 5000,
  headers: {
    "content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
