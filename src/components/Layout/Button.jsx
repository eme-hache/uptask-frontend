
const Button = ({ loading, children, type, className, onClick }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`${className} bg-sky-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-all flex gap-5 justify-center items-center duration-500`}
        >
            {children}
        </button>
    )
}

export default Button