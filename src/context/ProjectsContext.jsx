import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import io from 'socket.io-client'

import axiosClient from '../config/axios.client'
import useAuth from '../hooks/useAuth'

let socket

const ProjectContext = createContext()

export const ProjectProvider = ({ children }) => {
    const navigate = useNavigate()
    const { auth } = useAuth()

    const [isDeleteCollaborator, setIsDeleteCollaborator] = useState(false)
    const [isDeleteProject, setIsDeleteProject] = useState(false)
    const [isDeleteTask, setIsDeleteTask] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSearcher, setIsSearcher] = useState(false)
    const [loading, setLoading] = useState(false)

    const [collaborator, setCollaborator] = useState({})
    const [projects, setProjects] = useState([])
    const [project, setProject] = useState({})
    const [task, setTask] = useState({})

    const getProject = async id => {
        try {
            setLoading(true)

            const token = localStorage.getItem('token')

            if (!token) return

            const { data } = await axiosClient.get(`/project/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            setProject(data)
        }
        catch {
            navigate('/projects')
            toast('No se pudo obtener el proyecto', { type: 'error' })
        }
        finally {
            setLoading(false)
        }
    }

    const submitProject = async project => {
        if (project.isEdit) {
            await editProject(project)
        }
        else {
            await createProject(project)
        }
    }

    const createProject = async project => {
        try {
            const token = localStorage.getItem('token')

            if (!token) return

            const { data } = await axiosClient.post('/project', project, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            setProjects([...projects, data])

            toast('Proyecto creado correctamente', { type: 'success' })

            navigate('/projects')
        }
        catch {
            toast('No se pudo crear el proyecto', { type: 'error' })
        }
    }

    const editProject = async project => {
        try {
            const token = localStorage.getItem('token')

            if (!token) return

            const { data } = await axiosClient.put(`/project/${project._id}`, project, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            setProjects(projects.map(proj => proj._id === data._id ? data : proj))

            toast('Proyecto editado correctamente', { type: 'success' })

            navigate(-1)
        }
        catch {
            toast('No se pudo editar el proyecto', { type: 'error' })
        }
    }

    const deleteProject = async id => {
        try {
            const token = localStorage.getItem('token')

            if (!token) return

            await axiosClient.delete(`/project/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            setProjects(projects.filter(proj => proj._id !== id))

            toast('Proyecto eliminado correctamente', { type: 'success' })

            navigate('/projects')
        }
        catch {
            toast('No se pudo eliminar el proyecto', { type: 'error' })
        }
    }

    const getAllProjects = async () => {
        try {
            const token = localStorage.getItem('token')

            if (!token) return

            const { data } = await axiosClient.get('/project', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            setProjects(data)
        }
        catch {
            toast('No se pudo obtener los proyectos', { type: 'error' })
        }
    }

    const submitTask = async task => {
        if (task.isEdit) {
            await editTask(task)
        }
        else {
            await createTask(task)
        }
    }

    const createTask = async task => {
        try {
            const token = localStorage.getItem('token')

            if (!token) return

            const { data } = await axiosClient.post('/task', task, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            handleModal()

            toast('Tarea creada correctamente', { type: 'success' })

            socket.emit('newTask', data)
        }
        catch {
            toast('No se pudo crear la tarea', { type: 'error' })
        }
    }

    const changeTaskState = async id => {
        try {
            const token = localStorage.getItem('token')

            if (!token) return

            const { data } = await axiosClient.patch(`/task/state/${id}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            socket.emit('changeTaskState', data)

            toast('Tarea modificada correctamente', { type: 'success' })
        }
        catch {
            toast('No se pudo modificar la tarea', { type: 'error' })
        }
    }

    const editTask = async task => {
        try {
            const token = localStorage.getItem('token')

            if (!token) return

            const { data } = await axiosClient.put(`/task/${task._id}`, task, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            toast('Tarea modificada correctamente', { type: 'success' })

            socket.emit('editTask', data)

            handleModal()
        }
        catch {
            toast('No se pudo editar la tarea', { type: 'error' })
        }
    }

    const deleteTask = async id => {
        try {
            const token = localStorage.getItem('token')

            if (!token) return

            await axiosClient.delete(`/task/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            
            toast('Tarea eliminada correctamente', { type: 'success' })

            socket.emit('deleteTask', task)
        }
        catch {
            toast('No se pudo eliminar la tarea', { type: 'error' })
        }
        finally {
            setIsDeleteTask(!isDeleteTask)
        }
    }

    const getCollaborator = async email => {
        try {
            setLoading(true)

            const token = localStorage.getItem('token')

            if (!token) return

            const { data } = await axiosClient.post('/project/collaborators/', { email }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            setCollaborator(data)
        }
        catch {
            toast('Colaborador no encontrado', { type: 'warning' })
        }
        finally {
            setLoading(false)
        }
    }

    const addCollaborator = async (email) => {
        try {
            const token = localStorage.getItem('token')

            if (!token) return

            await axiosClient.post(`/project/collaborators/${project._id}`, { email }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })


            toast('Colaborador agregado', { type: 'success' })
            navigate(-1)
        }
        catch (error) {
            const { response: { data: { msg } } } = error
            let message = ''

            switch (msg) {
                case 'Project not found':
                    message = 'Proyecto no encontrado'
                    break
                case 'Not authorized':
                    message = 'No tienes permisos para realizar esta acción'
                    break
                case 'User not found':
                    message = 'Usuario no encontrado'
                    break
                case 'User is the author':
                    message = 'El usuario es el autor del proyecto'
                    break
                case 'User is already a collaborator':
                    message = 'El usuario ya es un colaborador'
                    break
            }

            toast(message.msg, { type: 'error' })
        }
        finally {
            setCollaborator({})
            setLoading(false)
        }
    }

    const deleteCollaborator = async (id) => {
        try {
            const token = localStorage.getItem('token')

            if (!token) return

            await axiosClient.post(`/project/delete-collaborator/${project._id}`, { id }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            setProject({ ...project, collaborators: project.collaborators.filter(col => col._id !== id) })
            handleDeleteCollaborator()
            
            toast('Colaborador eliminado', { type: 'success' })
        }
        catch {
            toast('No se pudo eliminar el colaborador', { type: 'error' })
        }
    }

    const handleDeleteCollaborator = localCollaborator => {
        setIsDeleteCollaborator(!isDeleteCollaborator)
        setCollaborator(localCollaborator)
    }

    const handleDeleteProject = localProject => {
        setIsDeleteProject(!isDeleteProject)
        setProject(localProject)
    }

    const handleDeleteTask = localTask => {
        setIsDeleteTask(!isDeleteTask)
        setTask(localTask)
    }

    const handleModal = task => {
        setIsModalOpen(!isModalOpen)

        if (task) {
            setTask(task)
        }
        else {
            setTimeout(() => setTask({}), 1000)
        }
    }

    const handleSearcher = () => {
        setIsSearcher(!isSearcher)
    }

    const signOut = () => {
        setProjects([])
        setProject({})
    }
    
    useEffect(() => {
        if (auth && Object.keys(auth).length > 0) {
            getAllProjects()
        }
    }, [auth])

    useEffect(() => { socket = io(import.meta.env.VITE_BACKEND_URL) }, [])

    // Socket functions

    const addedTask = task => {
        setProject({ ...project, tasks: [...project.tasks, task] })
    }

    const deletedTask = task => {
        setProject({ ...project, tasks: project.tasks.filter(t => t._id !== task._id) })
    }

    const editedTask = task => {
        setProject({ ...project, tasks: project.tasks.map(t => t._id === task._id ? task : t) })
    }

    const changedTaskState = task => {
        setProject({ ...project, tasks: project.tasks.map(t => t._id === task._id ? task : t) })
    }

    return (
        <ProjectContext.Provider
            value={{
                task,
                loading,
                project,
                projects,
                isSearcher,
                isModalOpen,
                collaborator,
                isDeleteTask,
                isDeleteProject,
                isDeleteCollaborator,
                signOut,
                addedTask,
                getProject,
                editedTask,
                submitTask,
                deleteTask,
                deletedTask,
                setProjects,
                handleModal,
                deleteProject,
                submitProject,
                handleSearcher,
                changeTaskState,
                changedTaskState,
                addCollaborator,
                getCollaborator,
                handleDeleteTask,
                deleteCollaborator,
                handleDeleteProject,
                handleDeleteCollaborator,
            }}
        >
            {children}
        </ProjectContext.Provider>
    )
}

export default ProjectContext