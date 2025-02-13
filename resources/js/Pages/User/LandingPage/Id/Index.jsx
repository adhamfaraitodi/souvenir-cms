import React, { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import { useForm } from "@inertiajs/react";
import "grapesjs/dist/css/grapes.min.css";
import Layout from "../../../../components/Layout";
import { userMenus } from "../../../../libs/menus";

const Page = ({ html_code, css_code }) => {
    const [editor, setEditor] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        html: "",
        css: "",
        name: "", // Optional: if you want to name your template
    });

    useEffect(() => {
        const editor = grapesjs.init({
            container: "#gjs",
            fromElement: true,
            plugins: ["gjs-blocks-basic"],
            storageManager: false,
        });

        setEditor(editor);
        editor.setComponents(html_code);
        editor.setStyle(css_code);

        return () => {
            editor.destroy();
        };
    }, [html_code, css_code]);

    const handleExport = (e) => {
        e.preventDefault();

        if (!editor) return;

        // Update form data with current editor content
        setData({
            ...data,
            html: editor.getHtml(),
            css: editor.getCss(),
        });

        // Submit the form
        post("/api/templates/export", {
            preserveScroll: true,
            onSuccess: () => {
                alert("Template exported successfully!");
            },
            onError: (errors) => {
                console.error("Export failed:", errors);
            },
        });
    };

    return (
        <div>
            <div id="gjs"></div>
            <form onSubmit={handleExport} className="mt-4">
                <button
                    type="submit"
                    disabled={processing}
                    className={`rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 ${
                        processing ? "cursor-not-allowed opacity-50" : ""
                    }`}
                >
                    {processing ? "Exporting..." : "Export Template"}
                </button>

                {errors.html && (
                    <div className="mt-2 text-red-500">{errors.html}</div>
                )}
                {errors.css && (
                    <div className="mt-2 text-red-500">{errors.css}</div>
                )}
                {errors.name && (
                    <div className="mt-2 text-red-500">{errors.name}</div>
                )}
            </form>
        </div>
    );
};

Page.layout = (page) => <Layout children={page} menus={userMenus} />;

export default Page;
