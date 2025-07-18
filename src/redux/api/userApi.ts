import {querySearchParams} from '../../utils/querySearchParams';
import {tagTypes} from '../tag-types';
import {baseApi} from './baseApi';

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addStudent: builder.mutation({
      query: (args) => {
        return {
          url: '/users/create-student',
          method: 'POST',
          body: args,
        };
      },
      invalidatesTags: [tagTypes.users, tagTypes.student],
    }),

    addFaculty: builder.mutation({
      query: (args) => {
        return {
          url: '/users/create-faculty',
          method: 'POST',
          body: args,
        };
      },
      invalidatesTags: [tagTypes.users, tagTypes.faculty],
    }),

    addAdmin: builder.mutation({
      query: (args) => {
        return {
          url: '/users/create-admin',
          method: 'POST',
          body: args,
        };
      },
      invalidatesTags: [tagTypes.users, tagTypes.admin],
    }),

    getAllUser: builder.query({
      query: (args) => {
        const params = querySearchParams(args);

        return {
          url: '/users',
          method: 'GET',
          params,
        };
      },
      providesTags: [tagTypes.users],
    }),

    getMyProfile: builder.query({
      query: () => {
        return {
          url: '/users/me',
          method: 'POST',
        };
      },
    }),

    changeStatus: builder.mutation({
      query: (args) => {
        return {
          url: `/users/change-status/${args.id}`,
          method: 'PATCH',
          body: args.data,
        };
      },
      invalidatesTags: [
        tagTypes.users,
        tagTypes.student,
        tagTypes.faculty,
        tagTypes.admin,
      ],
    }),
  }),
});

export const {
  useAddStudentMutation,
  useAddFacultyMutation,
  useAddAdminMutation,
  useGetAllUserQuery,
  useGetMyProfileQuery,
  useChangeStatusMutation,
} = userApi;
