import { Add } from 'iconsax-react'
import { useEffect, useState } from 'react'

import { SearchIcon } from '@/components/Common/Icons'
import UserInfoModal from '@/components/Dashboard/User/UserInfoModal'
import UserSearchResult from '@/components/Dashboard/User/UserSearchResults'
import { useLazyFetchUsersQuery } from '@/redux/apiQueries/userQueries'
import useDebounce from '@/utils/hooks/useDebounce'
import { AppointmentUser } from '@/utils/types/appointment.types'

type Props = {
  onCreateAppointmentClick: (userId: string) => void
}

const SearchUser = ({ onCreateAppointmentClick }: Props) => {
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<AppointmentUser | null>(null)
  const [searchText, setSearchText] = useState('')

  const debouncedSearchText = useDebounce(searchText, 500)

  const [
    searchUser,
    {
      data: searchResults,
      isLoading: isSearching,
      isSuccess: isUserResultFetched,
    },
  ] = useLazyFetchUsersQuery()

  const onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const onClearSearchText = () => {
    setSearchText('')
  }

  const handleCloseUserInfoModal = () => {
    setSelectedUser(null)
    setIsUserInfoModalOpen(false)
  }

  const handleOpenUserInfoModal = (user: AppointmentUser) => {
    setSelectedUser(user)
    setIsUserInfoModalOpen(true)
  }

  const _onCreateAppointmentClick = (userId: string) => {
    setSearchText('')
    setIsUserInfoModalOpen(false)
    onCreateAppointmentClick(userId)
  }

  useEffect(() => {
    if (debouncedSearchText.length > 2) {
      searchUser({ s: debouncedSearchText, hideSelf: true }, true)
    }
  }, [debouncedSearchText])

  return (
    <div className='relative w-full lg:max-w-lg'>
      <div className='relative mx-auto h-14'>
        <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3'>
          <SearchIcon className='text-neutral-200 dark:text-neutral-400' />
        </div>
        <div className='absolute inset-y-0 end-0 flex items-center pe-3'>
          <Add
            className='rotate-45 cursor-pointer text-neutral-200 dark:text-neutral-400'
            onClick={onClearSearchText}
          />
        </div>
        <input
          onChange={onChangeSearchText}
          value={searchText}
          id='user-search'
          className='block !w-full rounded-md border border-gray-300 bg-gray-50 p-4 pe-10 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          placeholder='Search users...'
          required
        />
      </div>
      {isSearching ? (
        <div className='absolute left-1/2 top-14 z-40 w-[95vw] max-w-2xl -translate-x-1/2 rounded-md border border-neutral-30 bg-surface-50 shadow-lg dark:bg-surface-200'>
          <p className='py-8 text-center'>Searching...</p>
        </div>
      ) : isUserResultFetched && searchResults && searchText.length > 2 ? (
        <div className='absolute left-1/2 top-14 z-40 w-[95vw] max-w-2xl -translate-x-1/2 rounded-md border border-neutral-30 bg-surface-50 shadow-lg dark:bg-surface-200'>
          {searchResults.length > 0 ? (
            <UserSearchResult
              users={searchResults}
              onViewUserClick={handleOpenUserInfoModal}
            />
          ) : (
            <p className='py-8 text-center'>No User Found</p>
          )}
        </div>
      ) : null}
      {selectedUser && (
        <UserInfoModal
          open={isUserInfoModalOpen}
          handleClose={handleCloseUserInfoModal}
          onCreateAppointmentClick={_onCreateAppointmentClick}
          userInfo={selectedUser}
        />
      )}
    </div>
  )
}

export default SearchUser
