import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import io from 'socket.io-client'

import axiosClient from '../config/axios.client'
import useAuth from '../hooks/useAuth'

let socket

const ProjectContext = createContext()

export const ProjectProvider = ({ children }) => {
    const { auth, signOut: signOutAuth} = useAuth()
    const navigate = useNavigate()

    const [isDeleteCollaborator, setIsDeleteCollaborator] = useState(false)
    const [isDeleteProject, setIsDeleteProject] = useState(false)
    const [isDeleteTask, setIsDeleteTask] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSearcher, setIsSearcher] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const [collaborator, setCollaborator] = useState({})
    const [projects, setProjects] = useState([])
    const [project, setProject] = useState({})
    const [task, setTask] = useState({})

    const toggleMenu = state => {
        setIsMenuOpen(state ?? !isMenuOpen)
    }

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
        catch (error) {
            const { response: { data } } = error ?? {}

            toast(data?.msgToUser ?? 'No se pudo obtener el proyecto', { type: 'error' })
            
            navigate('/projects')
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
        catch (error) {
            const { response: { data } } = error ?? {}

            toast(data?.msgToUser ?? 'No se pudo crear el proyecto', { type: 'error' })
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
        catch (error) {
            const { response: { data } } = error ?? {}

            toast(data?.msgToUser ?? 'No se pudo editar el proyecto', { type: 'error' })
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
        catch (error) {
            const { response: { data } } = error ?? {}

            toast(data?.msgToUser ?? 'No se pudo eliminar el proyecto', { type: 'error' })
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
        catch (error) {
            const { response: { data } } = error ?? {}

            toast(data?.msgToUser ?? 'No se pudo obtener los proyectos', { type: 'error' })
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
        catch (error) {
            const { response: { data } } = error ?? {}

            toast(data?.msgToUser ?? 'No se pudo crear la tarea', { type: 'error' })
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
        catch (error) {
            const { response: { data } } = error ?? {}

            toast(data?.msgToUser ?? 'No se pudo modificar la tarea', { type: 'error' })
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
        catch (error) {
            const { response: { data } } = error ?? {}

            toast(data?.msgToUser ?? 'No se pudo editar la tarea', { type: 'error' })
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
        catch (error) {
            const { response: { data } } = error ?? {}

            toast(data?.msgToUser ?? 'No se pudo eliminar la tarea', { type: 'error' })
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
        catch (error) {
            const { response: { data } } = error ?? {}

            toast(data?.msgToUser ?? 'Usuario no encontrado', { type: 'error' })
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
            const { response: { data } } = error ?? {}

            toast(data?.msgToUser ?? 'No se pudo agregar el colaborador', { type: 'error' })
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
        catch (error) {
            const { response: { data } } = error ?? {}

            toast(data?.msgToUser ?? 'No se pudo eliminar el colaborador', { type: 'error' })
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

    const handleSignOut = () => {
        localStorage.removeItem('logged')
        localStorage.removeItem('token')
        setIsMenuOpen(false)
        setProjects([])
        setProject({})
        
        signOutAuth()
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
                isMenuOpen,
                isSearcher,
                isModalOpen,
                collaborator,
                isDeleteTask,
                isDeleteProject,
                isDeleteCollaborator,
                addedTask,
                toggleMenu,
                getProject,
                editedTask,
                submitTask,
                deleteTask,
                deletedTask,
                setProjects,
                handleModal,
                handleSignOut,
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