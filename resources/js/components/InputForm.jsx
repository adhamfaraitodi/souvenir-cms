import { Eye } from "@phosphor-icons/react";
import { useState } from "react";

const InputForm = ({
    label,
    handleChange,
    placeholder = label,
    type = "text",
    className,
    value,
    required,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    const InputTag = type === "textarea" ? "textarea" : "input";

    return (
        <div className={className}>
            {label ? (
                <label className="mb-1 block text-sm font-bold">{label}</label>
            ) : null}
            <div className="relative">
                <InputTag
                    className="focus:shadow-outline w-full appearance-none rounded-lg border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                    type={
                        type === "password"
                            ? showPassword
                                ? "text"
                                : "password"
                            : type
                    }
                    placeholder={placeholder}
                    onChange={(e) => handleChange(e.target.value)}
                    value={value}
                    required={required}
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
