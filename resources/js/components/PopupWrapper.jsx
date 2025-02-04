const PopupWrapper = ({ isVisible, children, onClose }) => {
    if (!isVisible) return null; // Don't render if not visible

    const handleClickOutside = () => {
        if (onClose) {
            onClose(); // Call the onClose function passed as a prop
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleClickOutside}
        >
            <div onClick={(e) => e.stopPropagation()}>{children}</div>
        </div>
    );
};

// ... existing code ...
export default PopupWrapper;
