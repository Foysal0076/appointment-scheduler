import { apiSlice } from '@/redux/slice/apiSlice'
import { AppointmentUser } from '@/utils/types/appointment.types'

export const userQueries = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query<AppointmentUser[], any>({
      query: (params) => ({
        url: '/users',
        method: 'GET',
        params,
      }),
      providesTags: ['Users'],
    }),
  }),
})

export const { useFetchUsersQuery } = userQueries
