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

const cardService = {
  getCards,
};

export default cardService;
