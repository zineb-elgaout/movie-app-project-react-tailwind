import axios from 'axios';

const API_URL = 'https://localhost:7274/api/User';

function getTokenFromCookie() {
  const cookieString = document.cookie;
  const tokenCookie = cookieString.split('; ').find(row => row.startsWith('token='));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
}

export const getAllUsers = () => {
  const token = getTokenFromCookie();
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getUserById = (id) => {
  const token = getTokenFromCookie();
  return axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const addUser = async (userData) => {
  const token = getTokenFromCookie();
  return await axios.post(API_URL, userData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};

export const updateUser = async (id, userData) => {
  const token = getTokenFromCookie();
  return await axios.put(`${API_URL}/${id}`, {
    firstName: userData.firstName,
    lastName: userData.lastName,
    nationality: userData.nationality,
    role: userData.role
  }, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteUser = (id) => {
  const token = getTokenFromCookie();
  return axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const changePassword = async (userId, oldPassword, newPassword) => {
  const token = getTokenFromCookie();
  return await axios.post(`${API_URL}/change-password`, {
    userId,
    oldPassword,
    newPassword
  }, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};

