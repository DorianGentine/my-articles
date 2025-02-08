'use client'
 
import Link from 'next/link'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="flex flex-col items-center justify-center min-h-72 p-4 bg-gray-100 pt-14">
      <h1 className="text-6xl font-bold text-red-600 mb-4">Oops!</h1>
      <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
      <p className="text-lg text-gray-700 mb-8">An unexpected error has occurred. Please try again later.</p>
      <div className="flex space-x-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 border border-green-500 text-green-500 rounded hover:border-green-700 hover:text-green-700 transition"
        >
          Try again
        </button>
        <Link href="/articles" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
          Retourner aux articles
        </Link>
      </div>
    </div>
  )
}