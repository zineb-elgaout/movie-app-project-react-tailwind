import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'https://localhost:7274/api/User';
const TWO_FACTOR_URL = 'https://localhost:7274/api/TwoFactor';

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
    const nationality = decoded["Nationality"];
    const createdAt = decoded["CreatedAt"];
    const twoFactorEnabled = decoded["IsTwoFactorEnabledCustom"];

    return {
      id,
      email,
      username,
      role,
      firstName,
      lastName,
      nationality,
      createdAt: createdAt ? new Date(createdAt) : null,
      twoFactorEnabled: twoFactorEnabled === "True" || twoFactorEnabled === true,
    };
  } catch (error) {
    console.error("Erreur lors du décodage du token :", error);
    return null;
  }
}


// Création d'une instance Axios avec le token automatiquement ajouté
const axiosAuth = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur UNIQUE pour axiosAuth
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

// 🔹 Fonctions 2FA CORRIGÉES

export const enableTwoFactor = async (userId, email) => {
  try {
    const token = getTokenFromCookie();
    
    // Testez d'abord avec PascalCase (standard C#)
    const requestData = {
      UserId: userId,    // PascalCase pour C#
      Email: email       // PascalCase pour C#
    };

    console.log('Données envoyées:', requestData);

    const response = await axios.post(
      `${TWO_FACTOR_URL}/initiate`,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      }
    );
    
    return response.data;
    
  } catch (error) {
    console.error('Erreur détaillée enableTwoFactor:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw error;
  }
};

export const confirmTwoFactor = async (email, verificationCode) => {
  try {
    const token = getTokenFromCookie();
    
    // PascalCase pour C#
    const requestData = {
      Email: email,
      VerificationCode: verificationCode
    };

    const response = await axios.post(
      `${TWO_FACTOR_URL}/confirm`,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      }
    );
    
    return response.data;
    
  } catch (error) {
    console.error('Erreur confirmTwoFactor:', error.response?.data || error.message);
    throw error;
  }
};

//  Fonction de test pour identifier le bon format
export const testTwoFactorFormat = async () => {
  const userProfile = getUserProfile();
  if (!userProfile) return;

  const token = getTokenFromCookie();
  
  // Testez les deux formats
  const formats = [
    { name: 'camelCase', data: { userId: userProfile.id, email: userProfile.email } },
    { name: 'PascalCase', data: { UserId: userProfile.id, Email: userProfile.email } }
  ];

  for (const format of formats) {
    try {
      console.log(`Test format ${format.name}:`, format.data);
      
      const response = await axios.post(
        `${TWO_FACTOR_URL}/initiate`,
        format.data,
        {
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        }
      );
      
      console.log(`Format ${format.name} fonctionne:`, response.data);
      return { success: true, format: format.name, data: response.data };
      
    } catch (error) {
      console.log(`Format ${format.name} échoue:`, error.response?.data);
    }
  }
  
  throw new Error('Aucun format ne fonctionne');
};

// 🔹 Désactivation du 2FA
export const disableTwoFactor = async (userId) => {
  try {
    const token = getTokenFromCookie();
    if (!token) throw new Error("Utilisateur non connecté");

    // Envoi de la requête au backend
    const response = await axios.post(
      `${TWO_FACTOR_URL}/disable`,
      userId, // le backend attend un string simple
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

    // Retourne le résultat du backend
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la désactivation du 2FA :', error.response?.data || error.message);
    throw error;
  }
};
