import { PlusCircle } from "@phosphor-icons/react";
import ProductCard from "../../../components/Card/ProductCard";
import Layout from "../../../components/Layout";
import Title from "../../../components/Title";
import { userMenus } from "../../../libs/menus";

const Page = ({ products }) => {
    // console.log(products);
    return (
        <>
            <div className="mb-5 sm:mb-10 md:mb-20">
                <Title customClass="md:mb-8 sm:mb-6 mb-4">
                    Your Custom Products
                </Title>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
                    {products.slice(0, 8).map((item, index) => (
                        <ProductCard
                            title={item.name}
                            subtitle={`Rp${item.price}`}
                            key={index}
                        />
                    ))}
                    <div className="flex h-full w-full items-center justify-center">
                        <button>
                            <PlusCircle className="size-24 transition duration-100 hover:scale-95 hover:text-costumeBlue md:size-32" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="mb-10">
                <Title customClass="md:mb-8 sm:mb-6 mb-4" level="h2">
                    See Other Products
                </Title>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
                    {products.slice(0, 8).map((item, index) => (
                        <ProductCard
                            title={item.name}
                            subtitle={`Rp${item.price}`}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

Page.layout = (page) => <Layout children={page} menus={userMenus} />;

export default Page;
