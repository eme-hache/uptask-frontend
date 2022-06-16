import { Outlet, Navigate } from 'react-router-dom'
import Sidebar from '../components/Layout/Sidebar'
import Header from '../components/Layout/Header'
import useAuth from '../hooks/useAuth'

const Auth = () => {
    const { auth, loading } = useAuth()

    if (loading) {
        return <div>Loading...</div>
    }

    if (!auth._id) {
        return <Navigate to='/' />
    }

    return (
        <div className='bg-gray-100'>
            <Header />

            <div className='md:flex md:min-h-screen'>
                <Sidebar />

                <main className='flex-1 p-10'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Auth