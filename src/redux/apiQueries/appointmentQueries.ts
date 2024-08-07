import {
  FetchAppointmentQueryParams,
  PostAppointmentBody,
  PutAppointmentBody,
} from '@/redux/apiQueries/apiQueries.type'
import { apiSlice } from '@/redux/slice/apiSlice'
import { AppointmentItem } from '@/utils/types/appointment.types'

export const appointmentQueries = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAppointments: builder.query<
      AppointmentItem[],
      FetchAppointmentQueryParams
    >({
      query: (params) => ({
        url: '/appointments',
        method: 'GET',
        params,
      }),
      providesTags: ['Appointments'],
    }),
    createAppointment: builder.mutation<any, PostAppointmentBody>({
      query: (data) => ({
        url: '/appointments',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Appointments'],
    }),
    updateAppointment: builder.mutation<any, PutAppointmentBody>({
      query: (data) => ({
        url: '/appointments',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Appointments'],
    }),
  }),
})

export const {
  useFetchAppointmentsQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
} = appointmentQueries
