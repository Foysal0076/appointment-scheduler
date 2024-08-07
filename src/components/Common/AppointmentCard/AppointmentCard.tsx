import { useMemo } from 'react'

import { useAppointmentCard } from '@/components/Common/AppointmentCard/useAppointmentCard'
import AppointmentCardStatusPill from '@/components/Common/AppointmentCardStatusPill'
import OutlinedButton from '@/components/Common/OutlinedButton'
import { formatDate, formatTime } from '@/utils/helpers'
import { AppointmentItem, HourFormat } from '@/utils/types/appointment.types'

type AppointmentCardProps = AppointmentItem & {
  userId: string
  hourFormat?: HourFormat
}

export const AppointmentCard = ({
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
  const isPast = useMemo(() => new Date().getTime() > endTime, [endTime])

  const {
    loadingStatus,
    isUpdatingAppointment,
    isDeletingAppointment,
    onCancelAppointment,
    onAcceptOrDeclineAppointment,
    onDeleteAppointment,
  } = useAppointmentCard(id, startTime)

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
