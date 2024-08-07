import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/auth/options'
import { deleteAppointment } from '@/utils/firebase/queries'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  //check auth, if no session, return 401
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const id = params.id
    await deleteAppointment(id)
    return NextResponse.json({ message: 'Appointment deleted' })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Delete Failed' }, { status: 500 })
  }
}
