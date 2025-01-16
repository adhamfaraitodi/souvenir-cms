import { Book, House } from "@phosphor-icons/react";

const userMenus = [
    {
        key: "home",
        label: "Dashboard",
        path: "/",
        icon: <House size={24} weight="bold" />,
    },
    {
        key: "order",
        label: "Order",
        path: "/orders",
        icon: <Book size={24} weight="bold" />,
    },
    {
        key: "landing_page",
        label: "Landing Page",
        path: "/landing",
        icon: <Book size={24} weight="bold" />,
    },
];

const adminMenus = [
    {
        key: "home",
        label: "Dashboard",
        path: "/admin",
        icon: <House size={24} weight="bold" />,
    },
    {
        key: "order",
        label: "Order",
        path: "/admin/orders",
        icon: <Book size={24} weight="bold" />,
    },
    {
        key: "landing_page",
        label: "Landing Page",
        path: "/admin/landing",
        icon: <Book size={24} weight="bold" />,
    },
];

export { userMenus, adminMenus };
