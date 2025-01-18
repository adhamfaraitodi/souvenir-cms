import { Eye } from "@phosphor-icons/react";
import { useState } from "react";

const InputForm = ({
    label,
    handleChange,
    placeholder = label,
    type = "text",
    className,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };
    return (
        <div className={className}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <div className="relative">
                <input
                    className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                    type={
                        type === "password"
                            ? showPassword
                                ? "text"
                                : "password"
                            : type
                    }
                    placeholder={placeholder}
                    onChange={(e) => handleChange(e.target.value)}
                />
                {type === "password" ? (
                    <button
                        className="absolute top-3 end-2"
                        onClick={(e) => togglePasswordVisibility(e)}
                    >
                        <Eye size={28} color="#8A8A8A" />
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default InputForm;
