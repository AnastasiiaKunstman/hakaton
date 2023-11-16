import axios from 'axios';

const API_URL = 'https://tracker-hiring.ddns.net/api';

const json = localStorage.getItem('user');
const user = json && JSON.parse(json);

export interface ICardData {
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

const getCards = async (query: any) => {
  const response = await axios.get(`${API_URL}/vacancies/`, {
    params: query,
    headers: {
      Authorization: `Bearer ${user.access}`,
    },
  });

  return response.data;
};

const getBigCards = async (cardData: any) => {
  const response = await axios.get(`${API_URL}/vacancies/${cardData.id}`, {
    params: cardData,
    headers: {
      Authorization: `Bearer ${user.access}`,
    },
  });

  return response.data;
};

const deleteCard = async (cardID: number) => {
  const response = await axios.delete(`${API_URL}/vacancies/${cardID}`, {
    headers: {
      Authorization: `Bearer ${user.access}`,
    },
  });

  return response.data;
};

const cardService = {
  getCards,
  getBigCards,
  deleteCard,
};

export default cardService;
