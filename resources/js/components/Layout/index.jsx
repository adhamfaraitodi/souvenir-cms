import { useState } from "react";
import Sidebar from "./Sidebar";
import { List } from "@phosphor-icons/react";
import { Head } from "@inertiajs/react";

const Layout = ({ children, menus }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Head>
                <title>Sovenier</title>
                {/* <meta
                    head-key="description"
                    name="description"
                    content="This is the default description"
                />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" /> */}
            </Head>

            <div className="flex h-screen w-screen flex-row overflow-hidden bg-neutral-100">
                {/* Overlay */}
                {isOpen && (
                    <div
                        className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
                        onClick={() => setIsOpen(false)}
                    />
                )}

                {/* Mini Sidebar - Always visible on mobile */}
                <div className="fixed z-20 flex h-screen w-16 flex-col items-center bg-blue-600 pt-4 md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="rounded-lg p-2 text-white"
                    >
                        <List size={32} />
                    </button>
                </div>

                {/* Main Sidebar */}
                <div
                    className={`fixed z-30 h-screen w-56 transform transition-transform duration-300 ease-in-out ${
                        isOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0`}
                >
                    <Sidebar sidebarLinks={menus} />
                </div>

                {/* Main Content */}
                <div className="flex w-full flex-1 flex-col pl-16 md:ml-56 md:w-[calc(100%-56rem)] md:pl-0">
                    <div className="min-h-0 w-full flex-1 overflow-auto overflow-x-hidden bg-white p-2 md:mb-0 md:p-4">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
