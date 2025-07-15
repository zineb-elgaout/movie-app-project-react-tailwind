import axios from 'axios';

const API_URL ='http://localhost:5400/categories';

export const getAllCategories = () => axios.get(API_URL);

export const addCategory = (category) => axios.post(API_URL , category);

export const deleteCategory =(id) => axios.delete (`${API_URL}/${id}`);

export const updateCategory = (id, updatedCategory) => axios.put(`${API_URL}/${id}`,updatedCategory)

