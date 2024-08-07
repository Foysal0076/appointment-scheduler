import OutlinedButton from '@/components/Common/OutlinedButton'
import { createInitials } from '@/utils/helpers'
import { AppointmentUser } from '@/utils/types/appointment.types'

type Props = {
  onCreateAppointmentClick: (userId: string) => void
  userInfo: AppointmentUser
}

const UserInfoCard = ({ onCreateAppointmentClick, userInfo }: Props) => {
  const initial = createInitials(userInfo.fullname)

  const _onCreateAppointmentClick = () => {
    onCreateAppointmentClick(userInfo.id)
  }

  return (
    <div className='relative flex h-full flex-col justify-between gap-4 rounded-lg border border-neutral-30 bg-surface-0 p-4 shadow-md dark:bg-surface-100'>
      <div className='flex flex-col items-center gap-4'>
        <div
          className={`flex h-24 w-24 items-center justify-center rounded-full border-neutral-100 bg-neutral-800 text-base font-bold text-neutral-0`}>
          <span className='h2 font-bold text-neutral-0'>{initial}</span>
        </div>
        <div className='flex flex-col items-center gap-1'>
          <p className='h5'>{userInfo.fullname}</p>
          <a href={`mailto:${userInfo.email}`} className='text-sm'>
            {userInfo.email}
          </a>
        </div>
      </div>
      <div className='flex justify-end'>
        <OutlinedButton onClick={_onCreateAppointmentClick}>
          Create Appointment
        </OutlinedButton>
      </div>
    </div>
  )
}

export default UserInfoCard
