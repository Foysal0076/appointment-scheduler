export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
} as const

export const APPOINTMENT_FILTERS = {
  // ALL: 'all',
  UPCOMING: 'upcoming',
  PAST: 'past',
  // PENDING: 'pending',
  // CANCELLED: 'cancelled',
  // REJECTED: 'rejected',
} as const

export const HOUR_FORMAT = {
  h12: '12',
  h24: '24',
} as const

export const MEETING_DURATION_OPTIONS = [
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
