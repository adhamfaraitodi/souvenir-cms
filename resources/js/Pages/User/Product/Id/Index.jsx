import React, { useEffect, useState } from "react";
import Layout from "../../../../components/Layout";
import { userMenus } from "../../../../libs/menus";
import { useForm } from "@inertiajs/react";
import Title from "../../../../components/Title";
import capitalize from "../../../../utils/capitalize";
import QuantityChanger from "../../../../components/QuantityChanger";
import Button from "../../../../components/Button";

const Page = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const { data, setData, post, errors, reset, processing } = useForm({
        qty: quantity,
    });

    useEffect(() => {
        setData({
            qty: quantity,
        });
    }, [quantity]);

    const handleOrder = () => {
        post(`/orders/create/${product.id}`);
    };
    return (
        <div className="flex flex-col-reverse gap-10 md:flex-col md:gap-2">
            <div className="flex items-start justify-end">
                {/* <Link href={`/orders/create/${product.id}`}> */}
                {/* <button
                    className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:"
                >
                    Order now
                </button> */}
                <div className="w-full md:w-auto">
                    <Button onClick={handleOrder}>Order now</Button>
                </div>
                {/* </Link> */}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <img
                    src="/img/no-img.png"
                    alt={product.name}
                    className="h-auto w-full md:col-span-1"
                />

                <div className="md:col-span-2">
                    <div className="mb-6">
                        <Title className="mb-4 font-bold md:text-5xl">
                            {capitalize(product.name)}
                        </Title>
                        <div className="mb-1 flex flex-row gap-4">
                            <p className="text-gray-500">Category:</p>
                            <p className="font-medium">
                                {product.category.name}
                            </p>
                        </div>
                        <div className="flex flex-row gap-4">
                            <p className="text-gray-500">Weight:</p>
                            <p className="font-medium">{product.weight} gram</p>
                        </div>
                    </div>
                    <div className="mb-2">
                        <p className="text-gray-500">Total</p>
                        <p className="text-xl font-bold md:text-3xl">
                            {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(product.price * quantity)}
                        </p>
                    </div>
                    <div className="mb-10 flex flex-row items-center gap-4">
                        <QuantityChanger
                            quantity={quantity}
                            setQuantity={setQuantity}
                        />
                        <div className="flex flex-row items-center gap-1">
                            <p className="text-gray-500">Stock:</p>
                            <p className="font-semibold">{product.stock}</p>
                        </div>
                    </div>
                    <div className="mb-4 border-b border-gray-300 pb-4">
                        <div className="mb-1 flex flex-row gap-4">
                            <p className="text-gray-500">Package:</p>
                            <p className="font-medium">{product.package}</p>
                        </div>
                        <div className="mb-1 flex flex-row gap-4">
                            <p className="text-gray-500">Type:</p>
                            <p className="font-medium">{product.type}</p>
                        </div>
                        <div className="flex flex-row gap-4">
                            <p className="text-gray-500">Brand:</p>
                            <p className="font-medium">{product.brand}</p>
                        </div>
                    </div>
                    <div>
                        <p className="mb-2 font-bold">Specifications</p>
                        <p className="">{product.specification}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

Page.layout = (page) => <Layout children={page} menus={userMenus} />;

export default Page;
