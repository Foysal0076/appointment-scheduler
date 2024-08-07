import UserSearchResultItem from '@/components/Dashboard/User/UserSearchResultItem'
import { AppointmentUser } from '@/utils/types/appointment.types'

type Props = {
  users: AppointmentUser[]
  onViewUserClick: (user: AppointmentUser) => void
}

const UserSearchResult = ({ onViewUserClick, users }: Props) => {
  return (
    <ul className='flex flex-col gap-0'>
      {users.map((userInfo) => (
        <UserSearchResultItem
          key={userInfo.id}
          userInfo={userInfo}
          onViewUserClick={onViewUserClick}
        />
      ))}
    </ul>
  )
}

export default UserSearchResult
