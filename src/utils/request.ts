import { toast } from 'react-toastify';
import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CreateAxiosDefaults,
} from 'axios';
import { redirectLoginPage } from './url';

declare module 'axios' {
  export interface AxiosRequestConfig {
    needToken?: boolean; // whether need to add token to request header
    withAxiosData?: boolean; // whether need to add axios data to response
  }
}

class Request {
  private axiosInstance: AxiosInstance;

  constructor(config: CreateAxiosDefaults) {
    this.axiosInstance = axios.create(config);

    this.axiosInstance.interceptors.request.use(
      config => {
        // TODO: add token to request header
        // if (config.needToken !== false) {
        //   const token = localStorage.getItem('token');
        //   if (token) {
        //     config.headers['Authorization'] = token;
        //   } else {
        //     redirectLoginPage();
        //     return Promise.reject(new Error('No token found'));
        //   }
        // }
        return config;
      },
      error => Promise.reject(error as Error)
    );

    this.axiosInstance.interceptors.response.use(
      response => {
        const withAxiosData = response.config.withAxiosData ?? true;

        if (response.status === 200) {
          return withAxiosData ? response : response.data;
        }

        return Promise.reject(response as unknown as Error);
      },
      (error: AxiosError) => {
        handleHttpError(error.response!);
        return Promise.reject(error);
      }
    );
  }

  request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R> {
    return this.axiosInstance.request(config);
  }

  get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.axiosInstance.get(url, config);
  }

  post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.axiosInstance.post(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.axiosInstance.put(url, data, config);
  }

  patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.axiosInstance.patch(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.axiosInstance.delete(url, config);
  }
}

export const request = new Request({
  baseURL: import.meta.env.VITE_API_URL,
  // timeout: 50000,
});

const handleHttpError = (response: AxiosResponse<any, any>) => {
  if (!response) {
    toast.error('Network Error');
    return;
  }

  const message: string = (response.data as Record<string, any>).detail;
  switch (response.status) {
    case 400:
      toast.error(message);
      break;
    case 401:
      redirectLoginPage();
      break;
    case 403:
      toast.error(message);
      break;
    case 404:
      toast.error('404 - Not found');
      break;
    case 500:
      toast.error('500 - Internal Server error');
      break;
    default:
      toast.error('Unknown error');
      break;
  }
};
