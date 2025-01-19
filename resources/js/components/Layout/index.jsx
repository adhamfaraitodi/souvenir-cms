import { useState } from "react";
import Sidebar from "./Sidebar";
import { List } from "@phosphor-icons/react";

const Layout = ({ children, menus }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mini Sidebar - Always visible on mobile */}
            <div className="fixed h-screen w-16 bg-costumeBlue z-20 md:hidden flex flex-col items-center pt-4">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white p-2 rounded-lg"
                >
                    <List size={32} />
                </button>
            </div>

            {/* Main Sidebar */}
            <div
                className={`fixed h-screen w-56 z-30 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0`}
            >
                <Sidebar sidebarLinks={menus} />
            </div>

            {/* Main Content */}
            <div className="flex flex-col w-full md:w-[calc(100%-56rem)] flex-1 md:ml-56 pl-16 md:pl-0">
                <div className="flex-1 md:p-4 p-2 min-h-0 overflow-auto overflow-x-hidden w-full bg-white md:mb-0">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
