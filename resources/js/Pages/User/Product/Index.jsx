import { PlusCircle } from "@phosphor-icons/react";
import { Link } from "@inertiajs/react";
import ProductCard from "../../../components/Card/ProductCard";
import Layout from "../../../components/Layout";
import Title from "../../../components/Title";
import { userMenus } from "../../../libs/menus";

const Page = ({ customProducts, retailProducts }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(price);
    };
    return (
        <>
            <div className="mb-5 sm:mb-10 md:mb-20">
                <Title className="mb-4 font-semibold sm:mb-6 md:mb-8">
                    Your Custom Products
                </Title>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
                    {customProducts.map((item) => (
                        <ProductCard
                            key={item.id}
                            title={item.name}
                            subtitle={formatPrice(item.price)}
                            link={`/products/${item.id}`}
                        />
                    ))}
                    <div className="flex h-full w-full items-center justify-center">
                        <Link href="/products/custom/create">
                            <PlusCircle className="size-24 transition duration-100 hover:scale-95 hover:text-blue-600 md:size-32" />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="mb-10">
                <Title
                    className="mb-4 font-semibold sm:mb-6 md:mb-8"
                    level="h2"
                >
                    See Other Products
                </Title>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
                    {retailProducts.map((item) => (
                        <ProductCard
                            key={item.id}
                            title={item.name}
                            subtitle={formatPrice(item.price)}
                            link={`/products/${item.id}`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

Page.layout = (page) => <Layout children={page} menus={userMenus} />;

export default Page;
