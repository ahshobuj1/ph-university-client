import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({baseUrl: `http://localhost:5000/api/v1`}),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => {
        console.log('from base api , payload =>', payload);

        return {url: '/auth/login', method: 'POST', body: payload};
      },
    }),
  }),
});

export const {useLoginMutation} = baseApi;
