import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'

import { Input, Button } from '../../components/Layout'
import { SIGNUP_ACCOUNT } from '../../constants'
import useAuth from '../../hooks/useAuth'

const SignupUser = () => {
  const { signUp } = useAuth()

  const [account, setAccount] = useState(SIGNUP_ACCOUNT)

  const handleSubmit = async evt => {
    evt.preventDefault()

    if (Object.values(account).includes('')) {
      return toast('Todos los campos son obligatorios', { type: 'warning' })
    }

    if (account.password !== account.passwordConfirmation) {
      return toast('Las contraseñas no coinciden', { type: 'warning' })
    }

    if (account.password.length < 6) {
      return toast('La contraseña debe tener al menos 6 caracteres', { type: 'warning' })
    }

    //await signUp(account)
  }

  return (
    <>
      <h1 className='text-sky-600 font-black text-4xl capitalize text-center'>
        Crea tu cuenta y administra tus <span className='text-slate-700'>Proyectos</span>
      </h1>

      <form onSubmit={handleSubmit} className='my-10 bg-white shadow rounded px-10 py-5'>
        <Input
          label='Nombre'
          type='text'
          placeholder='Ingresa tu nombre'
          id='name'
          value={account.name}
          onChange={evt => setAccount({ ...account, name: evt.target.value })}
        />

        <Input
          label='Email'
          type='email'
          placeholder='Ingresa tu email'
          id='email'
          value={account.email}
          onChange={evt => setAccount({ ...account, email: evt.target.value })}
        />

        <Input
          label='Contraseña'
          type='password'
          placeholder='Ingresa tu contraseña'
          id='password'
          value={account.password}
          onChange={evt => setAccount({ ...account, password: evt.target.value })}
        />

        <Input
          label='Repite tu Contraseña'
          type='password'
          placeholder='Repite tu contraseña'
          id='passwordConfirmation'
          value={account.passwordConfirmation}
          onChange={evt => setAccount({ ...account, passwordConfirmation: evt.target.value })}
        />

        <Button type='submit'>
          Crear Cuenta
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
          to='/forgot-password'
        >
          Olvidé mi contraseña
        </Link>
      </nav>
    </>
  )
}

export default SignupUser