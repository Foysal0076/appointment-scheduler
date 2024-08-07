import { useState } from 'react'

import { getNextDivisibleBy15Minute } from '@/utils/helpers'

export const useAppointmentFormData = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: 30,
    guest: { value: '', label: '' },
    date: getNextDivisibleBy15Minute(new Date()), // actually next minute that is divisible by 15
  })

  const onChangeFormData = (key: string, value: any) => {
    setFormData({
      ...formData,
      [key]: value,
    })
  }

  const onChangeDuration = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFormData('duration', parseInt(e.target.value))
  }

  const onChangeGuest = (value: any) => {
    onChangeFormData('guest', value)
  }

  const onChangeDate = (date: any) => {
    onChangeFormData('date', date)
  }

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFormData('title', e.target.value)
  }

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeFormData('description', e.target.value)
  }

  return {
    formData,
    onChangeDuration,
    onChangeGuest,
    onChangeDate,
    onChangeTitle,
    onChangeDescription,
  }
}
