const Button = ({ onClick, type, children, theme = "default" }) => {
    const themeClassName = {
        default: `bg-costumeBlue text-white`,
        danger: `bg-red-600 text-white`,
    };
    return (
        <button
            onClick={onClick}
            className={`${themeClassName[theme]} font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline`}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;
