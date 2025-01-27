import classNames from "classnames";
import { CaretDown, SignOut } from "@phosphor-icons/react";
import { swalFireConfirm, swalFireResult } from "../../libs/swalFire.js";
import { Link, usePage, router } from "@inertiajs/react";

import { useState } from "react";

const linkClass = (disabled) =>
    `flex items-center gap-2 font-bold text-md px-3 py-2 ${
        !disabled
            ? "hover:bg-blue-400 hover:no-underline active:bg-indigo-600"
            : "cursor-default"
    } rounded-lg text-base`;

const Sidebar = ({ sidebarLinks }) => {
    const [openItems, setOpenItems] = useState(null);
    const { url } = usePage();
    const handleLogout = async () => {
        try {
            const result = await swalFireConfirm(
                "Yakin ingin keluar?",
                "",
                "warning",
            );

            if (result.isConfirmed) {
                // localStorage.removeItem("token");
                // navigate("/login");

                router.post("/admin/logout");
            }
        } catch (err) {
            swalFireResult("Gagal", "Gagal keluar dari akun", "error");
        }
    };

    return (
        <div className="flex h-full w-full flex-col items-center rounded-none bg-costumeBlue pb-2 pt-4 transition-all">
            <div className="flex flex-col items-start justify-start gap-3">
                {sidebarLinks.map((link, index) => {
                    return (
                        <div key={index}>
                            <div className="flex">
                                {link.disabled ? (
                                    <div
                                        key={link.key}
                                        className={classNames(
                                            url === link.path
                                                ? "bg-blue-500 text-white"
                                                : "text-white",
                                            linkClass(link.disabled),
                                        )}
                                    >
                                        <div className="flex items-center">
                                            <span>{link.icon}</span>
                                            <span className="ml-2 block">
                                                {link.label}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        key={link.key}
                                        href={link.path}
                                        className={classNames(
                                            url === link.path
                                                ? "bg-blue-500 text-white"
                                                : "text-white",
                                            linkClass(link.disabled),
                                        )}
                                    >
                                        <span>{link.icon}</span>
                                        <span className="block">
                                            {link.label}
                                        </span>
                                    </Link>
                                )}

                                {link.items ? (
                                    <button
                                        onClick={() =>
                                            setOpenItems(
                                                openItems === index
                                                    ? null
                                                    : index,
                                            )
                                        }
                                        className="hover:bg-system-primary flex w-full flex-row items-center gap-x-5 rounded-lg px-6 py-3 text-white transition duration-300"
                                    >
                                        <CaretDown
                                            className={`${
                                                openItems === index
                                                    ? "rotate-180"
                                                    : "rotate-0"
                                            } h-4 w-4 transition-transform duration-300`}
                                        />
                                    </button>
                                ) : null}
                            </div>
                            {openItems === index ? (
                                <div className="mt-3">
                                    {link.items.map((subLink, subLinkIndex) => {
                                        return (
                                            <div key={subLinkIndex}>
                                                <Link
                                                    key={subLink.key}
                                                    href={subLink.path}
                                                    disabled={subLink.disabled}
                                                    className={classNames(
                                                        url === subLink.path
                                                            ? "bg-blue-500 text-white"
                                                            : "text-white",
                                                        linkClass(
                                                            subLink.disabled,
                                                        ),
                                                        "pl-10",
                                                    )}
                                                >
                                                    <span className="block">
                                                        {subLink.label}
                                                    </span>
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : null}
                        </div>
                    );
                })}

                <div>
                    <button
                        onClick={() => handleLogout()}
                        type="button"
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-base font-bold text-white hover:bg-blue-400 hover:no-underline active:bg-indigo-600"
                    >
                        <span>
                            <SignOut size={24} color="#ffffff" weight="bold" />
                        </span>
                        <h2 className="hidden sm:block">Keluar</h2>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
