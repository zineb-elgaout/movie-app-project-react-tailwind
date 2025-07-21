import axios from 'axios';

const API_URL = 'http://localhost:5400/users';

export const getAllUsers = () => axios.get(API_URL);

export const addUser = (user) => axios.post(API_URL, user);

export const updateUser = (id, updatedUser) => axios.put(`${API_URL}/${id}`, updatedUser);

export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
