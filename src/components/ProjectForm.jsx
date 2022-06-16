import useProjects from '../hooks/useProjects'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Alert from './Alert'

const PROYECT = {
    name: '',
    description: '',
    deliveryDate: '',
    client: ''
}

const ProjectForm = () => {
    const params = useParams()

    const { alert, showAlert, submitProject, project: currentProject } = useProjects()

    const [project, setProject] = useState(PROYECT)
    const [isEdit, setIsEdit] = useState(false)

    const handleSubmit = async evt => {
        evt.preventDefault()

        if (Object.values(project).includes('')) {
            return showAlert({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
        }

        await submitProject({ ...project, isEdit })

        setProject(PROYECT)
        setIsEdit(false)
    }

    useEffect(() => {
        if (params.id) {
            setIsEdit(true)
            setProject({ 
                ...currentProject, 
                deliveryDate: currentProject.deliveryDate?.split('T')[0] 
            })
        }
    }, [params])

    return (
        <form onSubmit={handleSubmit} className='bg-white py-10 px-5 md:w-1/2 rounded shadow'>
            
            {Object.keys(alert).length > 0 && (<Alert alert={alert} />)}

            <div className='mb-5'>
                <label
                    htmlFor='name'
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Nombre del Proyecto
                </label>

                <input
                    type='text'
                    id='name'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded'
                    placeholder='Nombre del Proyecto'
                    value={project.name}
                    onChange={evt => setProject({ ...project, name: evt.target.value })}
                />
            </div>

            <div className='mb-5'>
                <label
                    htmlFor='description'
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Descripción
                </label>

                <textarea
                    id='description'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded'
                    placeholder='Descripción del Proyecto'
                    value={project.description}
                    onChange={evt => setProject({ ...project, description: evt.target.value })}
                />
            </div>

            <div className='mb-5'>
                <label
                    htmlFor='date'
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Fecha de Entrega
                </label>

                <input
                    id='date'
                    type='date'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded'
                    value={project.deliveryDate}
                    onChange={evt => setProject({ ...project, deliveryDate: evt.target.value })}
                />
            </div>

            <div className='mb-5'>
                <label
                    htmlFor='client'
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Nombre del Cliente
                </label>

                <input
                    type='text'
                    id='cliente'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded'
                    placeholder='Nombre del Proyecto'
                    value={project.client}
                    onChange={evt => setProject({ ...project, client: evt.target.value })}
                />
            </div>

            <input 
                type='submit'
                value={isEdit ? 'Actualizar Proyecto' : 'Crear Proyecto'}
                className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors'
            />
        </form>
    )
}

export default ProjectForm