import Link from 'next/link'

import Button from '@/components/Common/Button'

export const HomeHero = () => {
  return (
    <div className='container'>
      <div className='mx-auto flex h-[80vh] w-full max-w-2xl flex-col items-center justify-center'>
        <h1 className='h1 mb-6 text-center'>
          Welcome to Appointment Scheduler
        </h1>
        <Link href='/auth/login'>
          <Button>Login to continue</Button>
        </Link>
      </div>
    </div>
  )
}
