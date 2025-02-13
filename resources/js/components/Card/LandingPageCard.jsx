import React from "react";
import { Link } from "@inertiajs/react";
import { NotePencil, FileMagnifyingGlass, Share } from "@phosphor-icons/react";

const LandingPageCard = ({
    title,
    theme,
    id,
    link,
    onEditClick,
    onShareClick,
}) => {
    return (
        <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
            <Link href={link}>
                <div className="mb-4 flex aspect-[4/3] w-full items-center justify-center rounded-md bg-gray-100">
                    <img
                        src="/img/no-img.png"
                        alt={title}
                        className="h-full w-full rounded-md object-cover"
                    />
                </div>
            </Link>
            <div className="flex-grow">
                <h3 className="mb-1 text-sm font-medium text-gray-900">
                    {title}
                </h3>
                <p className="text-xs text-gray-500">Theme: {theme}</p>
            </div>
            <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3">
                <button
                    onClick={onEditClick}
                    className="flex flex-1 items-center justify-center rounded-md p-2 text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                >
                    <NotePencil className="size-5" />
                </button>
                <Link
                    href={`landing-page/preview/${id}`}
                    className="flex flex-1 items-center justify-center rounded-md p-2 text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                >
                    <FileMagnifyingGlass className="size-5" />
                </Link>
                <button
                    onClick={onShareClick}
                    className="flex flex-1 items-center justify-center rounded-md p-2 text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                >
                    <Share className="size-5" />
                </button>
            </div>
        </div>
    );
};

export default LandingPageCard;
