import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const AxiosService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://techtest.youapp.ai/api",
  timeout: 10000,
});

AxiosService.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); 
    if (token) {
        config.headers["x-access-token"] = token;
      }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosService.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized");
    }
    return Promise.reject(error);
  }
);

export const BaseService = async(param: AxiosRequestConfig): Promise<any> => {
  return new Promise((resolve, reject) => {
    AxiosService(param)
      .then((response) => {
        resolve(response);
      })
      .catch((errors) => {
        reject(errors);
      });
  });
};

export default AxiosService;
