import React, { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import { useForm } from "@inertiajs/react";
import "grapesjs/dist/css/grapes.min.css";
import Layout from "../../../../components/Layout";
import { userMenus } from "../../../../libs/menus";

const Page = ({ html_code, css_code, id }) => {
    const [editor, setEditor] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        html: html_code || "",
        css: css_code || "",   
    });
    
    useEffect(() => {
        const gjsEditor = grapesjs.init({
            container: "#gjs",
            fromElement: true,
            plugins: ["gjs-blocks-basic"],
            storageManager: false,
        });
   
        setEditor(gjsEditor);
   
        gjsEditor.on("load", () => {
            gjsEditor.setComponents(html_code);
            gjsEditor.setStyle(css_code);
        });
   
        return () => {
            gjsEditor.destroy();
        };
    }, [html_code, css_code]);
   
    const handleExport = async (e) => {
        e.preventDefault();
   
        if (!editor) return;

        const htmlContent = editor.getHtml();
        const cssContent = editor.getCss();
   
        if (!htmlContent.trim() || !cssContent.trim()) {
            alert("HTML and CSS cannot be empty!");
            return;
        }
        
        setData({
            html: htmlContent,
            css: cssContent,
        });
        post(`/templates/export/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                alert("Template saved successfully!");
            },
            onError: (errors) => {
                console.error("Export failed:", errors);
            },
        });
    };
   
    return (
        <div>
            <div className="flex justify-end">
                <form onSubmit={handleExport} className="mt-1 text-right">
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
            <div id="gjs"></div>
        </div>
    );
};

Page.layout = (page) => <Layout children={page} menus={userMenus} />;
export default Page;