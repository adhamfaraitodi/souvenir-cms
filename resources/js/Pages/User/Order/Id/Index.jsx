import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../../components/Layout";
import { userMenus } from "../../../../libs/menus";
import capitalize from "../../../../utils/capitalize";

function OrderDetails({ order, addresses, officeAddress }) {
    const [quantity, setQuantity] = useState(1);
    const [selectedCourier, setSelectedCourier] = useState("jne");
    const [selectedAddress, setSelectedAddress] = useState(
        addresses[0]?.city_id || "",
    );
    const [shippingCost, setShippingCost] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchShippingCost = async () => {
        setLoading(true);
        try {
            const response = await axios.post("/api/check-ongkir", {
                origin: officeAddress.city_id,
                destination: selectedAddress,
                weight: order?.product?.weight * quantity || 0,
                courier: selectedCourier,
                price: "lowest",
            });
            setShippingCost(response.data.shippingCost || 0);
        } catch (error) {
            console.error("Error fetching shipping cost:", error);
            setShippingCost(0);
        } finally {
            setLoading(false);
        }
    };

    // Fetch shipping cost automatically when dependencies change
    useEffect(() => {
        fetchShippingCost();
    }, [selectedAddress, quantity, selectedCourier]);

    const productPrice = order?.product?.price || 0;
    const totalCost = productPrice * quantity + shippingCost;

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4 rounded-lg border bg-white p-4 shadow-md">
                <h2 className="mb-2 text-lg font-bold">Order Details</h2>
                <div className="mb-2 flex items-center justify-between">
                    <span>Invoice: {order.order_code}</span>
                    <span>Status: {order.order_status}</span>
                    <span>Date Order: {new Date().toLocaleDateString()}</span>
                </div>
            </div>

            <div className="mb-4 rounded-lg border bg-white p-4 shadow-md">
                <h3 className="mb-2 text-lg font-bold">Product Details</h3>
                <div className="flex gap-4">
                    <img
                        src={"/img/no-img.png"}
                        alt={order.product.name}
                        className="h-24 w-24 object-cover"
                    />
                    <div>
                        <p className="font-bold">{order.product.name}</p>
                        <p>
                            {capitalize(order.product.type)}:{" "}
                            {order.product.category}
                        </p>
                        <p>Weight: {order.product.weight * quantity} gram</p>
                        <p>Package: {order.product.package}</p>
                        <p className="font-bold">
                            Rp. {productPrice.toLocaleString()}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                            <button
                                onClick={() =>
                                    setQuantity((prev) => Math.max(1, prev - 1))
                                }
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
                                onClick={() =>
                                    setQuantity((prev) =>
                                        Math.min(10, prev + 1),
                                    )
                                }
                                disabled={quantity >= 10}
                                className="border px-2 py-1 disabled:opacity-50"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <textarea
                    className="mt-4 w-full border p-2"
                    placeholder="Add a note"
                />
            </div>

            <div className="mb-4 rounded-lg border bg-white p-4 shadow-md">
                <h3 className="mb-2 text-lg font-bold">Delivery Details</h3>
                <div className="mt-2">
                    <label className="mb-1 block font-semibold">Courier:</label>
                    <select
                        className="w-full rounded border p-2"
                        value={selectedCourier}
                        onChange={(e) => setSelectedCourier(e.target.value)}
                    >
                        <option value="jne">JNE</option>
                        <option value="pos">POS Indonesia</option>
                    </select>
                </div>
                <div className="mt-4">
                    <label className="mb-1 block font-semibold">Address:</label>
                    <select
                        className="w-full rounded border p-2"
                        value={selectedAddress}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                    >
                        {addresses.map((address) => (
                            <option key={address.id} value={address.city_id}>
                                {address.street_address}, {address.city_name},{" "}
                                {address.province_name} - {address.postal_code}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-4 rounded-lg border bg-white p-4 shadow-md">
                <h3 className="mb-2 text-lg font-bold">Payment Details</h3>
                <div className="flex justify-between">
                    <span>Product Price</span>
                    <span>Rp. {productPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span>Delivery Price</span>
                    <span>
                        {loading
                            ? "Loading..."
                            : `Rp. ${shippingCost.toLocaleString()}`}
                    </span>
                </div>
                <div className="mt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>
                        {loading
                            ? "Loading..."
                            : `Rp. ${totalCost.toLocaleString()}`}
                    </span>
                </div>
            </div>
        </div>
    );
}

OrderDetails.layout = (page) => <Layout children={page} menus={userMenus} />;

export default OrderDetails;
