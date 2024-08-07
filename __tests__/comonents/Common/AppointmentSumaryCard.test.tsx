import AppointmentSummaryCard from '@/components/Common/AppointmentSummaryCard'
import { fireEvent, render, screen } from '@testing-library/react'

describe('AppointmentSummaryCard component', () => {
  const mockProps = {
    host: 'John Doe',
    guest: 'Jane Smith',
    audioFile: null,
    startTime: new Date('2022-01-01T03:00:00Z'),
    endTime: new Date('2022-01-01T04:00:00Z'),
    title: 'Meeting',
    description: 'Lorem ipsum dolor sit amet',
    onSubmit: jest.fn(),
    onCancel: jest.fn(),
    loading: false,
  }

  test('renders appointment details correctly', () => {
    render(<AppointmentSummaryCard {...mockProps} />)
    expect(
      screen.getByText(`Participants: ${mockProps.host} and ${mockProps.guest}`)
    ).toBeInTheDocument()
    expect(screen.getByText('Lorem ipsum dolor sit amet')).toBeInTheDocument()
  })

  test('renders start and end time correctly', () => {
    render(<AppointmentSummaryCard {...mockProps} />)
    expect(screen.getByText('09:00 AM - 10:00 AM')).toBeInTheDocument()
  })

  test('renders cancel and confirm buttons', () => {
    render(<AppointmentSummaryCard {...mockProps} />)
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument()
  })

  test('calls onCancel when cancel button is clicked', () => {
    render(<AppointmentSummaryCard {...mockProps} />)
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(mockProps.onCancel).toHaveBeenCalled()
  })

  test('calls onSubmit when confirm button is clicked', () => {
    render(<AppointmentSummaryCard {...mockProps} />)
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }))
    expect(mockProps.onSubmit).toHaveBeenCalled()
  })

  test('disables confirm button when loading is true', () => {
    render(<AppointmentSummaryCard {...mockProps} loading={true} />)
    const confirmButton = screen.getByRole('button', { name: 'Confirm' })
    expect(confirmButton).toBeDisabled()
  })
})
