import axios from "axios";

// URL de base pour l'API Favorite
const API_URL = "https://localhost:7274/api/Favorite";

// Fonction pour récupérer le token depuis les cookies
function getTokenFromCookie() {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find(cookie => cookie.startsWith("token="));
  if (!tokenCookie) return null;
  return tokenCookie.split("=")[1];
}

// Création d'une instance Axios avec le token automatiquement ajouté
const axiosAuth = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Intercepteur pour ajouter le token
axiosAuth.interceptors.request.use(
  config => {
    const token = getTokenFromCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Intercepteur pour la réponse (debug)
axiosAuth.interceptors.response.use(
  response => {
    console.log("API Response:", response);
    return response;
  },
  error => {
    console.error("API Error:", error.response || error);
    return Promise.reject(error);
  }
);

// Fonctions CRUD Favorite
export const getFavorites = async () => {
  const response = await axiosAuth.get("/");
  return response.data;
};

export const getFavoriteById = async (id) => {
  const response = await axiosAuth.get(`/${id}`);
  return response.data;
};

export const createFavorite = async (favorite) => {
  const response = await axiosAuth.post("/", favorite);
  return response.data;
};

export const updateFavorite = async (id, favorite) => {
  const response = await axiosAuth.put(`/${id}`, favorite);
  return response.data;
};

export const deleteFavorite = async (id) => {
  const response = await axiosAuth.delete(`/${id}`);
  return response.data;
};
