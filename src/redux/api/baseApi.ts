import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {RootState} from '../store';
import {logout, setUser} from '../features/auth/authSlice';
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

  if (result?.error?.status === 401) {
    // console.log('sending refresh token');

    const res: any = await baseQuery(
      {
        url: 'auth/refresh-token',
        method: 'POST',
      },
      api,
      extraOptions
    );

    if (res?.data?.data?.accessToken) {
      const token = res.data.data.accessToken;
      const user = verifyToken(token);

      api.dispatch(setUser({user, token}));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
