// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from './store';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://tracker-hiring.ddns.net/api/',

    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);

        return headers;
      }
    },
  }),
  endpoints: (build) => ({
    getDetails: build.query({
      query: () => ({
        url: 'auth/users/4',
        method: 'GET',
      }),
    }),
  }),
});

// export react hook
export const { useGetDetailsQuery } = authApi;
