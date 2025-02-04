const DropdownSelect = ({
    className,
    children,
    onChange,
    value,
    label,
    disabled,
    required,
}) => {
    return (
        <div className={className}>
            {label ? (
                <label className="mb-1 block text-sm font-bold">{label}</label>
            ) : null}
            <select
                disabled={disabled}
                className="w-full rounded border p-2"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
            >
                {children}
            </select>
        </div>
    );
};

export default DropdownSelect;
