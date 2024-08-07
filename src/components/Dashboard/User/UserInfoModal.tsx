import { Modal } from '@/components/Common/Modal'
import ModalContainer from '@/components/Common/Modal/ModalContainer'
import UserInfoCard from '@/components/Dashboard/User/UserInfoCard'
import { AppointmentUser } from '@/utils/types/appointment.types'

type Props = {
  open: boolean
  handleClose: () => void
  userInfo: AppointmentUser
  onCreateAppointmentClick: (userId: string) => void
}

const UserInfoModal = ({
  userInfo,
  onCreateAppointmentClick,
  handleClose,
  open,
}: Props) => {
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      modalId='appointment-form-modal'>
      <ModalContainer handleClose={handleClose}>
        <UserInfoCard
          onCreateAppointmentClick={onCreateAppointmentClick}
          userInfo={userInfo}
        />
      </ModalContainer>
    </Modal>
  )
}

export default UserInfoModal
