import AppointmentForm from '@/components/Dashboard/AppointmentForm'
import { fireEvent, render, screen } from '@/utils/test-utils'

jest.mock('react-audio-voice-recorder', () => ({
  AudioRecorder: () => <div>Mocked Audio Recorder</div>,
}))

describe('AppointmentForm component', () => {
  const mockProps = {
    userId: '123',
    onCancel: jest.fn(),
  }

  test('renders form fields correctly', () => {
    render(<AppointmentForm {...mockProps} />)
    expect(screen.getByLabelText('Title')).toBeInTheDocument()
    expect(
      screen.getByLabelText((content, element) =>
        content.includes('Description')
      )
    ).toBeInTheDocument()
    expect(screen.getByTestId('audio-message-input')).toBeInTheDocument
    expect(
      screen.getByLabelText((content, element) =>
        content.includes('Select Duration')
      )
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Select Guest')).toBeInTheDocument
    expect(
      screen.getByLabelText((content, element) =>
        content.includes('Select Date and Time')
      )
    ).toBeInTheDocument()
  })

  test('calls onCancel when cancel button is clicked', () => {
    render(<AppointmentForm {...mockProps} />)
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(mockProps.onCancel).toHaveBeenCalled()
  })

})
