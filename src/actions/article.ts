'use server'

import { revalidatePath } from 'next/cache'
import { config } from "my-articles/constants/config"
import { redirect } from 'next/navigation'

export const createArticle = async (prevState: any, article: FormData) => {
  const response = await fetch(`${config.api_url}articles`, {
    method: 'POST',
    body: article
  })

  if (response.ok) {
    revalidatePath('/articles')
    return { ...prevState, ok: true }
  }else{
    const errorMessage = await response.json().then(({error}) => error)
    return { ...prevState, message: `La création de l\'article a échouée: "${errorMessage}"`, ok: false }
  }
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