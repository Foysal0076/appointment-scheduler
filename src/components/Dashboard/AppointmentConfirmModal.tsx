'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'

import AppointmentSummaryCard from '@/components/Common/AppointmentSummaryCard'
import { Modal } from '@/components/Common/Modal'
import { PostAppointmentBody } from '@/redux/apiQueries/apiQueries.type'
import { useCreateAppointmentMutation } from '@/redux/apiQueries/appointmentQueries'
import { HOUR_FORMAT } from '@/utils/constants/appointment.constants'
import { addMinuteToTime } from '@/utils/helpers'
import { useUserInfo } from '@/utils/hooks/useUserInfo'
import { AppointmentUser } from '@/utils/types/appointment.types'

type Props = {
  open: boolean
  handleClose: () => void
  handleCloseParentModal: () => void
  formData: {
    title: string
    guest: { value: string; label: string }
    duration: number
    date: Date
    guestInfo: AppointmentUser | null
  }
}

const AppointmentConfirmModal = ({
  open,
  handleClose,
  handleCloseParentModal,
  formData,
}: Props) => {
  const { user } = useUserInfo()
  const [submittingForm, setSubmittingForm] = useState(false)

  const _endTime = addMinuteToTime(formData.date, formData.duration)

  const title =
    formData.title === ''
      ? `Meeting with ${formData?.guest?.label ?? 'Guest'}`
      : formData.title

  const [createAppointment, { isLoading: creatingAppointment }] =
    useCreateAppointmentMutation()

  const onConfirm = async () => {
    try {
      if (!formData.guestInfo) return

      setSubmittingForm(true)

      // const startTime = formData.date.toUTCString()
      // const endTime = _endTime.toUTCString()

      const startTime = formData.date.getTime()
      const endTime = _endTime.getTime()

      const _formData: PostAppointmentBody = {
        title,
        startTime,
        endTime,
        guestId: formData.guest.value,
        status: 'pending',
        guestInfo: formData.guestInfo,
      }
      await createAppointment(_formData)

      //after success
      handleClose()
      handleCloseParentModal()
    } catch (error: any) {
      console.log(error)
      const errorMessage =
        error?.response?.data?.message || error?.data?.message || error?.message
      toast.error(errorMessage)
    } finally {
      setSubmittingForm(false)
    }
  }

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      modalId='appointment-confirm-modal'>
      <div className='w-[85vw] md:max-w-lg'>
        <AppointmentSummaryCard
          title={title}
          guest={formData?.guest?.label}
          host={user?.name ?? ''}
          startTime={formData.date}
          endTime={_endTime}
          hourFormat={HOUR_FORMAT.h12}
          onCancel={handleClose}
          onSubmit={onConfirm}
          loading={submittingForm}
        />
      </div>
    </Modal>
  )
}

export default AppointmentConfirmModal
