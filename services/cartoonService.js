import axios from 'axios';

const API_URL = 'http://localhost:5400/cartoons';

export const getAllCartoons = () => axios.get(API_URL);

export const addCartoon = (cartoon) => axios.post(API_URL, cartoon);

export const deleteCartoon = (id) => axios.delete(`${API_URL}/${id}`);

export const updateCartoon = (id , updatedCartoon) => axios.put(`${API_URL}/${id}` , updatedCartoon);


