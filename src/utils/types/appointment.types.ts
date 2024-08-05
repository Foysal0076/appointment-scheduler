import {
  AppointmentFilters,
  AppointmentStatus,
} from '../constants/appointment.constants'

export type AppointmentStatusType =
  (typeof AppointmentStatus)[keyof typeof AppointmentStatus]

export type AppointmentFiltersType =
  (typeof AppointmentFilters)[keyof typeof AppointmentFilters]
