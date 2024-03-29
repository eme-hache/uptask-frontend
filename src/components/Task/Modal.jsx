import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Input } from '../../components/Layout'
import useProjects from '../../hooks/useProjects'
import { PRIORITY, TASK } from '../../constants'

const Modal = () => {
    const { isModalOpen, handleModal, submitTask, task: taskToEdit } = useProjects()
    const params = useParams()

    const [isEdit, setIsEdit] = useState(false)
    const [task, setTask] = useState(TASK)

    const handleSubmit = async evt => {
        evt.preventDefault()

        if (Object.values(task).includes('')) {
            return toast('Todos los campos son obligatorios', { type: 'warning' })
        }

        await submitTask({ ...task, project: params.id, isEdit })
    }

    useEffect(() => {
        if (Object.keys(taskToEdit).length > 0) {
            setTask({ ...taskToEdit, deliveryDate: taskToEdit.deliveryDate.split('T')[0] })
            setIsEdit(true)
        }
        else {
            setTask(TASK)
            setIsEdit(false)
        }
    }, [taskToEdit])

    return (
        <Transition.Root show={isModalOpen} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModal}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        />
                    </Transition.Child>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle p-6 w-[90%] md:w-auto max-w-[400px] md:w-[400px]">


                            <div className="block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => handleModal()}
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0  sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                        {isEdit ? 'Editar tarea' : 'Agregar tarea'}
                                    </Dialog.Title>

                                    <form onSubmit={handleSubmit} className='my-10'>
                                        <Input
                                            label='Nombre'
                                            type='text'
                                            placeholder='Ingresa el nombre de la tarea'
                                            id='name'
                                            value={task.name}
                                            onChange={evt => setTask({ ...task, name: evt.target.value })}
                                        />

                                        <Input
                                            label='Descripción'
                                            type='textarea'
                                            placeholder='Ingresa la descripción de la tarea'
                                            id='description'
                                            value={task.description}
                                            onChange={evt => setTask({ ...task, description: evt.target.value })}
                                        />

                                        <Input
                                            label='Fecha de Entrega'
                                            type='date'
                                            id='description'
                                            value={task.deliveryDate}
                                            onChange={evt => setTask({ ...task, deliveryDate: evt.target.value })}
                                        />

                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm'
                                                htmlFor='priority'
                                            >
                                                Prioridad
                                            </label>

                                            <select
                                                name="priority"
                                                id="priority"
                                                className='border w-full p-2 mt-2 bg-gray-50 placeholder-gray-400 rounded'
                                                value={task.priority}
                                                onChange={evt => setTask({ ...task, priority: evt.target.value })}
                                            >
                                                <option value=''>-- Seleccionar --</option>
                                                {PRIORITY.map(({ value, label }) => (
                                                    <option key={value} value={value}>{label}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <Button type='submit'>
                                            {isEdit ? 'Guardar Cambios' : 'Crear Tarea'}
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal

