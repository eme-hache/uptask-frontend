import { Outlet, Navigate } from 'react-router-dom'

import Sidebar from '../components/Layout/Sidebar'
import Header from '../components/Layout/Header'
import useProjects from '../hooks/useProjects'
import useAuth from '../hooks/useAuth'

const Auth = () => {
    const { isMenuOpen } = useProjects()
    const { auth, loading } = useAuth()

    if (loading) {
        return <div>Loading...</div>
    }

    if (!auth._id) {
        return <Navigate to='/' />
    }

    return (
        <div className={`${isMenuOpen ? 'overflow-hidden h-screen' : 'overflow-visible'} bg-gray-100 min-h-screen flex flex-col relative`}>
            <Header />

            <div className='md:flex flex-1 h-[80%]'>
                <Sidebar />

                <main className='flex-1 p-10 h-full overflow-scroll'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Auth