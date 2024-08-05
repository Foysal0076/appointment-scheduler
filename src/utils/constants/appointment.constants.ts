export const AppointmentStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
} as const

export const AppointmentFilters = {
  ALL: 'all',
  UPCOMING: 'upcoming',
  PAST: 'past',
  PENDING: 'pending',
  CANCELLED: 'cancelled',
  REJECTED: 'rejected',
} as const
