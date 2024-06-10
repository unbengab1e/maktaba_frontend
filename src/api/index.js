import axios from 'axios';
let service = axios.create({
  baseURL: 'http://49.232.145.124:8000',
  timeout: 10000,
});
export default service;