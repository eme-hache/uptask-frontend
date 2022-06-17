import { Link } from 'react-router-dom'

import useProjects from '../../hooks/useProjects'
import useAuth from '../../hooks/useAuth'
import Searcher from './Searcher'

const Sidebar = () => {
    const { handleSearcher } = useProjects()
    const { auth } = useAuth()

    return (
        <aside className='md:w-72 px-5 py-10'>
            <Searcher />

            <p className='font-bold capitalize mb-10 flex gap-2 text-xl items-center'>
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

            <div className='bg-sky-600 text-center p-3 rounded mb-5 hover:cursor-pointer'>
                <Link to='new-project' className=' text-white uppercase font-bold'>
                    Nuevo Proyecto
                </Link>
            </div>

            <div className='text-center bg-gray-200 p-3 rounded hover:cursor-pointer hover:bg-sky-600 hover:text-white transition-colors'>
                <Link to='/projects' className='font-bold uppercase'>
                    Proyectos
                </Link>
            </div>
        </aside>
    )
}

export default Sidebar