import Layout from "../../../components/Layout";
import { userMenus } from "../../../libs/menus";
import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../../components/Button";

const ProfilePage = () => {
    const { user, addresses, cities, provinces } = usePage().props;
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [street, setStreet] = useState("");
    const [filteredCities, setFilteredCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        if (addresses && addresses.length > 0) {
            const currentAddress = addresses[0];
            setStreet(currentAddress.street_address || "");
            setPostalCode(currentAddress.postal_code || "");
            setSelectedCity(currentAddress.city_id || "");
            setSelectedProvince(currentAddress.province_id || "");
        }
    }, [addresses]);

    const handleProvinceChange = (e) => {
        const provinceId = e.target.value;
        setSelectedProvince(provinceId);
        setSelectedCity("");

        if (provinceId) {
            const citiesInProvince = cities.filter(
                (city) => city.province_id === parseInt(provinceId),
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
            const selectedCityData = cities.find(
                (city) => city.id === parseInt(cityId),
            );
            if (selectedCityData) {
                setSelectedProvince(selectedCityData.province_id.toString());
                const citiesInProvince = cities.filter(
                    (city) => city.province_id === selectedCityData.province_id,
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
            const response = await axios.post(
                "/create-address",
                {
                    province_id: selectedProvince,
                    city_id: selectedCity,
                    postal_code: postalCode,
                    street_address: street,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        "X-CSRF-TOKEN": document.querySelector(
                            'meta[name="csrf-token"]',
                        ).content,
                    },
                },
            );

            if (response.data.success) {
                window.location.reload();
            } else {
                setError(response.data.message || "Failed to save address");
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "An error occurred while saving the address",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-3xl rounded-md bg-white p-6 shadow">
            {/* Profile Section */}
            <h2 className="mb-4 text-xl font-semibold">Profile</h2>
            <div className="mb-6 rounded-md border bg-gray-100 p-4">
                <p>
                    <strong>User name:</strong> {user.name}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <p>
                    <strong>Phone:</strong> {user.phone}
                </p>
                <div className="mt-2 w-fit">
                    <Button theme="gray">Edit Profile</Button>
                </div>
            </div>

            {/* Address List Section */}
            {Array.isArray(addresses) && addresses.length > 0 ? (
                addresses.map((address, index) => (
                    <div
                        key={address.id}
                        className="mb-3 flex items-center justify-between rounded-md border bg-gray-50 p-4"
                    >
                        <div className="flex items-center">
                            {index === 0 && (
                                <span className="mr-2 rounded bg-green-500 px-2 py-1 text-xs text-white">
                                    Primary
                                </span>
                            )}
                            <p>
                                {address.street_address}, {address.city_name},{" "}
                                {address.province_name} - {address.postal_code}
                            </p>
                        </div>
                        <div>
                            <Button
                                onClick={() => handleEditClick(address.id)}
                                theme="gray"
                            >
                                Edit Address
                            </Button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No addresses available.</p>
            )}

            <Button className="">Add Address</Button>

            {/* Address Add Form */}
            <div className="mx-auto max-w-3xl rounded-md bg-white p-6 shadow">
                <h2 className="mb-4 text-xl font-semibold">Add New Address</h2>
                {error && (
                    <div className="mb-4 rounded bg-red-100 p-3 text-red-700">
                        {error}
                    </div>
                )}
                <form
                    onSubmit={handleSubmit}
                    className="rounded-md border bg-gray-100 p-4"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-700">Province:</label>
                            <select
                                className="w-full rounded border px-3 py-2"
                                value={selectedProvince}
                                onChange={handleProvinceChange}
                                required
                            >
                                <option value="">Select your province</option>
                                {provinces.map((province) => (
                                    <option
                                        key={province.id}
                                        value={province.id}
                                    >
                                        {province.province_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-gray-700">City:</label>
                            <select
                                className="w-full rounded border px-3 py-2"
                                value={selectedCity}
                                onChange={handleCityChange}
                                required
                            >
                                <option value="">Select your city</option>
                                {(selectedProvince
                                    ? filteredCities
                                    : cities
                                ).map((city) => (
                                    <option key={city.id} value={city.id}>
                                        {city.city_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-gray-700">
                                Postal Code:
                            </label>
                            <input
                                type="text"
                                className="w-full rounded border px-3 py-2"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                placeholder="Insert postal code"
                                required
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="text-gray-700">Street:</label>
                            <textarea
                                className="w-full rounded border px-3 py-2"
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
                        className="mt-4 rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700 disabled:bg-gray-400"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </form>
            </div>
        </div>
    );
};

ProfilePage.layout = (page) => <Layout children={page} menus={userMenus} />;

export default ProfilePage;
