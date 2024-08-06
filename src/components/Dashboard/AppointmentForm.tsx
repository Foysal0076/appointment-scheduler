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
import { useAppointmentFormData } from '@/components/Dashboard/useAppointmentFormData'
import { filterPassedTime } from '@/utils/helpers'
import { Appointment, AppointmentUser } from '@/utils/types/appointment.types'

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

const durationOptions = [
  {
    label: '30 minutes',
    value: '30',
  },
  {
    label: '1 hour',
    value: '60',
  },
  {
    label: '1 hour 30 minutes',
    value: '90',
  },
  {
    label: '2 hours',
    value: '120',
  },
  {
    label: '2 hours 30 minutes',
    value: '150',
  },
  {
    label: '3 hours',
    value: '180',
  },
]

type Props = {
  appointment?: Appointment
  onCancel: () => void
}

const AppointmentForm = ({ appointment, onCancel }: Props) => {
  const isEdit = !!appointment
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const {
    formData,
    onChangeDuration,
    onChangeGuest,
    onChangeDate,
    onChangeTitle,
  } = useAppointmentFormData()

  const handleOpenConfirmModal = () => {
    //check form values
    if (formData.guest.label === '' || formData.date === null) {
      toast.error('Please fill all the fields')
      return
    }
    setIsConfirmModalOpen(true)
  }
  const handleCloseConfirmModal = () => setIsConfirmModalOpen(false)

  const [users, setUsers] = useState<AppointmentUser[]>([
    { id: '1', name: 'Guest 1', email: 'guest1@test.com' },
    { id: '2', name: 'Guest 2', email: 'guest2@test.com' },
    { id: '3', name: 'Guest 3', email: 'guest3@test.com' },
  ])

  const [options, setOptions] = useState<any[]>([])

  console.log(formData)

  useEffect(() => {
    const options = users.map((user) => ({
      label: user.name,
      value: user.id,
    }))
    setOptions(options)
  }, [users])

  return (
    <div className='w-[85vw] md:max-w-lg'>
      <h2 className='h3 mb-8'>{isEdit ? 'Edit' : 'Create'} Meeting</h2>
      <div className='gap- flex flex-col gap-6'>
        <div className='flex flex-col'>
          <label htmlFor='guest-select' className='mb-2 font-bold'>
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
          <label htmlFor='guest-select' className='mb-2 font-bold'>
            Select Duration
          </label>
          <select
            name='duration'
            id='duration'
            className='rounded bg-surface-100'
            onChange={onChangeDuration}>
            {durationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='guest-select' className='mb-2 font-bold'>
            Select Guest
          </label>
          <Select
            className='custom-react-select-container'
            classNamePrefix='custom-react-select'
            value={formData.guest}
            onChange={onChangeGuest}
            options={options}
            styles={customStyles}
            menuPortalTarget={document.body}
            isSearchable
            menuShouldScrollIntoView={false}
            isClearable
            menuPlacement='auto'
            theme={reactSelectTheme}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='date' className='font-bold'>
            Select Date and Time
          </label>
          <DatePicker
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
      <AppointmentConfirmModal
        handleClose={handleCloseConfirmModal}
        handleCloseParentModal={onCancel}
        open={isConfirmModalOpen}
        formData={formData}
      />
    </div>
  )
}

export default AppointmentForm
