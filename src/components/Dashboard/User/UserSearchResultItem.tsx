import { AppointmentUser } from '@/utils/types/appointment.types'

type Props = {
  userInfo: AppointmentUser
  onViewUserClick: (user: AppointmentUser) => void
}

const UserSearchResultItem = ({ onViewUserClick, userInfo }: Props) => {
  const _onViewUserClick = () => {
    onViewUserClick(userInfo)
  }
  return (
    <li
      className='cursor-pointer py-4 shadow-sm transition-colors duration-200 hover:bg-surface-100 dark:bg-surface-200 dark:hover:bg-surface-300'
      onClick={_onViewUserClick}>
      <span className='px-4 text-sm md:text-base'>{userInfo.fullname}</span>
    </li>
  )
}

export default UserSearchResultItem
