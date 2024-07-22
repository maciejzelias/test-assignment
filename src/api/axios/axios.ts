import axios, { isAxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorMessage = 'An unexpected error occurred, please contact the administrator';

    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || errorMessage);
    }
    throw new Error(errorMessage);
  },
);

export default instance;
