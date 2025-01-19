import className from "classnames";

const Checkbox = ({ label, handleChange, customClass, name }) => {
    return (
        <div
            className={className(
                "flex flex-row items-center gap-2",
                customClass
            )}
        >
            <input
                type="checkbox"
                name={name}
                onChange={(e) => handleChange(e.target.value)}
            />
            <label className="block text-gray-700 text-sm">{label}</label>
        </div>
    );
};

export default Checkbox;
