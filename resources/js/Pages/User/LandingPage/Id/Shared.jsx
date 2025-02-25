import React, { useEffect, useState } from 'react';
import { router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";

const SharedLandingPage = ({ id, html_code, css_code, utm, redirect_url }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [reportMessage, setReportMessage] = useState('');
    const [selectedReason, setSelectedReason] = useState('');
    const reasons = ["Spam", "Scam", "Inappropriate Content","Suspicious Link", "Other"];
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            alert(flash.success);
            setIsReportModalOpen(false);
        }
    }, [flash]);

    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.textContent = css_code;
        document.head.appendChild(styleElement);
        return () => {
            document.head.removeChild(styleElement);
        };
    }, [css_code]);

    useEffect(() => {
        if (utm) {
            const { utm_source, utm_medium, utm_campaign } = utm;
            console.log("Captured UTM Parameters:", utm_source, utm_medium, utm_campaign);
            if (window.gtag) {
                window.gtag("event", "page_view", {
                    page_location: window.location.href,
                    utm_source,
                    utm_medium,
                    utm_campaign,
                });
            }
        }
    }, [utm]);

    const handleReportSubmit = () => {
        if (!selectedReason) {
            alert("Please select a reason");
            return;
        }

        router.post('/report/abuse', {
            id: id,
            reason: selectedReason,
            description: reportMessage,
        }, {
            onSuccess: () => {
                alert("Report submitted successfully.");
                setIsReportModalOpen(false);
            },
            onError: () => {
                alert("Failed to submit report.");
            },
            preserveScroll: true
        });
    };

    const handleRedirect = () => {
        window.location.href = redirect_url;
    };

    return (
        <div className="min-h-screen w-full">
            <div dangerouslySetInnerHTML={{ __html: html_code }} className="w-full" />
            {redirect_url && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 justify-items-center" role="alert">
                <p className="font-bold">Warning</p>
                <p>You are about to visit an external link: 
                    <span className="block text-blue-600 break-all">{redirect_url}</span>
                </p>
                <button
                    className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition mt-2"
                    onClick={handleRedirect}
                >
                    Proceed
                </button>
            </div>
            )}
            <div className="p-4 bg-gray-100 text-center border-t border-gray-300">
                <p className="text-sm text-gray-700">
                    If you find this page not following our guidelines,
                    <button onClick={() => setIsReportModalOpen(true)} className="text-red-600 hover:underline ml-2">Report abuse</button>
                </p>
            </div>
            {isReportModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-semibold mb-2">Report Abuse</h2>

                        <select
                            className="w-full border p-2 rounded mb-2"
                            value={selectedReason}
                            onChange={(e) => setSelectedReason(e.target.value)}
                        >
                            <option value="">Select a reason</option>
                            {reasons.map((reason) => (
                                <option key={reason} value={reason}>{reason}</option>
                            ))}
                        </select>

                        <textarea
                            className="w-full border p-2 rounded mb-2"
                            placeholder="Additional details (optional)..."
                            rows="2"
                            value={reportMessage}
                            onChange={(e) => setReportMessage(e.target.value)}
                        />

                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-gray-400 text-white py-1 px-3 rounded hover:bg-gray-500 transition"
                                onClick={() => setIsReportModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition"
                                onClick={handleReportSubmit}
                                disabled={!selectedReason}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SharedLandingPage;
