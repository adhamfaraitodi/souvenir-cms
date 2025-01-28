import { Link } from "@inertiajs/react";

const ProductCard = ({ title, subtitle, link }) => {
    return (
        <Link
            href={link}
            className="group h-full w-full rounded-lg border border-gray-300 bg-white p-4 transition duration-100"
        >
            <img className="aspect-square w-full" src="/img/no-img.png" />
            <div className="mt-4">
                <h3 className="transition duration-100">{title}</h3>
                <p className="text-lg font-bold">{subtitle}</p>
            </div>
        </Link>
    );
};

export default ProductCard;
