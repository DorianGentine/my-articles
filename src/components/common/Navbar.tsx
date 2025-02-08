import React from "react"
import Link from "next/link"
import Image from "next/image"
import ModalButton from "./ModalButton"
import { MODAL_NAMES } from "my-articles/constants/modal"

const Navbar: React.FC = () => {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-gray-800 p-4 h-14 flex justify-between items-center z-10">
        <Link href="/" className="text-white hover:text-gray-400">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        </Link>
        <div className="flex gap-4">
          <Link href="/articles" className="text-white hover:text-gray-400">
            Articles
          </Link>
          <ModalButton text='Contact' className="text-white hover:text-gray-400" modalName={MODAL_NAMES.CONTACT} />
        </div>
      </nav>
      <div className="h-14" />
    </>
  )
}

export default Navbar