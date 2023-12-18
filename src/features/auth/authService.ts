/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import axios from 'axios';

const API_URL = 'https://tracker-hiring.ddns.net/api';

interface IUserData {
  email: string
  password: string
}

// Регистрация пользователя
const signUp = async (userData: any) => axios.post(`${API_URL}/users/`, userData);

// Вход пользователя
const login = async ({ email, password }: IUserData) => {
  const tokenData = await axios.post(`${API_URL}/auth/jwt/create/`, {
    email,
    password,
  });
  const response = await axios.get(`${API_URL}/users/me/`, {
    headers: { Authorization: `Bearer ${tokenData.data.access}` },
  });
  response.data
    && localStorage.setItem(
      'user',
      JSON.stringify({ ...response.data, ...tokenData.data }),
    );
  return response.data;
};

// Выход пользователя
const logout = async () => {
  localStorage.removeItem('user');
};

const authService = {
  signUp,
  login,
  logout,
};

export default authService;
