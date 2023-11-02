import axios, { AxiosError, CancelTokenSource } from 'axios';
import qs from 'qs';

const BASE_URL = 'https://tracker-hiring.ddns.net/api';

const CANCEL_REQUEST = 'cancel request';

const { CancelToken } = axios;
export const tokenSource = CancelToken.source();

/* interface CancelTokenHandler {
  [key: string]: {
    handleRequestCancellation: () => CancelTokenSource | undefined;
  };
}

interface CancelTokenRequestHandler {
  cancelToken: CancelTokenSource | undefined;
}

export function createCancelTokenHandler(thunks: string[]) {
  const cancelTokenHandler: CancelTokenHandler = {};

  thunks.forEach((propertyName) => {
    const cancelTokenRequestHandler: CancelTokenRequestHandler = {
      cancelToken: undefined,
    };

    cancelTokenHandler[propertyName] = {
      handleRequestCancellation: () => {
        if (cancelTokenRequestHandler.cancelToken) {
          cancelTokenRequestHandler.cancelToken.cancel(CANCEL_REQUEST);
        }

        cancelTokenRequestHandler.cancelToken = CancelToken.source();

        return cancelTokenRequestHandler.cancelToken;
      },
    };
  });

  return cancelTokenHandler;
} */

export const responseInterceptorError = (error: AxiosError | Error | any) => {
  if (error.message !== CANCEL_REQUEST) {
    if (error.error) {
      console.log(error.error);
    } else {
      console.log(error);
    }
  }
  return Promise.reject(error);
};

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  timeout: 3000,
});

axiosInstance.interceptors.response.use(undefined, responseInterceptorError);
axiosInstance.defaults.paramsSerializer = {
  serialize: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
};