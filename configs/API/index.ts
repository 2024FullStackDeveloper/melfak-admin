import useAuthState from "@/services/zustand/authState";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
  headers: {
    Accept: "application/json",
    contentType: "application/json",
  },
  validateStatus: (status) => status < 500, // or whatever rule you want
});

// Helper function to get cookie value by name
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const { accessToken } = useAuthState.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Add lang query parameter from NEXT_LOCALE cookie
    const locale = getCookie("NEXT_LOCALE");
    if (locale) {
      // Ensure params object exists
      config.params = config.params || {};
      // Add lang parameter
      config.params.lang = locale;
    }

    //console.log("Request Config:", config);

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => Promise.resolve(response),
  async (error) => {
    if (error.response?.status === 401) {
      const { logout } = useAuthState.getState();
      logout();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const setAuthorizationToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.Authorization;
  }
};

export default axiosInstance;
