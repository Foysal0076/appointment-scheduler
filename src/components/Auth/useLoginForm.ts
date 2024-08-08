import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'

type FormValueTypes = {
  email: string
  password: string
}

const loginFormSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

export const useLoginForm = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValueTypes>({
    resolver: yupResolver(loginFormSchema),
    mode: 'all',
  })

  const onsubmit = async (data: FormValueTypes) => {
    try {
      setLoading(true)
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })
      if (res?.status === 200) {
        router.push('/dashboard')
        return
      }
      if (res?.status === 401) {
        throw new Error('Invalid credentials')
      } else {
        throw new Error(res?.error || 'Something went wrong')
      }
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { handleSubmit, onsubmit, errors, register, loading }
}
