import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'

import { Button, Input } from '../../components/Layout'
import { ACCOUNT } from '../../constants'
import useAuth from '../../hooks/useAuth'

const SignIn = () => {
    const { signIn } = useAuth()

    const [account, setAccount] = useState(ACCOUNT)

    const handleSubmit = async evt => {
        evt.preventDefault()

        if (Object.values(account).includes('')) {
            return toast('Todos los campos son obligatorios', { type: 'warning' })
        }

        await signIn(account)
    }

    return (
        <>
            <h1 className='text-sky-600 font-black text-6xl capitalize text-center'>
                Up<span className='text-slate-700'>Task</span>
            </h1>

            <p className='text-center mt-10 font-bold text-xl'>Iniciar sesión</p>

            <form onSubmit={handleSubmit} className='mt-5 mb-10 bg-white shadow rounded px-10 py-5'>
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

                <Button type='submit' >
                    Iniciar Sesión
                </Button>
            </form>

            <nav className='lg:flex lg:justify-between'>
                <Link
                    className='block text-center my-5 text-slate-500 uppercase text-sm'
                    to='/signup'
                >
                    ¿No tienes una cuenta?
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

export default SignIn