import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_API;
const onUploadProgress = () => {
  //TODO adicionar tratamento  primeiramente ver comportamento com console.log
};
const onDownloadProgress = () => {
  //TODO adicionar tratamento  primeiramente ver comportamento com console.log
};
export const backEndHTTPClient = axios.create({ baseURL: backendURL, onUploadProgress, onDownloadProgress });

backEndHTTPClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
