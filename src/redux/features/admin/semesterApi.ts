import {baseApi} from '../../api/baseApi';

const semesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSemester: builder.mutation({
      query: (payload) => {
        return {
          url: '/semesters/create-semester',
          method: 'POST',
          body: payload,
        };
      },
    }),

    getAllSemester: builder.query({
      query: () => ({
        url: '/semesters',
        method: 'GET',
      }),
    }),
  }),
});

export const {useAddSemesterMutation, useGetAllSemesterQuery} = semesterApi;
