'use client'
import AppointmentCard from '@/components/Common/AppointmentCard'
import { useUserInfo } from '@/utils/hooks/useUserInfo'
import { Appointment } from '@/utils/types/appointment.types'

type Props = {
  appointments: Appointment[]
}

const Appointments = ({ appointments }: Props) => {
  const { user } = useUserInfo()
  const userId = user?.id as unknown as string
  if (!userId) return null

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8 2xl:grid-cols-4'>
      <AppointmentCard
        key={'appointment.id'}
        title={'appointment.title sfs sdfg ssdgs dgh sdfghs dhsd hsdhsd fhsdfh'}
        host={{
          id: userId,
          name: 'appointment.host.name',
          email: 'appointment.host.email',
        }}
        guest={{
          id: 'appointment.guest.id',
          name: 'appointment.guest.name',
          email: 'appointment.guest.email',
        }}
        startTime={new Date('2024-08-05T08:30:12Z')}
        endTime={new Date('2024-08-05T10:30:12Z')}
        appointmentId={'appointment.id'}
        status={'approved'}
        hourFormat={'12'}
        userId={userId}
      />
      <AppointmentCard
        key={'appointment.id'}
        title={'appointment.title'}
        host={{
          id: 'appointment.host.id',
          name: 'appointment.host.name',
          email: 'appointment.host.email',
        }}
        guest={{
          id: 'appointment.guest.id',
          name: 'appointment.guest.name',
          email: 'appointment.guest.email',
        }}
        startTime={new Date('2024-08-05T08:30:12Z')}
        endTime={new Date('2024-08-05T10:30:12Z')}
        appointmentId={'appointment.id'}
        status={'pending'}
        hourFormat={'12'}
        userId={userId}
      />
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          title={appointment.title}
          host={appointment.host}
          guest={appointment.guest}
          userId={userId}
          startTime={appointment.startTime}
          endTime={appointment.endTime}
          appointmentId={appointment.id}
          status={appointment.status}
          hourFormat={appointment.hourFormat}
        />
      ))}
    </div>
  )
}

export default Appointments
