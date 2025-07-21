import axios from 'axios';

const API_URL = 'https://localhost:7274/api/Cartoons';

export const getAllCartoons = () => axios.get(API_URL);

export const addCartoon = (formData) => {
  return axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};


export const deleteCartoon = (id) => axios.delete(`${API_URL}/${id}`);

export const updateCartoon = (id, formData) => {
  return axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};



