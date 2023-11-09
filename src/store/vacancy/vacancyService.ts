import axios from 'axios';

const API_URL = 'https://tracker-hiring.ddns.net/api/';

interface IVacancyData {
  id: number
  name: string
  location: string
  text: string
  salary: string
  specialization: string
  schedule: string
  required_education_level: string
  required_skills: string
  lang: string
  langGrade: string
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

// Получить свои вакансии
const getVacancies = async () => {
  const response = await axios.get(`${API_URL}/vacancies/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.access}`,
    },
  });

  return response.data;
};

// Удалить вакансию
const daleteVacancy = async (vacancyData: IVacancyData) => {
  const response = await axios.delete(
    `${API_URL}/vacancies/${vacancyData.id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.access}`,
      },
    },
  );

  return response.data;
};

const vacancyService = {
  createVacancy,
  getVacancies,
  updateVacancy,
  daleteVacancy,
};

export default vacancyService;
