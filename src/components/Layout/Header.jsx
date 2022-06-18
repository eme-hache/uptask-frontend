import useProjects from '../../hooks/useProjects'
import useAuth from '../../hooks/useAuth'

const Header = () => {
    const { handleSignOut, toggleMenu } = useProjects()

    return (
        <header className='p-5 bg-white border-b'>
            <div className='flex justify-between items-center'>
                <h2 className='text-4xl text-sky-600 font-black text-left mb-0'>UpTask</h2>

                <div className='hidden md:flex flex-col md:flex-row items-center gap-4'>
                    <button type='button' onClick={handleSignOut} className='flex gap-2'>
                        Salir
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>

                <button onClick={() => toggleMenu()} className='md:hidden'>
                    <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>
    )
}

export default Header