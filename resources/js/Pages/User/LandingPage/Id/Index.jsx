import React, { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import { useForm } from "@inertiajs/react";
import "grapesjs/dist/css/grapes.min.css";
import Layout from "../../../../components/Layout";
import { userMenus } from "../../../../libs/menus";

const Page = ({ html_code, css_code,id }) => {
    const [editor, setEditor] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        html: "",
        css: "",
        name: "", 
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

    const handleExport = async (e) => {
        e.preventDefault();
    
        if (!editor) return;
    
        // Get updated HTML and CSS content from GrapesJS
        const htmlContent = editor.getHtml();
        const cssContent = editor.getCss();
    
        if (!htmlContent.trim() || !cssContent.trim()) {
            alert("HTML and CSS cannot be empty!");
            return;
        }
    
        // Update form data correctly
        setData("html", htmlContent);
        setData("css", cssContent);
    
        // Wait for state update using a callback
        setTimeout(() => {
            post(`/templates/export/${id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    alert("Template saved successfully!");
                },
                onError: (errors) => {
                    console.error("Export failed:", errors);
                },
            });
        }, 100); // Delay to ensure data is set
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
                    {processing ? "Saving..." : "Save Template"}
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
