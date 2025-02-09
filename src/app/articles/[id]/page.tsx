'use server'
import Image from 'next/image'
import { config } from 'my-articles/constants/config'
import Link from 'next/link'
import { deleteArticle } from 'my-articles/actions/article'
import { notFound } from 'next/navigation'
import ModalButton from 'my-articles/components/common/ModalButton'
import { MODAL_NAMES } from 'my-articles/constants/modal'

async function fetchArticle(id: string) {
  const res = await fetch(`${config.api_url}articles/${id}`)
  if (!res.ok) return undefined
  return res.json()
}

export default async function Article({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const article = await fetchArticle(id)

  if (!article) {
    notFound()
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <Link 
          href='/articles'
          className='flex w-fit items-center gap-2 rounded bg-green-500 py-1 px-4 text-green-50 hover:bg-green-700 transition'
        >
          <svg
            className='w-3 h-3'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7'></path>
          </svg>
          Retour
        </Link>
        <div className='flex gap-4 items-center'>
          <ModalButton
            text="Modifier" 
            className="flex items-center gap-2 rounded bg-green-500 py-1 px-4 text-green-50 hover:bg-green-700 transition"
            modalName={MODAL_NAMES.EDIT_ARTICLE}
            modalProps={{ article }}
          />
          <form action={deleteArticle}>
            <input type='hidden' name='articleId' value={id} />
            <button type='submit' className='rounded border border-red-700 bg-white py-1 px-4 text-red-700 hover:bg-red-700 hover:text-red-50 transition'>
              Supprimer l'article
            </button>
          </form>
        </div>
      </div>
      <Image
        className='aspect-[2] w-full object-cover mb-4 shadow-lg rounded'
        priority
        src={article?.hero}
        alt={article?.title}
        width={1200}
        height={600}
      />
      <h1 className='text-3xl font-bold mb-2'>{article?.title}</h1>
      <div className='text-gray-600 flex gap-2 mb-4'>
        <Image
          className='w-6 h-6 object-cover rounded-full'
          src={article?.profilePicture}
          alt={article?.title}
          width={20}
          height={20}
        />
        {article?.author} · {article?.formattedDate}
      </div>
      <p className='text-base text-gray-700'>{article?.content}</p>
    </div>
  )
}