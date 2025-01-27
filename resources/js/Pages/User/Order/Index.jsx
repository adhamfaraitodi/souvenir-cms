import React from "react";
import Layout from "../../../components/Layout";
import { userMenus } from "../../../libs/menus";
import { Link, usePage } from "@inertiajs/react";

const Page = () => {
    const { orders } = usePage().props;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Order List</h1>
            <div className="space-y-4">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="border rounded-lg p-4 shadow-md flex justify-between items-center"
                    >
                        <div>
                            {/* Order Date and Code */}
                            <div className="text-sm text-gray-500">
                                {new Date(order.created_at).toLocaleDateString("id-ID", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}{" "}
                                <span className="ml-2 font-bold">{order.order_code}</span>
                            </div>
                            {/* Placeholder for Product Name */}
                            <h2 className="text-lg font-bold">Product Name</h2>
                            {/* Quantity and Price */}
                            <p className="text-sm text-gray-600">
                                {order.qty || 1} x Rp {order.product_price || 0}
                            </p>
                        </div>
                        <div className="text-right">
                            {/* Order Status */}
                            <div
                                className={`text-sm px-2 py-1 rounded-full ${
                                    order.order_status === "completed"
                                        ? "bg-green-100 text-green-700"
                                        : order.order_status === "pending"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-blue-100 text-blue-700"
                                }`}
                            >
                                {order.order_status}
                            </div>
                            {/* Total Price */}
                            <div className="text-lg font-bold mt-2">
                                Total: Rp {order.total_price || 0}
                            </div>
                            {/* Action Buttons */}
                            <Link
                                href={
                                    order.order_status === "pending"
                                        ? `/orders/${order.order_code}`
                                        : `/orders/${order.order_code}`
                                }
                                className={`mt-2 inline-block px-4 py-2 text-white rounded ${
                                    order.order_status === "pending"
                                        ? "bg-yellow-500 hover:bg-yellow-600"
                                        : "bg-gray-500 hover:bg-gray-600"
                                }`}
                            >
                                {order.order_status === "pending"
                                    ? "Continue Order"
                                    : "Order Details"}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Attach the layout to the page
Page.layout = (page) => <Layout children={page} menus={userMenus} />;

export default Page;
