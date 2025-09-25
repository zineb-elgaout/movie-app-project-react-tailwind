import axios from "axios";

const API_URL = "https://localhost:7274/api/Dashboard"; 

export async function getDashboardSummary() {
  try {
    const response = await axios.get(`${API_URL}/summary`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des stats du dashboard:", error);
    throw error;
  }
}