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
            <label className="mb-2 block text-sm font-bold text-gray-700">
                {label}
            </label>
            <div className="relative">
                <input
                    className="focus:shadow-outline mt-2 w-full appearance-none rounded-lg border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
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
                        className="absolute end-2 top-3"
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
