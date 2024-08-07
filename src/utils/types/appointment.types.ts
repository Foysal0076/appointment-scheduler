import {
  APPOINTMENT_FILTERS,
  APPOINTMENT_STATUS,
  HOUR_FORMAT,
} from '@/utils/constants/appointment.constants'

export type AppointmentStatusType =
  (typeof APPOINTMENT_STATUS)[keyof typeof APPOINTMENT_STATUS]

export type AppointmentFiltersType =
  (typeof APPOINTMENT_FILTERS)[keyof typeof APPOINTMENT_FILTERS]

export type HourFormat = (typeof HOUR_FORMAT)[keyof typeof HOUR_FORMAT]

export type AppointmentUser = {
  id: string
  fullname: string
  email: string
}

export type Appointment = {
  id: string
  title: string
  audioMessage?: string
  host: AppointmentUser
  guest: AppointmentUser
  status: AppointmentStatusType
  startTime: Date
  endTime: Date
  hourFormat: HourFormat
}

export type AppointmentItem = {
  id: string
  status: AppointmentStatusType
  title: string
  description: string
  audioMessage?: string
  startTime: number
  endTime: number
  hostId: string
  hostInfo: AppointmentUser
  guestId: string
  guestInfo: AppointmentUser
}

export type InputFormData = {
  title: string
  description: string
  audioFile: File | Blob | null
  duration: number
  guest: { value: string; label: string }
  date: Date
}
