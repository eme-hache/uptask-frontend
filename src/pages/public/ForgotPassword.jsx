import { Link } from 'react-router-dom'
import { useState } from 'react'

import { Button, Input } from '../../components/Layout'
import useAuth from '../../hooks/useAuth'

const ForgotPassword = () => {
  const { sendPasswordResetEmail } = useAuth()

  const [email, setEmail] = useState('')

  const handleSubmit = async evt => {
    evt.preventDefault()

    if (email.trim() === '') {
      return toast('Debes ingresar un correo electrónico válido', { type: 'warning' })
    }

    await sendPasswordResetEmail(email)
  }

  return (
    <>
      <h1 className='text-sky-600 font-black text-4xl capitalize text-center'>
        Recupera Tu <span className='text-slate-700'>Acceso</span>
      </h1>

      <form onSubmit={handleSubmit} className='my-10 bg-white shadow rounded px-10 py-5'>
        <Input
          label='Email'
          type='email'
          placeholder='Ingresa tu email'
          id='email'
          value={email}
          onChange={evt => setEmail(evt.target.value)}
        />

        <Button type='submit'>
          Enviar Instrucciones
        </Button>
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to='/'
        >
          ¿Ya tienes una cuenta?
        </Link>
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to='/signup'
        >
          ¿No tienes una cuenta?
        </Link>
      </nav>
    </>
  )
}

export default ForgotPassword