import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'

const Preview = ({ project }) => {
    const { _id, name, client, author } = project
    const { auth } = useAuth()

    return (
        <div className='border-b p-5 flex flex-col md:flex-row justify-between'>
            <div className='flex items-cente gap-2'>
                <p className='flex-1'>
                    {name}

                    <span className='text-sm text-gray-500 uppercase'>
                        {''} {client}
                    </span>
                </p>

                {auth._id !== author && <p className='p-1 text-xs rounded text-white bg-green-500 font-bold uppercase'>Colaborador</p>}
            </div>

            <Link
                className='text-gray-600 hover:text-gray-800 uppercase text-sm font-bold'
                to={`${_id}`}
            >
                Ver Proyecto
            </Link>
        </div>
    )
}

export default Preview