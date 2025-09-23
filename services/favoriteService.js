import axios from "axios";

const API_URL = "https://localhost:7274/api/Favorite";

function getTokenFromCookie() {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find(cookie => cookie.startsWith("token="));
  if (!tokenCookie) return null;
  return tokenCookie.split("=")[1];
}

const axiosAuth = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAuth.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosAuth.interceptors.response.use(
  (response) => {
    console.log("API Response:", response);
    return response;
  },
  (error) => {
    console.error("API Error:", error.response || error);
    return Promise.reject(error);
  }
);

export const getFavorites = async () => {
  const response = await axiosAuth.get("/");
  return response.data;
};

export const getFavoriteById = async (id) => {
  const response = await axiosAuth.get(`/${id}`);
  return response.data;
};

export const addFavorite = async (cartoonId) => {
  const res = await axiosAuth.post("/", { cartoonId });
  return res.data;
};

export const removeFavorite = async (cartoonId) => {
  const res = await axiosAuth.delete(`/${cartoonId}`);
  return res.data;
};
