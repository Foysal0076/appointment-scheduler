'use client'
import AppointmentCard from '@/components/Common/AppointmentCard'
import { HOUR_FORMAT } from '@/utils/constants/appointment.constants'
import { useUserInfo } from '@/utils/hooks/useUserInfo'
import { AppointmentItem } from '@/utils/types/appointment.types'

type Props = {
  appointments: AppointmentItem[]
}

const Appointments = ({ appointments }: Props) => {
  const { user } = useUserInfo()
  const userId = user?.id as unknown as string

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8 2xl:grid-cols-4'>
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          userId={userId}
          hourFormat={HOUR_FORMAT.h12}
          {...appointment}
        />
      ))}
    </div>
  )
}

export default Appointments
