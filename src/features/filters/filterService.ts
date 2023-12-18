import axios from 'axios';

const API_URL = 'https://tracker-hiring.ddns.net/api';

// скилы
const getSkills = async () => {
  const json = localStorage.getItem('user');
  const user = json && JSON.parse(json);
  const response = await axios.get(`${API_URL}/skills/`, {
    headers: {
      Authorization: `Bearer ${user.access}`,
    },
  });
  return response.data;
};

// направление специальности
const getSpecializations = async () => {
  const json = localStorage.getItem('user');
  const user = json && JSON.parse(json);

  const response = await axios.get(`${API_URL}/specializations/`, {
    headers: {
      Authorization: `Bearer ${user.access}`,
    },
  });
  return response.data;
};

const getEducationLevel = async () => {
  const json = localStorage.getItem('user');
  const user = json && JSON.parse(json);

  const response = await axios.get(`${API_URL}/education_levels/`, {
    headers: {
      Authorization: `Bearer ${user.access}`,
    },
  });
  return response.data;
};

// график работы
const getSchedules = async () => {
  const json = localStorage.getItem('user');
  const user = json && JSON.parse(json);

  const response = await axios.get(`${API_URL}/schedules/`, {
    headers: {
      Authorization: `Bearer ${user.access}`,
    },
  });
  return response.data;
};

// локация
const getLocations = async () => {
  const json = localStorage.getItem('user');
  const user = json && JSON.parse(json);

  const response = await axios.get(`${API_URL}/locations/`, {
    headers: {
      Authorization: `Bearer ${user.access}`,
    },
  });
  return response.data;
};

const filtersService = {
  getSkills,
  getSpecializations,
  getEducationLevel,
  getSchedules,
  getLocations,
};

export default filtersService;
