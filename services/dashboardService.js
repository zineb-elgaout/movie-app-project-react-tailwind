import axios from "axios";

const API_URL = "https://localhost:7274/api/Dashboard";

// Fonction pour récupérer le token depuis les cookies
function getTokenFromCookie() {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find(cookie => cookie.startsWith("token="));
  if (!tokenCookie) return null;
  return tokenCookie.split("=")[1];
}

// Créer une instance Axios avec le token automatiquement ajouté
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

export async function getDashboardSummary() {
  try {
    const response = await axiosAuth.get(`/summary`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des stats du dashboard:", error);
    throw error;
  }
}