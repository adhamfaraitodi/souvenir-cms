const PopupWrapper = ({ isVisible, children }) => {
    if (!isVisible) return null; // Don't render if not visible

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded bg-white p-4 shadow-lg">{children}</div>
        </div>
    );
};

// ... existing code ...
export default PopupWrapper;
