import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/auth/options'
import { PostAppointmentBody } from '@/redux/apiQueries/apiQueries.type'
import { createAppointment, getAppointments } from '@/utils/firebase/queries'
import { AppointmentItem } from '@/utils/types/appointment.types'

export async function POST(request: Request) {
  //check auth, if no session, return 401
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const {
      endTime,
      guestId,
      startTime,
      status,
      title,
      guestInfo,
    }: PostAppointmentBody = await request.json()

    const formData: Omit<AppointmentItem, 'id'> = {
      title,
      guestId,
      guestInfo,
      startTime,
      endTime,
      status,
      hostId: session.user.id as unknown as string,
      hostInfo: {
        id: session.user.id as unknown as string,
        fullname: session.user.name as unknown as string,
        email: session.user.email as unknown as string,
      },
    }

    const data = await createAppointment(formData)
    return NextResponse.json(data)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  //check auth, if no session, return 401
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const params = new URL(request.url).searchParams
    const userId = session.user.id as unknown as string
    const past = params.get('past') === 'true'
    const upcoming = params.get('upcoming') === 'true'

    const data = await getAppointments({
      hostId: userId,
      isPast: past,
      isUpcoming: upcoming,
    })
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
