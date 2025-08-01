import axios from 'axios';
import {jwtDecode} from 'jwt-decode';


const API_URL = 'https://localhost:7274/api/Auth/login';
const API_REGISTER_URL = 'https://localhost:7274/api/Auth/register';


export async function login(email, password, rememberMe) {
  try {
    const response = await axios.post(API_URL, {
      email,
      password,
      rememberMe
    });

    const token = response.data.token;

    document.cookie = `token=${token}; path=/; max-age=${rememberMe ? 7 * 24 * 60 * 60 : 3 * 60 * 60}; Secure; SameSite=Strict`;

    return response.data;
  } catch (error) {
    console.error("Erreur complète :", error.response); 
    const msg = error.response?.data?.message || "Erreur lors de la connexion";
    throw new Error(msg);
  }
}


export async function register(userData) {
  try {
    const response = await axios.post(API_REGISTER_URL, userData, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Erreur lors de l'inscription");
    }
  }
}

export function getUserProfile() {
  const cookieString = document.cookie;
  let token = null;
  if (cookieString) {
    const tokenCookie = cookieString.split('; ').find(row => row.startsWith('token='));
    if (tokenCookie) {
      token = tokenCookie.split('=')[1];
    }
  }

  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    console.log(decoded);

    return {
      id: decoded.nameid,          
      username: decoded.unique_name || decoded.name, 
      firstName: decoded.FirstName,
      lastName: decoded.LastName,
      email: decoded.Email,
      roles: decoded.role
    };
  } catch (error) {
    console.error("Erreur décodage token:", error);
    return null;
  }
}

