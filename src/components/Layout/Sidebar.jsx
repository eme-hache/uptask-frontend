import { Link } from 'react-router-dom'

import useProjects from '../../hooks/useProjects'
import useAuth from '../../hooks/useAuth'
import { Button } from './index'
import Searcher from './Searcher'

const Sidebar = () => {
    const { handleSearcher, isMenuOpen, toggleMenu, handleSignOut } = useProjects()
    const { auth } = useAuth()

    return (
        <aside className={`${isMenuOpen ? 'absolute' : 'hidden'} w-screen h-full top-0 shadow md:shadow-none md:block bg-white md:bg-transparent md:relative md:w-72 md:px-5 md:py-10 pt-20 px-10 flex flex-col justify-between`}>
            <Searcher />

            <div>
                <button onClick={() => toggleMenu()} className='absolute top-6 right-5 md:hidden'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <p className='font-bold capitalize mb-10 flex gap-2 text-xl items-center justify-center md:justify-start'>
                    Hola:
                    <span className='text-xl font-normal'>{auth.name}</span>
                </p>

                <button
                    type='button'
                    className='bg-white w-full py-2 rounded text-gray-300 border text-left px-4 flex items-center justify-between mb-5'
                    onClick={handleSearcher}
                >
                    Buscar Proyecto
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </button>

                <Link to='new-project' onClick={() => toggleMenu(false)} className=' text-white uppercase font-bold'>
                    <div className='bg-sky-600 text-center p-3 rounded mb-5 hover:cursor-pointer'>
                        Nuevo Proyecto
                    </div>
                </Link>

                <Link to='/projects' onClick={() => toggleMenu(false)} className='font-bold uppercase'>
                    <div className='text-center bg-gray-200 p-3 rounded hover:cursor-pointer hover:bg-sky-600 hover:text-white transition-colors'>
                        Proyectos
                    </div>
                </Link>
            </div>

            <Button onClick={handleSignOut} type='button' className='mb-10 md:hidden'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Cerrar Sesión
            </Button>
        </aside>
    )
}

export default Sidebar