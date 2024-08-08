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
  description: string
  audioMessage: string | null
  startTime: number // Date.getTime()
  endTime: number // Date.getTime()
}

export type PutAppointmentBody = Partial<PostAppointmentBody> & {
  id: string
}
