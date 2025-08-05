import axios, { AxiosRequestConfig } from "axios";
import useSWR from "swr";

/**
 * Modification Logs:
 * DATE        |  AUTHOR   |  DESCRIPTION
 * -------------------------------------
 * 01-08-2025 | Ryu       | Create
 */
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

const fetcher = (url: string, config?: AxiosRequestConfig<any>) =>
  axios.get(url, config).then((res) => res.data);

const useFetch = (pathname: string, config?: AxiosRequestConfig<any>) => {
  const result = useSWR(process.env.NEXT_PUBLIC_BACKEND_URL + pathname, (url) =>
    fetcher(url, config)
  );

  return result;
};

export { axiosInstance as axios, useFetch };
