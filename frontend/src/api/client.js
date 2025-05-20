import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://minor-2.onrender.com',
  withCredentials: true,    // so cookies (e.g. your auth token) are sent
});

export default client;
