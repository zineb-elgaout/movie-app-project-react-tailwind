import axios from 'axios';
const API_URL = 'https://localhost:7274/api/Auth/login';



export async function login(email, password, rememberMe) {
  try {
    const response = await axios.post(API_URL, {
      email,
      password,
      rememberMe
    });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Erreur lors de la connexion");
    }
  }
}
