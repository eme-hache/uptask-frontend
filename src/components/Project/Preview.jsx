import { Link } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'

const Preview = ({ project }) => {
    const { _id, name, client, author } = project
    const { auth } = useAuth()

    return (
        <div className='border-b p-5 flex flex-col md:flex-row justify-between gap-4 items-end'>
            <div className='flex items-center gap-2 w-full md:w-fit'>
                <p className='flex-1'>
                    {name}

                    <span className='text-sm text-gray-500 uppercase'>
                        {''} {client}
                    </span>
                </p>

                {auth._id !== author && <p className='p-1 text-xs rounded text-white bg-green-500 font-bold uppercase h-fit'>Colaborador</p>}
            </div>

            <Link
                className='text-gray-600 hover:text-gray-800 uppercase text-sm font-bold whitespace-nowrap w-fit'
                to={`${_id}`}
            >
                Ver Proyecto
            </Link>
        </div>
    )
}

export default Preview