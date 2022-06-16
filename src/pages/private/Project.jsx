import { useParams, Link } from 'react-router-dom'
import useProjects from '../../hooks/useProjects'
import useAdmin from '../../hooks/useAdmin'
import { useEffect } from 'react'
import io from 'socket.io-client'

import DeleteCollaborator from '../../components/Collaborator/Delete'
import Collaborator from '../../components/Collaborator'
import DeleteTask from '../../components/Task/Delete'
import Modal from '../../components/Task/Modal'
import Task from '../../components/Task'

let socket

const Project = () => {
    const params = useParams()
    const admin = useAdmin()

    const { getProject, project, loading, handleModal, addedTask, deletedTask, editedTask, changedTaskState } = useProjects()

    useEffect(() => {
        if (getProject) {
            getProject(params.id)
        }
    }, [params])

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)

        socket.emit('openProject', params.id)
    }, [params])

    useEffect(() => {
        socket.on('taskAdded', task => {
            if (task.project === project._id) {
                addedTask(task)
            }
        })

        socket.on('taskDeleted', task => {
            if (task.project === project._id) {
                deletedTask(task)
            }
        })

        socket.on('taskEdited', task => {
            if (task.project === project._id) {
                editedTask(task)
            }
        })

        socket.on('changedTaskState', task => {
            if (task.project._id === project._id) {
                changedTaskState(task)
            }
        })
    })

    if (loading) return

    return (
        <>
            <Modal />
            <DeleteTask />
            <DeleteCollaborator />

            <div className='flex justify-between'>
                <h1 className='font-black text-4xl'>{project?.name}</h1>

                {admin && (
                    <Link
                        to={`/projects/edit/${params.id}`}
                        className='flex items-center gap-2 text-gray-500 hover:text-black'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>

                        <span>
                            Editar
                        </span>
                    </Link>
                )}
            </div>

            {admin && (
                <button
                    onClick={() => handleModal()}
                    type='button'
                    className='text-sm px-5 py-3 w-full md:w-auto rounded uppercase font-bold bg-sky-500 text-white text-center mt-5 flex gap-2 justify-center'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    Nueva Tarea
                </button>
            )}

            <p className='font-bold text-xl mt-10'>Tareas del Proyecto</p>

            <div className='bg-white shadow mt-10 rounded'>
                {project?.tasks?.length > 0
                    ? project.tasks.map(task => <Task key={task._id} task={task} />)
                    : <p className='text-center my-10 p-10'>No hay tareas en este proyecto</p>}
            </div>

            {admin && (
                <>
                    <div className='flex justify-between mt-10'>
                        <p className='font-bold text-xl'>Colaboradores</p>

                        <Link
                            to={`/projects/new-collaborator/${project._id}`}
                            className='flex items-center gap-2 text-gray-500 hover:text-black'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>

                            <span>
                                Añadir
                            </span>
                        </Link>
                    </div>

                    <div className='bg-white shadow mt-10 rounded'>
                        {project?.collaborators?.length > 0
                            ? project.collaborators.map(collaborator =>
                                (<Collaborator key={collaborator._id} collaborator={collaborator} />)
                            )
                            : <p className='text-center my-10 p-10'>No hay colaboradores en este proyecto</p>}
                    </div>
                </>
            )}
        </>
    )
}

export default Project