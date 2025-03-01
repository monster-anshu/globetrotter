import { API_URL } from '@/env';
import axios from 'axios';
import { commonErrorInterceptor } from './interspectors';

export const client = axios.create({
  baseURL:
    (typeof window === 'undefined' ? API_URL : '') + '/api/v1/globetrotter',
});

client.interceptors.response.use(undefined, commonErrorInterceptor);

export type ApiResponse<Data = unknown> = {
  isSuccess: boolean;
  error?: string;
  message?: string;
} & Data;
