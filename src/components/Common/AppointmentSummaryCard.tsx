import Button from '@/components/Common/Button'
import OutlinedButton from '@/components/Common/OutlinedButton'
import { HOUR_FORMAT } from '@/utils/constants/appointment.constants'
import { formatDate, formatTime } from '@/utils/helpers'
import { HourFormat } from '@/utils/types/appointment.types'

type AppointmentSummaryCardProps = {
  title: string
  description: string
  host: string // the person who scheduled the appointment
  guest: string // the person who is invited for the appointment
  audioFile?: File | Blob | null
  startTime: Date
  endTime: Date
  hourFormat?: HourFormat
  onSubmit: () => void
  onCancel: () => void
  loading?: boolean
}

const AppointmentSummaryCard = ({
  host,
  guest,
  audioFile,
  startTime,
  endTime,
  title,
  description,
  hourFormat = HOUR_FORMAT.h12,
  onSubmit,
  onCancel,
  loading,
}: AppointmentSummaryCardProps) => {
  return (
    <div className='flex h-full flex-col justify-between rounded-lg border border-neutral-30 bg-surface-0 p-4 shadow-md dark:bg-surface-100'>
      <div className='grow'>
        <h2 className='h3 mb-2'>{formatDate(startTime)}</h2>
        <p className='h5 mb-4 inline font-bold'>
          {formatTime(startTime, hourFormat)} -{' '}
          {formatTime(endTime, hourFormat)}
        </p>
        <h3 className='h6 mb-4'>{title}</h3>
        <p className='mb-4 line-clamp-4'>{description}</p>
        <div className='mb-4'>
          {audioFile && <audio src={URL.createObjectURL(audioFile)} controls />}
        </div>
        <p className='mb-4 inline text-sm text-neutral-700'>
          Participants: {host} and {guest}
        </p>
      </div>
      <div className='flex justify-end gap-4'>
        <>
          <OutlinedButton color='danger' size='sm' onClick={onCancel}>
            Cancel
          </OutlinedButton>
          <Button size='sm' onClick={onSubmit} loading={loading}>
            Confirm
          </Button>
        </>
      </div>
    </div>
  )
}

export default AppointmentSummaryCard
