import axios from "axios";

// 🔹 URL de base de ton API
const API_URL = "https://localhost:7274/api/Categories";

// 🔹 Fonction pour récupérer le token depuis les cookies
function getTokenFromCookie() {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find(cookie => cookie.startsWith("token="));
  if (!tokenCookie) return null;
  return tokenCookie.split("=")[1];
}

// 🔹 Création d'une instance Axios avec le token automatiquement ajouté
const axiosAuth = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

axiosAuth.interceptors.request.use(config => {
  const token = getTokenFromCookie();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

// 🔹 Fonctions CRUD
export const getAllCategories = () => {
  return axiosAuth.get("/");
};

export const getCategoryById = (id) => {
  return axiosAuth.get(`/${id}`);
};

export const createCategory = (category) => {
  return axiosAuth.post("/", category);
};

export const updateCategory = (id, category) => {
  return axiosAuth.put(`/${id}`, category);
};

export const deleteCategory = (id) => {
  return axiosAuth.delete(`/${id}`);
};
