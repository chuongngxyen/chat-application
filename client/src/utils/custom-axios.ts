import axios, { AxiosError } from "axios";
const baseURL = "http://localhost:4000/api";
export const api = axios.create({
    baseURL,
  });
  
  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => error,
  );