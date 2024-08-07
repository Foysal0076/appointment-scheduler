'use client'

import AppointmentSummaryCard from '@/components/Common/AppointmentSummaryCard'
import { Modal } from '@/components/Common/Modal'
import { useAppointmentConfirmModal } from '@/components/Dashboard/Hooks/useAppointmentConfirmModal'
import { HOUR_FORMAT } from '@/utils/constants/appointment.constants'
import { AppointmentUser } from '@/utils/types/appointment.types'

type Props = {
  open: boolean
  handleClose: () => void
  handleCloseParentModal: () => void
  formData: {
    title: string
    description: string
    audioFile: File | Blob | null
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
  const { title, hostName, _endTime, onConfirm, submittingForm } =
    useAppointmentConfirmModal(formData, handleClose, handleCloseParentModal)

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      modalId='appointment-confirm-modal'>
      <div className='w-[85vw] md:max-w-lg'>
        <AppointmentSummaryCard
          title={title}
          description={formData.description}
          audioFile={formData.audioFile}
          guest={formData?.guest?.label}
          host={hostName}
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
