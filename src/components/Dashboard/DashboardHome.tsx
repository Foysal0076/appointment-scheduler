'use client'
import { useState } from 'react'

import Button from '@/components/Common/Button'
import Spinner from '@/components/Common/Spinner'
import AppointmentFormModal from '@/components/Dashboard/AppointmentFormModal'
import Appointments from '@/components/Dashboard/Appointments'
import AppointmentStatusFilter from '@/components/Dashboard/AppointmentStatusFilter'
import { useFetchAppointmentsQuery } from '@/redux/apiQueries/appointmentQueries'
import { AppointmentFiltersType } from '@/utils/types/appointment.types'

const DashboardHome = () => {
  const [filters, setFilters] = useState<AppointmentFiltersType[]>([])
  const [isAppointmentFormModalOpen, setIsAppointmentFormModalOpen] =
    useState(false)
  const handleCloseAppointmentFormModal = () =>
    setIsAppointmentFormModalOpen(false)

  const handleOpenAppointmentFormModal = () =>
    setIsAppointmentFormModalOpen(true)

  const {
    data: appointments,
    isLoading: isFetchingAppointments,
    isSuccess: isAppointedDataFetched,
  } = useFetchAppointmentsQuery({
    past: filters.includes('past'),
    upcoming: filters.includes('upcoming'),
  })
  console.log(appointments)
  return (
    <>
      <div className='container py-6 md:py-10'>
        <div className='mb-8 flex justify-center md:justify-end'>
          <Button onClick={handleOpenAppointmentFormModal}>
            + Create New Appointment
          </Button>
        </div>
        <AppointmentStatusFilter values={filters} setValues={setFilters} />
        <div className='mb-6 md:mb-8' />
        {isFetchingAppointments ? (
          <div className='flex justify-center py-8'>
            <Spinner />
          </div>
        ) : isAppointedDataFetched ? (
          <Appointments appointments={appointments} />
        ) : null}
      </div>
      <AppointmentFormModal
        open={isAppointmentFormModalOpen}
        handleClose={handleCloseAppointmentFormModal}
      />
    </>
  )
}

export default DashboardHome
