import axios from "axios";

// Base URL de ton API
const API_BASE_URL = "https://localhost:5001/api/EmailVerification";

export const requestVerificationCode = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/request-code`, { email });
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
