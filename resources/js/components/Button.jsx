const Button = ({ onClick, type, children, theme = "default" }) => {
    const themeClassName = {
        default: `bg-costumeBlue text-white`,
        danger: `bg-red-600 text-white`,
    };
    return (
        <button
            onClick={onClick}
            className={`${themeClassName[theme]} focus:shadow-outline w-full rounded-lg px-4 py-2 font-bold focus:outline-none`}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;
