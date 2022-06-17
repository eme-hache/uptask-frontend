import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Button, Input } from '../../components/Layout'
import { PASSWORDS } from '../../constants'
import useAuth from '../../hooks/useAuth'

const ResetPassword = () => {
    const { isValidToken, checkToken, resetPassword } = useAuth()
    const { id } = useParams()

    const [passwords, setPasswords] = useState(PASSWORDS)

    const handleSubmit = async evt => {
        evt.preventDefault()

        if (passwords.password !== passwords.passwordConfirmation) {
            return toast('Las contraseñas no coinciden', { type: 'warning' })
        }

        if (passwords.password.length < 6) {
            return toast('La contraseña debe tener al menos 6 caracteres', { type: 'warning' })
        }

        await resetPassword(id, passwords)

        setPasswords(PASSWORDS)
    }

    useEffect(() => {
        checkToken(id)
    }, [])

    return (
        <>
            <h1 className='text-sky-600 font-black text-4xl capitalize text-center mb-10'>
                Reestablece Tu <span className='text-slate-700'>Contraseña</span>
            </h1>

            {isValidToken && (
                <form onSubmit={handleSubmit} className='bg-white shadow rounded px-10 py-5'>
                    <Input
                        label='Nueva Contraseña'
                        type='password'
                        placeholder='Ingresa tu nueva ontraseña'
                        id='password'
                        value={passwords.password}
                        onChange={evt => setPasswords({ ...passwords, password: evt.target.value })}
                    />

                    <Input
                        label='Repite tu Nueva Contraseña'
                        type='password'
                        placeholder='Repite tu nueva contraseña'
                        id='repeatPassword'
                        value={passwords.passwordConfirmation}
                        onChange={evt => setPasswords({ ...passwords, passwordConfirmation: evt.target.value })}
                    />

                    <Button type='submit'>
                        Reestablecer Contraseña
                    </Button>
                </form>
            )}

            <nav className='lg:flex lg:justify-between mt-10'>
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

export default ResetPassword