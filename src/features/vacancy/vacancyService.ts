import axios from 'axios';

const API_URL = 'https://tracker-hiring.ddns.net/api';

export interface IVacancyData {
  id: number
  name: string
  location: string
  text: string
  salary: string
  specialization: string
  schedule: string
  pub_date: string
  required_education_level: string
  required_skills: string
}

// Создать вакансию
const createVacancy = async (vacancyData: IVacancyData) => {
  const json = localStorage.getItem('user');
  const user = json && JSON.parse(json);

  const response = await axios.post(`${API_URL}/vacancies/`, vacancyData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.access}`,
    },
  });

  return response.data;
};

// Обновить вакансию
const updateVacancy = async (vacancyData: IVacancyData) => {
  const json = localStorage.getItem('user');
  const user = json && JSON.parse(json);

  const response = await axios.patch(
    `${API_URL}/vacancies/${vacancyData.id}/`,
    vacancyData,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.access}`,
      },
    },
  );

  return response.data;
};

// Получить созданые вакансии
const getVacancies = async () => {
  const json = localStorage.getItem('user');
  const user = json && JSON.parse(json);

  const response = await axios.get(`${API_URL}/vacancies/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.access}`,
    },
  });

  return response.data;
};

const getVacancy = async (vacancyID: number) => {
  const json = localStorage.getItem('user');
  const user = json && JSON.parse(json);

  const response = await axios.get(`${API_URL}/vacancies/${vacancyID}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.access}`,
    },
  });

  return response.data;
};

const deleteVacancy = async (vacancyID: number) => {
  const json = localStorage.getItem('user');
  const user = json && JSON.parse(json);

  const response = await axios.delete(`${API_URL}/vacancies/${vacancyID}`, {
    headers: {
      Authorization: `Bearer ${user.access}`,
    },
  });

  return response.data;
};

const vacancyService = {
  createVacancy,
  getVacancies,
  getVacancy,
  updateVacancy,
  deleteVacancy,
};

export default vacancyService;
