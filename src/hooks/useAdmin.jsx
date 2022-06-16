import useProjects from './useProjects'
import useAuth from './useAuth'

const useAdmin = () => {
    const { project } = useProjects()
    const { auth } = useAuth()

    return project.author === auth._id
}

export default useAdmin