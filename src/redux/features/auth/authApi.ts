import {baseApi} from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (args) => {
        // console.log('from base api , payload =>', args);
        return {
          url: '/auth/login',
          method: 'POST',
          body: args,
        };
      },
    }),

    changePassword: builder.mutation({
      query: (args) => {
        // console.log('from base api , payload =>', args);
        return {
          url: '/auth/change-password',
          method: 'POST',
          body: args,
        };
      },
    }),

    forgotPassword: builder.mutation({
      query: (args) => {
        // console.log('from base api , payload =>', args);
        return {
          url: '/auth/forgot-password',
          method: 'POST',
          body: args,
        };
      },
    }),

    resetPassword: builder.mutation({
      query: (args) => {
        // console.log('from base api , payload =>', args);
        return {
          url: '/auth/reset-password',
          method: 'POST',
          body: args,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
