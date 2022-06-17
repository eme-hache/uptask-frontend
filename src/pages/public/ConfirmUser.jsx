import { SpinnerCircular } from 'spinners-react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import useAuth from '../../hooks/useAuth'

const ConfirmUser = () => {
    const { confirmUser, loading } = useAuth()
    const { id } = useParams()

    const handleConfirmUser = async () => {
        await confirmUser(id)
    }

    useEffect(() => {
        handleConfirmUser()
    }, [])

    return (
        <>
            <h1 className='text-sky-600 font-black text-4xl capitalize text-center'>
                Estamos Confirmando Tu <span className='text-slate-700'>Cuenta</span>
            </h1>

            <div className='mt-16 md:mt-10 p-10  flex justify-center'>
                <SpinnerCircular
                    color='rgb(2,132,199)'
                    secondaryColor='rgba(0,0,0,0.2)'
                    size={80}
                    thickness={150}
                    enabled={loading}
                />
            </div>
        </>
    )
}

export default ConfirmUser