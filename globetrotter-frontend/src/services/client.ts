import { API_URL } from '@/env';
import axios from 'axios';

export const client = axios.create({
  baseURL:
    (typeof window === 'undefined' ? API_URL : '') + '/api/v1/globetrotter',
});

export type ApiResponse<Data = unknown> = {
  isSuccess: boolean;
} & Data;
