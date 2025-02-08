import { sendMessage } from 'my-articles/actions/contact';
import React, { useActionState } from 'react'

interface ContactFormProps {
  onClose: (name?: string | React.MouseEvent) => void
}

const initialState = { 
  name: '',
  email: '',
  message: '',
  ok: false,
  serverMessage: ''
};


const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const [state, action, pending] = useActionState(
    sendMessage,
    initialState
  )

  return (
    <form action={action} className="p-4">
      <h2 className="text-xl font-semibold mb-4">Contact</h2>

      {state.ok 
        ? (
          <div className="flex flex-col items-center gap-4 justify-center w-full max-w-sm">
            <div className="w-full bg-green-100 text-green-800 font-medium p-3 rounded-md text-center">
              Votre message a bien été envoyé !
            </div>
            <button
              onClick={onClose}
              className="rounded bg-green-500 py-1 px-4 text-green-50 hover:bg-green-700 transition"
            >
              Fermer
            </button>
          </div>
        )
        : (
          <>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={state.name}
                className="w-full p-2 border border-gray-300 rounded shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={state.email}
                className="w-full p-2 border border-gray-300 rounded shadow-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                defaultValue={state.message}
                className="w-full p-2 border border-gray-300 rounded shadow-sm"
                rows={4}
                required
              />
            </div>

            <div className='flex flex-col sm:flex-row justify-end gap-2'>
              <button
                type="button"
                onClick={onClose}
                className="py-1 px-4 bg-transparent border-green-500 border text-green-500 rounded hover:border-green-700 hover:text-green-700 transition"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={pending}
                className="rounded bg-green-500 py-1 px-4 text-green-50 hover:bg-green-700 transition"
              >
                {pending ? 'Envoi...' : 'Envoyer'}
              </button>
            </div>

            {state?.serverMessage && (
              <p className="text-sm text-red-500 mt-2" aria-live="polite">
                {state.serverMessage}
              </p>
            )}
          </>
          
        )
      }
    </form>
  )
}

export default ContactForm
