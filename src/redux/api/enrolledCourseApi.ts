import {querySearchParams} from '../../utils/querySearchParams';
import {tagTypes} from '../tag-types';
import {baseApi} from './baseApi';

const enrolledCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addEnrolledCourse: builder.mutation({
      query: (args) => {
        return {
          url: '/enrolled-courses/create-enrolled-course',
          method: 'POST',
          body: args,
        };
      },
      invalidatesTags: [tagTypes.enrolledCourse],
    }),

    getAllEnrolledCourse: builder.query({
      query: (args) => {
        const params = querySearchParams(args);

        return {
          url: '/enrolled-courses',
          method: 'GET',
          params,
        };
      },
      providesTags: [tagTypes.enrolledCourse],
    }),

    getMyEnrolledCourse: builder.query({
      query: () => {
        return {
          url: `/enrolled-courses/my-enrolled-course`,
          method: 'GET',
        };
      },
      providesTags: [tagTypes.enrolledCourse],
    }),

    updateEnrolledCourse: builder.mutation({
      query: (args) => {
        return {
          url: `/enrolled-courses/update-enrolled-course`,
          method: 'PATCH',
          body: args,
        };
      },
      invalidatesTags: [tagTypes.semesterRegistration],
    }),
  }),
});

export const {
  useAddEnrolledCourseMutation,
  useGetAllEnrolledCourseQuery,
  useGetMyEnrolledCourseQuery,
  useUpdateEnrolledCourseMutation,
} = enrolledCourseApi;
