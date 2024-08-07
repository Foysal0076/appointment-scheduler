import {
  AppointmentStatusType,
  AppointmentUser,
} from '@/utils/types/appointment.types'

export type FetchAppointmentQueryParams = {
  upcoming?: boolean
  past?: boolean
}

export type PostAppointmentBody = {
  guestId: string
  guestInfo: AppointmentUser
  status: AppointmentStatusType
  title: string
  startTime: number // Date.getTime()
  endTime: number // Date.getTime()
}

export type PutAppointmentBody = {
  title: string
  status: AppointmentStatusType
}
