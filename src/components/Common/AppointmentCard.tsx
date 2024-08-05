import OutlinedButton from '@/components/Common/OutlinedButton'
import { HOUR_FORMAT } from '@/utils/constants/appointment.constants'
import { formatDate, formatTime } from '@/utils/helpers'
import {
  AppointmentStatusType,
  AppointmentUser,
  HourFormat,
} from '@/utils/types/appointment.types'

type AppointmentCardProps = {
  title: string
  host: AppointmentUser // the person who scheduled the appointment
  guest: AppointmentUser // the person who is invited for the appointment
  status: AppointmentStatusType
  startTime: Date
  endTime: Date
  appointmentId: string
  hourFormat?: HourFormat
  userId: string
}

const AppointmentCard = ({
  host,
  guest,
  userId,
  status,
  startTime,
  endTime,
  title,
  appointmentId,
  hourFormat = HOUR_FORMAT.h12,
}: AppointmentCardProps) => {
  const isHost = host.id === userId
  const isRejected = status === 'rejected'

  return (
    <div className='flex h-full flex-col justify-between rounded-lg border border-neutral-30 bg-surface-0 p-4 shadow-md dark:bg-surface-100'>
      <div className='grow'>
        <h2 className='h3 mb-2'>{formatDate(startTime)}</h2>
        <p className='h5 mb-4 font-bold'>
          {formatTime(startTime)} - {formatTime(endTime)}
        </p>
        <h3 className='h6 mb-4'>{title}</h3>
        <p className='mb-4 text-sm text-neutral-700'>
          {isHost && isRejected
            ? `${guest.name} rejected this appointment`
            : `Participants: ${host.name} and ${guest.name}`}
        </p>
      </div>
      <div className='flex justify-between gap-4'>
        {isHost ? (
          <>
            <OutlinedButton color='danger' size='sm'>
              Delete
            </OutlinedButton>
            <OutlinedButton
              color='danger'
              size='sm'
              disabled={status === 'cancelled'}>
              Cancel
            </OutlinedButton>
            <OutlinedButton color='tertiary' size='sm'>
              Edit
            </OutlinedButton>
          </>
        ) : (
          <>
            <OutlinedButton
              color='danger'
              size='sm'
              disabled={status === 'rejected'}>
              Decline
            </OutlinedButton>
            <OutlinedButton
              color='success'
              size='sm'
              disabled={status === 'approved'}>
              {status === 'approved' ? 'Accepted' : 'Accept'}
            </OutlinedButton>
          </>
        )}
      </div>
    </div>
  )
}

export default AppointmentCard
