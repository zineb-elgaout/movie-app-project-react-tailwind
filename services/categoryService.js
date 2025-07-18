import axios from 'axios';

const API_URL = 'https://localhost:7274/api/Categories';

export const getAllCategories = () => axios.get(API_URL);

export const getCategoryById = (id) => axios.get(`${API_URL}/${id}`);

export const addCategory = (category) => axios.post(API_URL, category);

export const updateCategory = (id, updatedCategory) => axios.put(`${API_URL}/${id}`, updatedCategory);

export const deleteCategory = (id) => axios.delete(`${API_URL}/${id}`);
