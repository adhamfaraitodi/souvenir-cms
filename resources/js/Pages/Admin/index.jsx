import { Outlet } from "react-router";
import GrapeJsLayouting from "../../components/GrapeJsLayouting";
import Sidebar from "../../components/Layout/Sidebar";
import Navbar from "../../components/Layout/Navbar";
import { Book, House } from "@phosphor-icons/react";

const Admin = () => {
    const menus = [
        {
            key: "home",
            label: "Dashboard",
            path: "/",
            icon: <House size={24} weight="bold" />,
        },
        {
            key: "order",
            label: "Order",
            path: "/order",
            icon: <Book size={24} weight="bold" />,
        },
        {
            key: "landing_page",
            label: "Landing Page",
            path: "/landing-page",
            icon: <Book size={24} weight="bold" />,
        },
    ];
    return (
        <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
            <div className="hidden md:flex">
                <Sidebar sidebarLinks={menus} />
            </div>
            <div className="flex flex-col w-[calc(100%-16rem)] sm:w-[calc(100%-56rem)]  flex-1">
                <Navbar />
                <div className="flex-1 md:p-4 min-h-0 overflow-auto overflow-x-hidden w-full bg-white mb-12 md:mb-0">
                    <Outlet />
                </div>
                <div className="w-full md:hidden fixed bottom-0">
                    <Sidebar sidebarLinks={menus} />
                </div>
            </div>
        </div>
    );
};

export default Admin;
