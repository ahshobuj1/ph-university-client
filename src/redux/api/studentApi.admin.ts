import {querySearchParams} from '../../utils/querySearchParams';
import {baseApi} from './baseApi';

const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addStudent: builder.mutation({
      query: (payload) => {
        return {
          url: '/users/create-student',
          method: 'POST',
          body: payload,
        };
      },
    }),

    getAllStudents: builder.query({
      query: (args) => {
        const params = querySearchParams(args);

        return {
          url: '/students',
          method: 'GET',
          params,
        };
      },
    }),
  }),
});

export const {useAddStudentMutation, useGetAllStudentsQuery} = studentApi;
