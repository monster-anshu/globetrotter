import { AxiosError } from 'axios';
import { ApiResponse } from './client';

export const commonErrorInterceptor = async (
  error: AxiosError<ApiResponse>
) => {
  const message =
    error.response?.data.message || error.response?.data.error || error.message;
  throw new Error(message);
};
