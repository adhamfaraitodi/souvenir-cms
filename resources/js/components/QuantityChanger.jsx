import classNames from "classnames";
import React from "react";

const QuantityChanger = ({ quantity, setQuantity, customClass }) => {
    return (
        <div className={classNames("flex items-center gap-2", customClass)}>
            <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
                className="border px-2 py-1 disabled:opacity-50"
            >
                -
            </button>
            <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 border text-center"
            />
            <button
                onClick={() => setQuantity((prev) => Math.min(10, prev + 1))}
                disabled={quantity >= 10}
                className="border px-2 py-1 disabled:opacity-50"
            >
                +
            </button>
        </div>
    );
};

export default QuantityChanger;
