"use client"

import React, { useCallback, useState } from "react"
import Modal from "my-articles/components/common/Modal"
import { MODAL_NAMES } from "my-articles/constants/modal"

import AddArticleForm from "my-articles/components/forms/AddArticleForm"
import Contact from "my-articles/components/forms/ContactForm"
import Toast from "my-articles/components/common/Toast"


interface ModalButtonProps {
  text: string
  className: string
  modalName: string
}

const ModalButton: React.FC<ModalButtonProps> = ({ text, className, modalName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const openModal = () => setIsModalOpen(true)
  const closeModal = (toastMessage?: string | React.MouseEvent) => {
    if(typeof toastMessage === 'string') setToastMessage(toastMessage)
    setIsModalOpen(false)
  }

  const closeToast = useCallback(() => setToastMessage(''), [])

  return (
    <>
      <button
        onClick={openModal}
        className={className}
      >
        {text}
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalName === MODAL_NAMES.ADD_ARTICLE && <AddArticleForm onClose={closeModal} />}
        {modalName === MODAL_NAMES.CONTACT && <Contact onClose={closeModal} />}
      </Modal>
      {toastMessage && <Toast message={toastMessage} onClose={closeToast} />}
    </>
  )
}

export default ModalButton