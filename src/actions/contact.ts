'use server'

import { config } from "my-articles/constants/config"

export const sendMessage = async (prevState: any, formData: FormData) => {
  const formDataObj = Object.fromEntries(formData.entries())
  const response = await fetch(`${config.api_url}contact/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formDataObj)
  })

  if (response.ok) {
    return { ...prevState, ok: true, serverMessage: '' }
  }else{
    return { ...prevState, ok: false, serverMessage: 'L\'envoi du message a échoué' }
  }
}