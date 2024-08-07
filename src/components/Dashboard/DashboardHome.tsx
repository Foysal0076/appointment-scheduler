'use client'
import { useEffect, useState } from 'react'

import Button from '@/components/Common/Button'
import Spinner from '@/components/Common/Spinner'
import AppointmentFormModal from '@/components/Dashboard/AppointmentFormModal'
import Appointments from '@/components/Dashboard/Appointments'
import AppointmentStatusFilter from '@/components/Dashboard/AppointmentStatusFilter'
import SearchUser from '@/components/Dashboard/User/SearchUser'
import {
  useFetchAppointmentsQuery,
  usePrefetchAppointment,
} from '@/redux/apiQueries/appointmentQueries'
import { usePrefetchUsers } from '@/redux/apiQueries/userQueries'
import { AppointmentFiltersType } from '@/utils/types/appointment.types'

const DashboardHome = () => {
  const [filters, setFilters] = useState<AppointmentFiltersType[]>([])
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [isAppointmentFormModalOpen, setIsAppointmentFormModalOpen] =
    useState(false)

  const prefetchAppointments = usePrefetchAppointment('fetchAppointments')
  const prefetchUsers = usePrefetchUsers('fetchUsers')

  const handleCloseAppointmentFormModal = () =>
    setIsAppointmentFormModalOpen(false)

  const handleOpenAppointmentFormModal = () =>
    setIsAppointmentFormModalOpen(true)

  const handleOpenAppointmentFormModalWithUser = (userId: string) => {
    setSelectedUserId(userId)
    setIsAppointmentFormModalOpen(true)
  }
  const {
    data: appointments,
    isLoading: isLoadingAppointments,
    isSuccess: isAppointedDataFetched,
  } = useFetchAppointmentsQuery({
    past: filters.includes('past'),
    upcoming: filters.includes('upcoming'),
  })

  useEffect(() => {
    prefetchAppointments({ past: true })
    prefetchAppointments({ upcoming: true })
    prefetchUsers({})
  }, [])

  return (
    <>
      <div className='container py-6 md:py-10'>
        <div className='mb-8 flex justify-center'>
          <SearchUser
            onCreateAppointmentClick={handleOpenAppointmentFormModalWithUser}
          />
        </div>
        <div className='flex flex-col-reverse gap-4 sm:flex-row sm:justify-between'>
          <AppointmentStatusFilter values={filters} setValues={setFilters} />
          <Button onClick={handleOpenAppointmentFormModal}>
            + Create New Appointment
          </Button>
        </div>
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
        userId={selectedUserId}
      />
    </>
  )
}

export default DashboardHome
