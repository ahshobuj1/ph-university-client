import {baseApi} from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => {
        // console.log('from base api , payload =>', payload);
        return {
          url: '/auth/login',
          method: 'POST',
          body: payload,
        };
      },
    }),
  }),
});

export const {useLoginMutation} = authApi;
