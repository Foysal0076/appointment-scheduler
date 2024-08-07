'use client'
import { useAppointmentStatusFilter } from '@/components/Dashboard/Hooks/useAppointmentStatusFilter'
import StatusPill from '@/components/Dashboard/StatusPill'
import { AppointmentFiltersType } from '@/utils/types/appointment.types'

type Props = {
  values: AppointmentFiltersType[]
  setValues: (values: AppointmentFiltersType[]) => void
}

const AppointmentStatusFilter = ({ setValues, values }: Props) => {
  const { onClick, isActive, filters } = useAppointmentStatusFilter(
    values,
    setValues
  )
  return (
    <div className='flex flex-wrap items-center gap-4 max-md:justify-center'>
      {filters.map((status) => (
        <StatusPill
          key={status}
          status={status}
          active={isActive(status)}
          onClick={() => onClick(status)}
        />
      ))}
    </div>
  )
}

export default AppointmentStatusFilter
