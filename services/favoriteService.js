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

// Intercepteur pour ajouter le token
axiosAuth.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("Aucun token trouvé dans les cookies");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour mieux gérer les erreurs
axiosAuth.interceptors.response.use(
  (response) => {
    console.log("API Response:", response);
    return response;
  },
  (error) => {
    console.error("API Error Details:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export const getFavorites = async () => {
  try {
    const response = await axiosAuth.get("/");
    return response.data;
  } catch (error) {
    console.error("Error in getFavorites:", error);
    throw error;
  }
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