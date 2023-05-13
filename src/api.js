// src/api.js

import axios from 'axios';
import { useAuth } from './auth/auth';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your API base URL
});

api.interceptors.request.use(async (config) => {
  const { getAccessTokenSilently } = useAuth();
  const accessToken = await getAccessTokenSilently();
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export default api;
