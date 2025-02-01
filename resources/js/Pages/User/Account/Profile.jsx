import Layout from "../../../components/Layout";
import { userMenus } from "../../../libs/menus";
import { usePage } from "@inertiajs/react";

const ProfilePage = () => {
    const { user, addresses } = usePage().props;
    console.log("Addresses from backend:", addresses);
    console.log("user from backend:", user);
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
            {/* Profile Section */}
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <div className="border p-4 rounded-md mb-6 bg-gray-100">
                <p><strong>User name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <button className="mt-3 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Edit Profile</button>
            </div>
            {/* Address Section */}
            <h2 className="text-xl font-semibold mb-4">Address List</h2>
            {Array.isArray(addresses) && addresses.length > 0 ? (
                addresses.slice(0, 3).map((address, index) => (
                    <div key={address.id} className="border p-4 rounded-md mb-3 flex items-center justify-between bg-gray-50">
                        <div className="flex items-center">
                            {index === 0 && (
                                <span className="mr-2 px-2 py-1 bg-green-500 text-white text-xs rounded">
                        Primary
                    </span>
                            )}
                            <p>
                                {address.street_address}, {address.city_name}, {address.province_name} - {address.postal_code}
                            </p>
                        </div>
                        <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                            Edit Address
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No addresses available.</p>
            )}

            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-3">Add Address</button>
        </div>
    );
};

ProfilePage.layout = (page) => <Layout children={page} menus={userMenus} />;

export default ProfilePage;
