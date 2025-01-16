import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, menus }) => {
    return (
        <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
            <div className="hidden md:flex">
                <Sidebar sidebarLinks={menus} />
            </div>
            <div className="flex flex-col w-[calc(100%-16rem)] sm:w-[calc(100%-56rem)]  flex-1">
                <Navbar />
                <div className="flex-1 md:p-4 min-h-0 overflow-auto overflow-x-hidden w-full bg-white mb-12 md:mb-0">
                    {children}
                </div>
                <div className="w-full md:hidden fixed bottom-0">
                    <Sidebar sidebarLinks={menus} />
                </div>
            </div>
        </div>
    );
};

export default Layout;
