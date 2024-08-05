export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
} as const

export const APPOINTMENT_FILTERS = {
  ALL: 'all',
  UPCOMING: 'upcoming',
  PAST: 'past',
  PENDING: 'pending',
  CANCELLED: 'cancelled',
  REJECTED: 'rejected',
} as const

export const HOUR_FORMAT = {
  h12: '12',
  h24: '24',
} as const
