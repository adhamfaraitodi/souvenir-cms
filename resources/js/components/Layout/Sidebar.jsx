import classNames from "classnames";
import { router } from "@inertiajs/react";
import { CaretDown, SignOut } from "@phosphor-icons/react";
import { swalFireConfirm, swalFireResult } from "../../libs/swalFire.js";
import { Link, usePage } from "@inertiajs/react";
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
                "warning"
            );

            if (result.isConfirmed) {
                router.post("/logout");
                window.location.reload();
            }
        } catch (err) {
            swalFireResult("Gagal", "Gagal keluar dari akun", "error");
        }
    };

    return (
        <div className="bg-costumeBlue flex flex-col items-center w-full h-full transition-all pt-4 pb-2 rounded-none">
            <div className="flex flex-col items-start gap-3 justify-start">
                {sidebarLinks.map((link, index) => {
                    return (
                        <div key={index}>
                            <div className="flex">
                                <Link
                                    key={link.key}
                                    href={link.path}
                                    disabled={link.disabled}
                                    className={classNames(
                                        url === link.path
                                            ? "bg-blue-500 text-white"
                                            : "text-white",
                                        linkClass(link.disabled)
                                    )}
                                >
                                    <span>{link.icon}</span>
                                    <span className="block">{link.label}</span>
                                </Link>
                                {link.items ? (
                                    <button
                                        onClick={() =>
                                            setOpenItems(
                                                openItems === index
                                                    ? null
                                                    : index
                                            )
                                        }
                                        className="text-white hover:bg-system-primary rounded-lg transition duration-300 flex flex-row gap-x-5 items-center w-full py-3 px-6"
                                    >
                                        <CaretDown
                                            className={`${
                                                openItems === index
                                                    ? "rotate-180"
                                                    : "rotate-0"
                                            } transition-transform duration-300 w-4 h-4`}
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
                                                            subLink.disabled
                                                        ),
                                                        "pl-10"
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
                        className="flex items-center gap-2 text-white hover:bg-blue-400 hover:no-underline active:bg-indigo-600 rounded-lg text-base px-3 py-2 font-bold w-full"
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
