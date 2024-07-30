import axios from "axios";

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
  });

  instance.interceptors.request.use(
    (config) => {
      // config.headers["key"] = import.meta.env.VITE_API_KEY;
      config.params["key"] = import.meta.env.VITE_API_KEY;

      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      return new Promise(() => {
        alert(error.response.data.error.message);

        throw error;
      });
    },
  );

  return instance;
};

const axiosApi = createAxiosInstance();

export default axiosApi;
