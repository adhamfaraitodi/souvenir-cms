import React from 'react';
import Layout from "../../../components/Layout";
import { userMenus } from "../../../libs/menus";
import Title from "@/components/Title.jsx";
import { Link } from "@inertiajs/react";
import { NotePencil, FileMagnifyingGlass, Share } from "@phosphor-icons/react";

const Page = ({ landingPages }) => {
    return (
        <div className="mb-5 sm:mb-10 md:mb-20">
            <Title className="mb-4 font-semibold sm:mb-6 md:mb-8">
                Your Landing Page
            </Title>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {landingPages.map((page) => (
                    <LandingPageCard
                        key={page.id}
                        id={page.landing_page_code}
                        title={page.title}
                        link={`landing-page/edit/${page.landing_page_code}`}
                        theme={page.theme.title}
                    />
                ))}
            </div>
        </div>
    );
};
const LandingPageCard = ({ title, theme, id ,link}) => {
    return (
        <div className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <Link
                href={link}
            >
                <div className="w-full aspect-[4/3] bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                    <img
                        src="/img/no-img.png"
                        alt={title}
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
            </Link>
            <div className="flex-grow">
                <h3 className="text-gray-900 font-medium text-sm mb-1">{title}</h3>
                <p className="text-gray-500 text-xs">Theme: {theme}</p>
            </div>
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                <Link
                    href={`landing-page/project-edit/${id}`}
                    className="flex items-center justify-center flex-1 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                    <NotePencil className="size-5" />
                </Link>
                <Link
                    href={`landing-page/preview/${id}`}
                    className="flex items-center justify-center flex-1 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                    <FileMagnifyingGlass className="size-5" />
                </Link>
                <Link
                    href={`landing-page/share/${id}`}
                    className="flex items-center justify-center flex-1 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                    <Share className="size-5" />
                </Link>
            </div>
        </div>
    );
};



Page.layout = (page) => <Layout children={page} menus={userMenus} />;

export default Page;
