'use client'

import { Modal } from '@/components/Common/Modal'
import ModalContainer from '@/components/Common/Modal/ModalContainer'
import AppointmentForm from '@/components/Dashboard/AppointmentForm'

type Props = {
  open: boolean
  handleClose: () => void
}

const AppointmentFormModal = ({ open, handleClose }: Props) => {
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      modalId='appointment-form-modal'>
      <ModalContainer handleClose={handleClose}>
        <AppointmentForm onCancel={handleClose} />
      </ModalContainer>
    </Modal>
  )
}

export default AppointmentFormModal
