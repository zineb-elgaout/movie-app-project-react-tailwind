import axios from "axios";

// Base URL de ton API
const API_BASE_URL = "https://localhost:7274/api/EmailVerification";

export const requestVerificationCode = async ({ email , userId}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/request-code`, { email , userId});
    return response.data; // message de confirmation
  } catch (error) {
    throw error.response?.data || "Erreur lors de l'envoi du code";
  }
};

export const verifyCode = async (email, code) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify-code`, {
      email,
      verificationCode: code
    });
    return response.data; // message de succès
  } catch (error) {
    throw error.response?.data || "Code invalide ou expiré";
  }
};


// Récupérer la liste des emails vérifiés d’un utilisateur
export const getVerifiedEmails = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/verified-emails`, {
      params: { userId }
    });
    return response.data; // tableau d'emails vérifiés
  } catch (error) {
    throw error.response?.data || "Erreur lors de la récupération des emails vérifiés";
  }
};