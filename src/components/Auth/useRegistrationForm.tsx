import { yupResolver } from '@hookform/resolvers/yup'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import { apiPaths } from '@/utils/apiPaths'

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

export const useRegistrationForm = () => {
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormValueTypes>({
    resolver: yupResolver(registrationFormSchema),
    mode: 'all',
  })

  const onsubmit = async (data: FormValueTypes) => {
    try {
      setLoading(true)
      const res: any = await fetch(apiPaths.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        await res.json()
        await signIn('credentials', {
          email: data.email,
          password: data.password,
          callbackUrl: '/dashboard',
        })
        reset()
      } else {
        const data = await res.json()
        throw new Error(data.message)
      }
    } catch (error: any) {
      toast.error(error?.message ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return { onsubmit, handleSubmit, register, loading, errors }
}
