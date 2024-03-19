import axios from 'axios';
axios.defaults.withCredentials = true;

const API_URL = 'http://localhost:8000/api';

const loginUser = async (email, password) => {
  try {
    console.log({ email, password });
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Login failed');
  }
};

const registerUser = async ({ name, email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Registration failed!');
  }
};

const createDocument = async ({ userId, title }) => {
  try {
    console.log({ userId, title });
    const response = await axios.post(`${API_URL}/doc/create`, {
      userId,
      title,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Login failed');
  }
};

const getAllUserDocuments = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/docs/${userId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch all the documents');
  }
};

export { loginUser, registerUser, createDocument, getAllUserDocuments };
