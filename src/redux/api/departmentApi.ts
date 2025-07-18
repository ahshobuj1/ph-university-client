import {baseApi} from './baseApi';

const departmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDepartment: builder.mutation({
      query: (payload) => ({
        url: '/departments/create-department',
        method: 'POST',
        body: payload,
      }),
    }),

    getAllDepartment: builder.query({
      query: () => {
        return {
          url: '/departments',
          method: 'GET',
        };
      },
    }),

    getSingleDepartment: builder.query({
      query: (id) => {
        return {
          url: `/departments/${id}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useAddDepartmentMutation,
  useGetAllDepartmentQuery,
  useGetSingleDepartmentQuery,
} = departmentApi;
