import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/auth/options'
import { searchUser } from '@/utils/firebase/queries'

export async function GET(request: Request) {
  //check auth, if no session, return 401
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const params = new URL(request.url).searchParams

    const userId = session.user.id as unknown as string
    const searchText = params.get('s') || ''
    const hideSelf = params.get('hideSelf') === 'true'
    const data = await searchUser({
      userId: userId,
      hideSelf,
      key: 'fullname',
      value: searchText,
    })
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
