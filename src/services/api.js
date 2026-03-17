import axios from "axios";
import toast from "react-hot-toast";

let isLoggingOut = false;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

// Attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// Handle responses
api.interceptors.response.use(
  (response) => {
    if (response?.data?.logout === true && !isLoggingOut) {

      isLoggingOut = true;

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.error(response.data.message || "Session expired. Please login again.");

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }

    return response;
  },

  (error) => {

    if (error?.response?.data?.logout === true && !isLoggingOut) {

      isLoggingOut = true;

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.error(error.response.data.message || "Session expired. Please login again.");

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }

    return Promise.reject(error);
  }
);

export default api;


// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   headers: {
//     Accept: "application/json",
//   },
// });

// export default api;