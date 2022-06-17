import { Preview } from '../../components/Project'
import useProjects from '../../hooks/useProjects'

const ProjectList = () => {
    const { projects } = useProjects()

    if (projects?.length <= 0) {
        return (
            <p className='text-center text-gray-600 p-5'>
                Agrega un nuevo proyecto para comenzar
            </p>
        )
    }

    return projects.map(project => <Preview key={project._id} project={project} />)
}

const Projects = () => {
    return (
        <>
            <h1 className='text-4xl font-black'>Proyectos</h1>

            <div className='bg-white shadow mt-10 rounded'>
                <ProjectList />
            </div>
        </>
    )
}

export default Projects