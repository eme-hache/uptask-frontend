import { useState, useEffect, createContext } from 'react'
import axiosClient from '../config/axios.client'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [auth, setAuth] = useState({})

    const authenticateUser = async token => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.get('/user/profile', config)

            setAuth(data)
            //navigate('/projects')
        }
        catch {
            setAuth({})
        }
        finally {
            setLoading(false)
        }
    }

    const signOut = () => {
        setAuth({})
    }

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            authenticateUser(token)
        }
        else {
            setLoading(false)
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                auth,
                loading,
                setAuth,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext