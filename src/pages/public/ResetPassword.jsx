import axiosClient from '../../config/axios.client'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Alert from '../../components/Alert'

const PASSWORDS = {
    password: '',
    passwordConfirmation: '',
}

const ResetPassword = () => {
    const { id } = useParams()

    const [isValidToken, setIsValidToken] = useState(false)
    const [passwords, setPasswords] = useState(PASSWORDS)
    const [alert, setAlert] = useState({})

    const checkToken = async () => {
        try {
            await axiosClient.get(`/user/check-token/${id}`)

            setIsValidToken(true)
        }
        catch (error) {
            const { response: { data } } = error

            setAlert({
                msg: data?.msgToUser ?? 'Ocurrió un error al verificar el token',
                error: data?.error ?? true,
            })
        }
    }

    const handleSubmit = async evt => {
        evt.preventDefault()

        if (passwords.password !== passwords.passwordConfirmation) {
            return setAlert({
                msg: 'Las contraseñas no coinciden',
                error: true,
            })
        }

        if (passwords.password.length < 6) {
            return setAlert({
                msg: 'La contraseña debe tener al menos 6 caracteres',
                error: true,
            })
        }

        setAlert({})

        try {
            const { data } = await axiosClient.post(`/user/forgot-password/${id}`, passwords)

            setPasswords(PASSWORDS)
            setIsValidToken(false)
            setAlert({
                msg: data.msgToUser,
                error: data.error,
            })
        }
        catch (error) {
            const { response: { data } } = error

            setAlert({
                msg: data?.msgToUser ?? 'Ocurrió un error reestablecer la contraseña',
                error: data?.error ?? true,
            })
        }
    }

    useEffect(() => {
        checkToken()
    }, [])

    return (
        <>
            <h1 className='text-sky-600 font-black text-6xl capitalize text-center'>
                Reestablece Tu <span className='text-slate-700'>Contraseña</span>
            </h1>

            {Object.keys(alert).length > 0 && <Alert alert={alert} />}

            {isValidToken && (
                <form onSubmit={handleSubmit} className='my-10 bg-white shadow rounded px-10 py-5'>
                    <div className='my-5'>
                        <label
                            htmlFor='password'
                            className='uppercase text-gray-600 block text-xl font-bold'>
                            Nueva Contraseña
                        </label>
                        <input
                            type='password'
                            id='password'
                            placeholder='Ingresa tu nueva ontraseña'
                            className='w-full mt-3 p-3 border rounded bg-gray-50'
                            value={passwords.password}
                            onChange={evt => setPasswords({ ...passwords, password: evt.target.value })}
                        />
                    </div>

                    <div className='my-5'>
                        <label
                            htmlFor='repeatPassword'
                            className='uppercase text-gray-600 block text-xl font-bold'>
                            Repite tu Nueva contraseña
                        </label>
                        <input
                            type='password'
                            id='repeatPassword'
                            placeholder='Repite tu nueva contraseña'
                            className='w-full mt-3 p-3 border rounded bg-gray-50'
                            value={passwords.passwordConfirmation}
                            onChange={evt => setPasswords({ ...passwords, passwordConfirmation: evt.target.value })}
                        />
                    </div>

                    <input
                        type='submit'
                        value='Actualizar Contraseña'
                        className='bg-sky-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
                    />
                </form>
            )}

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

export default ResetPassword