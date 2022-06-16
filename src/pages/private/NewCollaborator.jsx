import useProjects from '../../hooks/useProjects'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Alert from '../../components/Alert'

const NewCollaborator = () => {
    const params = useParams()

    const [email, setEmail] = useState('')
    const {
        alert,
        showAlert,
        getCollaborator,
        project,
        collaborator,
        addCollaborator,
        getProject,
        loading
    } = useProjects()

    const handleSubmit = async evt => {
        evt.preventDefault()

        if (email === '') {
            return showAlert({
                msg: 'El correo electrónico es obligatorio',
                error: true
            })
        }

        await getCollaborator(email)

        //setEmail('')
    }

    useEffect(() => {
        if (getProject) {
            getProject(params.id)
        }
    }, [])

    if (!project?._id) {
        return (
            <div className='flex justify-center'>
                <div className='bg-white p-8 md:w-1/2 rounded shadow'>
                    <Alert alert={alert} />
                </div>
            </div>
        )
    }

    return (
        <>
            <h1 className='text-4xl font-black'>Añadir Colaborador (a) al Proyecto: {project.name}</h1>

            <div className='mt-10 flex justify-center'>
                <form
                    className='bg-white p-8 md:w-1/2 rounded shadow w-full'
                    onSubmit={handleSubmit}
                >
                    {Object.keys(alert).length > 0 && (<Alert alert={alert} />)}

                    <div className='mb-5'>
                        <label
                            htmlFor='email'
                            className='text-gray-700 uppercase font-bold text-sm'
                        >
                            Email Colaborador
                        </label>

                        <input
                            type='email'
                            id='email'
                            className='border w-full p-2 mt-2 placeholder-gray-400 rounded'
                            placeholder='Email del Colaborador'
                            value={email}
                            onChange={evt => setEmail(evt.target.value)}
                        />
                    </div>

                    <input
                        type='submit'
                        value='Añadir Colaborador'
                        className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors'
                    />
                </form>
            </div>

            {loading && <p>Cargando</p>}

            {Object.keys(collaborator).length > 0 && (
                <div className='flex justify-center mt-10'>
                    <div className='bg-white py-10 px-5 md:w-1/2 rounded shadow w-full'>
                        <h2 className='text-center mb-10 text-2xl font-bold'>Resultado:</h2>

                        <div className='flex justify-between items-center'>
                            <p>{collaborator?.name}</p>

                            <button
                                type='button'
                                className='bg-slate-500 px-5 py-2 rounded uppercase text-white font-bold text-sm'
                                onClick={() => addCollaborator(email)}
                            >
                                Agregar al Proyecto
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default NewCollaborator