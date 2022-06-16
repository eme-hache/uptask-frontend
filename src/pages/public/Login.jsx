import axiosClient from '../../config/axios.client'
import { useNavigate } from 'react-router-dom'
import Alert from '../../components/Alert'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const ACCOUNT = {
    email: '',
    password: ''
}

const Login = () => {
    const { setAuth } = useAuth()
    const navigate = useNavigate()

    const [account, setAccount] = useState(ACCOUNT)
    const [alert, setAlert] = useState({})

    const handleSubmit = async evt => {
        evt.preventDefault()

        if (Object.values(account).includes('')) {
            return setAlert({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
        }

        setAlert({})

        try {
            const { data } = await axiosClient.post('/user/login', account)

            localStorage.setItem('token', data.token)

            setAuth(data)
            navigate('/projects')

        }
        catch (error) {
            console.log("error")
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
                Up<span className='text-slate-700'>Task</span>
            </h1>

            {Object.keys(alert).length > 0 && (<Alert alert={alert} />)}

            <form onSubmit={handleSubmit} className='my-10 bg-white shadow rounded px-10 py-5'>
                <div className='my-5'>
                    <label
                        htmlFor='email'
                        className='uppercase text-gray-600 block text-xl font-bold'>
                        Email
                    </label>
                    <input
                        type='email'
                        id='email'
                        placeholder='Ingresa tu email'
                        className='w-full mt-3 p-3 border rounded bg-gray-50'
                        value={account.email}
                        onChange={evt => setAccount({ ...account, email: evt.target.value })}
                    />
                </div>
                <div className='my-5'>
                    <label
                        htmlFor='password'
                        className='uppercase text-gray-600 block text-xl font-bold'>
                        Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        placeholder='Ingresa tu contraseña'
                        className='w-full mt-3 p-3 border rounded bg-gray-50'
                        value={account.password}
                        onChange={evt => setAccount({ ...account, password: evt.target.value })}
                    />
                </div>

                <input
                    type='submit'
                    value='Iniciar sesión'
                    className='bg-sky-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
                />
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

export default Login