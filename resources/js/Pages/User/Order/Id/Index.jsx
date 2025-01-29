import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../../components/Layout";
import { userMenus } from "../../../../libs/menus";
import capitalize from "../../../../utils/capitalize";
import QuantityChanger from "../../../../components/QuantityChanger";
import Button from "../../../../components/Button";
import DropdownSelect from "../../../../components/DropdownSelect";
import classNames from "classnames";
import { router } from "@inertiajs/react";
import { swalFireConfirm, swalFireResult } from "../../../../libs/swalFire";

const Page = ({ order, addresses, officeAddress }) => {
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
            });
            setShippingCost(response.data.shippingCost || 0);
        } catch (error) {
            console.error("Error fetching shipping cost:", error);
            setShippingCost(0);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        try {
            const result = await swalFireConfirm(
                "Yakin ingin cancel order?",
                "",
                "warning",
            );

            if (result.isConfirmed) {
            }
        } catch (err) {
            swalFireResult("Gagal", "Gagal cancel order", "error");
        }
    };

    const orderStatusClasses = {
        completed: "bg-green-100 text-green-700",
        pending: "bg-red-100 text-red-700",
        default: "bg-blue-100 text-blue-700",
    };

    const getOrderStatusClass = (status) => {
        return orderStatusClasses[status] || orderStatusClasses.default;
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
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row gap-2">
                            <p className="text-gray-500">Invoice:</p>
                            <p className="font-medium">{order.order_code}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <p className="text-gray-500">Date Order:</p>
                            <p className="font-medium">
                                {new Date().toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <p className="text-gray-500">Status:</p>
                            <p
                                className={classNames(
                                    "inline w-fit rounded-full px-3.5 py-[1px] text-center leading-tight",
                                    getOrderStatusClass(order.order_status),
                                )}
                            >
                                {order.order_status}
                            </p>
                        </div>
                    </div>
                    {order.order_status === "pending" ? (
                        <div className="flex flex-row-reverse justify-start gap-2 md:flex-col">
                            <div>
                                <Button>Pay Now</Button>
                            </div>
                            <div>
                                <Button onClick={handleCancel} theme="danger">
                                    Cancel Order
                                </Button>
                            </div>
                        </div>
                    ) : null}
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
                        <QuantityChanger
                            disabled={order.order_status !== "pending"}
                            quantity={quantity}
                            setQuantity={setQuantity}
                            className="mt-2"
                        />
                    </div>
                </div>
                <textarea
                    disabled={order.order_status !== "pending"}
                    className="mt-4 w-full border p-2"
                    placeholder="Add a note"
                />
            </div>

            <div className="mb-4 rounded-lg border bg-white p-4 shadow-md">
                <h3 className="mb-2 text-lg font-bold">Delivery Details</h3>
                <DropdownSelect
                    className="mt-2"
                    label="Courier:"
                    disabled={order.order_status !== "pending"}
                    value={selectedCourier}
                    onChange={setSelectedCourier}
                >
                    <option value="jne">JNE</option>
                    <option value="pos">POS Indonesia</option>
                </DropdownSelect>
                <DropdownSelect
                    className="mt-4"
                    label="Address:"
                    disabled={order.order_status !== "pending"}
                    value={selectedAddress}
                    onChange={setSelectedAddress}
                >
                    {addresses.map((address) => (
                        <option key={address.id} value={address.city_id}>
                            {address.street_address}, {address.city_name},{" "}
                            {address.province_name} - {address.postal_code}
                        </option>
                    ))}
                </DropdownSelect>
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
};

Page.layout = (page) => <Layout children={page} menus={userMenus} />;

export default Page;
