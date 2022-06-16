import ProjectContext from '../context/ProjectsContext'
import { useContext } from 'react'

const useProjects = () => {
    return useContext(ProjectContext)
}

export default useProjects