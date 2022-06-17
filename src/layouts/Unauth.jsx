import { Outlet } from 'react-router-dom'

const UnAuth = () => {
    return (
        <main className='container mx-auto mt-5 md:mt-10 p-5 md:flex md:justify-center'>
            <div className='w-full max-w-md mx-auto'>
                <Outlet />
            </div>
        </main>
    )
}

export default UnAuth