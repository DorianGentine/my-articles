import React from "react"
import { redirect } from "next/navigation"
import Link from "next/link"

import ArticleCard from "my-articles/app/articles/ArticleCard"
import ModalButton from "my-articles/components/common/ModalButton"
import { MODAL_NAMES } from "my-articles/constants/modal"
import { config } from "my-articles/constants/config"
import type { Article } from "my-articles/types/articles"
import Toast from "my-articles/components/common/Toast"

export default async function Articles({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { page = '1', deleted = 'false' } = await searchParams
  const pageInt = typeof page === 'string' ? parseInt(page, 10) : 1
  const { articles, totalPages }: {articles: Article[]; totalPages: number} = await fetch(`${config.api_url}articles?page=${page}`).then(res => res.json())

  if(totalPages < pageInt) {
    redirect('/articles')
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-2xl">Articles</h1>
        <ModalButton 
          text="Ajouter article" 
          className="flex items-center gap-2 rounded bg-green-500 py-1 px-4 text-green-50 hover:bg-green-700 transition"
          modalName={MODAL_NAMES.ADD_ARTICLE}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {articles.map((article) => (
          <ArticleCard
            key={article._id}
            article={article}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-16">
          {pageInt > 1 && (
            <Link
              type="button"
              href={`/articles${pageInt > 2 ? `?page=${pageInt - 1}` : ''}`}
              className="py-1 px-4 bg-transparent border-green-500 border text-green-500 rounded hover:bg-green-700 hover:border-green-700 hover:text-green-100 transition"
            >
              Page précédente
            </Link>
          )}
          {pageInt < totalPages && (
            <Link
              type="button"
              href={`/articles?page=${pageInt + 1}`}
              className="py-1 px-4 bg-transparent border-green-500 border text-green-500 rounded hover:bg-green-700 hover:border-green-700 hover:text-green-100 transition"
              >
              Page suivante
            </Link>
          )}
        </div>
      )}
      {deleted === 'true' && <Toast message="L'article a été supprimé" color='red' />}
    </>
  )
}