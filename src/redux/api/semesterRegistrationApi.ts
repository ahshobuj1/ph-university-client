import {querySearchParams} from '../../utils/querySearchParams';
import {tagTypes} from '../tag-types';
import {baseApi} from './baseApi';

const semesterRegistrationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerSemester: builder.mutation({
      query: (args) => {
        return {
          url: '/semester-registrations/create-semester-registration',
          method: 'POST',
          body: args,
        };
      },
      invalidatesTags: [tagTypes.semesterRegistration],
    }),

    getAllRegisterSemester: builder.query({
      query: (args) => {
        const params = querySearchParams(args);

        return {
          url: '/semester-registrations',
          method: 'GET',
          params,
        };
      },
      providesTags: [tagTypes.semesterRegistration],
    }),

    getSingleRegisterSemester: builder.query({
      query: (args) => {
        return {
          url: `/semester-registrations/${args}`,
          method: 'GET',
        };
      },
    }),

    updateRegisterSemester: builder.mutation({
      query: (args) => {
        return {
          url: `/semester-registrations/${args.id}`,
          method: 'PATCH',
          body: args.data,
        };
      },
      invalidatesTags: [tagTypes.semesterRegistration],
    }),

    deleteRegisterSemester: builder.mutation({
      query: (args) => {
        return {
          url: `/semester-registrations/${args}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [tagTypes.semesterRegistration],
    }),
  }),
});

export const {
  useGetAllRegisterSemesterQuery,
  useRegisterSemesterMutation,
  useDeleteRegisterSemesterMutation,
  useGetSingleRegisterSemesterQuery,
  useUpdateRegisterSemesterMutation,
} = semesterRegistrationApi;
