import React from "react";
import Layout from "../../../components/Layout";
import { userMenus } from "../../../libs/menus";
import { Link, usePage } from "@inertiajs/react";
import Button from "../../../components/Button";
import classNames from "classnames";

const orderStatusClasses = {
    completed: "bg-green-100 text-green-700",
    pending: "bg-red-100 text-red-700",
    default: "bg-blue-100 text-blue-700",
};

const getOrderStatusClass = (status) => {
    return orderStatusClasses[status] || orderStatusClasses.default;
};

const Page = () => {
    const { orders } = usePage().props;

    return (
        <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold">Order List</h1>
            <div className="space-y-4">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="rounded-lg border p-4 shadow-md"
                    >
                        <div className="mb-2 flex flex-col justify-between md:flex-row md:items-center">
                            <div>
                                <div className="text-sm text-gray-500">
                                    {new Date(
                                        order.created_at,
                                    ).toLocaleDateString("id-ID", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}{" "}
                                    <span className="ml-2 font-bold">
                                        {order.order_code}
                                    </span>
                                    <p
                                        className={classNames(
                                            "ml-2 inline w-fit rounded-full px-3.5 py-[1px] text-center leading-tight",
                                            getOrderStatusClass(
                                                order.order_status,
                                            ),
                                        )}
                                    >
                                        {order.order_status}
                                    </p>
                                </div>
                                <h2 className="text-lg font-bold">
                                    Product Name
                                </h2>
                                <p className="text-sm text-gray-600">
                                    {order.qty || 1} x Rp{" "}
                                    {order.product_price || 0}
                                </p>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="flex flex-row items-center justify-end gap-1">
                                    <div className="mb-1 text-right text-lg font-bold">
                                        Rp{order.total_price || 0}
                                    </div>
                                </div>
                                <Link
                                    href={
                                        order.order_status === "pending"
                                            ? `/orders/${order.order_code}`
                                            : `/orders/${order.order_code}`
                                    }
                                >
                                    <Button
                                        theme={
                                            order.order_status === "pending"
                                                ? "warning"
                                                : "gray"
                                        }
                                    >
                                        {order.order_status === "pending"
                                            ? "Continue Order"
                                            : "Order Details"}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

Page.layout = (page) => <Layout children={page} menus={userMenus} />;

export default Page;
