import ProjectForm from '../../components/ProjectForm'
import useProjects from '../../hooks/useProjects'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const EditProject = () => {
    const params = useParams()

    const { getProject, project, loading, deleteProject } = useProjects()

    const handleClick = async () => {
        if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
            deleteProject(project._id)
        }
    }

    useEffect(() => {
        getProject(params.id)
    }, [])

    if (loading) return

    return (
        <>
            <div className='flex justify-between'>
                <h1 className='text-4xl font-black'>
                    Editar Proyecto: {project.name}
                </h1>

                <button
                    onClick={handleClick}
                    className='flex items-center gap-2 text-gray-500 hover:text-black'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>

                    <span>
                        Eliminar
                    </span>
                </button>
            </div>

            <div className='mt-10 flex justify-center'>
                <ProjectForm />
            </div>
        </>
    )
}

export default EditProject