import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, createContext } from 'react'
import { toast } from 'react-toastify'

import axiosClient from '../config/axios.client'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const location = useLocation()
    const navigate = useNavigate()

    const [isValidToken, setIsValidToken] = useState(false)
    const [loading, setLoading] = useState(true)
    const [auth, setAuth] = useState({}) 

    const authenticateUser = async token => {
        try {
            const logged = localStorage.getItem('logged')
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.get('/user/profile', config)

            
            setAuth(data)
            
            if (!logged || location.pathname === '/') navigate('/projects')

            localStorage.setItem('logged', true)
        }
        catch {
            setAuth({})
        }
        finally {
            setLoading(false)
        }
    }

    const checkToken = async id => {
        try {
            await axiosClient.get(`/user/check-token/${id}`)

            setIsValidToken(true)
        }
        catch (error) {
            const { response: { data } } = error ?? {}

            toast(data?.msgToUser ?? 'Ocurrió un error al verificar el token', { type: 'error' })

            setIsValidToken(false)

            navigate('/')
        }
    }

    const signUp = async account => {
        try {
            const { data } = await axiosClient.post(`/user`, account)

            toast(data.msgToUser, { type: data.error ? 'error' : 'success' })
            navigate('/')
        }
        catch (error) {
            const { response: { data } } = error ?? {}

            toast(data?.msgToUser ?? 'Ocurrió un error al crear la cuenta', { type: 'error' })
        }
    }

    const signIn = async account => {
        try {
            setLoading(true)

            const { data } = await axiosClient.post('/user/signin', account)

            localStorage.setItem('token', data.token)

            setAuth(data)
            navigate('/projects')
        }
        catch (error) {
            const { response: { data } } = error || {}

            toast(data?.msgToUser ?? 'Ocurrió un error al iniciar sesión', { type: 'error' })
        }
        finally {
            setLoading(false)
        }
    }

    const signOut = () => {
        setAuth({})
    }

    const resetPassword = async (id, passwords) => {
        try {
            const { data } = await axiosClient.post(`/user/forgot-password/${id}`, passwords)

            toast(data.msgToUser, { type: data.error ? 'error' : 'success' })
            navigate('/')
        }
        catch (error) {
            const { response: { data } } = error ?? {}

            toast(data?.msgToUser ?? 'Ocurrió un error al restablecer la contraseña', { type: 'error' })
        }
    }

    const confirmUser = async id => {
        try {
            setLoading(true)

            const { data } = await axiosClient.get(`/user/confirm/${id}`)

            toast(data.msgToUser, { type: data.error ? 'error' : 'success' })
        }
        catch (error) {
            const { response: { data } } = error ?? {}

            toast(data?.msgToUser ?? 'Ocurrió un error al confirmar la cuenta', { type: 'error' })
        }
        finally {
            setLoading(false)
            navigate('/')
        }
    }

    const sendPasswordResetEmail = async email => {
        try {
            const { data } = await axiosClient.post(`/user/forgot-password`, { email })

            toast(data.msgToUser, { type: data.error ? 'error' : 'success' })
            navigate('/')
        }
        catch (error) {
            const { response: { data } } = error ?? {}

            toast(data?.msgToUser ?? 'Ocurrió un error al enviar el correo', { type: 'error' })
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            authenticateUser(token)
        }
        else {
            localStorage.removeItem('logged')
            setLoading(false)
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                auth,
                loading,
                isValidToken,
                signUp,
                signIn,
                setAuth,
                signOut,
                checkToken,
                confirmUser,
                resetPassword,
                sendPasswordResetEmail,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext