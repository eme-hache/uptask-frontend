import axiosClient from '../../config/axios.client'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Alert from '../../components/Alert'

const ConfirmUser = () => {
    const { id } = useParams()

    const [alert, setAlert] = useState({})

    const confirmUser = async () => {
        try {
            const { data } = await axiosClient.get(`/user/confirm/${id}`)

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

    useEffect(() => {
        confirmUser()
    }, [])

    return (
        <>
            <h1 className='text-sky-600 font-black text-6xl capitalize text-center'>
                Estamos Confirmando Tu <span className='text-slate-700'>Cuenta</span>
            </h1>

            <div className='mt-16 md:mt-10 shadow p-10 bg-white'>
                {Object.keys(alert).length > 0 && (<Alert alert={alert} />)}

                <Link
                    className='block text-center my-5 text-slate-500 uppercase text-sm'
                    to='/'
                >
                    Inicia Sesión
                </Link>
            </div>
        </>
    )
}

export default ConfirmUser