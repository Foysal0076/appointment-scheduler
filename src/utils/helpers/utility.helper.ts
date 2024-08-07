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
  dateTime: Date | number,
  hourFormat: HourFormat = HOUR_FORMAT.h12
) => {
  if (typeof dateTime === 'number') {
    dateTime = new Date(dateTime)
  }
  return dateTime.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: hourFormat === HOUR_FORMAT.h12,
  })
}

export const formatDate = (dateTime: Date | number) => {
  if (typeof dateTime === 'number') {
    dateTime = new Date(dateTime)
  }
  return dateTime.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export const addMinuteToTime = (date: Date, minutes: number) => {
  return new Date(date.getTime() + minutes * 60000)
}

export const subtractMinuteFromTime = (date: Date, minutes: number) => {
  return new Date(date.getTime() - minutes * 60000)
}

export const getNextDivisibleBy15Minute = (date: Date): Date => {
  const minutes = date.getMinutes()
  const nextDivisibleBy15 = Math.ceil(minutes / 15) * 15
  date.setMinutes(nextDivisibleBy15)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date
}

export const filterPassedTime = (time: Date): boolean => {
  const currentDate = new Date()
  const selectedDate = new Date(time)

  return currentDate.getTime() < selectedDate.getTime()
}

export const capitalize = (str: string) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}
