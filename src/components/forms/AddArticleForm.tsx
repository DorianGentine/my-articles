import { createArticle, updateArticle } from 'my-articles/actions/article'
import { Article } from 'my-articles/types/articles'
import React, { useActionState, useEffect, useState } from 'react'

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
const getButtonText = (isEdit: boolean, pending: boolean) => {
  if(pending) return 'En cours...'
  return isEdit ? 'Modifier' : 'Ajouter'
}

const initialState = { 
  title: '',
  content: '',
  excerpt: '',
  author: '',
  message: '',
  ok: undefined
}
interface AddArticleFormProps {
  onClose: (title?: string | React.MouseEvent) => void
  article?: Article
}
const AddArticleForm: React.FC<AddArticleFormProps> = ({ onClose, article: iArticle }) => {
  const article = {...initialState, ...iArticle}
  const isEdit = !!article._id
  const actionFn = isEdit ? updateArticle : createArticle
  const [state, action, pending] = useActionState(
    actionFn,
    article
  )

  useEffect(() => {
    if(!state.ok) return
    onClose(`L'article "${state.title}" a été créé`)
  }, [state])

  return (
    <form action={action} className='p-4'>
      <h2 className="text-xl font-semibold mb-4">{isEdit ? `Modifier: ${article.title}` : 'Ajouter un nouvel article'}</h2>
      <input
        type='text'
        id='_id'
        name='_id'
        defaultValue={state ? state._id : undefined}
        className='hidden'
      />
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
          type="submit"
          disabled={pending}
          className={`rounded flex items-center bg-green-500 py-1 px-4 text-green-50 hover:bg-green-700 transition ${state.ok === false ? 'animate-wiggle' : ''}`}>
          {pending && (<svg aria-hidden="true" className="w-3 h-3 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
          </svg>)}
          {getButtonText(isEdit, pending)}
        </button>
      </div>
    </form>
  )
}

export default AddArticleForm