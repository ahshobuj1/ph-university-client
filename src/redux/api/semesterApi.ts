import type {TQueryParams} from '../../types';
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
    }),
  }),
});

export const {useAddSemesterMutation, useGetAllSemesterQuery} = semesterApi;
