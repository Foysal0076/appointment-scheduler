import { HOUR_FORMAT } from '@/utils/constants/appointment.constants'
import { HourFormat } from '@/utils/types/appointment.types'

export const getLocalStorageItem = (key: string) => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

export const setLocalStorageItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key)
}

export const createInitials = (name: string = '', length: 1 | 2 = 2) => {
  if (!name) return ''
  if (typeof name !== 'string') return ''
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, length)
}

export const formatTime = (
  dateTime: Date,
  hourFormat: HourFormat = HOUR_FORMAT.h12
) => {
  return dateTime.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: hourFormat === HOUR_FORMAT.h12,
  })
}

export const formatDate = (dateTime: Date) => {
  return dateTime.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
