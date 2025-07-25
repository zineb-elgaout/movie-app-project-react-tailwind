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


export const updateUser = (id, updatedUser) => axios.put(`${API_URL}/${id}`, updatedUser,  {
  headers: { "Content-Type": "application/json" }
});

export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
