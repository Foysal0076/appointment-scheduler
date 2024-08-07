import { useState } from 'react'
import { toast } from 'react-toastify'

import AppointmentCardStatusPill from '@/components/Common/AppointmentCardStatusPill'
import OutlinedButton from '@/components/Common/OutlinedButton'
import { PutAppointmentBody } from '@/redux/apiQueries/apiQueries.type'
import {
  useDeleteAppointmentMutation,
  useUpdateAppointmentMutation,
} from '@/redux/apiQueries/appointmentQueries'
import { formatDate, formatTime } from '@/utils/helpers'
import {
  AppointmentItem,
  AppointmentStatusType,
  HourFormat,
} from '@/utils/types/appointment.types'

type AppointmentCardProps = AppointmentItem & {
  userId: string
  hourFormat?: HourFormat
}

const AppointmentCard = ({
  id,
  title,
  description,
  audioMessage,
  hostInfo,
  guestInfo,
  userId,
  status,
  startTime,
  endTime,
}: AppointmentCardProps) => {
  const isHost = hostInfo.id === userId
  const isRejected = status === 'rejected'
  const isPast = new Date().getTime() > endTime

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
      console.log('cancel appointment')
      const body: PutAppointmentBody = {
        id,
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
        id,
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
      await deleteAppointment(id)
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  return (
    <div className='relative flex h-full flex-col justify-between gap-4 rounded-lg border border-neutral-30 bg-surface-0 p-4 shadow-md dark:bg-surface-100'>
      <div className='absolute right-2 top-2'>
        <AppointmentCardStatusPill status={status} />
      </div>
      <div className='grow'>
        <h2 className='h3 mb-2'>{formatDate(startTime)}</h2>
        <p className='h5 mb-4 font-bold'>
          {formatTime(startTime)} - {formatTime(endTime)}
        </p>
        <h3 className='h6 mb-4'>{title}</h3>
        <p className='mb-4 line-clamp-4 text-base text-neutral-400'>
          {description}
        </p>
        <div className='mb-4'>
          {audioMessage && <audio src={audioMessage} controls />}
        </div>
      </div>
      <div>
        <p className='mb-4 text-xs text-neutral-700 md:text-sm'>
          {isHost && isRejected
            ? `${guestInfo.fullname} rejected this appointment`
            : `Participants: ${hostInfo.fullname}, ${guestInfo.fullname}`}
        </p>
        <div className='flex justify-between gap-4'>
          {isHost ? (
            <>
              <OutlinedButton
                onClick={onDeleteAppointment}
                color='danger'
                size='sm'
                loading={isDeletingAppointment}>
                Delete
              </OutlinedButton>
              <OutlinedButton
                onClick={onCancelAppointment}
                color='tertiary'
                size='sm'
                disabled={status === 'cancelled' || isPast}
                loading={isUpdatingAppointment}>
                {status === 'cancelled' ? 'Cancelled' : 'Cancel'}
              </OutlinedButton>
            </>
          ) : (
            <>
              <OutlinedButton
                onClick={() => onAcceptOrDeclineAppointment('rejected')}
                color='danger'
                size='sm'
                disabled={status === 'rejected' || isPast}
                loading={loadingStatus === 'rejected'}>
                Decline
              </OutlinedButton>
              <OutlinedButton
                onClick={() => onAcceptOrDeclineAppointment('approved')}
                color='success'
                size='sm'
                disabled={status === 'approved' || isPast}
                loading={loadingStatus === 'approved'}>
                {status === 'approved' ? 'Accepted' : 'Accept'}
              </OutlinedButton>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AppointmentCard
