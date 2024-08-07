'use client'
import { AppointmentCard } from '@/components/Common/AppointmentCard'
import { HOUR_FORMAT } from '@/utils/constants/appointment.constants'
import { useUserInfo } from '@/utils/hooks/useUserInfo'
import { AppointmentItem } from '@/utils/types/appointment.types'

type Props = {
  appointments: AppointmentItem[]
}

const Appointments = ({ appointments }: Props) => {
  const { user } = useUserInfo()
  const userId = user?.id as unknown as string

  if (appointments.length === 0) {
    return (
      <div className='flex h-32 items-center justify-center'>
        <p className='text-lg text-neutral-500'>No appointments found</p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-3'>
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
