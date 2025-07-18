import {querySearchParams} from '../../utils/querySearchParams';
import {tagTypes} from '../tag-types';
import {baseApi} from './baseApi';

const facultyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaculty: builder.query({
      query: (args) => {
        const params = querySearchParams(args);

        return {
          url: '/faculties',
          method: 'GET',
          params,
        };
      },
      providesTags: [tagTypes.faculty],
    }),

    getSingleFaculty: builder.query({
      query: (args) => {
        return {
          url: `/faculties/${args}`,
          method: 'GET',
        };
      },
    }),

    updateFaculty: builder.mutation({
      query: (args) => {
        return {
          url: `/faculties/${args.id}`,
          method: 'PATCH',
          body: args.data,
        };
      },
      invalidatesTags: [tagTypes.faculty],
    }),

    deleteFaculty: builder.mutation({
      query: (args) => {
        return {
          url: `/faculties/${args}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [tagTypes.faculty],
    }),
  }),
});

export const {
  useGetAllFacultyQuery,
  useGetSingleFacultyQuery,
  useUpdateFacultyMutation,
  useDeleteFacultyMutation,
} = facultyApi;
