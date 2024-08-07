import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/auth/options'

const DashboardLayout = async ({ children }: any) => {
  const session = await getServerSession(authOptions)

  if (!session || !session.accessToken) {
    return redirect('/auth/login')
  }
  return <div className='container'>{children}</div>
}

export default DashboardLayout
