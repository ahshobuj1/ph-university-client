import {baseApi} from '../../api/baseApi';

const academicFacultyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAcademicFaculty: builder.mutation({
      query: (payload) => ({
        url: '/academic-faculties/create-academic-faculty',
        method: 'POST',
        body: payload,
      }),
    }),

    getAllAcademicFaculty: builder.query({
      query: () => {
        return {
          url: '/academic-faculties',
          method: 'GET',
        };
      },
    }),

    getSingleAcademicFaculty: builder.query({
      query: (id) => {
        return {
          url: `/academic-faculties/${id}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useAddAcademicFacultyMutation,
  useGetAllAcademicFacultyQuery,
  useGetSingleAcademicFacultyQuery,
} = academicFacultyApi;
