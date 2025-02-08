import React from 'react'
import Link from 'next/link'

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-72 gap-4 p-4 bg-gray-100">
      <h1 className="text-4xl font-bold">404 - Article non trouvé</h1>
      <p className="text-lg mb-4">Désolé, l'article que vous recherchez n'existe pas ou a été supprimé.</p>
      <Link href="/articles" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
        Retour aux articles
      </Link>
    </div>
  )
}

export default NotFoundPage