// import 'node-fetch'
import { AppointmentCard } from '@/components/Common/AppointmentCard'
import { store } from '@/redux/store' // Adjust the path to your store
import { AppointmentItem } from '@/utils/types/appointment.types'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

describe('AppointmentCard component', () => {
  const appointment: AppointmentItem = {
    id: '1',
    title: 'Appointment Title',
    description: 'Appointment Description',
    audioMessage: 'audio.mp3',
    hostInfo: {
      id: 'host1',
      email: 'host1@email.com',
      fullname: 'Host Fullname',
    },
    guestInfo: {
      id: 'guest1',
      email: 'guest1@email.com',
      fullname: 'Guest Fullname',
    },
    hostId: 'host1',
    guestId: 'guest1',
    status: 'approved',
    startTime: 1723066405736,
    endTime: 1723066426790,
  }

  const renderWithProvider = (component: React.ReactNode) => {
    return render(<Provider store={store}>{component}</Provider>)
  }

  test('renders without crashing', () => {
    renderWithProvider(<AppointmentCard userId='userId' {...appointment} />)
  })

  test('displays appointment details correctly', () => {
    const { getByText } = renderWithProvider(
      <AppointmentCard userId='userId' {...appointment} />
    )
    expect(getByText('Appointment Title')).toBeInTheDocument()
    expect(getByText('Appointment Description')).toBeInTheDocument()
    expect(
      getByText('Participants: Host Fullname, Guest Fullname')
    ).toBeInTheDocument()
  })

  test('displays audio message if provided', () => {
    const { getByRole } = renderWithProvider(
      <AppointmentCard userId='userId' {...appointment} />
    )
    expect(getByRole('audio')).toBeInTheDocument()
  })

  test('displays status pill', () => {
    const { getByText } = renderWithProvider(
      <AppointmentCard userId='userId' {...appointment} />
    )
    expect(getByText('approved')).toBeInTheDocument()
  })

  test('displays cancel button for host', () => {
    const { getByText } = renderWithProvider(
      <AppointmentCard userId='host1' {...appointment} />
    )
    expect(getByText('Cancel')).toBeInTheDocument()
  })

  test('displays decline and accept buttons for guest', () => {
    const { getByText } = renderWithProvider(
      <AppointmentCard userId='guest1' {...appointment} status='pending' />
    )
    expect(getByText('Decline')).toBeInTheDocument()
    expect(getByText('Accept')).toBeInTheDocument()
  })

  //snapshot test
  test('matches snapshot', () => {
    const { container } = renderWithProvider(
      <AppointmentCard userId='userId' {...appointment} />
    )
    expect(container).toMatchSnapshot()
  })
})
