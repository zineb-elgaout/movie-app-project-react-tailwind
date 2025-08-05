import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'https://localhost:7274/api/User';

// Fonction simple pour lire le token depuis les cookies
function getTokenFromCookie() {
  const cookies = document.cookie.split('; ');
  const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
  if (!tokenCookie) return null;
  return tokenCookie.split('=')[1];
}

// Décodage simple du token pour récupérer les infos de l'utilisateur
export function getUserProfile() {
  const token = getTokenFromCookie();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    const id = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    const email = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    const username = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    const firstName = decoded["FirstName"];
    const lastName = decoded["LastName"];

    return { id, email, username, role, firstName, lastName };
  } catch (error) {
    console.error("Erreur lors du décodage du token :", error);
    return null;
  }
}

//  Création d'une instance Axios avec le token automatiquement ajouté
const axiosAuth = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
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

export const getAllUsers = () => {
  return axiosAuth.get('/');
};

export const getUserById = () => {
  const profile = getUserProfile();
  if (!profile) throw new Error("Utilisateur non connecté");
  return axiosAuth.get(`/${profile.id}`);
};

export const addUser = (userData) => {
  return axiosAuth.post('/', userData);
};

export const updateUser = (id, userData) => {
  return axiosAuth.put(`/${id}`, userData);
};

export const deleteUser = async (id) => {
  return await axiosAuth.delete(`/${id}`);
};

export const getCreatedUsers = () => {
  return axiosAuth.get('/created-users');
};

export const getUserRole = () => {
  const profile = getUserProfile();
  if (!profile) throw new Error("Utilisateur non connecté");
  return axiosAuth.get(`/GetRole/${profile.id}`);
};
