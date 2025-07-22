import {querySearchParams} from '../../utils/querySearchParams';
import {tagTypes} from '../tag-types';
import {baseApi} from './baseApi';

const academicFacultyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAcademicFaculty: builder.mutation({
      query: (payload) => ({
        url: '/academic-faculties/create-academic-faculty',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [tagTypes.academicFaculty],
    }),

    getAllAcademicFaculty: builder.query({
      query: (args) => {
        const params = querySearchParams(args);

        return {
          url: '/academic-faculties',
          method: 'GET',
          params,
        };
      },
      providesTags: [tagTypes.academicFaculty],
    }),

    getSingleAcademicFaculty: builder.query({
      query: (id) => {
        return {
          url: `/academic-faculties/${id}`,
          method: 'GET',
        };
      },
    }),

    delAcademicFaculty: builder.mutation({
      query: (id) => {
        return {
          url: `/academic-faculties/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [tagTypes.academicFaculty],
    }),
  }),
});

export const {
  useAddAcademicFacultyMutation,
  useGetAllAcademicFacultyQuery,
  useGetSingleAcademicFacultyQuery,
  useDelAcademicFacultyMutation,
} = academicFacultyApi;
