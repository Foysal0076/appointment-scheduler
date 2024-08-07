import { useState } from 'react'
import { toast } from 'react-toastify'

import { PutAppointmentBody } from '@/redux/apiQueries/apiQueries.type'
import {
  useDeleteAppointmentMutation,
  useUpdateAppointmentMutation,
} from '@/redux/apiQueries/appointmentQueries'
import { AppointmentStatusType } from '@/utils/types/appointment.types'

export const useAppointmentCard = (
  appointmentId: string,
  startTime: number
) => {
  const [updateAppointment, { isLoading: isUpdatingAppointment }] =
    useUpdateAppointmentMutation()

  const [deleteAppointment, { isLoading: isDeletingAppointment }] =
    useDeleteAppointmentMutation()

  const [loadingStatus, setLoadingStatus] =
    useState<AppointmentStatusType | null>(null)

  const onCancelAppointment = async () => {
    try {
      //check if the meeting is already started
      const currentTime = new Date().getTime()
      if (currentTime > startTime) {
        toast.error('You can not cancel a meeting that is past current time')
        return
      }

      const body: PutAppointmentBody = {
        id: appointmentId,
        status: 'cancelled',
      }
      await updateAppointment(body)
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  const onAcceptOrDeclineAppointment = async (
    status: AppointmentStatusType
  ) => {
    try {
      setLoadingStatus(status)
      const body: PutAppointmentBody = {
        id: appointmentId,
        status,
      }
      await updateAppointment(body)
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    } finally {
      setLoadingStatus(null)
    }
  }

  const onDeleteAppointment = async () => {
    try {
      await deleteAppointment(appointmentId)
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  return {
    loadingStatus,
    isUpdatingAppointment,
    isDeletingAppointment,
    onCancelAppointment,
    onAcceptOrDeclineAppointment,
    onDeleteAppointment,
  }
}
