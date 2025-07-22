import {querySearchParams} from '../../utils/querySearchParams';
import {tagTypes} from '../tag-types';
import {baseApi} from './baseApi';

const departmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDepartment: builder.mutation({
      query: (args) => ({
        url: '/departments/create-department',
        method: 'POST',
        body: args,
      }),
      invalidatesTags: [tagTypes.department],
    }),

    getAllDepartment: builder.query({
      query: (args) => {
        const params = querySearchParams(args);
        return {
          url: '/departments',
          method: 'GET',
          params,
        };
      },
      providesTags: [tagTypes.department],
    }),

    getSingleDepartment: builder.query({
      query: (id) => {
        return {
          url: `/departments/${id}`,
          method: 'GET',
        };
      },
    }),

    updateDepartment: builder.mutation({
      query: (args) => {
        return {
          url: `/departments/${args.id}`,
          method: 'PATCH',
          body: args.data,
        };
      },
      invalidatesTags: [tagTypes.department],
    }),

    delDepartment: builder.mutation({
      query: (args) => {
        return {
          url: `/departments/${args}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [tagTypes.department],
    }),
  }),
});

export const {
  useAddDepartmentMutation,
  useGetAllDepartmentQuery,
  useGetSingleDepartmentQuery,
  useUpdateDepartmentMutation,
  useDelDepartmentMutation,
} = departmentApi;
