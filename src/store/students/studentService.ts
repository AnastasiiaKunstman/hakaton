import axios from 'axios';

const API_URL = 'https://tracker-hiring.ddns.net/api';

const getStudents = async () => {
  const json = localStorage.getItem('user');
  const user = json && JSON.parse(json);

  const response = await axios.get(`${API_URL}/students/`, {
    headers: {
      Authorization: `Bearer ${user.access}`,
    },
  });

  return response.data;
};

const getFavoriteStudents = async () => {
  const json = localStorage.getItem('user');
  const user = json && JSON.parse(json);

  const response = await axios.get(`${API_URL}/favorite/`, {
    headers: {
      Authorization: `Bearer ${user.access}`,
    },
  });

  return response.data;
};

const likeStudents = async (studentID: number, isFavorite: boolean) => {
  const json = localStorage.getItem('user');
  const user = json && JSON.parse(json);

  const response = await axios.post(`${API_URL}/favorite/${studentID}/`, isFavorite, {
    headers: {
      Authorization: `Bearer ${user.access}`,
    },
  });

  return response.data;
};

const dislikeStudents = async (studentID: number, isFavorite: boolean) => {
  const json = localStorage.getItem('user');
  const user = json && JSON.parse(json);

  const response = await axios.delete(`${API_URL}/favorite/${studentID}/`, {
    headers: {
      Authorization: `Bearer ${user.access}`,
    },
    data: { isFavorite },
  });

  return response.data;
};

const studentService = {
  getStudents,
  getFavoriteStudents,
  likeStudents,
  dislikeStudents,
};

export default studentService;
