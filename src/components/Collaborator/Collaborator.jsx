import useProjects from '../../hooks/useProjects'

const Collaborator = ({ collaborator }) => {
    const { handleDeleteCollaborator } = useProjects()
    const { name, email } = collaborator

    return (
        <div className='bg-white rounded shadow mb-5 p-5 flex justify-between items-center'>
            <div>
                <p>{name}</p>
                <p className='text-sm text-gray-700'>{email}</p>
            </div>

            <div>
                <button
                    type='button'
                    className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded'
                    onClick={() => handleDeleteCollaborator(collaborator)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default Collaborator