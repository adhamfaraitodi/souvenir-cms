import { useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import Layout from "../../../../components/Layout";
import { userMenus } from "../../../../libs/menus";
import { usePage } from "@inertiajs/react";

function OrderDetails({ order, addresses, officeAddress }) {
    const [quantity, setQuantity] = useState(1);
    const [selectedCourier, setSelectedCourier] = useState("jne");
    const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.city_id || "");
    const { shippingCost: initialShippingCost } = usePage().props;
    const [shippingCost, setShippingCost] = useState(initialShippingCost || 0);

    const { data, setData, post, processing } = useForm({
        origin: officeAddress.city_id,
        destination: selectedAddress,
        weight: order.product.weight * quantity,
        courier: selectedCourier,
        price: "lowest",
    });
    const fetchShippingCost = () => {
        post("/api/check-ongkir", {
            preserveState: true,
            onSuccess: (response) => {
                const newShippingCost = response.props?.shippingCost ?? 0;
                setShippingCost(newShippingCost);
            },
            onError: () => {
                setShippingCost(0);
            },
        });
    };
    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            destination: selectedAddress,
            weight: order.product.weight * quantity,
            courier: selectedCourier,
        }));
    }, [selectedAddress, quantity, selectedCourier]);
    useEffect(() => {
        setShippingCost(initialShippingCost);
    }, [initialShippingCost]);

    return (
        <div className="container mx-auto p-4">
            <div>
                <h1>Order Details</h1>
                <p>Shipping Cost: {shippingCost}</p>
                <button onClick={fetchShippingCost} disabled={processing}>
                    {processing ? "Calculating..." : "Calculate Shipping"}
                </button>
            </div>

            <div className="border p-4 mb-4 rounded-lg shadow-md bg-white">
                <h2 className="text-lg font-bold mb-2">Order Details</h2>
                <div className="flex justify-between items-center mb-2">
                    <span>Invoice: {order.order_code}</span>
                    <span>Date Order: {new Date().toLocaleDateString()}</span>
                </div>
            </div>

            <div className="border p-4 mb-4 rounded-lg shadow-md bg-white">
                <h3 className="text-lg font-bold mb-2">Product Details</h3>
                <div className="flex gap-4">
                    <img
                        src={"/img/no-img.png"}
                        alt={order.product.name}
                        className="w-24 h-24 object-cover"
                    />
                    <div>
                        <p className="font-bold">{order.product.name}</p>
                        <p>{order.product.type}: {order.product.category}</p>
                        <p>Weight: {order.product.weight * quantity} gram</p>
                        <p>Package: {order.product.package}</p>
                        <p className="font-bold">
                            Rp. {order.product.price.toLocaleString()}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
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
                                className="border w-12 text-center"
                            />
                            <button
                                onClick={() => setQuantity((prev) => Math.min(10, prev + 1))}
                                disabled={quantity >= 10}
                                className="border px-2 py-1 disabled:opacity-50"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <textarea
                    className="border w-full mt-4 p-2"
                    placeholder="Add a note"
                />
            </div>

            <div className="border p-4 mb-4 rounded-lg shadow-md bg-white">
                <h3 className="text-lg font-bold mb-2">Delivery Details</h3>
                <div className="mt-2">
                    <label className="block mb-1 font-semibold">Courier:</label>
                    <select
                        className="border p-2 rounded w-full"
                        value={selectedCourier}
                        onChange={(e) => setSelectedCourier(e.target.value)}
                    >
                        <option value="jne">JNE</option>
                        <option value="pos">POS Indonesia</option>
                    </select>
                </div>
                <div className="mt-4">
                    <label className="block mb-1 font-semibold">Address:</label>
                    <select
                        className="border p-2 rounded w-full"
                        value={selectedAddress}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                    >
                        {addresses.map((address) => (
                            <option key={address.id} value={address.city_id}>
                                {address.street_address}, {address.city_name}, {address.province_name} - {address.postal_code}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="border p-4 mb-4 rounded-lg shadow-md bg-white">
                <h3 className="text-lg font-bold mb-2">Payment Details</h3>
                <div className="flex justify-between">
                    <span>Product Price</span>
                    <span>Rp. {order.product.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span>Delivery Price</span>
                    <span>
                        {processing ? "Loading..." : `Rp. ${shippingCost}`}
                    </span>
                </div>
                <div className="flex justify-between font-bold mt-2">
                    <span>Total</span>
                    <span>
                        Rp. {processing ? "Loading..." : ((order.product.price * quantity) + (shippingCost || 0)).toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
}

OrderDetails.layout = (page) => <Layout children={page} menus={userMenus} />;

export default OrderDetails;
