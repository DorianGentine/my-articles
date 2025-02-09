'use client'
import React, { useEffect, useState } from 'react'

const ANIMATION_DURATION = 300

interface ToastProps {
  message: string
  error?: boolean
  onClose?: () => void
}

const Toast: React.FC<ToastProps> = ({ message, error = false, onClose }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onClose?.(), ANIMATION_DURATION)
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose, message])

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 text-white rounded shadow-lg transition-transform duration-${ANIMATION_DURATION} ${
        visible ? 'translate-x-0' : 'translate-x-[calc(100%+1rem)]'
      } ${error ? 'bg-red-600' : 'bg-green-600'}`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={() => setVisible(false)} className="ml-4">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div className={`absolute bottom-0 right-0 h-1 w-full bg-white animate-timer delay-${ANIMATION_DURATION}`} />
    </div>
  )
}

export default Toast