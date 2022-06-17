import { Form } from '../../components/Project'

const NewProject = () => {
    return (
        <>
            <h1 className='text-4xl font-black'>Crea un Nuevo Proyecto</h1>

            <div className='mt-10 flex justify-center'>
                <Form />
            </div>
        </>
    )
}

export default NewProject