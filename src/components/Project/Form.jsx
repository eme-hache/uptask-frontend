import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import { Input, Button } from '../../components/Layout/'
import useProjects from '../../hooks/useProjects'
import { PROYECT } from '../../constants'

const Form = () => {
    const params = useParams()

    const { submitProject, project: currentProject } = useProjects()

    const [project, setProject] = useState(PROYECT)
    const [isEdit, setIsEdit] = useState(false)

    const handleSubmit = async evt => {
        evt.preventDefault()

        if (Object.values(project).includes('')) {
            return toast('Todos los campos son obligatorios', { type: 'warning' })
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
            <Input
                label='Nombre del Proyecto'
                type='text'
                placeholder='Ingresa el nombre del proyecto'
                id='name'
                value={project.name}
                onChange={evt => setProject({ ...project, name: evt.target.value })}
            />

            <Input
                label='Descripción'
                type='textarea'
                placeholder='Ingresa la descripción del proyecto'
                id='description'
                value={project.description}
                onChange={evt => setProject({ ...project, description: evt.target.value })}
            />

            <Input
                label='Fecha de Entrega'
                type='date'
                placeholder='Ingresa la fecha de entrega'
                id='date'
                value={project.deliveryDate}
                onChange={evt => setProject({ ...project, deliveryDate: evt.target.value })}
            />


            <Input
                label='Nombre del Cliente'
                type='text'
                placeholder='Ingresa el nombre del cliente'
                id='client'
                value={project.client}
                onChange={evt => setProject({ ...project, client: evt.target.value })}
            />


            <Button type='submit'>
                {isEdit ? 'Editar Proyecto' : 'Crear Proyecto'}
            </Button>
        </form>
    )
}

export default Form