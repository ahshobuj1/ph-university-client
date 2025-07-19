import type {TQueryParams} from '../../types';
import {tagTypes} from '../tag-types';
import {baseApi} from './baseApi';

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
      invalidatesTags: [tagTypes.semester],
    }),

    getAllSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        // const params = querySearchParams(args);
        return {
          url: '/semesters',
          method: 'GET',
          params,
        };
      },
      providesTags: [tagTypes.semester],
    }),

    getSingleSemester: builder.query({
      query: (args) => {
        return {
          url: `/semesters/${args}`,
          method: 'GET',
        };
      },
    }),

    updateSemester: builder.mutation({
      query: (args) => {
        return {
          url: `/semesters/${args}`,
          method: 'PATCH',
          body: args.data,
        };
      },
      invalidatesTags: [tagTypes.semester],
    }),
  }),
});

export const {
  useAddSemesterMutation,
  useGetAllSemesterQuery,
  useGetSingleSemesterQuery,
  useUpdateSemesterMutation,
} = semesterApi;
