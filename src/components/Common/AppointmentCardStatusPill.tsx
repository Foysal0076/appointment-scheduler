import clsx from 'clsx'

import { AppointmentStatusType } from '@/utils/types/appointment.types'

type Props = {
  status: AppointmentStatusType
}

const AppointmentCardStatusPill = ({ status }: Props) => {
  return (
    <div
      className={clsx(
        'select-none rounded-full border px-2 py-1 text-sm font-bold capitalize tracking-wide text-white transition-colors duration-200',
        { 'border-success-500 bg-success-400': status === 'approved' },
        { 'border-danger-500 bg-danger-400': status === 'rejected' },
        { 'border-warning-500 bg-warning-400': status === 'cancelled' },
        { 'border-info-500 bg-info-400': status === 'pending' }
      )}>
      {status}
    </div>
  )
}

export default AppointmentCardStatusPill
