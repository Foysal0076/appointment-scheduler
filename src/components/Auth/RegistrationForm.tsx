'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import Button from '@/components/Common/Button'
import { Input } from '@/components/Common/Input'

type FormValueTypes = {
  fullname: string
  email: string
  password: string
}

const registrationFormSchema = yup.object().shape({
  fullname: yup.string().required('Full Name is required'),
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, { message: 'Password must be at least 6 characters' }),
})

const RegistrationForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormValueTypes>({
    resolver: yupResolver(registrationFormSchema),
    mode: 'all',
  })

  const onsubmit = (data: FormValueTypes) => {
    console.log(data)
  }

  return (
    <div className='flex h-[80vh] items-center justify-center'>
      <div className='w-full rounded-lg border bg-surface-0 p-8 shadow-md dark:bg-surface-100 md:max-w-96'>
        <h1 className='h3 mb-8 text-center'>Sign Up</h1>
        <form
          className='flex flex-col gap-6'
          noValidate
          onSubmit={handleSubmit(onsubmit)}>
          <Input
            label='Full Name'
            placeholder='Enter your name'
            {...register('fullname')}
            error={errors?.fullname ? errors.fullname.message : ''}
          />
          <Input
            label='Email'
            placeholder='Enter your email'
            {...register('email')}
            error={errors?.email ? errors.email.message : ''}
          />
          <Input
            label='Password'
            type='password'
            placeholder='Enter your password'
            {...register('password')}
            error={errors?.password ? errors.password.message : ''}
          />
          <Button type='submit' className='mt-2 w-full'>
            Register
          </Button>
          <Link
            href='/auth/login'
            className='mx-auto text-sm font-semibold hover:underline'>
            Login
          </Link>
        </form>
      </div>
    </div>
  )
}

export default RegistrationForm
