import React, { useEffect } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation()
  useEffect(() => {
    if (!isOpen) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEsc)
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return isOpen 
  ? (
    <div onClick={onClose} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div onClick={stopPropagation} className="bg-white p-4 rounded relative w-96 max-w-[80dvw] max-h-[80dvh]">
        <button onClick={onClose} className="absolute top-8 right-4">
        <svg
          className="w-6 h-6 text-gray-500 hover:text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        </button>
        {children}
      </div>
    </div>
  )
  : null
}

export default Modal