import { createArticle } from 'my-articles/actions/article'
import React, { useActionState, useEffect, useState } from 'react'

interface AddArticleFormProps {
  onClose: (title?: string | React.MouseEvent) => void
}

const formatTime = (): string => {
  const date = new Date()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}
const initialState = { 
  title: `La vie à ${formatTime()}`,
  content: 'Il fait beau',
  excerpt: 'beau',
  author: 'Le D',
  message: '',
  ok: undefined
}

const FileInput: React.FC<{ name: string}> = ({ name }) => {
  const [fileName, setFileName] = useState<string | null>(null)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFileName(file?.name || null)
  }
  return (
    <div className="mt-1 flex gap-2 items-center">
      <label htmlFor={name} className="py-1 px-4 bg-transparent border-green-500 border text-green-500 rounded hover:border-green-700 hover:text-green-700 transition">
        Choisir&nbsp;fichier
      </label>
      <input
        type='file'
        id={name}
        name={name}
        accept='image/*'
        className='hidden'
        onChange={handleFileChange}
      />
      {fileName && <span className="text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap max-w-xs">{fileName}</span>}
    </div>
  )
}


const AddArticleForm: React.FC<AddArticleFormProps> = ({ onClose }) => {
  const [state, action, pending] = useActionState(
    createArticle,
    initialState
  )

  useEffect(() => {
    if(!state.ok) return
    onClose(`L'article "${state.title}" a été créé`)
  }, [state])

  return (
    <form action={action} className='p-4'>
      <h2 className="text-xl font-semibold mb-4">Ajouter un nouvel article</h2>
      <div className='mb-4'>
        <label htmlFor='hero' className='block text-sm font-medium text-gray-700'>
          Image de l'article
        </label>
        <FileInput name='hero' />
      </div>
      <div className='mb-4'>
        <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
          Titre de l'article
        </label>
        <input
          type='text'
          id='title'
          name='title'
          defaultValue={state ? state.title : undefined}
          className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm'
          required
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='content' className='block text-sm font-medium text-gray-700'>
          Contenu de l'article
        </label>
        <textarea
          id='content'
          name='content'
          defaultValue={state ? state.content : undefined}
          className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='excerpt' className='block text-sm font-medium text-gray-700'>
          Extrait de l'article
        </label>
        <textarea
          id='excerpt'
          name='excerpt'
          defaultValue={state ? state.excerpt : undefined}
          className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm'
          required
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='author' className='block text-sm font-medium text-gray-700'>
          Auteur de l'article
        </label>
        <input
          type='text'
          id='author'
          name='author'
          defaultValue={state ? state.author : undefined}
          className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='profilePicture' className='block text-sm font-medium text-gray-700'>
          Image de profil de l'auteur
        </label>
        <FileInput name='profilePicture' />
      </div>
      {state?.message && <p className='my-4 text-red-500 text-center' aria-live="polite">{state.message}</p>}
      <div className='flex flex-col sm:flex-row justify-end gap-2'>
        <button
          type='button'
          onClick={onClose}
          className="py-1 px-4 bg-transparent border-green-500 border text-green-500 rounded hover:border-green-700 hover:text-green-700 transition"
        >
          Annuler
        </button>
        <button
          type='submit'
          disabled={pending}
          className={`rounded bg-green-500 py-1 px-4 text-green-50 hover:bg-green-700 transition ${state.ok === false ? 'animate-wiggle' : ''}`}
        >
          {pending ? 'En cours...' : 'Ajouter'}
        </button>
      </div>
    </form>
  )
}

export default AddArticleForm