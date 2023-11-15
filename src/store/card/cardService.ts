import axios from 'axios';

const API_URL = 'https://tracker-hiring.ddns.net/api';

const json = localStorage.getItem('user');
const user = json && JSON.parse(json);

const getCards = async (query: any) => {
  const response = await axios.get(`${API_URL}/vacancies/`, {
    params: query,
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
  deleteCard,
};

export default cardService;
