'use client'

import 'react-datepicker/dist/react-datepicker.css'

import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import { toast } from 'react-toastify'

import Button from '@/components/Common/Button'
import { Input } from '@/components/Common/Input'
import OutlinedButton from '@/components/Common/OutlinedButton'
import AppointmentConfirmModal from '@/components/Dashboard/AppointmentConfirmModal'
import AudioMessage from '@/components/Dashboard/AudioMessage'
import { useAppointmentFormData } from '@/components/Dashboard/Hooks/useAppointmentFormData'
import { useFetchUsersQuery } from '@/redux/apiQueries/userQueries'
import { MEETING_DURATION_OPTIONS } from '@/utils/constants/appointment.constants'
import { filterPassedTime } from '@/utils/helpers'
import { useUserInfo } from '@/utils/hooks/useUserInfo'

const customStyles = {
  menuPortal: (base: any) => ({ ...base, zIndex: 99999 }),
}

const reactSelectTheme = (theme: any) => ({
  ...theme,
  borderRadius: '.25rem',
  colors: {
    ...theme.colors,
    primary25: '#6b7280',
  },
})

type Props = {
  userId: string | null
  onCancel: () => void
}

const AppointmentForm = ({ userId, onCancel }: Props) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [options, setOptions] = useState<any[]>([])

  const { data: userResponse, isLoading: isFetchingUsers } = useFetchUsersQuery(
    {}
  )

  const { user } = useUserInfo()

  const {
    formData,
    onChangeDuration,
    onChangeGuest,
    onChangeDate,
    onChangeTitle,
    onChangeDescription,
    onChangeAudioFile,
  } = useAppointmentFormData()

  const handleOpenConfirmModal = () => {
    //check form values
    if (
      formData.guest.label === '' ||
      formData.description === '' ||
      formData.date === null
    ) {
      toast.error('Please fill all the required fields')
      return
    }
    setIsConfirmModalOpen(true)
  }
  const handleCloseConfirmModal = () => setIsConfirmModalOpen(false)

  useEffect(() => {
    if (Array.isArray(userResponse)) {
      //filter current user
      const users = userResponse.filter((u) => u.id !== user?.id)
      const options = users.map((user) => ({
        label: user.fullname,
        value: user.id,
      }))
      setOptions(options)
      const selectedUser =
        options.find((option) => option.value === userId) ?? options[0]
      onChangeGuest(selectedUser)
    }
  }, [userResponse, userId])

  return (
    <div className='w-[85vw] md:max-w-lg'>
      <h2 className='h3 mb-8'>Create Meeting</h2>
      <div className='gap- flex flex-col gap-6'>
        <div className='flex flex-col'>
          <label htmlFor='meeting-title' className='mb-2 font-bold'>
            Title
          </label>
          <Input
            name='meeting-title'
            id='meeting-title'
            onChange={onChangeTitle}
            placeholder='Give your meeting a title'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='meeting-description' className='mb-2 font-bold'>
            Description <span className='ml-0.5 text-danger-500'>*</span>
          </label>
          <textarea
            name='meeting-description'
            id='meeting-description'
            onChange={onChangeDescription}
            placeholder='Add a description'
            rows={4}
            className='w-full resize-none rounded bg-surface-50 dark:bg-surface-200'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='audio-message' className='mb-2 font-bold'>
            Audio message
          </label>
          <AudioMessage
            setAudioFile={onChangeAudioFile}
            audioFile={formData.audioFile}
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='duration' className='mb-2 font-bold'>
            Select Duration <span className='ml-0.5 text-danger-500'>*</span>
          </label>
          <select
            name='duration'
            id='duration'
            className='rounded bg-surface-100'
            onChange={onChangeDuration}>
            {MEETING_DURATION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='guest-select' className='mb-2 font-bold'>
            Select Guest <span className='ml-0.5 text-danger-500'>*</span>
          </label>
          <Select
            aria-label='Select Guest'
            className='custom-react-select-container'
            classNamePrefix='custom-react-select'
            value={formData.guest}
            onChange={onChangeGuest}
            options={options}
            styles={customStyles}
            menuPortalTarget={document.body}
            isSearchable
            menuShouldScrollIntoView={false}
            menuPlacement='auto'
            theme={reactSelectTheme}
            isLoading={isFetchingUsers}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='date' className='font-bold'>
            Select Date and Time{' '}
            <span className='ml-0.5 text-danger-500'>*</span>
          </label>
          <DatePicker
            id='date'
            className='w-full rounded bg-surface-100'
            selected={formData.date}
            onChange={onChangeDate}
            dateFormat='dd/MM/yyyy hh:mm a'
            showTimeSelect
            minDate={new Date()}
            filterTime={filterPassedTime}
            timeIntervals={15}
          />
        </div>
        <div className='mt-4 flex justify-end gap-4'>
          <OutlinedButton color='danger' onClick={onCancel}>
            Cancel
          </OutlinedButton>
          <Button onClick={handleOpenConfirmModal}>Send Invitation</Button>
        </div>
      </div>
      {userResponse && (
        <AppointmentConfirmModal
          handleClose={handleCloseConfirmModal}
          handleCloseParentModal={onCancel}
          open={isConfirmModalOpen}
          formData={{
            ...formData,
            guestInfo:
              userResponse?.find((u) => u.id === formData.guest.value) ?? null,
          }}
        />
      )}
    </div>
  )
}

export default AppointmentForm
