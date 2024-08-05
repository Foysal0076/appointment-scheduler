'use client'
import { useState } from 'react'

import Button from '@/components/Common/Button'
import Appointments from '@/components/Dashboard/Appointments'
import AppointmentStatusFilter from '@/components/Dashboard/AppointmentStatusFilter'
import { AppointmentFiltersType } from '@/utils/types/appointment.types'

const DashboardHome = () => {
  const [filters, setFilters] = useState<AppointmentFiltersType[]>(['all'])

  return (
    <div className='container py-6 md:py-10'>
      <div className='mb-8 flex justify-center md:justify-end'>
        <Button>+ Create New Appointment</Button>
      </div>
      <AppointmentStatusFilter values={filters} setValues={setFilters} />
      <div className='mb-6 md:mb-8' />
      <Appointments appointments={[]} />
    </div>
  )
}

export default DashboardHome
