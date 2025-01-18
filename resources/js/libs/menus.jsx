import {
    House,
    ShoppingCart,
    Globe,
    Package,
    Sliders,
    Users,
    Gear,
} from "@phosphor-icons/react";

const userMenus = [
    {
        key: "home",
        label: "Dashboard",
        path: "/",
        icon: <House size={24} weight="bold" />,
    },
    {
        key: "orders",
        label: "Orders",
        path: "/orders",
        icon: <ShoppingCart size={24} weight="bold" />,
    },
    {
        key: "landing_page",
        label: "Landing Page",
        path: "/landing-page",
        icon: <Globe size={24} weight="bold" />,
    },
    {
        key: "products",
        label: "Products",
        path: "/products",
        icon: <Package size={24} weight="bold" />,
    },
    {
        key: "controls",
        label: "Controls",
        path: "/controls",
        icon: <Sliders size={24} weight="bold" />,
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
        key: "orders",
        label: "Orders",
        path: "/admin/orders",
        icon: <ShoppingCart size={24} weight="bold" />,
    },
    {
        key: "landing_page",
        label: "Landing Page",
        path: "/admin/landing-page",
        icon: <Globe size={24} weight="bold" />,
    },
    {
        key: "products",
        label: "Products",
        path: "/admin/products",
        icon: <Package size={24} weight="bold" />,
    },
    {
        key: "users",
        label: "Users",
        path: "/admin/users",
        icon: <Users size={24} weight="bold" />,
    },
    {
        key: "manages",
        label: "Manages",
        path: "/admin/manages",
        icon: <Gear size={24} weight="bold" />,
    },
];

export { userMenus, adminMenus };
