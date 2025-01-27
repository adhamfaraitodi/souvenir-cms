import React from 'react';
import Layout from "../../../../components/Layout";
import { userMenus } from "../../../../libs/menus";
import {Link} from "@inertiajs/react";

const ProductPage = ({ product }) => {
    return (
        <Layout menus={userMenus}>
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-gray-500 mt-2">Category: {product.category.name}</p>
                </div>
                <Link href={`/orders/create/${product.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Order now
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                    <img src='/img/no-img.png' alt={product.name} className="w-full h-auto" />
                </div>
                <div>
                    <p>Weight: {product.weight} gram</p>
                    <p className="mt-2">Price: Rp. {product.price.toLocaleString()}</p>
                    <p className="mt-2">Package: {product.package}</p>
                    <p className="mt-2">Type: {product.type}</p>
                    <p className="mt-2">Stock: {product.stock}</p>
                    <p className="mt-2">Specification: {product.specification}</p>
                    <p className="mt-2">Brand: {product.brand}</p>
                </div>
            </div>
        </Layout>
    );
};

export default ProductPage;
