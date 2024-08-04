'use client'
import Link from 'next/link'

import { useLoginForm } from '@/components/Auth/useLoginForm'
import Button from '@/components/Common/Button'
import { Input } from '@/components/Common/Input'

const LoginForm = () => {
  const { handleSubmit, onsubmit, errors, register, loading } = useLoginForm()
  return (
    <div className='flex h-[80vh] items-center justify-center'>
      <div className='w-full rounded-lg border bg-surface-0 p-8 shadow-md dark:bg-surface-100 md:max-w-96'>
        <h1 className='h3 mb-8 text-center'>Login</h1>
        <form
          className='flex flex-col gap-6'
          noValidate
          onSubmit={handleSubmit(onsubmit)}>
          <Input
            label='Email'
            placeholder='Enter your email'
            {...register('email')}
            error={errors?.email ? errors.email.message : ''}
          />
          <Input
            type='password'
            label='Password'
            placeholder='Enter your password'
            {...register('password')}
            error={errors?.password ? errors.password.message : ''}
          />
          <Button type='submit' className='mt-2 w-full' loading={loading}>
            Login
          </Button>
          <Link
            href='/auth/register'
            className='mx-auto text-sm font-semibold hover:underline'>
            Sign up
          </Link>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
