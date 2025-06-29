import {baseApi} from '../../api/baseApi';

const semesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemester: builder.query({
      query: () => ({
        url: '/semesters',
        method: 'GET',
      }),
    }),
  }),
});

export const {useGetAllSemesterQuery} = semesterApi;
