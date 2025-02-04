import Layout from "../../../components/Layout";
import { userMenus } from "../../../libs/menus";
import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import axios from "axios";

const EditAddressForm = () => {
    const { address, cities, provinces } = usePage().props;
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [street, setStreet] = useState("");
    const [filteredCities, setFilteredCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Initialize form with existing address data
    useEffect(() => {
        if (address) {
            setStreet(address.street_address || "");
            setPostalCode(address.postal_code || "");
            setSelectedCity(address.city_id?.toString() || "");

            // Find and set the province based on the city
            const city = cities.find(c => c.id === address.city_id);
            if (city) {
                setSelectedProvince(city.province_id.toString());
                // Filter cities for this province
                const citiesInProvince = cities.filter(
                    c => c.province_id === city.province_id
                );
                setFilteredCities(citiesInProvince);
            }
        }
    }, [address, cities]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Validation
        if (!selectedProvince || !selectedCity || !postalCode || !street) {
            setError("Please fill in all fields");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`/update-address/${address.id}`, {
                province_id: selectedProvince,
                city_id: selectedCity,
                postal_code: postalCode,
                street_address: street
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                }
            });

            if (response.data.success) {
                window.location.href = '/account/profile';
            } else {
                setError(response.data.message || "Failed to update address");
            }
        } catch (err) {
            console.error("Update Error:", err);
            setError(err.response?.data?.message || "An error occurred while updating the address");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 border p-4 rounded-md bg-gray-100">
            <h2 className="text-xl font-semibold mb-4">Edit Address</h2>
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-gray-700">Province:</label>
                    <select
                        className="w-full border px-3 py-2 rounded"
                        value={selectedProvince}
                        onChange={handleProvinceChange}
                        required
                    >
                        <option value="">Select Province</option>
                        {provinces.map(province => (
                            <option key={province.id} value={province.id}>
                                {province.province_name}
                            </option>
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
                        <option value="">Select City</option>
                        {(selectedProvince ? filteredCities : cities).map(city => (
                            <option key={city.id} value={city.id}>
                                {city.city_name}
                            </option>
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
                        placeholder="Enter postal code"
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
                        placeholder="Enter street address"
                        required
                    />
                </div>
            </div>

            <div className="flex gap-2 mt-4">
                <button
                    type="submit"
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:bg-gray-400"
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Address'}
                </button>
                <button
                    type="button"
                    onClick={() => window.location.href = '/account/profile'}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

EditAddressForm.layout = (page) => <Layout children={page} menus={userMenus} />;

export default EditAddressForm;
