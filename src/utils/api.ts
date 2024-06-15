import axios from "axios";
import config from "../config";
// import { configureFakeBackend } from '../services/fake-backend';

const axiosInstance = axios.create({
  baseURL: config.API_URL,
  responseType: "json",
});

const requestHandler = (request) => {
  let valueToken = document.cookie.substring(6);
  // Thêm token vào header nếu user vẫn tồn tại
  request.headers["x-access-token"] = valueToken;
  return request;
};

const successHandler = (response) => {
  return response;
};

const errorHandler = (error) => {
  return Promise.reject({ ...error });
};

axiosInstance.interceptors.request.use((request) => requestHandler(request));

axiosInstance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

// configureFakeBackend(axiosInstance);

export default axiosInstance;
