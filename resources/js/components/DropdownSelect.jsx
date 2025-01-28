const DropdownSelect = ({
    className,
    children,
    onChange,
    value,
    label,
    disabled,
}) => {
    return (
        <div className={className}>
            <label className="mb-1 block font-semibold">{label}</label>
            <select
                disabled={disabled}
                className="w-full rounded border p-2"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {children}
            </select>
        </div>
    );
};

export default DropdownSelect;
