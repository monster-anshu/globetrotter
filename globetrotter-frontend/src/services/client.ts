import axios from 'axios';

export const client = axios.create({
  baseURL: '/api',
});

export type ApiResponse<Data = unknown> = {
  isSuccess: boolean;
} & Data;
