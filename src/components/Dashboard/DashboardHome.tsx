'use client'
import { useEffect, useState } from 'react'

import Button from '@/components/Common/Button'
import Spinner from '@/components/Common/Spinner'
import AppointmentFormModal from '@/components/Dashboard/AppointmentFormModal'
import Appointments from '@/components/Dashboard/Appointments'
import AppointmentStatusFilter from '@/components/Dashboard/AppointmentStatusFilter'
import {
  useFetchAppointmentsQuery,
  usePrefetchAppointment,
} from '@/redux/apiQueries/appointmentQueries'
import { AppointmentFiltersType } from '@/utils/types/appointment.types'

const DashboardHome = () => {
  const [filters, setFilters] = useState<AppointmentFiltersType[]>([])
  const [isAppointmentFormModalOpen, setIsAppointmentFormModalOpen] =
    useState(false)

  const prefetchAppointments = usePrefetchAppointment('fetchAppointments')

  const handleCloseAppointmentFormModal = () =>
    setIsAppointmentFormModalOpen(false)

  const handleOpenAppointmentFormModal = () =>
    setIsAppointmentFormModalOpen(true)

  const {
    data: appointments,
    isLoading: isLoadingAppointments,
    isSuccess: isAppointedDataFetched,
    isFetching: isFetchingAppointments,
  } = useFetchAppointmentsQuery({
    past: filters.includes('past'),
    upcoming: filters.includes('upcoming'),
  })
  useEffect(() => {
    prefetchAppointments({ past: true })
    prefetchAppointments({ upcoming: true })
  }, [])

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
        {isLoadingAppointments ? (
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
