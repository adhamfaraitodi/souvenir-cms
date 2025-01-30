import Layout from "../../../components/Layout";
import { userMenus } from "../../../libs/menus";
import { useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";

const Page = () => {
    const { snapToken } = usePage().props;

    useEffect(() => {
        if (snapToken) {
            const midtransScript = document.createElement("script");
            midtransScript.src = "https://app.sandbox.midtrans.com/snap/snap.js";
            midtransScript.setAttribute("data-client-key", "YOUR_MIDTRANS_CLIENT_KEY");
            midtransScript.onload = () => {
                window.snap.pay(snapToken, {
                    onSuccess: (result) => {
                        console.log("Payment Success:", result);
                    },
                    onPending: (result) => {
                        console.log("Payment Pending:", result);
                    },
                    onError: (result) => {
                        console.log("Payment Error:", result);
                    },
                    onClose: () => {
                        console.log("Payment Popup Closed");
                    },
                });
            };
            document.body.appendChild(midtransScript);
        }
    }, [snapToken]);

    return (
        <>
            <Head title="Payment" />
            <div className="p-4">
                <h1 className="text-xl font-bold">Processing Payment...</h1>
            </div>
        </>
    );
};

Page.layout = (page) => <Layout children={page} menus={userMenus} />;

export default Page;
