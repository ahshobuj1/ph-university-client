import {querySearchParams} from '../../utils/querySearchParams';
import {tagTypes} from '../tag-types';
import {baseApi} from './baseApi';

const offeredCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addOfferedCourse: builder.mutation({
      query: (args) => {
        return {
          url: '/offered-courses/create-offered-course',
          method: 'POST',
          body: args,
        };
      },
      invalidatesTags: [tagTypes.offeredCourse],
    }),

    getAllOfferedCourse: builder.query({
      query: (args) => {
        const params = querySearchParams(args);

        return {
          url: '/offered-courses',
          method: 'GET',
          params,
        };
      },
      providesTags: [tagTypes.offeredCourse],
    }),

    getMyOfferedCourse: builder.query({
      query: (args) => {
        const params = querySearchParams(args);

        return {
          url: '/offered-courses/my-offered-course',
          method: 'GET',
          params,
        };
      },
      providesTags: [tagTypes.offeredCourse],
    }),

    getSingleOfferedCourse: builder.query({
      query: (args) => {
        return {
          url: `/offered-courses/${args}`,
          method: 'GET',
        };
      },
    }),

    updateOfferedCourse: builder.mutation({
      query: (args) => {
        return {
          url: `/offered-courses/${args.id}`,
          method: 'PATCH',
          body: args.data,
        };
      },
      invalidatesTags: [tagTypes.offeredCourse],
    }),

    deleteOfferedCourse: builder.mutation({
      query: (args) => {
        return {
          url: `/offered-courses/${args}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [tagTypes.offeredCourse],
    }),
  }),
});

export const {
  useAddOfferedCourseMutation,
  useGetAllOfferedCourseQuery,
  useGetMyOfferedCourseQuery,
  useGetSingleOfferedCourseQuery,
  useUpdateOfferedCourseMutation,
  useDeleteOfferedCourseMutation,
} = offeredCourseApi;
