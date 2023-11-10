import axios from 'axios';

const API_URL = 'https://tracker-hiring.ddns.net/api';

const json = localStorage.getItem('user');
const user = json && JSON.parse(json);

const getStudents = async (query: any) => {
  const response = await axios.get(`${API_URL}/students/`, {
    params: query,
    headers: {
      Authorization: `Bearer ${user.access}`,
    },
  });

  return response.data;
};

const studentService = {
  getStudents,
};

export default studentService;
