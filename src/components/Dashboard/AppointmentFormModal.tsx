'use client'

import { Modal } from '@/components/Common/Modal'
import ModalContainer from '@/components/Common/Modal/ModalContainer'
import AppointmentForm from '@/components/Dashboard/AppointmentForm'

type Props = {
  userId: string | null
  open: boolean
  handleClose: () => void
}

const AppointmentFormModal = ({ userId, open, handleClose }: Props) => {
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      modalId='appointment-form-modal'>
      <ModalContainer handleClose={handleClose}>
        <AppointmentForm onCancel={handleClose} userId={userId} />
      </ModalContainer>
    </Modal>
  )
}

export default AppointmentFormModal
