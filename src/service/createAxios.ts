import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import { BASE_URL } from 'utils/constant';

const createAxios = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
  });

  instance.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error: AxiosError) {
      console.log(error, error.config);
      return error.response;
    },
  );

  return {
    get: (config: AxiosRequestConfig) =>
      instance({
        method: 'GET',
        ...config,
      }),
    post: (config: AxiosRequestConfig) =>
      instance({
        method: 'POST',
        ...config,
      }),
    put: (config: AxiosRequestConfig) =>
      instance({
        method: 'PUT',
        ...config,
      }),
  };
};

export default createAxios;
