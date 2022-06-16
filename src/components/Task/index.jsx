import formatDate from '../../helpers/formatDate'
import useProjects from '../../hooks/useProjects'
import useAdmin from '../../hooks/useAdmin'
import { PRIORITY } from '../../constants'

const Task = ({ task }) => {
    const { name, description, deliveryDate, priority, completed, completedBy } = task

    const { handleModal, handleDeleteTask, changeTaskState } = useProjects()
    const admin = useAdmin()

    return (
        <div className='border-b p-5 flex justify-between items-center'>
            <div className='flex flex-col items-start'>
                <p className='mb-1 text-xl'>{name}</p>
                <p className='mb-1 text-sm text-gray-500 uppercase'>{description}</p>
                <p className='mb-1 text-sm'>{formatDate(deliveryDate)}</p>
                <p className='mb-1 text-xl text-gray-600'>
                    Prioridad: {PRIORITY.find(({ value }) => value === priority).label}
                </p>
                {completed
                    && <p className='text-xs bg-green-600 uppercase p-1 rounded text-white'>
                        Completado por: {completedBy.name}
                    </p>}
            </div>

            <div className='flex flex-col lg:flex-row gap-2'>
                {admin && (
                    <button
                        className='bg-indigo-600 px-4 py-3 text-white font-bold text-sm rounded'
                        type='button'
                        onClick={() => handleModal(task)}
                    >
                        Editar
                    </button>
                )}

                <button
                    className={`${completed ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white font-bold text-sm rounded`}
                    type='button'
                    onClick={() => changeTaskState(task._id)}
                >
                    {completed ? 'Completa' : 'Incompleta'}
                </button>

                {admin && (
                    <button
                        className='bg-red-600 px-4 py-3 text-white font-bold text-sm rounded'
                        type='button'
                        onClick={() => handleDeleteTask(task)}
                    >
                        Eliminar
                    </button>
                )}
            </div>
        </div>
    )
}

export default Task