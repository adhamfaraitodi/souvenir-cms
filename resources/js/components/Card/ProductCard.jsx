import { Link } from "@inertiajs/react";

const ProductCard = ({ title, subtitle, link }) => {
    return (
        <Link
            href={link}
            className="group h-full w-full rounded-lg border border-gray-300 bg-white p-4 transition duration-100 hover:scale-95"
        >
            <img className="aspect-square w-full" src="/img/no-img.png" />
            <div className="mt-4">
                <h3 className="mb-1 transition duration-100 group-hover:text-costumeBlue">
                    {title}
                </h3>
                <p>{subtitle}</p>
            </div>
        </Link>
    );
};

export default ProductCard;
