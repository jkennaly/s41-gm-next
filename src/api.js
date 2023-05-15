// src/api.js

import axios from 'axios';
import { apiAuth } from './auth/auth';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your API base URL
});

api.interceptors.request.use(async (config) => {
  try {
  const auth = apiAuth();
  const accessToken = await auth.getAccessToken();
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
  } catch (error) {
    console.log('api.js error', error);
    return config;
  }

});

export default api;
