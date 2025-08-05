import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'https://localhost:7274/api/Auth/login';
const API_REGISTER_URL = 'https://localhost:7274/api/Auth/register';

// Fonction utilitaire pour lire le token depuis le cookie
function getTokenFromCookie() {
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='));
  return cookie ? cookie.split('=')[1] : null;
}

//Login
export async function login(email, password, rememberMe) {
  try {
    const response = await axios.post(API_URL, {
      email,
      password,
      rememberMe
    });

    const token = response.data.token;

    // Stocker le token dans un cookie sécurisé
    document.cookie = `token=${token}; path=/; max-age=${rememberMe ? 7 * 24 * 60 * 60 : 3 * 60 * 60}; Secure; SameSite=None`;

    return response.data;
  } catch (error) {
    console.error("Erreur complète :", error.response);
    const msg = error.response?.data?.message || "Erreur lors de la connexion";
    throw new Error(msg);
  }
}

// Register
export async function register(userData) {
  try {
    const response = await axios.post(API_REGISTER_URL, userData, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Erreur lors de l'inscription";
    throw new Error(msg);
  }
}





// Appel d’une API protégée avec envoi du token dans les headers
export async function getCreatedUsers() {
  const token = getTokenFromCookie();
  if (!token) throw new Error("Utilisateur non authentifié");

  try {
    const response = await axios.get('https://localhost:7274/api/User/created-users', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Utilisateurs créés :", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur récupération utilisateurs :", error.response?.data || error.message);
    throw error;
  }
}

export function logout() {
  // Supprime le cookie du token
  document.cookie = "token=; Max-Age=0; path=/";
  
  // Optionnel : redirection vers la page de login ou d'accueil
  window.location.href = "/login"; 
}
