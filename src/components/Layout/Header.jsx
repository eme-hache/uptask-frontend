import useProjects from '../../hooks/useProjects'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'

import Searcher from './Searcher'

const Header = () => {
    const { handleSearcher, signOut: signOutProjects } = useProjects()
    const { signOut: signOutAuth } = useAuth()

    const handleSignOut = () => {
        localStorage.removeItem('token')
        signOutProjects()
        signOutAuth()
    }

    return (
        <header className='px-4 py-5 bg-white border-b'>
            <Searcher />

            <div className='md:flex md:justify-between'>
                <h2 className='text-4xl text-sky-600 font-black text-center mb-5 md:mb-0'>UpTask</h2>

                <div className='flex flex-col md:flex-row items-center gap-4'>
                    <button
                        type='button'
                        className='font-bold uppercase'
                        onClick={handleSearcher}
                    >
                        Buscar Proyecto
                    </button>

                    <Link to='/projects' className='font-bold uppercase'>
                        Proyectos
                    </Link>

                    <button
                        type='button'
                        className='text-white text-sm bg-sky-600 p-3 rounded uppercase font-bold'
                        onClick={handleSignOut}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header