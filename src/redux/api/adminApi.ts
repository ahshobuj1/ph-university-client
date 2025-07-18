import {querySearchParams} from '../../utils/querySearchParams';
import {tagTypes} from '../tag-types';
import {baseApi} from './baseApi';

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmin: builder.query({
      query: (args) => {
        const params = querySearchParams(args);

        return {
          url: '/admins',
          method: 'GET',
          params,
        };
      },
      providesTags: [tagTypes.admin],
    }),

    getSingleAdmin: builder.query({
      query: (args) => {
        return {
          url: `/admins/${args}`,
          method: 'GET',
        };
      },
    }),

    updateStudent: builder.mutation({
      query: (args) => {
        return {
          url: `/admins/${args.id}`,
          method: 'PATCH',
          body: args.data,
        };
      },
      invalidatesTags: [tagTypes.admin],
    }),

    deleteAdmin: builder.mutation({
      query: (args) => {
        return {
          url: `/admins/${args}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useGetAllAdminQuery,
  useGetSingleAdminQuery,
  useUpdateStudentMutation,
  useDeleteAdminMutation,
} = adminApi;
