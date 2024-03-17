import axios from 'axios';
axios.defaults.withCredentials = true;

const API_URL = 'http://localhost:8000/api';

const loginUser = async (email, password) => {
  try {
    console.log({email, password});
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Login failed');
  }
};

export { loginUser };
