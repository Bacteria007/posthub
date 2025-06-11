import { API_BASE_URL } from '@/constants/endpoints';
import axios from 'axios';

export const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});