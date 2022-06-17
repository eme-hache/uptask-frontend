import Collaborator from './Collaborator'

const List = ({ collaborators }) => {
    if (collaborators?.length === 0) {
        return (
            <p className='text-center p-10 bg-white shadow rounded'>
                No hay colaboradores en este proyecto
            </p>
        )
    }

    return collaborators?.map(
        collaborator => <Collaborator key={collaborator._id} collaborator={collaborator} />
    )
}

export default List