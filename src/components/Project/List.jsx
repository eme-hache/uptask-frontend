import { Preview } from './index'

const List = ({ projects }) => {
    if (projects?.length <= 0) {
        return (
            <p className='text-center text-gray-600 p-5'>
                Agrega un nuevo proyecto para comenzar
            </p>
        )
    }

    return projects?.map(project => <Preview key={project._id} project={project} />)
}

export default List