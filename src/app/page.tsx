import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/auth/options'
import { HomeHero } from '@/components/Home'

const HomePage = async () => {
  const session = await getServerSession(authOptions)
  // console.log(session)
  if (session && session.accessToken) {
    return redirect('/dashboard')
  }

  return (
    <div>
      <HomeHero />
    </div>
  )
}

export default HomePage
