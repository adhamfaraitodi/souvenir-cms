import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import { userMenus } from "../../../libs/menus";
import Title from "@/components/Title.jsx";
import PopupWrapper from "../../../components/PopupWrapper";
import InputForm from "../../../components/InputForm";
import DropdownSelect from "../../../components/DropdownSelect";
import Button from "../../../components/Button";
import LandingPageCard from "../../../components/Card/LandingPageCard";
import { QRCodeCanvas } from "qrcode.react";
import { useForm } from "@inertiajs/react";

const Page = ({ landingPages, themes }) => {
    const [isEditPopupVisible, setEditPopupVisible] = useState(false);
    const [isSharePopupVisible, setSharePopupVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(null);

    const handleEditClick = (page) => {
        setCurrentPage(page);
        setEditPopupVisible(true);
    };

    const handleShareClick = (page) => {
        setCurrentPage(page);
        setSharePopupVisible(true);
    };

    const handleCloseEditPopup = () => {
        setEditPopupVisible(false);
        setCurrentPage(null);
    };

    const handleCloseSharePopup = () => {
        setSharePopupVisible(false);
        setCurrentPage(null);
    };

    const { data, setData, put, processing, errors } = useForm({
        title: "",
        theme_id: "",
    });

    useEffect(() => {
        if (currentPage) {
            setData("title", currentPage.title);
            setData("theme_id", currentPage.theme_id);
        }
    }, [currentPage, setData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/landing-page/project-update/${currentPage.id}`, data, {
            preserveScroll: true,
        });
        handleCloseEditPopup();
    };

    const baseUrl = window.location.origin;
    const shareUrl = currentPage
        ? `${baseUrl}/share/project/${currentPage.landing_page_code}`
        : "";

    return (
        <div className="mb-5 sm:mb-10 md:mb-20">
            <Title className="mb-4 font-semibold sm:mb-6 md:mb-8">
                Your Landing Page
            </Title>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {landingPages.map((page) => (
                    <LandingPageCard
                        key={page.id}
                        id={page.landing_page_code}
                        title={page.title}
                        link={`landing-page/edit/${page.landing_page_code}`}
                        theme={page.theme.title}
                        onEditClick={() => handleEditClick(page)}
                        onShareClick={() => handleShareClick(page)}
                    />
                ))}
            </div>

            <PopupWrapper
                isVisible={isEditPopupVisible}
                onClose={handleCloseEditPopup}
            >
                {currentPage && (
                    <div className="rounded-lg bg-white p-4 shadow-md">
                        <h2 className="mb-4 text-lg font-bold">
                            Edit Landing Page
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <InputForm
                                label="Landing Page Title"
                                handleChange={(value) =>
                                    setData("title", value)
                                }
                                value={data.title}
                                required
                                placeholder="Enter landing page title"
                                className="mb-4 w-full"
                            />
                            <DropdownSelect
                                label="Select Theme"
                                value={data.theme_id}
                                onChange={(value) => setData("theme_id", value)}
                                required
                                className="mb-4 w-full"
                            >
                                <option value="">Select a theme</option>
                                {themes.map((theme) => (
                                    <option key={theme.id} value={theme.id}>
                                        {theme.title}
                                    </option>
                                ))}
                            </DropdownSelect>
                            <div className="mb-4 flex justify-end">
                                <Button
                                    type="submit"
                                    theme="default"
                                    disabled={processing}
                                >
                                    {processing ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
            </PopupWrapper>

            <PopupWrapper
                isVisible={isSharePopupVisible}
                onClose={handleCloseSharePopup}
            >
                {currentPage && (
                    <div className="rounded-lg bg-white p-4 shadow-md">
                        <h2 className="mb-4 text-lg font-bold">
                            Share Landing Page
                        </h2>
                        <div className="mb-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Share URL
                            </label>
                            <div className="break-all rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-700">
                                {shareUrl}
                            </div>
                        </div>
                        <div className="mb-4 text-center">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                QR Code
                            </label>
                            <div className="inline-block rounded-md border border-gray-300 bg-white p-2 shadow-md">
                                <QRCodeCanvas value={shareUrl} size={150} />
                            </div>
                        </div>
                    </div>
                )}
            </PopupWrapper>
        </div>
    );
};

Page.layout = (page) => <Layout children={page} menus={userMenus} />;

export default Page;
