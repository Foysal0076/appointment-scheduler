import { APPOINTMENT_FILTERS } from '@/utils/constants/appointment.constants'
import { AppointmentFiltersType } from '@/utils/types/appointment.types'

const filters = Object.values(APPOINTMENT_FILTERS)

export const useAppointmentStatusFilter = (
  values: AppointmentFiltersType[],
  setValues: (value: AppointmentFiltersType[]) => void
) => {
  const onClick = (status: AppointmentFiltersType) => {
    if (status === 'all' && !values.includes(status)) {
      setValues([...filters])
      return
    }
    if (values.includes(status)) {
      setValues(values.filter((value) => value !== status))
    } else {
      setValues([...values, status])
    }
  }

  const isActive = (status: AppointmentFiltersType) => values.includes(status)

  return { onClick, isActive, filters }
}
