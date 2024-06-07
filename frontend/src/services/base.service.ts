import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60 * 1000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = getCookie("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log({
      error,
    });
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (config) => {
    if (config.status === HttpStatus.UNAUTHORIZED) {
      deleteCookie("token");
      useRouter().push("/home");
    }

    return config;
  },
  (error) => {
    console.log({
      error,
    });
    return Promise.reject(error);
  }
);
