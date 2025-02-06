import Layout from "../../../../components/Layout";
import { userMenus } from "../../../../libs/menus";
import { QRCodeCanvas } from "qrcode.react";

const Page = ({ url }) => {
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/share/project/${url}`;

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="border border-blue-500 rounded-lg p-6 w-96 shadow-lg">
                <h2 className="text-lg font-semibold text-center mb-4">Share Landing Page</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Share URL
                    </label>
                    <div className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md border border-gray-300 text-sm break-all">
                        {shareUrl}
                    </div>
                </div>
                <div className="mb-4 text-center">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        QR Code
                    </label>
                    <div className="inline-block p-2 bg-white border border-gray-300 rounded-md shadow-md">
                        <QRCodeCanvas value={shareUrl} size={150} />
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

Page.layout = (page) => <Layout children={page} menus={userMenus} />;

export default Page;
