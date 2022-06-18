import { List as ProjectList } from '../../components/Project'
import useProjects from '../../hooks/useProjects'

const Projects = () => {
    const { projects } = useProjects()

    return (
        <>
            <h1 className='text-4xl font-black'>Proyectos</h1>

            <div className='mt-10'>
                <ProjectList projects={projects}/>
            </div>
        </>
    )
}

export default Projects