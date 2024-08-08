import AppointmentStatusFilter from '@/components/Dashboard/AppointmentStatusFilter'
import { AppointmentFiltersType } from '@/utils/types/appointment.types'
import { fireEvent, render } from '@testing-library/react'

describe('AppointmentStatusFilter component', () => {
  const mockSetValues = jest.fn()
  const mockValues: AppointmentFiltersType[] = ['upcoming', 'past']

  test('renders status pills correctly', () => {
    const { getByText } = render(
      <AppointmentStatusFilter setValues={mockSetValues} values={mockValues} />
    )

    expect(getByText('upcoming')).toBeInTheDocument()
    expect(getByText('past')).toBeInTheDocument()
  })

  test('calls setValues when status pill is clicked', () => {
    const { getByTestId } = render(
      <AppointmentStatusFilter setValues={mockSetValues} values={mockValues} />
    )

    fireEvent.click(getByTestId('filter-status-pill-upcoming'))
    expect(mockSetValues).toHaveBeenCalled()

    fireEvent.click(getByTestId('filter-status-pill-past'))
    expect(mockSetValues).toHaveBeenCalled()
  })

  // snapshot
  test('matches snapshot', () => {
    const { asFragment } = render(
      <AppointmentStatusFilter setValues={mockSetValues} values={mockValues} />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
