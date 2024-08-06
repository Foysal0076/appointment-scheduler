'use client'
import './modalStyles.css'

import { useEffect, useId, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import ReactPortal from '@/components/Common/Modal/ReactPortal'

type Props = {
  children: React.ReactNode
  open: boolean
  handleClose: () => void
  modalId?: string
}

export const Modal = ({ children, open, handleClose, modalId = '' }: Props) => {
  const nodeRef = useRef<HTMLDivElement>(null)
  const modalContentRef = useRef<HTMLDivElement>(null)
  const uniqueModalId = useId()
  const _modalId = `${modalId}-${uniqueModalId}`

  useEffect(() => {
    const closeOnEscapeKey = (e: any) =>
      e.key === 'Escape' ? handleClose() : null

    document.body.addEventListener('keydown', closeOnEscapeKey)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [handleClose])

  const onBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = event.target as HTMLDivElement
    if (el.id === _modalId) {
      handleClose()
    }
  }

  return (
    <ReactPortal wrapperId='react-portal-modal-container'>
      <CSSTransition
        in={open}
        timeout={300}
        unmountOnExit
        classNames='modal'
        nodeRef={nodeRef}>
        <div
          tabIndex={-1}
          id={_modalId}
          onClick={onBackdropClick}
          className='fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-[rgba(2,_1,_11,_0.60)] backdrop-blur-md transition-all duration-200 ease-in-out'
          ref={nodeRef}>
          <div className='max-w-[95%]' ref={modalContentRef}>
            {children}
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  )
}
