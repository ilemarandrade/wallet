import axios from "axios";
import routes from "../constants/routes";
import environment from "./environment";
import {
  getLocalStorageKey,
  removeLocalStorageKey,
  userLanguage,
} from "./localstoragesKeys";

const instance = axios.create({
  baseURL: environment.API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    lang: userLanguage(),
  },
});

const applySuccessInterceptor = (response) => {
  const { data } = response;
  return data;
};

const applyErrorInterceptor = (error) => {
  if (error?.response?.status === 401 || error?.response?.status === 403) {
    removeLocalStorageKey();
    instance.defaults.headers.common.Authorization = "";
    window.location.href = routes.LOGIN;
  }

  return Promise.reject(error?.response);
};

const handleRequest = (config) => {
  const token = getLocalStorageKey();
  const newConfig = {
    ...config,
    headers: { ...config.headers, Authorization: `Bearer ${token}` },
  };

  return newConfig;
};

instance.interceptors.response.use(
  applySuccessInterceptor,
  applyErrorInterceptor
);
instance.interceptors.request.use(handleRequest);

export const setAuthorizationHeader = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export default instance;
