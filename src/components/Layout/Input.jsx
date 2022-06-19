const Input = ({ label, type, id, placeholder, value, onChange, required, autoComplete }) => {
    return (
        <div className='mb-5'>
            <label htmlFor={id} className='uppercase text-gray-600 block text-base font-bold'>
                {label}
            </label>

            {type === 'textarea'
                ? (
                    <textarea
                        autoComplete={autoComplete}
                        required={required}
                        id={id}
                        placeholder={placeholder}
                        className='w-full mt-3 p-3 border rounded bg-gray-50'
                        value={value}
                        onChange={onChange}
                    />
                )
                : (
                    <input
                        autoComplete={autoComplete}
                        required={required}
                        type={type}
                        id={id}
                        placeholder={placeholder}
                        className='w-full mt-3 p-3 border rounded bg-gray-50'
                        value={value}
                        onChange={onChange}
                    />
                )}
        </div>
    )
}

export default Input