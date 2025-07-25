import axios from 'axios';

const API_URL = 'https://localhost:7274/api/Cartoons';

export const getAllCartoons = () => axios.get(API_URL);


export const addCartoon = (data) =>
  axios.post(API_URL, data, {
    headers: { 'Content-Type': 'application/json' },
  });

export const updateCartoon = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, {
    headers: { 'Content-Type': 'application/json' },
  });

export const deleteCartoon = (id) => axios.delete(`${API_URL}/${id}`);

export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);

  return axios.post(API_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};



