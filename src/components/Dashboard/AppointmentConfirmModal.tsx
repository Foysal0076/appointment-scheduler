'use client'

import { useState } from 'react'

import AppointmentSummaryCard from '@/components/Common/AppointmentSummaryCard'
import { Modal } from '@/components/Common/Modal'
import { HOUR_FORMAT } from '@/utils/constants/appointment.constants'
import { addMinuteToTime } from '@/utils/helpers'

type Props = {
  open: boolean
  handleClose: () => void
  handleCloseParentModal: () => void
  formData: {
    title: string
    guest: { value: string; label: string }
    duration: number
    date: Date
  }
}

const AppointmentConfirmModal = ({
  open,
  handleClose,
  handleCloseParentModal,
  formData,
}: Props) => {
  const [submittingForm, setSubmittingForm] = useState(false)

  const _endTime = addMinuteToTime(formData.date, formData.duration)

  const title =
    formData.title === ''
      ? `Meeting with ${formData.guest.label}`
      : formData.title

  const onConfirm = async () => {
    try {
      setSubmittingForm(true)

      const startTime = formData.date.toUTCString()
      const endTime = _endTime.toUTCString()
      console.log({
        title,
        startTime,
        endTime,
        guestId: formData.guest.value,
        hostId: 'hostId',
      })
      //after success
      // handleClose()
      // handleCloseParentModal()
    } catch (error) {
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
          guest={formData.guest.label}
          host={''}
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
