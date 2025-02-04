import classNames from "classnames";

const Button = ({
    onClick,
    type,
    children,
    theme = "default",
    disabled,
    className,
}) => {
    const themeClassName = {
        default: `bg-blue-600 text-white hover:bg-blue-500`,
        danger: `bg-red-600 text-white hover:bg-red-500`,
        warning: `bg-yellow-500 text-white hover:bg-yellow-600`,
        gray: `bg-gray-500 text-white hover:bg-gray-600`,
    };
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={classNames(
                themeClassName[theme],
                `focus:shadow-outline w-full rounded-lg px-4 py-2 font-bold transition duration-300 focus:outline-none`,
                disabled ? "opacity-80" : "",
                className,
            )}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;
