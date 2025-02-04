import Layout from "../../../components/Layout";
import { userMenus } from "../../../libs/menus";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../../components/Button";
import PopupWrapper from "../../../components/PopupWrapper";
import DropdownSelect from "../../../components/DropdownSelect";
import InputForm from "../../../components/InputForm";

const initialAddressState = {
    id: null,
    province_id: "",
    city_id: "",
    postal_code: "",
    street_address: "",
};

const initialProfileState = {
    name: "",
    email: "",
    phone: "",
};

const ProfilePage = ({ user, addresses, cities, provinces }) => {
    // Profile State
    const [profileData, setProfileData] = useState({
        ...initialProfileState,
        ...user,
    });

    // Address State
    const [addressData, setAddressData] = useState(initialAddressState);
    const [filteredCities, setFilteredCities] = useState([]);
    const [isAddressPopupOpen, setIsAddressPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [editMode, setEditMode] = useState(false);

    // Use effect to handle initial city filtering when editing
    useEffect(() => {
        if (addressData.province_id) {
            const citiesInProvince = cities.filter(
                (city) =>
                    city.province_id === parseInt(addressData.province_id),
            );
            setFilteredCities(citiesInProvince);
        }
    }, [addressData.province_id, cities]);

    const handleProvinceChange = (value) => {
        setAddressData((prev) => ({
            ...prev,
            province_id: value,
            city_id: "", // Reset city when province changes
        }));

        if (value) {
            const citiesInProvince = cities.filter(
                (city) => city.province_id === parseInt(value),
            );
            setFilteredCities(citiesInProvince);
        } else {
            setFilteredCities([]);
        }
    };

    const handleCityChange = (value) => {
        setAddressData((prev) => ({ ...prev, city_id: value }));
    };

    const resetAddressForm = () => {
        setAddressData(initialAddressState);
        setFilteredCities([]);
        setError("");
        setEditMode(false);
    };

    const handleClose = () => {
        setIsAddressPopupOpen(false);
        resetAddressForm();
    };

    const handleEditClick = (address) => {
        // Convert IDs to strings for the select inputs
        setAddressData({
            id: address.id,
            province_id: address.province_id.toString(),
            city_id: address.city_id.toString(),
            postal_code: address.postal_code,
            street_address: address.street_address,
        });
        setEditMode(true);
        setIsAddressPopupOpen(true);
    };

    const handleAddClick = () => {
        resetAddressForm();
        setIsAddressPopupOpen(true);
    };

    // Rest of the code remains the same...
    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const { province_id, city_id, postal_code, street_address } =
            addressData;

        if (!province_id || !city_id || !postal_code || !street_address) {
            setError("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        try {
            const url = editMode
                ? `/update-address/${addressData.id}`
                : "/create-address";

            const response = await axios.post(
                url,
                {
                    province_id,
                    city_id,
                    postal_code,
                    street_address,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        "X-CSRF-TOKEN": document.querySelector(
                            'meta[name="csrf-token"]',
                        )?.content,
                    },
                },
            );

            if (response.data.success) {
                window.location.reload();
            } else {
                setError("Failed to save address");
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "An error occurred while saving the address",
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-3xl rounded-md bg-white p-6 shadow">
            {/* Profile Section */}
            <h2 className="mb-4 text-xl font-semibold">Profile</h2>
            <div className="mb-6 rounded-md border bg-gray-100 p-4">
                <p>
                    <strong>User name:</strong> {profileData.name}
                </p>
                <p>
                    <strong>Email:</strong> {profileData.email}
                </p>
                <p>
                    <strong>Phone:</strong> {profileData.phone}
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
                        className="mb-3 flex flex-col justify-between gap-y-4 rounded-md border bg-gray-50 p-4 md:flex-row md:items-center"
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
                        <div className="w-fit">
                            <Button
                                onClick={() => handleEditClick(address)}
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

            <Button
                onClick={handleAddClick}
                disabled={addresses.length >= 3}
                className={
                    addresses.length >= 3 ? "cursor-not-allowed opacity-50" : ""
                }
            >
                Add Address
            </Button>

            <PopupWrapper isVisible={isAddressPopupOpen} onClose={handleClose}>
                <div className="mx-auto max-w-3xl rounded-md bg-white p-6 shadow">
                    <h2 className="mb-4 text-xl font-semibold">
                        {editMode ? "Edit Address" : "Add New Address"}
                    </h2>
                    {error && (
                        <div className="mb-4 rounded bg-red-100 p-3 text-red-700">
                            {error}
                        </div>
                    )}
                    <form
                        onSubmit={handleAddressSubmit}
                        className="rounded-md border bg-gray-100 p-4"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <DropdownSelect
                                label="Province:"
                                value={addressData.province_id}
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
                            </DropdownSelect>

                            <DropdownSelect
                                label="City:"
                                value={addressData.city_id}
                                onChange={handleCityChange}
                                required
                            >
                                <option value="">Select your city</option>
                                {(addressData.province_id
                                    ? filteredCities
                                    : cities
                                ).map((city) => (
                                    <option key={city.id} value={city.id}>
                                        {city.city_name}
                                    </option>
                                ))}
                            </DropdownSelect>

                            <InputForm
                                label="Postal Code:"
                                type="text"
                                value={addressData.postal_code}
                                handleChange={(value) =>
                                    setAddressData((prev) => ({
                                        ...prev,
                                        postal_code: value,
                                    }))
                                }
                                placeholder="Insert postal code"
                                required
                            />

                            <InputForm
                                label="Street:"
                                type="textarea"
                                className="col-span-2"
                                value={addressData.street_address}
                                handleChange={(value) =>
                                    setAddressData((prev) => ({
                                        ...prev,
                                        street_address: value,
                                    }))
                                }
                                placeholder="Insert street detail"
                                required
                            />
                        </div>

                        <Button
                            className="mt-2"
                            type="submit"
                            theme="gray"
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </Button>
                    </form>
                </div>
            </PopupWrapper>
        </div>
    );
};

ProfilePage.layout = (page) => <Layout children={page} menus={userMenus} />;

export default ProfilePage;
