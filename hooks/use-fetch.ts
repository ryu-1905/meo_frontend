import useUserStore from "@/store/user-store";
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

const fetcher = <T>(url: string, config?: AxiosRequestConfig<any>) =>
  axiosInstance.get<T>(url, config).then((res) => res.data);

export const useFetch = <T>(
  pathname: string,
  config?: AxiosRequestConfig<any>
) => {
  const user = useUserStore((state) => state);

  return useSWR<T>(
    user.userId ? process.env.NEXT_PUBLIC_BACKEND_URL + pathname : null,
    (url: string) => fetcher<T>(url, config)
  );
};

export { axiosInstance as axios };
