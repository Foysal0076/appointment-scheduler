import { useState } from 'react'
import { toast } from 'react-toastify'

import { PostAppointmentBody } from '@/redux/apiQueries/apiQueries.type'
import { useCreateAppointmentMutation } from '@/redux/apiQueries/appointmentQueries'
import { addMinuteToTime } from '@/utils/helpers'
import { useUserInfo } from '@/utils/hooks/useUserInfo'
import { AppointmentUser } from '@/utils/types/appointment.types'

export const useAppointmentConfirmModal = (
  formData: {
    title: string
    description: string
    audioFile: File | Blob | null
    guest: { value: string; label: string }
    duration: number
    date: Date
    guestInfo: AppointmentUser | null
  },
  handleClose: () => void,
  handleCloseParentModal: () => void
) => {
  const { user } = useUserInfo()
  const [submittingForm, setSubmittingForm] = useState(false)

  const _endTime = addMinuteToTime(formData.date, formData.duration)

  const title =
    formData.title === ''
      ? `Meeting with ${formData?.guest?.label ?? 'Guest'}`
      : formData.title

  const [createAppointment] = useCreateAppointmentMutation()

  const onConfirm = async () => {
    try {
      if (!formData.guestInfo) return

      setSubmittingForm(true)

      const startTime = formData.date.getTime()
      const endTime = _endTime.getTime()

      const audioLink = await onUploadAudio()

      const _formData: PostAppointmentBody = {
        title,
        audioMessage: audioLink,
        description: formData.description,
        startTime,
        endTime,
        guestId: formData.guest.value,
        status: 'pending',
        guestInfo: formData.guestInfo,
      }
      await createAppointment(_formData)

      //after success
      handleClose()
      handleCloseParentModal()
    } catch (error: any) {
      console.log(error)
      const errorMessage =
        error?.response?.data?.message || error?.data?.message || error?.message
      toast.error(errorMessage)
    } finally {
      setSubmittingForm(false)
    }
  }

  const onUploadAudio = async () => {
    try {
      if (!formData.audioFile) return
      const fileFormData = new FormData()
      const uniqueId = `audio_${Date.now()}`
      fileFormData.append('folderName', `/audio/${uniqueId}.webm`) // specify the folder name
      fileFormData.append('file', formData.audioFile)

      const res = await fetch('/api/upload-file', {
        method: 'POST',
        body: fileFormData,
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        return data.uploadLink
      } else {
        const data = await res.json()
        console.log(data.error)
        throw new Error('Failed to upload audio')
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error?.data?.message || error?.message
      toast.error(errorMessage)
      return null
    }
  }

  return {
    onUploadAudio,
    onConfirm,
    submittingForm,
    title,
    _endTime,
    hostName: user?.name ?? '',
  }
}
