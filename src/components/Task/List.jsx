import Task from './Task'

const List = ({ tasks }) => {
    if (tasks?.length === 0) {
        return (
            <p className='text-center mb-10 p-10 bg-white rounded shadow'>
                No hay tareas en este proyecto
            </p>
        )
    }
    
    return tasks?.map(task => <Task key={task._id} task={task} />)
}

export default List