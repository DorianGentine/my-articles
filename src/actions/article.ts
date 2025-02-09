'use server'

import { revalidatePath } from 'next/cache'
import { config } from "my-articles/constants/config"
import { redirect } from 'next/navigation'

const handleResponse = async ({response, prevState, message, endPath}: {response: Response; prevState: any; message: string; endPath: string}) => {
  if (response.ok) {
    revalidatePath(endPath)
    return { ...prevState, ok: true }
  }else{
    const errorMessage = await response.json().then(({error}) => error)
    return { ...prevState, message: `${message}: "${errorMessage}"`, ok: false }
  }
}

export const createArticle = async (prevState: any, article: FormData) => {
  const response = await fetch(`${config.api_url}articles`, {
    method: 'POST',
    body: article
  })

  return handleResponse({
    response,
    prevState,
    message: 'La création de l\'article a échouée',
    endPath: '/articles'
  })
}

export const updateArticle = async (prevState: any, article: FormData) => {
  const articleId = article.get('_id')
  const response = await fetch(`${config.api_url}articles/${articleId}`, {
    method: 'PUT',
    body: article
  })

  return handleResponse({
    response,
    prevState,
    message: 'La modification de l\'article a échouée',
    endPath: `/articles${articleId}`
  })
}

export const deleteArticle = async (formData: FormData) => {
  const articleId = formData.get('articleId')
  const response = await fetch(`${config.api_url}articles/${articleId}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    redirect('/articles?deleted=true')
  }
}