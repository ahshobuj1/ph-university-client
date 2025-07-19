import {querySearchParams} from '../../utils/querySearchParams';
import {tagTypes} from '../tag-types';
import {baseApi} from './baseApi';

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCourse: builder.mutation({
      query: (args) => {
        return {
          url: '/courses/create-course',
          method: 'POST',
          body: args,
        };
      },
      invalidatesTags: [tagTypes.course],
    }),

    getAllCourse: builder.query({
      query: (args) => {
        const params = querySearchParams(args);

        return {
          url: '/courses',
          method: 'GET',
          params,
        };
      },
      providesTags: [tagTypes.course],
    }),

    getSingleCourse: builder.query({
      query: (args) => {
        return {
          url: `/courses/${args}`,
          method: 'GET',
        };
      },
    }),

    updateCourse: builder.mutation({
      query: (args) => {
        return {
          url: `/courses/${args.id}`,
          method: 'PATCH',
          body: args.data,
        };
      },
      invalidatesTags: [tagTypes.course],
    }),

    deleteCourse: builder.mutation({
      query: (args) => {
        return {
          url: `/courses/${args}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [tagTypes.course],
    }),

    updateCourseFaculty: builder.mutation({
      query: (args) => {
        return {
          url: `/courses/${args.courseId}/assign-course-faculties`,
          method: 'PUT',
          body: args.data,
        };
      },
      invalidatesTags: [tagTypes.courseFaculty],
    }),

    getCourseFaculty: builder.query({
      query: (args) => {
        return {
          url: `/courses/${args}/get-course-faculties`,
          method: 'GET',
        };
      },
    }),

    removeCourseFaculty: builder.mutation({
      query: (args) => {
        return {
          url: `/courses/${args.courseId}/remove-course-faculties`,
          method: 'DELETE',
          body: args.data,
        };
      },
      invalidatesTags: [tagTypes.courseFaculty],
    }),
  }),
});

export const {
  useAddCourseMutation,
  useGetAllCourseQuery,
  useGetSingleCourseQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseFacultyMutation,
  useGetCourseFacultyQuery,
  useRemoveCourseFacultyMutation,
} = courseApi;
