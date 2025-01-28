import className from "classnames";

const Checkbox = ({ label, handleChange, className, name }) => {
    return (
        <div
            className={className("flex flex-row items-center gap-2", className)}
        >
            <input
                type="checkbox"
                name={name}
                onChange={(e) => handleChange(e.target.checked)}
            />
            <label className="block text-sm text-gray-700">{label}</label>
        </div>
    );
};

export default Checkbox;
