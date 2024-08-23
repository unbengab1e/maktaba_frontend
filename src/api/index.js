import axios from 'axios';
let service = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});
export default service;
