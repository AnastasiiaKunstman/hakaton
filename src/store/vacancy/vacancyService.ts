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

const json = localStorage.getItem('user');
const user = json && JSON.parse(json);

// Создать вакансию
const createVacancy = async (vacancyData: IVacancyData) => {
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
  const response = await axios.patch(
    `${API_URL}/vacancies/${vacancyData.id}`,
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

// Получить данные о вакансии
const getVacancies = async (vacancyData: IVacancyData) => {
  const response = await axios.get(`${API_URL}/vacancies/${vacancyData.id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.access}`,
    },
  });

  return response.data;
};

const vacancyService = {
  createVacancy,
  getVacancies,
  updateVacancy,
};

export default vacancyService;
