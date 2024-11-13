import axios from "axios";
import LocalStorage from "./localStorage";

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  status: number;
}

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
apiClient.interceptors.request.use(async (config) => {
  try {
    const token = await LocalStorage.getItem(LocalStorage.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (_) {}

  return config;
});

export const apiFetcher = (url: string) =>
  apiClient.get(url).then((res) => res.data);

export default apiClient;
