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
    const [urlError, setUrlError] = useState("");

    // Form for editing landing page
    const { data: editData, setData: setEditData, put: putEdit, processing: editProcessing, errors: editErrors } = useForm({
        title: "",
        theme_id: "",
    });

    // Form for sharing landing page
    const { data: shareData, setData: setShareData, post: postShare, processing: shareProcessing, errors: shareErrors } = useForm({
        url: "",
        url_redirect: "",
    });

    const handleEditClick = (page) => {
        setCurrentPage(page);
        setEditPopupVisible(true);
    };

    const handleShareClick = (page) => {
        setCurrentPage(page);
        setSharePopupVisible(true);
        if (page.url) {
            setShareData("url", page.url);
            setShareData("url_redirect", page.url_redirect);
        }
    };
    const validateAndFormatUrl = (value) => {
        const formattedValue = value.toLowerCase()
            .replace(/[^a-z0-9-]/g, '') // Remove all non-alphanumeric characters except hyphen
            .replace(/--+/g, '-')       // Replace multiple hyphens with single hyphen
            .replace(/^-+|-+$/g, '');   // Remove hyphens from start and end

        return formattedValue;
    };
    const handleUrlChange = (value) => {
        const formattedUrl = validateAndFormatUrl(value);

        // Basic validation
        if (value !== formattedUrl) {
            setUrlError("Only lowercase letters, numbers, and hyphens are allowed");
        } else {
            setUrlError("");
        }

        setShareData("url", formattedUrl);
    };

    const handleCloseEditPopup = () => {
        setEditPopupVisible(false);
        setCurrentPage(null);
        setEditData({ title: "", theme_id: "" });
    };

    const handleCloseSharePopup = () => {
        setSharePopupVisible(false);
        setCurrentPage(null);
        setShareData({ url: "", url_redirect: "" });
        setUrlError("");
    };

    useEffect(() => {
        if (currentPage) {
            setEditData("title", currentPage.title);
            setEditData("theme_id", currentPage.theme_id);
        }
    }, [currentPage, setEditData]);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        putEdit(`/landing-page/project-update/${currentPage.id}`, {
            preserveScroll: true,
            onSuccess: () => handleCloseEditPopup(),
            onError: (errors) => {
                console.error('Edit errors:', errors);
            }
        });
    };

    const handleShareSubmit = (e) => {
        e.preventDefault();
        if (urlError) {
            return;
        }
        postShare(`/landing-page/set-url/${currentPage.id}`, {
            preserveScroll: true,
            onSuccess: () => handleCloseSharePopup(),
            onError: (errors) => {
                console.error('Share errors:', errors);
            }
        });
    };

    const baseUrl = window.location.origin;
    const shareUrl = currentPage?.url
        ? `${baseUrl}/${currentPage.url}/?utm_source=share&utm_medium=qr&utm_campaign=landing_page`
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
                        <form onSubmit={handleEditSubmit}>
                            <InputForm
                                label="Landing Page Title"
                                handleChange={(value) => setEditData("title", value)}
                                value={editData.title}
                                error={editErrors.title}
                                required
                                placeholder="Enter landing page title"
                                className="mb-4 w-full"
                            />
                            <DropdownSelect
                                label="Select Theme"
                                value={editData.theme_id}
                                onChange={(value) => setEditData("theme_id", value)}
                                error={editErrors.theme_id}
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
                                    disabled={editProcessing}
                                >
                                    {editProcessing ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
            </PopupWrapper>

            <PopupWrapper isVisible={isSharePopupVisible} onClose={handleCloseSharePopup}>
                {currentPage && (
                    <div className="rounded-lg bg-white p-4 shadow-md">
                        <h2 className="mb-4 text-lg font-bold">Share Landing Page</h2>
                        {!currentPage.url ? (
                            <form onSubmit={handleShareSubmit}>
                                <InputForm
                                    label="Custom URL Name"
                                    handleChange={handleUrlChange}
                                    value={shareData.url}
                                    error={urlError || shareErrors.url}
                                    required
                                    placeholder="Enter a unique URL name (e.g. my-landing-page)"
                                    className="mb-4 w-full"
                                    pattern="[a-z0-9-]+"
                                    title="Only lowercase letters, numbers, and hyphens are allowed"
                                />
                                <div className="mb-4 text-xs text-gray-500">
                                    Only lowercase letters, numbers, and hyphens are allowed
                                </div>
                                <InputForm
                                    label="Redirect URL"
                                    handleChange={(value) => setShareData("url_redirect", value)}
                                    value={shareData.url_redirect}
                                    error={shareErrors.url_redirect}
                                    placeholder="Enter redirect URL"
                                    className="mb-4 w-full"
                                />
                                <div className="mb-4 flex justify-end">
                                    <Button
                                        type="submit"
                                        theme="default"
                                        disabled={shareProcessing || !!urlError}
                                    >
                                        {shareProcessing ? "Saving..." : "Save & Generate Link"}
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>
                )}
            </PopupWrapper>
        </div>
    );
};

Page.layout = (page) => <Layout children={page} menus={userMenus} />;

export default Page;
