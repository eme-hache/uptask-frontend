import Preview from '../../components/Project/Preview'
import useProjects from '../../hooks/useProjects'

const Projects = () => {
    const { projects } = useProjects()

    return (
        <>
            <h1 className='text-4xl font-black'>Proyectos</h1>

            <div className='bg-white shadow mt-10 rounded'>
                {projects.length > 0
                    ? projects.map(project => <Preview key={project._id} project={project} />)
                    : <p className='text-center text-gray-600 p-5'>
                        Agrega un nuevo proyecto para comenzar
                    </p>}
            </div>
        </>
    )
}

export default Projects