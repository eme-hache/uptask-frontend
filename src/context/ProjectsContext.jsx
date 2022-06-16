import { createContext, useState, useEffect } from 'react'
import axiosClient from '../config/axios.client'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import io from 'socket.io-client'

let socket

const ProjectContext = createContext()

export const ProjectProvider = ({ children }) => {
    const navigate = useNavigate()
    const { auth } = useAuth()

    const [isDeleteCollaborator, setIsDeleteCollaborator] = useState(false)
    const [isDeleteTask, setIsDeleteTask] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSearcher, setIsSearcher] = useState(false)
    const [loading, setLoading] = useState(false)

    const [collaborator, setCollaborator] = useState({})
    const [projects, setProjects] = useState([])
    const [project, setProject] = useState({})
    const [alert, setAlert] = useState({})
    const [task, setTask] = useState({})

    const showAlert = alert => {
        setAlert(alert)
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
            showAlert({})
        }
        catch {
            // TODO best practice to handle errors
            navigate('/projects')
            showAlert({
                msg: 'Hubo un error al obtener el proyecto',
                error: true
            })
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

            // TODO: Show alert with success message

            navigate('/projects')
        }
        catch {
            showAlert({
                msg: 'Hubo un error al crear el proyecto',
                error: true
            })
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

            // TODO: Show alert with success message

            navigate('/projects')
        }
        catch {
            showAlert({
                msg: 'Hubo un error al editar el proyecto',
                error: true
            })
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

            // TODO Show alert with success message

            navigate('/projects')
        }
        catch {
            showAlert({
                msg: 'Hubo un error al eliminar el proyecto',
                error: true
            })
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
            showAlert({
                msg: 'Hubo un error al obtener los proyectos',
                error: true
            })
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


            // TODO: Show alert with success message
            handleModal()

            socket.emit('newTask', data)
        }
        catch {
            showAlert({
                msg: 'Hubo un error al crear la tarea',
                error: true
            })
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

            // TODO Show alert with success message
        }
        catch {
            showAlert({
                msg: 'Hubo un error al modificar la tarea',
                error: true
            })
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

            // TODO: Show alert with success message

            socket.emit('editTask', data)

            handleModal()
        }
        catch {
            showAlert({
                msg: 'Hubo un error al modificar la tarea',
                error: true
            })
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
            
            socket.emit('deleteTask', task)

            // TODO Show alert with success message
        }
        catch (error) {
            console.log(error)
            // TODO Show alert with error message
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
            showAlert({})
        }
        catch {
            showAlert({
                msg: 'Colaborador no encontrado',
                error: true
            })
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

            showAlert({
                msg: 'Colaborador agregado',
                error: false
            })
        }
        catch (error) {
            const { response: { data: { msg } } } = error
            let message = { msg: '', error: true }

            switch (msg) {
                case 'Project not found':
                    message = { ...message, msg: 'Proyecto no encontrado' }
                    break
                case 'Not authorized':
                    message = { ...message, msg: 'No tienes permisos para realizar esta acción' }
                    break
                case 'User not found':
                    message = { ...message, msg: 'Usuario no encontrado' }
                    break
                case 'User is the author':
                    message = { ...message, msg: 'El usuario es el autor del proyecto' }
                    break
                case 'User is already a collaborator':
                    message = { ...message, msg: 'El usuario ya es un colaborador' }
                    break
            }

            showAlert(message)
        }
        finally {
            setCollaborator({})
            setLoading(false)

            setTimeout(() => {
                showAlert({})
            }, 2000)
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
            
            //TODO Show alert with success message
        }
        catch {
            showAlert({
                msg: 'Hubo un error al eliminar el colaborador',
                error: true
            })
        }
        finally {
            setTimeout(() => {
                showAlert({})
            }, 2000)
        }
    }

    const handleDeleteCollaborator = localCollaborator => {
        setIsDeleteCollaborator(!isDeleteCollaborator)
        setCollaborator(localCollaborator)
    }

    const handleDeleteTask = localTask => {
        setIsDeleteTask(!isDeleteTask)
        setTask(localTask)
    }

    const handleModal = task => {
        setIsModalOpen(!isModalOpen)
        showAlert({})

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
        showAlert({})
    }
    
    useEffect(() => {
        getAllProjects()
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
                alert,
                loading,
                project,
                projects,
                isSearcher,
                isModalOpen,
                collaborator,
                isDeleteTask,
                isDeleteCollaborator,
                signOut,
                addedTask,
                showAlert,
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
                handleDeleteCollaborator,
            }}
        >
            {children}
        </ProjectContext.Provider>
    )
}

export default ProjectContext