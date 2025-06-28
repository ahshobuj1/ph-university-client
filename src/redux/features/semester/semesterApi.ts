import {baseApi} from '../../api/baseApi';

const semesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemester: builder.query({
      query: () => ({
        url: '/semester',
        method: 'GET',
      }),
    }),
  }),
});

export const {useGetAllSemesterQuery} = semesterApi;
