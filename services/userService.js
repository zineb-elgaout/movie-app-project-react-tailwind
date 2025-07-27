import axios from 'axios';

const API_URL = 'https://localhost:7274/api/User';

export const getAllUsers = () => axios.get(API_URL);

export const addUser = async (userData) => {
  return await axios.post(API_URL, userData, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${updateUser.id}`, 
        {

            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password || null,
            role: userData.role, 
        }
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    throw error;
  }
};


export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
