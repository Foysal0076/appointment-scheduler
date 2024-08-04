'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import Button from '@/components/Common/Button'
import { Input } from '@/components/Common/Input'

type FormValueTypes = {
  email: string
  password: string
}

const loginFormSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, { message: 'Password must be at least 6 characters' }),
})

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormValueTypes>({
    resolver: yupResolver(loginFormSchema),
    mode: 'all',
  })

  const onsubmit = (data: FormValueTypes) => {
    console.log(data)
  }

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
          <Button type='submit' className='mt-2 w-full'>
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
