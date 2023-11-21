import axios from 'axios';

const API_URL = 'https://tracker-hiring.ddns.net/api';

export interface IProfileData {
  id: number
  avatar?: string
  first_name: string
  last_name: string
  telegram: string
  phone_number: string
  company: string
  password: string
  is_active: boolean
}

const json = localStorage.getItem('user');
const user = json && JSON.parse(json);

// Обновить информацию о пользователе
const updateProfile = async (profileData: IProfileData) => {
  const response = await axios.patch(
    `${API_URL}/users/me/`,
    profileData,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.access}`,
      },
    },
  );

  return response.data;
};

// Получить информацию о пользователе
const getProfile = async () => {
  const response = await axios.get(`${API_URL}/users/me/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.access}`,
    },
  });

  return response.data;
};

// Удалить пользователя
const deleteProfile = async (profileID: number) => {
  const response = await axios.delete(`${API_URL}/users/${profileID}/`, {
    headers: {
      Authorization: `Bearer ${user.access}`,
    },
  });

  return response.data;
};

const profileService = {
  getProfile,
  updateProfile,
  deleteProfile,
};

export default profileService;
