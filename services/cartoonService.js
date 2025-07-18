import axios from "axios";

const API_URL = 'https://localhost:7274/api/Cartoons';

// Récupérer tous les dessins animés
export const getAllCartoons = () => axios.get(API_URL);

// Ajouter un dessin animé
export const addCartoon = async (cartoon) => {
  try {
    const response = await axios.post(API_URL, cartoon, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout du cartoon :", error);
    throw error;
  }
};

// Supprimer un dessin animé
export const deleteCartoon = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression du cartoon :", error);
    throw error;
  }
};

// Mettre à jour un dessin animé
export const updateCartoon = async (id, updatedCartoon) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedCartoon, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du cartoon :", error);
    throw error;
  }
};
