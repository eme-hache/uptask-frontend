import axiosClient from '../../config/axios.client'
import Alert from '../../components/Alert'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [alert, setAlert] = useState({})

  const handleSubmit = async evt => {
    evt.preventDefault()

    if (email.trim() === '') {
      return setAlert({
        msg: 'Debes ingresar un correo electrónico válido',
        error: true,
      })
    }

    try {
      const { data } = await axiosClient.post(`/user/forgot-password`, { email })

      setAlert({
        msg: data.msgToUser,
        error: data.error
      })
    }
    catch (error) {
      const { response: { data } } = error

      setAlert({
        msg: data?.msgToUser ?? 'Ocurrió un error al confirmar la cuenta',
        error: data?.error ?? true,
      })
    }
  }

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize text-center'>
        Recupera Tu <span className='text-slate-700'>Acceso</span>
      </h1>

      {Object.keys(alert).length > 0 && (<Alert alert={alert} />)}

      <form onSubmit={handleSubmit} className='my-10 bg-white shadow rounded px-10 py-5'>
        <div className='my-5'>
          <label
            htmlFor='email'
            className='uppercase text-gray-600 block text-xl font-bold'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            placeholder='Ingresa tu email'
            className='w-full mt-3 p-3 border rounded bg-gray-50'
            value={email}
            onChange={evt => setEmail(evt.target.value)}
          />
        </div>

        <input
          type='submit'
          value='Enviar Instrucciones'
          className='bg-sky-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
        />
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