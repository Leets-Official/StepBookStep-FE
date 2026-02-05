import axios, { AxiosError } from "axios";
import type { AxiosResponse } from "axios";

const BASE_URL = import.meta.env.VITE_STEPBOOKSTEP_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// Response 인터셉터
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      // 필요 시 로그인 이동
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default apiClient;
