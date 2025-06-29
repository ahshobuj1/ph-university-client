import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {RootState} from '../store';
import {setUser} from '../features/auth/authSlice';
import {verifyToken} from '../../utils/verifyToken';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost:5000/api/v1`,
  credentials: 'include', // for sending cookies (refresh token)
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).auth.token;
    // console.log('state=>', getState());
    if (token) {
      headers.set('authorization', `${token}`);
    }

    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // console.log('from custom query: ', result);

  if (result?.error?.status === 401) {
    // console.log('sending refresh token');

    const res = await fetch('http://localhost:5000/api/v1/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });
    const data = await res.json();
    const token = data.data.accessToken;
    const user = verifyToken(token);

    api.dispatch(
      setUser({
        user,
        token,
      })
    );

    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
