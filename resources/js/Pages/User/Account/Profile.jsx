import Layout from "../../../components/Layout";
import { userMenus } from "../../../libs/menus";
import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = () => {
    const { user, addresses, cities, provinces } = usePage().props;
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [street, setStreet] = useState("");
    const [filteredCities, setFilteredCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
console.log(addresses)
    const handleProvinceChange = (e) => {
        const provinceId = e.target.value;
        setSelectedProvince(provinceId);
        setSelectedCity("");

        if (provinceId) {
            const citiesInProvince = cities.filter(
                city => city.province_id === parseInt(provinceId)
            );
            setFilteredCities(citiesInProvince);
        } else {
            setFilteredCities([]);
        }
    };

    const handleCityChange = (e) => {
        const cityId = e.target.value;
        setSelectedCity(cityId);

        if (cityId) {
            const selectedCityData = cities.find(city => city.id === parseInt(cityId));
            if (selectedCityData) {
                setSelectedProvince(selectedCityData.province_id.toString());
                const citiesInProvince = cities.filter(
                    city => city.province_id === selectedCityData.province_id
                );
                setFilteredCities(citiesInProvince);
            }
        }
    };
    const handleEditClick = (addressId) => {
        window.location.href = `/edit-address/${addressId}`;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!selectedProvince || !selectedCity || !postalCode || !street) {
            setError("Please fill in all fields");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('/create-address', {
                province_id: selectedProvince,
                city_id: selectedCity,
                postal_code: postalCode,
                street_address: street
            });

            if (response.data.success) {
                window.location.reload();
            } else {
                setError("Failed to save address");
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred while saving the address");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
            {/* Profile Section */}
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <div className="border p-4 rounded-md mb-6 bg-gray-100">
                <p><strong>User name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <button className="mt-3 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                    Edit Profile
                </button>
            </div>

            {/* Address List Section */}
            {Array.isArray(addresses) && addresses.length > 0 ? (
                addresses.map((address, index) => (
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
                        <button
                            onClick={() => handleEditClick(address.id)}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                            Edit Address
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No addresses available.</p>
            )}

            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-3">
                Add Address
            </button>

            {/* Address Add Form */}
            <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
                <h2 className="text-xl font-semibold mb-4">Add New Address</h2>
                {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
                <form onSubmit={handleSubmit} className="border p-4 rounded-md bg-gray-100">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-700">Province:</label>
                            <select
                                className="w-full border px-3 py-2 rounded"
                                value={selectedProvince}
                                onChange={handleProvinceChange}
                                required
                            >
                                <option value="">Select your province</option>
                                {provinces.map(province => (
                                    <option key={province.id} value={province.id}>{province.province_name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-gray-700">City:</label>
                            <select
                                className="w-full border px-3 py-2 rounded"
                                value={selectedCity}
                                onChange={handleCityChange}
                                required
                            >
                                <option value="">Select your city</option>
                                {(selectedProvince ? filteredCities : cities).map(city => (
                                    <option key={city.id} value={city.id}>{city.city_name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-gray-700">Postal Code:</label>
                            <input
                                type="text"
                                className="w-full border px-3 py-2 rounded"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                placeholder="Insert postal code"
                                required
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="text-gray-700">Street:</label>
                            <textarea
                                className="w-full border px-3 py-2 rounded"
                                rows="2"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                placeholder="Insert street detail"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:bg-gray-400"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </form>
            </div>
        </div>
    );
};

ProfilePage.layout = (page) => <Layout children={page} menus={userMenus} />;

export default ProfilePage;
