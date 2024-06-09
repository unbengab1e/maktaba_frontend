import axios from 'axios';
let service = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 10000,
});
export default service;