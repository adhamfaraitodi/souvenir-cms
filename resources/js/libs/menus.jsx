import {
    Users,
    Gear,
    UserCircle,
    Trophy,
    Bag,
    Newspaper,
} from "@phosphor-icons/react";

const userMenus = [
    {
        key: "products",
        label: "Products",
        path: "/products",
        icon: <Trophy size={24} weight="bold" />,
    },
    {
        key: "orders",
        label: "Orders",
        path: "/orders",
        icon: <Bag size={24} weight="bold" />,
    },
    {
        key: "landing_page",
        label: "Landing Page",
        path: "/landing-page",
        icon: <Newspaper size={24} weight="bold" />,
    },
    {
        key: "account",
        label: "Account",
        path: "/controls",
        icon: <UserCircle size={24} />,
        disabled: true,
        items: [
            {
                key: "profile",
                label: "Profile",
                path: "/controls/profile",
            },
            {
                key: "setting",
                label: "Setting",
                path: "/controls/setting",
            },
        ],
    },
];

const adminMenus = [
    {
        key: "orders",
        label: "Orders",
        path: "/admin/orders",
        icon: <Bag size={24} weight="bold" />,
    },
    {
        key: "landing_page",
        label: "Landing Page",
        path: "/admin/landing-page",
        icon: <Newspaper size={24} weight="bold" />,
    },
    {
        key: "products",
        label: "Products",
        path: "/admin/products",
        icon: <Trophy size={24} weight="bold" />,
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
