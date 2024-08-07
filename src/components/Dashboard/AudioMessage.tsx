'use client'

import { Add } from 'iconsax-react'
import { AudioRecorder } from 'react-audio-voice-recorder'

type Props = {
  audioFile: File | Blob | null
  setAudioFile: (audio: File | Blob | null) => void
}

const AudioMessage = ({ setAudioFile, audioFile }: Props) => {
  const addAudioElement = (blob: Blob) => {
    setAudioFile(blob)
  }

  const onClear = () => {
    setAudioFile(null)
  }

  return (
    <div className='flex flex-col gap-4'>
      {audioFile ? (
        <div className='flex items-center gap-4'>
          <audio src={URL.createObjectURL(audioFile)} controls />
          <button onClick={onClear}>
            <Add
              size='32'
              className='rotate-45 text-danger-400 transition-all duration-300 group-hover:text-danger-900'
            />
          </button>
        </div>
      ) : (
        <AudioRecorder
          onRecordingComplete={(blob) => addAudioElement(blob)}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }}
        />
      )}
    </div>
  )
}

export default AudioMessage
